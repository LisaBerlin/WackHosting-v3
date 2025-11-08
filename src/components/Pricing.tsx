import { ArrowRight, Zap, Shield, Clock } from 'lucide-react';

export default function Pricing() {
  return (
    <section id="pricing" className="py-24 px-6 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
      <div className="container mx-auto max-w-5xl">
        <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 md:p-16 border border-slate-700 shadow-2xl">
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Our Game Servers
            </h2>

            <p className="text-lg md:text-xl text-slate-400 mb-8 leading-relaxed max-w-3xl mx-auto">
              GameStates provides enterprise-grade game server hosting with unmatched reliability and performance. Our infrastructure is built on cutting-edge KVM virtualization technology, delivering lightning-fast response times and seamless gameplay experiences for thousands of concurrent players worldwide.
            </p>

            <div className="grid md:grid-cols-3 gap-6 mb-12 py-8 border-y border-slate-700">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-3">
                  <Zap className="text-blue-400" size={24} />
                </div>
                <p className="text-white font-semibold mb-1">Ultra-Fast</p>
                <p className="text-sm text-slate-400">NVMe SSDs & optimized infrastructure</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-3">
                  <Shield className="text-blue-400" size={24} />
                </div>
                <p className="text-white font-semibold mb-1">Secure</p>
                <p className="text-sm text-slate-400">Advanced DDoS protection included</p>
              </div>

              <div className="flex flex-col items-center">
                <div className="w-12 h-12 bg-blue-600/20 rounded-xl flex items-center justify-center mb-3">
                  <Clock className="text-blue-400" size={24} />
                </div>
                <p className="text-white font-semibold mb-1">Reliable</p>
                <p className="text-sm text-slate-400">99.9% uptime guarantee always</p>
              </div>
            </div>

            <p className="text-slate-300 mb-10 leading-relaxed">
              Choose from our extensive range of pre-configured game servers or build your custom KVM setup. With our intuitive control panel, you have full control over your resources. Scale up or down instantly as your community grows, and enjoy competitive pricing without compromising on quality.
            </p>

            <a
              href="https://panel.gamestates.de/orderproduct"
              className="inline-flex items-center space-x-2 group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-2xl shadow-blue-600/30 hover:shadow-blue-600/50"
            >
              <span>Order Your Server Now</span>
              <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform duration-200" />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
