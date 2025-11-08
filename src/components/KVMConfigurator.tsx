import { Settings } from 'lucide-react';

export default function KVMConfigurator() {
  return (
    <section className="py-24 px-6 bg-gradient-to-br from-slate-800 via-slate-900 to-slate-800">
      <div className="container mx-auto">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gradient-to-br from-slate-800 to-slate-900 rounded-3xl p-12 border border-slate-700 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-12">
              <div className="flex-shrink-0">
                <div className="w-32 h-32 bg-gradient-to-br from-blue-600/20 to-cyan-600/20 rounded-2xl flex items-center justify-center border border-blue-600/30">
                  <img
                    src="https://i.imgur.com/CjERnct.png"
                    alt="KVM Configurator"
                    className="w-20 h-20"
                  />
                </div>
              </div>

              <div className="flex-1 text-center md:text-left">
                <div className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-600/10 border border-blue-600/20 rounded-full mb-4">
                  <Settings size={16} className="text-blue-400" />
                  <span className="text-sm text-blue-400 font-medium">Custom Configuration</span>
                </div>

                <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                  KVM Server Configurator
                </h2>

                <p className="text-lg text-slate-400 mb-8 leading-relaxed">
                  Build your perfect server with our intuitive KVM configurator. Choose your CPU, RAM, storage, and more to create a custom solution tailored to your exact needs.
                </p>

                <button className="group px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white rounded-xl font-semibold transition-all duration-200 shadow-xl shadow-blue-600/30 hover:shadow-blue-600/50 flex items-center space-x-2 mx-auto md:mx-0">
                  <span>Launch Configurator</span>
                  <Settings size={20} className="group-hover:rotate-90 transition-transform duration-300" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
