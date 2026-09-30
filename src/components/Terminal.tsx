import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Terminal as TerminalIcon, CornerDownLeft, Sparkles, Trash2 } from 'lucide-react';
import { TERMINAL_COMMANDS, PERSONAL_INFO } from '../data/portfolioData';
import { soundFx } from '../utils/audio';

interface HistoryEntry {
  command: string;
  output: string | string[];
  isError?: boolean;
}

export const Terminal: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<HistoryEntry[]>([
    {
      command: 'welcome',
      output: [
        '🚀 Shridhar Hegde Interactive Shell v2.4 (React/Node/AI Architecture)',
        'Type "help" to view all available commands or click quick suggestions below.'
      ]
    }
  ]);
  const [commandHistory, setCommandHistory] = useState<string[]>([]);
  const [historyIdx, setHistoryIdx] = useState<number>(-1);
  const terminalEndRef = useRef<HTMLDivElement | null>(null);
  const terminalContainerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const quickCommands = ['help', 'projects', 'veriproof', 'skills', 'education', 'contact', 'clear'];

  useEffect(() => {
    if (terminalContainerRef.current) {
      terminalContainerRef.current.scrollTop = terminalContainerRef.current.scrollHeight;
    }
  }, [history]);

  const handleCommand = (cmdStr: string) => {
    const rawCmd = cmdStr.trim();
    if (!rawCmd) return;

    soundFx.playClick();
    const cleanCmd = rawCmd.toLowerCase();

    setCommandHistory((prev) => [...prev, rawCmd]);
    setHistoryIdx(-1);

    if (cleanCmd === 'clear') {
      setHistory([]);
      setInput('');
      return;
    }

    if (cleanCmd.startsWith('sudo') || cleanCmd.includes('hire')) {
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: [
            '⚡ [SUCCESS] Recruiter Fast-Track Granted!',
            `Connecting directly with ${PERSONAL_INFO.name}...`,
            `📧 Email: ${PERSONAL_INFO.email}`,
            `📱 Phone: ${PERSONAL_INFO.phone}`,
            'Status: Open for Full-Time & Internship opportunities (May 2027 Grad).'
          ]
        }
      ]);
      soundFx.playSuccess();
      setInput('');
      return;
    }

    const found = TERMINAL_COMMANDS[cleanCmd];
    if (found) {
      setHistory((prev) => [...prev, { command: rawCmd, output: found }]);
    } else {
      setHistory((prev) => [
        ...prev,
        {
          command: rawCmd,
          output: `Command not recognized: "${rawCmd}". Type "help" for list of commands.`,
          isError: true
        }
      ]);
    }
    setInput('');
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleCommand(input);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const nextIdx = historyIdx + 1 < commandHistory.length ? historyIdx + 1 : historyIdx;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIdx > 0) {
        const nextIdx = historyIdx - 1;
        setHistoryIdx(nextIdx);
        setInput(commandHistory[commandHistory.length - 1 - nextIdx]);
      } else if (historyIdx === 0) {
        setHistoryIdx(-1);
        setInput('');
      }
    }
  };

  return (
    <section id="terminal" className="py-24 px-4 relative">
      <div className="max-w-4xl mx-auto">
        {/* Section Header */}
        <div className="flex flex-col items-center text-center mb-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-cyan-500/10 border border-cyan-500/30 text-cyan-300 text-xs font-mono mb-3">
            <TerminalIcon className="w-3.5 h-3.5" />
            <span>DEVELOPER CLI CONSOLE</span>
          </div>
          <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
            Interactive System Shell
          </h2>
          <p className="text-slate-400 mt-2 max-w-lg text-sm md:text-base">
            Explore technical architecture, credentials, and project data via an in-browser retro-futuristic terminal.
          </p>
        </div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="rounded-2xl bg-[#090C12]/95 border border-cyan-500/30 shadow-[0_0_50px_rgba(0,240,255,0.12)] overflow-hidden font-mono text-sm backdrop-blur-xl"
        >
          {/* Top Window Bar */}
          <div className="px-4 py-3 bg-black/60 border-b border-white/10 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-red-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-yellow-500/80 inline-block" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80 inline-block" />
              <span className="ml-2 text-xs text-slate-400 font-mono hidden sm:inline">
                shridhar@sdm-it: ~/portfolio (zsh)
              </span>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => {
                  soundFx.playClick();
                  setHistory([]);
                }}
                title="Clear screen"
                className="p-1 rounded hover:bg-white/10 text-slate-400 hover:text-white transition-colors text-xs flex items-center gap-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">clear</span>
              </button>
            </div>
          </div>

          {/* Quick command pills */}
          <div className="px-4 py-2 bg-white/[0.02] border-b border-white/5 flex items-center gap-2 overflow-x-auto text-xs custom-scrollbar">
            <span className="text-slate-500 flex items-center gap-1 flex-shrink-0">
              <Sparkles className="w-3 h-3 text-cyan-400" /> Run:
            </span>
            {quickCommands.map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleCommand(cmd)}
                className="px-2.5 py-1 rounded-md bg-white/5 hover:bg-cyan-500/20 border border-white/10 hover:border-cyan-500/40 text-slate-300 hover:text-cyan-300 transition-all flex-shrink-0 text-xs"
              >
                {cmd}
              </button>
            ))}
          </div>

          {/* Terminal Body */}
          <div
            ref={terminalContainerRef}
            onClick={() => inputRef.current?.focus()}
            className="p-5 h-[340px] overflow-y-auto space-y-3 custom-scrollbar text-xs md:text-sm cursor-text"
          >
            {history.map((entry, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-cyan-400">
                  <span className="text-purple-400">guest@shridhar-sys</span>
                  <span className="text-slate-500">:</span>
                  <span className="text-emerald-400">~</span>
                  <span className="text-slate-400">$</span>
                  <span className="text-slate-100 font-semibold">{entry.command}</span>
                </div>
                <div
                  className={`pl-4 leading-relaxed ${
                    entry.isError ? 'text-red-400' : 'text-slate-300'
                  }`}
                >
                  {Array.isArray(entry.output) ? (
                    entry.output.map((line, lIdx) => (
                      <div key={lIdx} className="py-0.5 whitespace-pre-wrap">
                        {line}
                      </div>
                    ))
                  ) : (
                    <div className="whitespace-pre-wrap">{entry.output}</div>
                  )}
                </div>
              </div>
            ))}

            {/* Current Active Input Prompt */}
            <div className="flex items-center gap-2 text-cyan-400 pt-1">
              <span className="text-purple-400">guest@shridhar-sys</span>
              <span className="text-slate-500">:</span>
              <span className="text-emerald-400">~</span>
              <span className="text-slate-400">$</span>
              <div className="flex-1 flex items-center relative">
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command (e.g. 'help', 'projects', 'veriproof')..."
                  className="w-full bg-transparent text-slate-100 placeholder-slate-600 focus:outline-none font-mono text-xs md:text-sm"
                />
                <button
                  onClick={() => handleCommand(input)}
                  className="p-1 rounded text-cyan-400 hover:text-cyan-200"
                >
                  <CornerDownLeft className="w-4 h-4" />
                </button>
              </div>
            </div>

            <div ref={terminalEndRef} />
          </div>
        </motion.div>
      </div>
    </section>
  );
};
