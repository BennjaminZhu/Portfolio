import { ImageResponse } from "next/og";

export const alt = "Benjamin Zhu — Data & Business Analytics";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          backgroundColor: "#eff1ed",
          color: "#1b2a2e",
        }}
      >
        <div
          style={{
            display: "flex",
            fontSize: 24,
            letterSpacing: 6,
            textTransform: "uppercase",
            color: "#9c3f35",
            marginBottom: 28,
          }}
        >
          Data &amp; Business Analytics
        </div>
        <div style={{ display: "flex", fontSize: 92, fontWeight: 700, lineHeight: 1.05 }}>
          Benjamin Zhu
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 30,
            marginTop: 32,
            color: "#56645f",
            maxWidth: 860,
            lineHeight: 1.4,
          }}
        >
          Validated data pipelines, causal inference, and machine learning —
          built for decisions a business can act on.
        </div>
      </div>
    ),
    { ...size }
  );
}
