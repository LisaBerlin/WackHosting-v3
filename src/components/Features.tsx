import { Gauge, HardDrive, Lock, Zap, Globe, HeadphonesIcon } from 'lucide-react';

const features = [
  {
    icon: Gauge,
    title: 'Lightning Fast',
    description: 'NVMe SSDs and high-performance CPUs for maximum speed'
  },
  {
    icon: HardDrive,
    title: 'Scalable Resources',
    description: 'Easily upgrade your server as your needs grow'
  },
  {
    icon: Lock,
    title: 'Secure Infrastructure',
    description: 'Enterprise-grade security with DDoS protection'
  },
  {
    icon: Zap,
    title: 'Instant Deployment',
    description: 'Get your server online in minutes, not hours'
  },
  {
    icon: Globe,
    title: 'Global Network',
    description: 'Multiple data center locations worldwide'
  },
  {
    icon: HeadphonesIcon,
    title: 'Expert Support',
    description: 'Dedicated support team available 24/7'
  }
];

export default function Features() {
  return (
    <section id="features" className="py-24 px-6 bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Why Choose GameStates
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Built with cutting-edge technology for superior performance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div
              key={index}
              className="group bg-slate-800/50 p-8 rounded-2xl border border-slate-700 hover:border-blue-600/50 transition-all duration-300 hover:bg-slate-800"
            >
              <div className="w-12 h-12 bg-blue-600/10 rounded-xl flex items-center justify-center mb-5 group-hover:bg-blue-600/20 transition-colors duration-300">
                <feature.icon className="text-blue-400" size={24} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {feature.title}
              </h3>

              <p className="text-slate-400 leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
