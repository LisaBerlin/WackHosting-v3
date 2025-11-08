export default function Footer() {
  return (
    <footer className="bg-slate-950 py-12 px-6 border-t border-slate-800">
      <div className="container mx-auto">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <img
              src="https://i.imgur.com/EWs3Gsg.png"
              alt="GameStates Logo"
              className="h-10 w-auto mb-4"
            />
            <p className="text-slate-400 text-sm leading-relaxed">
              Premium hosting solutions for gamers worldwide.
            </p>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2">
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors text-sm">Game Servers</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors text-sm">KVM Hosting</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors text-sm">DDoS Protection</a></li>
              <li><a href="#services" className="text-slate-400 hover:text-white transition-colors text-sm">Backups</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Company</h4>
            <ul className="space-y-2">
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">About Us</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Contact</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Support</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Terms of Service</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Connect</h4>
            <ul className="space-y-2">
              <li><a href="https://panel.gamestates.de" className="text-slate-400 hover:text-white transition-colors text-sm">Client Panel</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Discord</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Twitter</a></li>
              <li><a href="#" className="text-slate-400 hover:text-white transition-colors text-sm">Status Page</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-slate-800 pt-8">
          <p className="text-center text-slate-500 text-sm">
            &copy; 2025 GameStates. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
