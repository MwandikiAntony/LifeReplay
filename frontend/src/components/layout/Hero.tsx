import HeroCameraPreview from "@/components/hud/HeroCameraPreview";
import AICameraBox from "../hud/AICameraBox";

export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 px-4 sm:px-10 md:px-20 py-12 sm:py-16 relative overflow-hidden">

      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center">

        {/* Tags */}
        <div className="flex flex-wrap gap-2 sm:gap-3 mb-4 sm:mb-6">
          <span className="tag tag-cyan">AI Powered</span>
          <span className="tag tag-amber">Real-Time</span>
          <span className="tag tag-green">Gemini Live</span>
        </div>

        {/* Title */}
        <h1 className="font-[var(--font-display)] text-4xl sm:text-5xl md:text-7xl tracking-widest leading-tight sm:leading-snug md:leading-none">
          LIFE<span className="text-[var(--cyan)]">REPLAY</span>
        </h1>

        {/* Subtitle */}
        <p className="mt-4 sm:mt-6 text-[var(--text-secondary)] max-w-full sm:max-w-lg text-sm sm:text-lg">
          Your real-time interaction copilot. LifeReplay observes
          conversations through audio and vision to provide
          subtle coaching during interviews, presentations,
          and negotiations.
        </p>

        {/* Buttons */}
        <div className="mt-6 sm:mt-10 flex flex-col sm:flex-row gap-3 sm:gap-4">
          <button className="btn btn-primary w-full sm:w-auto">
            Start Live Session
          </button>

          <button className="btn btn-ghost w-full sm:w-auto">
            Open Coach Panel
          </button>
        </div>

        {/* System readiness */}
        <div className="mt-6 sm:mt-12 flex flex-col sm:flex-row gap-4 sm:gap-8 text-sm text-[var(--text-secondary)]">
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
      <div className="flex items-center justify-center mt-8 md:mt-0">

        <div className="glass-panel p-4 sm:p-6 w-full max-w-[420px]">

          {/* Camera Preview */}
          <div className="glass-panel p-4 sm:p-6 w-full h-[180px] sm:h-[280px]">
            <AICameraBox />
            <div className="mt-2 sm:mt-4 flex justify-between items-center text-sm">
              <span className="text-gray-400">AI Status</span>
              <span className="flex items-center gap-1 sm:gap-2 text-green-400">
                <span className="w-2 h-2 sm:w-2.5 sm:h-2.5 bg-green-400 rounded-full animate-pulse" />
                Active
              </span>
            </div>
          </div>

          {/* Modes */}
          <div className="grid grid-cols-3 gap-2 sm:gap-3 mt-4 sm:mt-6">
            <button className="mode-card">Interview</button>
            <button className="mode-card">Presentation</button>
            <button className="mode-card">Negotiation</button>
          </div>

        </div>

      </div>

    </section>
  );
}