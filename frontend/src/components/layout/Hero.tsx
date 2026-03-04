export default function Hero() {
  return (
    <section className="min-h-[calc(100vh-64px)] grid grid-cols-2 relative overflow-hidden">
      <div className="p-20 flex flex-col justify-center">
        <div className="flex gap-2 mb-6">
          <span className="tag tag-cyan">AI-Powered</span>
          <span className="tag tag-amber">Real-Time</span>
          <span className="tag tag-green">Gemini Live</span>
        </div>

        <h1 className="font-[var(--font-display)] text-7xl tracking-widest leading-none">
          LIFE<span className="text-[var(--cyan)]">REPLAY</span>
        </h1>

        <p className="mt-6 text-[var(--text-secondary)] max-w-md">
          AI that sees, hears, and improves you in the moment.
          Live coaching for interviews, presentations, and negotiations.
        </p>

        <div className="mt-10 flex gap-4">
          <button className="btn btn-primary">Start Live Session</button>
          <button className="btn btn-ghost">Launch Coach</button>
        </div>
      </div>

      <div className="flex items-center justify-center">
        {/* Mode selector cards go here */}
      </div>
    </section>
  );
}