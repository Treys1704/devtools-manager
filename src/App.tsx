import { useState } from 'react';
import Terminal from '@/components/Terminal';
import { cn } from '@/lib/utils';
import { Toaster } from 'sonner';

function App() {
  const [terminalOpen,] = useState(true);

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center p-6">
      <div
        className={cn(
          "w-full max-w-4xl bg-black/80 backdrop-blur-sm rounded-lg shadow-2xl",
          "border border-white/10 transition-all duration-500",
          terminalOpen ? "h-[600px]" : "h-0"
        )}
      >
        <Terminal />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
}

export default App;