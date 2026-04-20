import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { memoryData } from "@/data/features";

export default function MemoryPage() {
  return (
    <FeatureWindow
      title="一刻记忆"
      subtitle="Memory Moments · 一刻记忆"
      headerIcon="fa-camera-retro"
      headerGradientClass="from-emerald-400 to-cyan-400"
      data={memoryData}
    />
  );
}
