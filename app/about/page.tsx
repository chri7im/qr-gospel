"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { t, LANGUAGES } from "../lib/translations";

export default function AboutPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = (searchParams.get("lang") || "English") as (typeof LANGUAGES)[number];

  const handleNext = () => {
    router.push(`/questionnaire?lang=${encodeURIComponent(lang)}`);
  };

  return (
    <main style={{ padding: "2rem" }}>
      <h1>{t("about", lang)}</h1>
      <button
        onClick={handleNext}
        style={{
          marginTop: "2rem",
          padding: "1rem",
          fontSize: "1rem",
          cursor: "pointer",
        }}
      >
        {t("getItNow", lang)}
      </button>
    </main>
  );
}
