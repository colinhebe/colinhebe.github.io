import { useEffect } from "react";

export function useDisableScroll(active: boolean = true) {
  useEffect(() => {
    if (!active) return;
    const original = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const blocker = document.createElement("div");
    blocker.id = "scroll-blocker";
    blocker.style.cssText = `
      position: fixed;
      top: 0; left: 0; right: 0; bottom: 0;
      z-index: 9999;
      background: transparent;
      pointer-events: none; 
      touch-action: none;   
    `;
    document.body.appendChild(blocker);

    return () => {
      document.body.style.overflow = original;
      blocker.remove();
    };
  }, [active]);
}