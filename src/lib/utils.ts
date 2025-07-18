import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const toggleFont = () => {
  const systemFonts = import.meta.env.VITE_SYSTEM_FONTS;
  const handwriting = import.meta.env.VITE_HANDWRITING_FONTS;

  const root = document.documentElement;
  const currentFont = getComputedStyle(root).fontFamily;
  if (
    currentFont &&
    handwriting
      .split(",")
      .some((font: string) => currentFont.includes(font.trim()))
  ) {
    root.style.fontFamily = systemFonts;
    localStorage.setItem("font-family", systemFonts);
  } else {
    const fontFamily = handwriting + ", " + systemFonts;
    root.style.fontFamily = fontFamily;
    localStorage.setItem("font-family", fontFamily);
  }
};
