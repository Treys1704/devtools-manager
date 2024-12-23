import { useState } from "react";
import Terminal from "@/components/Terminal";
import { cn } from "@/lib/utils";
import { Toaster } from "sonner";

function App() {
  const [terminalOpen] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500">
      <div className="container mx-auto px-6 py-12">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-4">
            DevTools Manager
          </h1>
          <p className="text-2xl text-white/80">
            Create a boilerplate of your project easily
          </p>
        </div>

        <div
          className={cn(
            "w-full max-w-4xl mx-auto bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl",
            "border border-white/10 transition-all duration-500",
            terminalOpen ? "h-[600px]" : "h-0"
          )}
        >
          <Terminal />
        </div>

        <footer className="flex items-center justify-between text-sm text-white max-w-4xl mx-auto mt-8 mb-4">
          <p>
            © {new Date().getFullYear()} Devtools Manager. All rights reserved.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/Treys1704/devtools-manager"
              target="_blank"
              className="hover:text-slate-100 transition-colors"
            >
              <span className="sr-only">GitHub</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/tr%C3%A9sormanock/"
              target="_blank"
              className="hover:text-slate-100 transition-colors"
            >
              <span className="sr-only">LinkedIn</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
            <a
              href="https://x.com/Treysman17"
              target="_blank"
              className="hover:text-slate-100 transition-colors"
            >
              <span className="sr-only">Twitter</span>
              <svg
                viewBox="0 0 24 24" className="h-5 w-5" fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill="currentColor"
                  d="M18.901 1.153h3.68l-8.04 9.19L24 22.846h-7.406l-5.8-7.584-6.638 7.584H.474l8.6-9.83L0 1.154h7.594l5.243 6.932ZM17.61 20.644h2.039L6.486 3.24H4.298Z"
                />
              </svg>
            </a>
            <a
              href="mailto:jacquesmanock17@gmail.com"
              className="hover:text-slate-100 transition-colors"
            >
              <span className="sr-only">Email</span>
              <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
              </svg>
            </a>
          </div>
        </footer>
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;
