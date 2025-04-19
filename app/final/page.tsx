"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function FinalPage() {
  const searchParams = useSearchParams();
  const lang = searchParams.get("lang") || "English";
  const issue = searchParams.get("issue") || "fear";

  const [loading, setLoading] = useState(true);
  const [gospelMessage, setGospelMessage] = useState("");

  useEffect(() => {
    const fetchGospel = async () => {
      try {
        setLoading(true);
        const res = await fetch("/api/gospel", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ lang, issue }),
        });
        if (!res.ok) {
          throw new Error("Failed to fetch from /api/gospel");
        }
        const data = await res.json();
        setGospelMessage(data.content);
      } catch (error) {
        console.error(error);
        setGospelMessage("Sorry, an error occurred while fetching the gospel message.");
      } finally {
        setLoading(false);
      }
    };

    fetchGospel();
  }, [lang, issue]);

  return (
    <main style={{ padding: "2rem" }}>
      <h1>Final Message</h1>
      {loading ? (
        <p>Loading your personalized gospel message...</p>
      ) : (
        <div style={{ whiteSpace: "pre-line" }}>{gospelMessage}</div>
      )}
    </main>
  );
}
