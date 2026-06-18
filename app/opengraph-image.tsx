import { ImageResponse } from "next/og";

export const alt = "Payfool: Track every subscription, kill the waste";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          backgroundColor: "#0B0D13",
          backgroundImage:
            "radial-gradient(1000px 500px at 0% 0%, rgba(99,102,241,0.35), transparent 60%), radial-gradient(900px 500px at 100% 100%, rgba(34,211,238,0.30), transparent 55%)",
          color: "white",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "28px" }}>
          <div
            style={{
              width: "132px",
              height: "132px",
              borderRadius: "34px",
              background: "linear-gradient(135deg, #6366F1, #22D3EE)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "84px",
              fontWeight: 800,
              color: "white",
              boxShadow: "0 20px 60px rgba(99,102,241,0.5)",
            }}
          >
            P
          </div>
          <div style={{ fontSize: "92px", fontWeight: 800, letterSpacing: "-3px" }}>
            Payfool
          </div>
        </div>

        <div
          style={{
            marginTop: "44px",
            fontSize: "46px",
            fontWeight: 600,
            maxWidth: "900px",
            lineHeight: 1.2,
          }}
        >
          Track every subscription. Kill the waste.
        </div>

        <div
          style={{
            marginTop: "24px",
            fontSize: "30px",
            color: "rgba(226,232,240,0.75)",
          }}
        >
          Renewals, spend analytics, and AI cancellation insights.
        </div>
      </div>
    ),
    { ...size }
  );
}
