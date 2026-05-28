import { useLocation, useNavigate } from "react-router-dom";

/**
 * Wraps page content with consistent background + dark mode
 * and renders the floating AI helper button on the bottom-right.
 */
function PageShell({ children, className = "" }) {
  const location = useLocation();
  const navigate = useNavigate();

  const hideFabPaths = [
    "/",
    "/login",
    "/signup",
    "/forgot-password",
    "/reset-password",
    "/ai-assistant",
    "/admin",
    "/contest"
  ];

  const showFab = !hideFabPaths.includes(location.pathname);

  return (
    <div
      className={`min-h-screen bg-[#faf7f2] dark:bg-[#14100d] text-[#3d2e24] dark:text-[#f0e6dc] transition-colors ${className}`}
    >
      {children}

      {showFab && (
        <button
          type="button"
          onClick={() => navigate("/ai-assistant")}
          className="fixed z-40 right-2 bottom-5 md:right-4 md:bottom-8 group"
          aria-label="Open AI assistant"
        >
          <div className="pointer-events-none mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <div className="bg-white dark:bg-[#2a211c] text-[#3d2e24] dark:text-[#f0e6dc] px-4 py-2 rounded-2xl shadow-lg border border-[#ead8c9]/60 dark:border-white/15 text-sm">
              I can help you.
            </div>
          </div>
          <div className="w-14 h-14 md:w-16 md:h-16 group-hover:w-16 group-hover:h-16 md:group-hover:w-20 md:group-hover:h-20 rounded-full bg-gradient-to-br from-[#8b5e3c] to-[#c49a6c] shadow-[0_10px_30px_rgba(0,0,0,0.25)] flex items-center justify-center border-2 border-white/70 dark:border-white/30 transition-all duration-200">
            <span className="text-white font-semibold tracking-wide">AI</span>
          </div>
        </button>
      )}
    </div>
  );
}

export default PageShell;
