import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { revelationData } from "@/data/features";

export default function RevelationPage() {
  return (
    <FeatureWindow
      title="启示录导航"
      subtitle="Revelation · Insight Navigation"
      headerIcon="fa-lightbulb-o"
      headerGradientClass="from-indigo-500 to-violet-500"
      data={revelationData}
    />
  );
}
