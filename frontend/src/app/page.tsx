import Hero from "@/components/layout/Hero";
import NavigationHUD from "@/components/hud/NavigationHUD";
import CoachPanel from "@/components/coach/CoachPanel";
import MiniCameraPreview from "@/components/hud/MiniCameraPreview";

export default function DashboardPage() {
  return (
    <div className="space-y-4">
      <Hero />
      <MiniCameraPreview />
      <NavigationHUD />
      <CoachPanel />
    </div>
  );
}
