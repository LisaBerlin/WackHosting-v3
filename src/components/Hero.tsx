import { ArrowRight, Zap } from 'lucide-react';

export default function Hero() {
  return (
    <section id="home" className="pt-32 pb-20 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto">
        <div className="max-w-4xl mx-auto text-center">
          <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full mb-8">
            <Zap size={16} className="text-blue-400" />
            <span className="text-sm text-blue-400 font-medium">Premium Performance Hosting</span>
          </div>

          <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
            Enterprise-Grade
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Gaming Servers
            </span>
          </h1>

          <p className="text-xl text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
            Experience unparalleled performance with our cutting-edge KVM infrastructure. Built for gamers, optimized for excellence.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <a
              href="#services"
              className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center space-x-2"
            >
              <span>Explore Services</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
            <a
              href="https://panel.gamestates.de"
              className="px-8 py-4 bg-[#f4435c] hover:bg-[#e63b53] text-white rounded-xl font-semibold transition-all duration-200 border border-[#e63b53]"
            >
              Client Login
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
