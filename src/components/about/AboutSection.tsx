import AboutStoryBlock from "./AboutStoryBlock";
import Philosophy from "./Philosophy";
import ApproachTimeline from "./ApproachTimeline";
import HumanConnection from "./HumanConnection";
import AboutStatement from "./AboutStatement";
import AboutCTA from "./AboutCTA";

export default function AboutSection() {
  return (
    <section id="about" className="relative overflow-hidden bg-surface-alt">
      {/* soft ambient lavender glows, kept lighter than the hero */}
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-[600px] w-[1100px] -translate-x-1/2 opacity-40"
        style={{
          background:
            "radial-gradient(50% 50% at 50% 0%, rgba(139,124,246,0.12), transparent 70%)",
        }}
      />
      <div
        className="pointer-events-none absolute bottom-0 left-0 h-[500px] w-[700px] opacity-30"
        style={{
          background:
            "radial-gradient(50% 50% at 0% 100%, rgba(139,124,246,0.1), transparent 70%)",
        }}
      />

      <div className="relative">
        <AboutStoryBlock />
        <Philosophy />
        <ApproachTimeline />
        <HumanConnection />
        <AboutStatement />
        <AboutCTA />
      </div>
    </section>
  );
}
