"use client";

import React from "react";
import Link from "next/link";

export default function MarqueeButton({
  children,
  href,
  className = "",
  onClick,
  type = "button",
}) {
  const content = (
    <>
      <span className="marquee-text-static absolute inset-0 grid place-items-center transition-opacity duration-200">
        {children}
      </span>
      <span
        aria-hidden
        className="marquee-text-animated absolute inset-0 grid place-items-center opacity-0 transition-opacity duration-200"
      >
        {children}
      </span>
    </>
  );

  const baseClasses =
    "marquee-btn relative overflow-hidden rounded-xl font-bold uppercase tracking-wider text-center cursor-pointer transition-colors flex items-center justify-center text-xs sm:text-sm " +
    className;

  if (href) {
    return (
      <Link href={href} className={baseClasses} onClick={onClick}>
        {/* Invisible placeholder to maintain width/height based on text */}
        <span className="invisible px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold">{children}</span>
        {content}
      </Link>
    );
  }

  return (
    <button type={type} className={baseClasses} onClick={onClick}>
      <span className="invisible px-4 py-2.5 sm:px-6 sm:py-3 text-xs sm:text-sm font-bold">{children}</span>
      {content}
    </button>
  );
}
