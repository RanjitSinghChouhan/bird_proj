import { createRef, useEffect } from "react";

export const useClickOutside = (handler, ref = null) => {
    const domRef = ref || createRef(null);
  
    useEffect(() => {
      const localHandler = (e) => {
        if (!domRef.current) return;
        if (!domRef.current.contains(e.target)) handler();
      };
      document.addEventListener("mousedown", localHandler);
      return () => document.removeEventListener("mousedown", localHandler);
    }, [domRef, handler]);
  
    return domRef;
  };