"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import gsap from "gsap";
import { SERVICES, type ServiceDef, type ServiceId } from "./serviceData";
import ServiceNode from "./ServiceNode";
import ServicePanel from "./ServicePanel";
import type { DirOverride, Ref } from "./Robot";

const EASE = "cubic-bezier(0.16, 1, 0.3, 1)";
const ORBIT_PERIOD_SECONDS = 90;

export default function ServiceOrbit({
  dirOverrideRef,
  scrollGazeRef,
  revealed,
  onTriggerExpression,
  onResetExpression,
}: {
  dirOverrideRef: Ref<DirOverride>;
  scrollGazeRef?: Ref<{ x: number; y: number; active: boolean }>;
  revealed: boolean;
  onTriggerExpression: () => void;
  onResetExpression: () => void;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const wrapperRefs = useRef<Map<ServiceId, HTMLDivElement>>(new Map());
  const buttonRefs = useRef<Map<ServiceId, HTMLButtonElement>>(new Map());
  const panelRef = useRef<HTMLDivElement>(null);

  const [hoveredId, setHoveredId] = useState<ServiceId | null>(null);
  const [selectedId, setSelectedId] = useState<ServiceId | null>(null);
  const [panelService, setPanelService] = useState<ServiceDef | null>(null);

  const hoveredIdRef = useRef<ServiceId | null>(null);
  const selectedIdRef = useRef<ServiceId | null>(null);
  useEffect(() => {
    hoveredIdRef.current = hoveredId;
  }, [hoveredId]);
  useEffect(() => {
    selectedIdRef.current = selectedId;
  }, [selectedId]);

  // orbit + drift animation loop — nodes continuously revolve around the
  // robot as a rigid ring (shared angular speed keeps their spacing so they
  // never collide), with a small per-node wobble layered on top
  useEffect(() => {
    let raf = 0;
    const start = performance.now();
    let lastNow = start;
    let orbitAngle = 0;
    const loop = (now: number) => {
      const dt = Math.min((now - lastNow) / 1000, 0.05);
      lastNow = now;
      const t = (now - start) / 1000;

      const anyActive = selectedIdRef.current !== null || hoveredIdRef.current !== null;
      const dampGlobal = selectedIdRef.current ? 0.35 : 1;
      const orbitDamp = anyActive ? 0.15 : 1;
      orbitAngle += ((2 * Math.PI) / ORBIT_PERIOD_SECONDS) * dt * orbitDamp;

      let activeX = 0;
      let activeY = 0;

      SERVICES.forEach((s) => {
        const el = wrapperRefs.current.get(s.id);
        const angleRad = (s.angle * Math.PI) / 180 + orbitAngle;

        if (el) {
          const baseLeft = 50 + Math.cos(angleRad) * s.radiusX;
          const baseTop = 50 - Math.sin(angleRad) * s.radiusY;
          el.style.left = `${baseLeft.toFixed(2)}%`;
          el.style.top = `${baseTop.toFixed(2)}%`;

          const isHovered = hoveredIdRef.current === s.id;
          const amp = s.driftAmp * dampGlobal * (isHovered ? 0.25 : 1);
          const dx = Math.cos(t * s.driftSpeed + s.phase) * amp;
          const dy = Math.sin(t * s.driftSpeed * 1.3 + s.phase) * amp * 0.7;
          el.style.transform = `translate(${dx.toFixed(2)}px, ${dy.toFixed(2)}px)`;
        }

        const activeId = selectedIdRef.current ?? hoveredIdRef.current;
        if (activeId === s.id) {
          activeX = Math.cos(angleRad);
          activeY = Math.sin(angleRad);
        }
      });

      // keep the robot's look-direction pointed at whichever node is
      // active, tracking its live orbited position rather than a static
      // angle; falls back to an ambient scroll-driven gaze when nothing is
      // hovered/selected, so the two never fight over the same ref
      if (selectedIdRef.current !== null || hoveredIdRef.current !== null) {
        dirOverrideRef.current.active = true;
        dirOverrideRef.current.x = activeX;
        dirOverrideRef.current.y = activeY;
      } else if (scrollGazeRef?.current.active) {
        dirOverrideRef.current.active = true;
        dirOverrideRef.current.x = scrollGazeRef.current.x;
        dirOverrideRef.current.y = scrollGazeRef.current.y;
      } else {
        dirOverrideRef.current.active = false;
      }

      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);
    return () => cancelAnimationFrame(raf);
  }, [dirOverrideRef, scrollGazeRef]);

  // swap to a fresh positive expression whenever a node is hovered or its
  // panel is open; settle back to the idle smile once nothing is active
  useEffect(() => {
    if (hoveredId !== null || selectedId !== null) {
      onTriggerExpression();
    } else {
      onResetExpression();
    }
  }, [hoveredId, selectedId, onTriggerExpression, onResetExpression]);

  // entrance stagger once revealed
  useEffect(() => {
    if (!revealed) return;
    const els = SERVICES.map((s) => wrapperRefs.current.get(s.id)).filter(
      Boolean
    ) as HTMLDivElement[];
    gsap.fromTo(
      els,
      { opacity: 0, scale: 0.75, y: 18 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.9,
        ease: "expo.out",
        stagger: 0.12,
      }
    );
  }, [revealed]);

  const closePanel = useCallback(() => {
    setSelectedId(null);
    const el = panelRef.current;
    if (!el) {
      setPanelService(null);
      return;
    }
    gsap.to(el, {
      opacity: 0,
      scale: 0.85,
      duration: 0.35,
      ease: "power2.in",
      onComplete: () => setPanelService(null),
    });
  }, []);

  const openPanel = useCallback((service: ServiceDef) => {
    setSelectedId(service.id);
    setPanelService(service);
  }, []);

  useEffect(() => {
    if (!panelService || !panelRef.current || !containerRef.current) return;
    const btn = buttonRefs.current.get(panelService.id);
    const container = containerRef.current;
    const panel = panelRef.current;
    const containerRect = container.getBoundingClientRect();

    let fromLeft = containerRect.width / 2 - 84;
    let fromTop = containerRect.height / 2 - 60;
    if (btn) {
      const r = btn.getBoundingClientRect();
      fromLeft = r.left - containerRect.left;
      fromTop = r.top - containerRect.top;
    }

    const panelWidth = window.innerWidth < 640 ? 300 : 340;
    const toLeft = containerRect.width / 2 - panelWidth / 2;
    const toTop = Math.max(16, containerRect.height / 2 - 130);

    gsap.killTweensOf(panel);
    gsap.fromTo(
      panel,
      {
        left: fromLeft,
        top: fromTop,
        width: 168,
        opacity: 0,
        scale: 0.85,
      },
      {
        left: toLeft,
        top: toTop,
        width: panelWidth,
        opacity: 1,
        scale: 1,
        duration: 0.7,
        delay: 0.22,
        ease: "expo.out",
      }
    );
  }, [panelService]);

  return (
    <div
      ref={containerRef}
      className="pointer-events-none absolute inset-0"
      style={{ transitionTimingFunction: EASE }}
    >
      {SERVICES.map((s) => {
        const angleRad = (s.angle * Math.PI) / 180;
        const baseLeft = (50 + Math.cos(angleRad) * s.radiusX).toFixed(2);
        const baseTop = (50 - Math.sin(angleRad) * s.radiusY).toFixed(2);
        const dimmed = (hoveredId !== null && hoveredId !== s.id) || selectedId !== null;
        const hidden = selectedId !== null && selectedId !== s.id;
        return (
          <div
            key={s.id}
            ref={(el) => {
              if (el) wrapperRefs.current.set(s.id, el);
            }}
            className="absolute"
            style={{ left: `${baseLeft}%`, top: `${baseTop}%` }}
          >
            <ServiceNode
              ref={(el) => {
                if (el) buttonRefs.current.set(s.id, el);
              }}
              service={s}
              hovered={hoveredId === s.id}
              dimmed={dimmed}
              hidden={hidden}
              onEnter={() => setHoveredId(s.id)}
              onLeave={() => setHoveredId(null)}
              onClick={() =>
                selectedId === s.id ? closePanel() : openPanel(s)
              }
            />
          </div>
        );
      })}

      {panelService && (
        <div ref={panelRef} className="absolute">
          <ServicePanel service={panelService} onClose={closePanel} />
        </div>
      )}
    </div>
  );
}
