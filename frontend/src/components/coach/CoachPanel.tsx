import FeedbackOverlay from "./FeedbackOverlay";
import MetricsDashboard from "./MetricsDashboard";

export default function CoachPanel() {
  return (
    <div className="flex flex-col md:flex-row gap-4 mt-4">
      <FeedbackOverlay />
      <MetricsDashboard />
    </div>
  );
}