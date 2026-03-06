import HeroCameraPreview from "@/components/hud/HeroCameraPreview";
import AICameraBox from "../hud/AICameraBox";
export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] grid grid-cols-2 gap-12 px-20 py-16 relative overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center">

        {/* Tags */}
        <div className="flex gap-3 mb-6">
          <span className="tag tag-cyan">AI Powered</span>
          <span className="tag tag-amber">Real-Time</span>
          <span className="tag tag-green">Gemini Live</span>
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-display)] text-7xl tracking-widest leading-none">
          LIFE<span className="text-[var(--cyan)]">REPLAY</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-6 text-[var(--text-secondary)] max-w-lg text-lg">
          Your real-time interaction copilot. LifeReplay observes
          conversations through audio and vision to provide
          subtle coaching during interviews, presentations,
          and negotiations.
        </p>

        {/* Buttons */}
        <div className="mt-10 flex gap-4">
          <button className="btn btn-primary">
            Start Live Session
          </button>

          <button className="btn btn-ghost">
            Open Coach Panel
          </button>
        </div>

        {/* System readiness */}
        <div className="mt-12 flex gap-8 text-sm text-[var(--text-secondary)]">

          <div>
            <p className="text-white font-semibold">Camera</p>
            <p>Ready</p>
          </div>

          <div>
            <p className="text-white font-semibold">Microphone</p>
            <p>Ready</p>
          </div>

          <div>
            <p className="text-white font-semibold">AI Engine</p>
            <p className="text-green-400">Online</p>
          </div>

        </div>

      </div>

      {/* RIGHT SIDE */}
      <div className="flex items-center justify-center">

        <div className="glass-panel p-6 w-[420px]">

          {/* Camera Preview */}
          <div className="glass-panel p-6 w-[420px] h-[280px]">
  <AICameraBox />
  <div className="mt-4 flex justify-between items-center">
    <span className="text-sm text-gray-400">AI Status</span>
    <span className="flex items-center gap-2 text-green-400">
      <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
      Active
    </span>
  </div>
</div>

          {/* Modes */}
          <div className="grid grid-cols-3 gap-3 mt-6">

            <button className="mode-card">
              Interview
            </button>

            <button className="mode-card">
              Presentation
            </button>

            <button className="mode-card">
              Negotiation
            </button>

          </div>

        </div>

      </div>

    </section>
  );
}