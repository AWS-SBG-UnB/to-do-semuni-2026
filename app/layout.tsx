import type { Metadata } from "next";
import { Press_Start_2P } from "next/font/google";
import "./globals.css";

// Força renderização dinâmica: assim as variáveis do .env são lidas a cada
// reinício do servidor (next start), sem precisar rebuildar o site.
export const dynamic = "force-dynamic";

const pixelFont = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-pixel",
});

const siteName = process.env.SITE_NAME || "To-Do List";
const siteDomain = process.env.SITE_DOMAIN || "localhost";
const ownerName = process.env.OWNER_NAME || "";

export function generateMetadata(): Metadata {
  return {
    title: siteName,
    description: `Lista de tarefas de ${ownerName || siteName}`,
  };
}

// Ícone estilo pixel-art (checklist) desenhado em uma grade 8x8.
const CHECK_PIXELS: [number, number][] = [
  [1, 4],
  [2, 5],
  [3, 6],
  [4, 5],
  [5, 4],
  [6, 3],
  [7, 2],
];

function PixelBadge() {
  return (
    <span className="badge" aria-hidden="true">
      <svg viewBox="0 0 8 8" width="20" height="20" shapeRendering="crispEdges">
        {CHECK_PIXELS.map(([x, y]) => (
          <rect key={`${x}-${y}`} x={x} y={y} width="1" height="1" fill="#0a1628" />
        ))}
      </svg>
    </span>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className={pixelFont.variable}>
      <body>
        <div className="pixel-strip" aria-hidden="true" />

        <header className="site-header">
          <div className="brand">
            <PixelBadge />
            <div>
              <h1>{siteName}</h1>
              {ownerName && <p className="owner">by {ownerName}</p>}
            </div>
          </div>
        </header>

        <main>{children}</main>

        <footer className="site-footer">
          <p>{siteDomain}</p>
        </footer>

        <div className="pixel-strip" aria-hidden="true" />
      </body>
    </html>
  );
}
