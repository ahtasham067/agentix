"use client";

export default function GlobalError({ reset }: { error: Error; reset: () => void }) {
  return (
    <html lang="en">
      <body
        style={{
          margin: 0,
          background: "#1b1d21",
          color: "#f4f1ee",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <main style={{ maxWidth: 640, margin: "0 auto", padding: "120px 20px" }}>
          <h1 style={{ fontSize: 40, margin: 0 }}>Something went wrong.</h1>
          <p style={{ color: "rgb(244 241 238 / 0.68)", fontSize: 18 }}>
            Please reload the page. If the problem continues, try again later.
          </p>
          <button
            type="button"
            onClick={reset}
            style={{
              marginTop: 24,
              height: 52,
              padding: "0 29px",
              border: 0,
              borderRadius: 12,
              background: "#ff6b2c",
              color: "#1b1d21",
              fontWeight: 600,
              fontSize: 16,
              cursor: "pointer",
            }}
          >
            Try again
          </button>
        </main>
      </body>
    </html>
  );
}
