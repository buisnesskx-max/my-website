import { useEffect } from "react";

declare global {
  interface Window {
    adsbygoogle: unknown[];
  }
}

export function AdSense() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (error) {
      console.error("AdSense error:", error);
    }
  }, []);

  return (
    <div className="mx-auto w-full max-w-6xl px-5 py-10">
      <ins
        className="adsbygoogle"
        style={{ display: "block" }}
        data-ad-client="ca-pub-4048924278850673"
        data-ad-slot="5668806750"
        data-ad-format="auto"
        data-full-width-responsive="true"
      />
    </div>
  );
}
