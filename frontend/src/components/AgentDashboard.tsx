export default function AgentDashboard({
  state,
  speaking,
}: {
  state: string;
  speaking: boolean;
}) {
  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "16px",
        background: "#111",
        color: "white",
        marginTop: "20px",
        width: "500px",
      }}
    >
      <h3>Agent State: {state}</h3>
      <p>Speech Activity: {speaking ? "Speaking" : "Silent"}</p>
    </div>
  );
}