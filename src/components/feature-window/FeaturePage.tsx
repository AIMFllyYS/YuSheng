"use client";

import { useRouter } from "next/navigation";
import { FeatureWindow } from "@/components/feature-window/FeatureWindow";
import { FEATURE_PAGE_CONFIG } from "@/data/featurePages";

type FeatureSlug = keyof typeof FEATURE_PAGE_CONFIG;

export function FeaturePage({ slug }: { slug: FeatureSlug }) {
  const router = useRouter();
  const config = FEATURE_PAGE_CONFIG[slug];

  return (
    <FeatureWindow
      slug={slug}
      {...config}
      onClose={() => router.push("/")}
      openFeature={(s) => router.push(`/features/${s}`)}
    />
  );
}
