import { ImageResponse } from "next/og";

export const alt = "Danyal Tanveer — Full-Stack Developer and AI/ML Engineer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        position: "relative",
        overflow: "hidden",
        background: "#f7f7f2",
        color: "#111217",
        padding: "58px 64px",
        fontFamily: "Arial, Helvetica, sans-serif",
      }}
    >
      <div
        style={{
          position: "absolute",
          width: 430,
          height: 430,
          borderRadius: 999,
          right: -85,
          top: -120,
          background: "#ffdc00",
          display: "flex",
        }}
      />
      <div
        style={{
          position: "absolute",
          width: 310,
          height: 310,
          right: 90,
          bottom: -150,
          transform: "rotate(18deg)",
          background: "#0062ff",
          display: "flex",
        }}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          fontSize: 22,
          letterSpacing: "0.12em",
          fontWeight: 700,
          zIndex: 1,
        }}
      >
        <span>DANYAL TANVEER</span>
        <span>PORTFOLIO / 2026</span>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          maxWidth: 940,
          gap: 4,
          zIndex: 1,
        }}
      >
        <span style={{ fontSize: 86, lineHeight: 0.98, fontWeight: 900, letterSpacing: "-0.055em" }}>
          FULL-STACK DEVELOPER
        </span>
        <span style={{ fontSize: 86, lineHeight: 0.98, fontWeight: 900, letterSpacing: "-0.055em", color: "#0062ff" }}>
          &amp; AI/ML ENGINEER
        </span>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-end",
          borderTop: "3px solid #111217",
          paddingTop: 22,
          fontSize: 23,
          zIndex: 1,
        }}
      >
        <span>Ideas into working software.</span>
        <span style={{ fontWeight: 700 }}>LAHORE, PAKISTAN</span>
      </div>
    </div>,
    size,
  );
}
