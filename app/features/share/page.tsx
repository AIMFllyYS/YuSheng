import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { shareData } from "@/data/features";

export default function SharePage() {
  return (
    <FeatureWindow
      title="开源共享"
      subtitle="Open Source & Sharing"
      headerIcon="fa-github"
      headerGradientClass="from-sky-500 to-emerald-400"
      data={shareData}
    />
  );
}
