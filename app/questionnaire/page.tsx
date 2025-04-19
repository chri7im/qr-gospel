"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { t, LANGUAGES, translateConcern } from "../lib/translations";

export default function QuestionnairePage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = (searchParams.get("lang") || "English") as (typeof LANGUAGES)[number];

  const [concernKey, setConcernKey] = useState<string>("fear");

  const handleNext = () => {
    if (concernKey === "other") {
      router.push(`/questionnaire/other?lang=${encodeURIComponent(lang)}`);
    } else {
      router.push(
        `/final?lang=${encodeURIComponent(lang)}&issue=${encodeURIComponent(concernKey)}`
      );
    }
  };

  return (
    <main style={{ padding: "2rem", position: "relative", height: "100vh" }}>
      <h1>{t("questionTitle", lang)}</h1>

      <div style={{ marginTop: "1rem" }}>
        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <input
            type="radio"
            name="concern"
            value="fear"
            checked={concernKey === "fear"}
            onChange={() => setConcernKey("fear")}
          />
          {translateConcern("fear", lang)}
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <input
            type="radio"
            name="concern"
            value="depression"
            checked={concernKey === "depression"}
            onChange={() => setConcernKey("depression")}
          />
          {translateConcern("depression", lang)}
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <input
            type="radio"
            name="concern"
            value="loneliness"
            checked={concernKey === "loneliness"}
            onChange={() => setConcernKey("loneliness")}
          />
          {translateConcern("loneliness", lang)}
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <input
            type="radio"
            name="concern"
            value="lack-of-purpose"
            checked={concernKey === "lack-of-purpose"}
            onChange={() => setConcernKey("lack-of-purpose")}
          />
          {translateConcern("lackOfPurpose", lang)}
        </label>

        <label style={{ display: "block", marginBottom: "0.5rem" }}>
          <input
            type="radio"
            name="concern"
            value="other"
            checked={concernKey === "other"}
            onChange={() => setConcernKey("other")}
          />
          {translateConcern("other", lang)}
        </label>
      </div>

      <button
        onClick={handleNext}
        style={{
          width: "3rem",
          height: "3rem",
          borderRadius: "50%",
          backgroundColor: "#0070f3",
          color: "#fff",
          fontSize: "1.5rem",
          border: "none",
          position: "absolute",
          bottom: "2rem",
          right: "2rem",
          cursor: "pointer",
        }}
      >
        ➜
      </button>
    </main>
  );
}
