import { ImageResponse } from "next/og";

export const alt = "DT Trucks — Authorised Isuzu Dealer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "64px",
          background: "linear-gradient(135deg, #191c1d 0%, #2e3132 50%, #c8102e 100%)",
          color: "white",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            fontWeight: 600,
            letterSpacing: "0.08em",
            textTransform: "uppercase",
            opacity: 0.9,
          }}
        >
          Authorised Isuzu Dealer
        </div>
        <div
          style={{
            fontSize: 72,
            fontWeight: 800,
            lineHeight: 1.1,
            marginTop: 16,
            maxWidth: 900,
          }}
        >
          DT Trucks
        </div>
        <div
          style={{
            fontSize: 28,
            marginTop: 24,
            opacity: 0.85,
            maxWidth: 800,
          }}
        >
          Truck sales, service & parts in Barking, Essex
        </div>
      </div>
    ),
    { ...size }
  );
}
