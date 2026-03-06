export default function AgentDashboard({
  state,
  speaking,
}: {
  state: string;
  speaking: boolean;
}) {
  return (
    <div className="
      w-full
      max-w-xl
      mx-auto
      mt-4
      md:mt-6
      p-4 md:p-6
      rounded-xl
      bg-[#111]
      text-white
      border border-gray-800
      shadow-lg
    ">
      
      <h3 className="text-lg md:text-xl font-semibold mb-2">
        Agent State: <span className="text-cyan-400">{state}</span>
      </h3>

      <p className="text-sm md:text-base text-gray-300">
        Speech Activity:{" "}
        <span className={speaking ? "text-green-400" : "text-gray-400"}>
          {speaking ? "Speaking" : "Silent"}
        </span>
      </p>

    </div>
  );
}