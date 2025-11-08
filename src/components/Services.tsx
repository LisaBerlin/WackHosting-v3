import { Server, Cpu, Shield, Clock } from 'lucide-react';

const services = [
  {
    icon: Server,
    title: 'Game Server Hosting',
    description: 'High-performance game servers with instant deployment and full control panel access.',
    features: ['99.9% Uptime', 'DDoS Protection', 'Instant Setup']
  },
  {
    icon: Cpu,
    title: 'KVM Virtual Servers',
    description: 'Powerful KVM virtualization with dedicated resources and complete root access.',
    features: ['Full Root Access', 'Custom ISO Support', 'SSD Storage']
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Military-grade security with advanced DDoS protection and automated backups.',
    features: ['Daily Backups', 'Firewall Protection', '24/7 Monitoring']
  },
  {
    icon: Clock,
    title: '24/7 Support',
    description: 'Round-the-clock expert support to ensure your servers are always running smoothly.',
    features: ['Live Chat', 'Ticket System', 'Expert Team']
  }
];

export default function Services() {
  return (
    <section id="services" className="py-24 px-6 bg-slate-900">
      <div className="container mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Our Services
          </h2>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            Everything you need for professional game server hosting
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <div
              key={index}
              className="group bg-gradient-to-br from-slate-800 to-slate-900 p-8 rounded-2xl border border-slate-700 hover:border-blue-600/50 transition-all duration-300 hover:shadow-xl hover:shadow-blue-600/10"
            >
              <div className="w-14 h-14 bg-blue-600/10 rounded-xl flex items-center justify-center mb-6 group-hover:bg-blue-600/20 transition-colors duration-300">
                <service.icon className="text-blue-400" size={28} />
              </div>

              <h3 className="text-xl font-bold text-white mb-3">
                {service.title}
              </h3>

              <p className="text-slate-400 mb-6 leading-relaxed">
                {service.description}
              </p>

              <ul className="space-y-2">
                {service.features.map((feature, idx) => (
                  <li key={idx} className="text-sm text-slate-500 flex items-center">
                    <span className="w-1.5 h-1.5 bg-blue-400 rounded-full mr-2"></span>
                    {feature}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
