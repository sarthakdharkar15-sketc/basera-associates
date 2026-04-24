import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname, hash } = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    // If there is a hash (e.g., #contact, #footer, #projects), handle smooth scroll to that element
    if (hash) {
      const id = hash.replace("#", "");
      const element = document.getElementById(id);
      
      if (element) {
        // Small delay to ensure the page has rendered
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth", block: "start" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      // For any route change without a hash, always start from the very top
      // We use smooth behavior for a premium luxury feel
      window.scrollTo({
        top: 0,
        left: 0,
        behavior: "smooth",
      });
    }
  }, [pathname, hash]);

  // Global listener for link clicks to handle "Same Page" clicks and ensure they scroll to top
  useEffect(() => {
    const handleGlobalClick = (e) => {
      const link = e.target.closest("a");
      if (!link) return;

      const url = new URL(link.href, window.location.origin);
      const isInternal = url.origin === window.location.origin;
      const isSamePath = url.pathname === window.location.pathname;
      const hasNoHash = !url.hash;

      // If clicking a link to the same page with no hash, force scroll to top
      if (isInternal && isSamePath && hasNoHash) {
        window.scrollTo({ top: 0, behavior: "smooth" });
      }
    };

    window.addEventListener("click", handleGlobalClick);
    return () => window.removeEventListener("click", handleGlobalClick);
  }, []);

  return null;
};

export default ScrollToTop;
