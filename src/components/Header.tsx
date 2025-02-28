import React from 'react';
import { Code, Moon, Sun, RefreshCw } from 'lucide-react';
import { HeaderProps } from '../types';

const Header: React.FC<HeaderProps> = ({ onClearChat }) => {
  const [darkMode, setDarkMode] = React.useState<boolean>(
    window.matchMedia('(prefers-color-scheme: dark)').matches
  );

  React.useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [darkMode]);

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <header className="sticky top-0 z-10 bg-white dark:bg-gray-900 border-b border-gray-200 dark:border-gray-700 py-3 px-4 md:px-6 flex justify-between items-center backdrop-blur-md bg-opacity-90 dark:bg-opacity-90">
      <div className="flex items-center gap-2 font-bold text-indigo-600 dark:text-indigo-400">
        <Code size={28} className="text-indigo-600 dark:text-indigo-400" />
        <span className="text-xl hidden md:inline">LeetCode Assistant</span>
        <span className="text-xl md:hidden">LC Assist</span>
      </div>
      
      <div className="flex items-center gap-3">
        <button
          onClick={onClearChat}
          className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title="New conversation"
        >
          <RefreshCw size={20} />
        </button>
        
        <button
          onClick={toggleDarkMode}
          className="p-2 rounded-full text-gray-500 hover:text-indigo-600 dark:text-gray-400 dark:hover:text-indigo-400 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          title={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          {darkMode ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;