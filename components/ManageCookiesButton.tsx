"use client";

import { requestOpenBanner } from "@/lib/cookieConsent";

export default function ManageCookiesButton() {
  return (
    <button
      type="button"
      onClick={requestOpenBanner}
      className="text-[11px] text-zinc-400 hover:text-white transition-colors underline cursor-pointer bg-transparent border-0 p-0 font-sans"
      title="Gerenciar preferências de cookies"
      aria-label="Gerenciar preferências de cookies"
    >
      Gerenciar cookies
    </button>
  );
}
