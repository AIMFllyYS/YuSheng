import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { notesData } from "@/data/features";

export default function NotesPage() {
  return (
    <FeatureWindow
      title="个人笔记库"
      subtitle="Personal Knowledge Base"
      headerIcon="fa-book"
      headerGradientClass="from-purple-500 to-pink-500"
      data={notesData}
    />
  );
}
