import type { Category } from "@/data/people";

interface CardData { category: Category; name: string; score: number; }

export function drawShareCard(data: CardData): string | null {
  if (typeof document === "undefined") return null;
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1350;
  const ctx = canvas.getContext("2d");
  if (!ctx) return null;
  ctx.fillStyle = "#0B0B0D";
  ctx.fillRect(0, 0, 1080, 1350);
  const glow = ctx.createRadialGradient(540, 150, 0, 540, 150, 900);
  glow.addColorStop(0, "rgba(214,183,124,0.18)");
  glow.addColorStop(1, "rgba(11,11,13,0)");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, 1080, 1350);
  ctx.strokeStyle = "rgba(255,255,255,0.14)";
  ctx.lineWidth = 2;
  ctx.strokeRect(50, 50, 980, 1250);
  ctx.textAlign = "center";
  ctx.fillStyle = "#D6B77C";
  ctx.font = "500 30px 'DM Sans', sans-serif";
  ctx.letterSpacing = "10px";
  ctx.fillText("MY STACY & CHAD", 540, 180);
  ctx.fillStyle = "rgba(255,255,255,0.55)";
  ctx.font = "500 28px 'DM Sans', sans-serif";
  ctx.letterSpacing = "9px";
  ctx.fillText(`MY ${data.category.toUpperCase()}`, 540, 430);
  ctx.fillStyle = "#FAF8F4";
  ctx.font = "400 92px 'Instrument Serif', Georgia, serif";
  ctx.letterSpacing = "0px";
  ctx.fillText(data.name, 540, 590);
  ctx.fillStyle = "#D6B77C";
  ctx.font = "500 44px 'DM Sans', sans-serif";
  ctx.letterSpacing = "7px";
  ctx.fillText(`${data.score}% MATCH`, 540, 700);
  ctx.fillStyle = "rgba(255,255,255,0.45)";
  ctx.font = "500 24px 'DM Sans', sans-serif";
  ctx.letterSpacing = "8px";
  ctx.fillText("MYSTACYANDCHAD", 540, 1210);
  return canvas.toDataURL("image/png");
}
