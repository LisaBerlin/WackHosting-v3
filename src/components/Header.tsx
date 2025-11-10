import { Menu, X } from 'lucide-react';
import { useState } from 'react';

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-slate-900/95 backdrop-blur-sm border-b border-slate-800">
      <nav className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <a href="https://gamestates.de" aria-label="Go to GameStates homepage">
              <img
                src="https://i.imgur.com/EWs3Gsg.png"
                alt="GameStates Logo"
                className="h-10 w-auto"
              />
            </a>
          </div>

          <div className="hidden md:flex items-center space-x-8">
            <a href="#home" className="text-slate-300 hover:text-white transition-colors duration-200">
              Home
            </a>
            <a href="#services" className="text-slate-300 hover:text-white transition-colors duration-200">
              Services
            </a>
            <a href="#features" className="text-slate-300 hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="text-slate-300 hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="#api" className="text-slate-300 hover:text-white transition-colors duration-200">
              API
            </a>
            <a
              href="https://panel.gamestates.de"
              className="px-6 py-2.5 bg-[#f4435c] hover:bg-[#e63b53] text-white rounded-lg font-medium transition-all duration-200 shadow-lg shadow-[rgba(244,67,92,0.3)] hover:shadow-[rgba(244,67,92,0.5)]"
            >
              Login
            </a>
          </div>

          <button
            className="md:hidden text-slate-300 hover:text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <div className="md:hidden mt-4 pb-4 space-y-3">
            <a href="#home" className="block text-slate-300 hover:text-white transition-colors duration-200">
              Home
            </a>
            <a href="#services" className="block text-slate-300 hover:text-white transition-colors duration-200">
              Services
            </a>
            <a href="#features" className="block text-slate-300 hover:text-white transition-colors duration-200">
              Features
            </a>
            <a href="#pricing" className="block text-slate-300 hover:text-white transition-colors duration-200">
              Pricing
            </a>
            <a href="#api" className="block text-slate-300 hover:text-white transition-colors duration-200">
              API
            </a>
            <a
              href="https://panel.gamestates.de"
              className="block w-full px-6 py-2.5 bg-[#f4435c] hover:bg-[#e63b53] text-white rounded-lg font-medium transition-all duration-200 text-center"
            >
              Login
            </a>
          </div>
        )}
      </nav>
    </header>
  );
}
