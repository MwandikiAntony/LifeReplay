import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "LifeReplay",
  description: "Real-Time AI Interaction Coach",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body style={{ fontFamily: "Arial, sans-serif" }}>
        {children}
      </body>
    </html>
  );
}