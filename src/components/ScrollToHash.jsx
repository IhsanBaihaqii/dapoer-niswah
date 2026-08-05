import { useEffect } from "react";
import { useLocation } from "react-router-dom";

export default function ScrollToHash() {
  const { pathname, hash } = useLocation();

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0);
      return;
    }

    const id = hash.replace("#", "");

    const tryScroll = () => {
      const element = document.getElementById(id);
      if (element) {
        // Use a slight offset if there is a sticky navbar
        const yOffset = -80;
        const y =
          element.getBoundingClientRect().top + window.pageYOffset + yOffset;
        window.scrollTo({ top: y, behavior: "smooth" });
        return true;
      }
      return false;
    };

    if (!tryScroll()) {
      let attempts = 0;
      const interval = setInterval(() => {
        if (tryScroll() || attempts >= 10) {
          clearInterval(interval);
        }
        attempts++;
      }, 100);
    }
  }, [pathname, hash]);

  return null;
}
