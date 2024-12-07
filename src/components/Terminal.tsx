import { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useTerminalCommands } from '@/hooks/useTerminalCommands';
import { LoadingSpinner } from './LoadingSpinner';
import { getInstallationSteps } from '@/lib/installation-steps';

interface TerminalLine {
  type: 'input' | 'output' | 'error';
  content: string;
}

export default function Terminal() {
  const [lines, setLines] = useState<TerminalLine[]>([]);
  const [currentInput, setCurrentInput] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const { 
    handleCommand, 
    currentState, 
    currentStep,
    selectedFramework,
    cssLibrary
  } = useTerminalCommands();

  useEffect(() => {
    setLines([
      { type: 'output', content: '🚀 Welcome to DevTools Manager v1.0.0 · Powered By Tresor Manock' },
      { type: 'output', content: '----------------------------------------' },
      { type: 'output', content: 'Type "npm start devtools" to begin' },
    ]);
  }, []);

  const scrollToBottom = () => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines]);

  const handleInputSubmit = async () => {
    const trimmedInput = currentInput.trim();
    if (!trimmedInput) return;

    setLines(prev => [...prev, { type: 'input', content: `> ${trimmedInput}` }]);
    setCurrentInput('');

    const response = await handleCommand(trimmedInput);
    setLines(prev => [...prev, { type: 'output', content: response }]);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleInputSubmit();
    }
  };

  const installationSteps = selectedFramework 
    ? getInstallationSteps(selectedFramework, cssLibrary)
    : [];

  return (
    <div className="h-full flex flex-col">
      <div className="flex items-center gap-2 px-4 py-2 bg-gray-900 rounded-t-lg border-b border-gray-800">
        <TerminalIcon className="w-4 h-4 text-gray-400" />
        <span className="text-sm text-gray-400">DevTools Manager Terminal</span>
      </div>
      
      <div 
        ref={terminalRef}
        className="flex-1 overflow-auto p-4 font-mono text-sm text-gray-300 bg-black/90"
      >
        {lines.map((line, index) => (
          <div
            key={index}
            className={cn(
              "py-1",
              line.type === 'error' && "text-red-400",
              line.type === 'input' && "text-cyan-400"
            )}
          >
            {line.content}
          </div>
        ))}
        
        {currentState === 'installing' && installationSteps[currentStep] && (
          <div className="py-2">
            <LoadingSpinner message={installationSteps[currentStep].message} />
          </div>
        )}
        
        {currentState !== 'installing' && (
          <div className="flex items-center gap-2 py-1">
            <span className="text-green-400">$</span>
            <input
              type="text"
              value={currentInput}
              onChange={(e) => setCurrentInput(e.target.value)}
              onKeyPress={handleKeyPress}
              className="flex-1 bg-transparent outline-none border-none text-gray-300"
              autoFocus
            />
          </div>
        )}
      </div>
    </div>
  );
}