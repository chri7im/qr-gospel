"use client";

import { useState } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import { LANGUAGES } from "../../lib/translations";

export default function OtherConcernPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const lang = (searchParams.get("lang") || "English") as (typeof LANGUAGES)[number];

  const [customConcern, setCustomConcern] = useState("");

  const handleSubmit = () => {
    if (!customConcern.trim()) return;
    router.push(
      `/final?lang=${encodeURIComponent(lang)}&issue=${encodeURIComponent(customConcern)}`
    );
  };

  return (
    <main style={{ padding: "2rem", position: "relative", height: "100vh" }}>
      <h1>Please describe what bothers you most in life:</h1>
      <textarea
        rows={4}
        value={customConcern}
        onChange={(e) => setCustomConcern(e.target.value)}
        style={{ width: "100%", marginTop: "1rem" }}
      />

      <button
        onClick={handleSubmit}
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
