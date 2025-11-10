import Header from './components/Header';
import Hero from './components/Hero';
import Services from './components/Services';
import KVMConfigurator from './components/KVMConfigurator';
import Features from './components/Features';
import Pricing from './components/Pricing';
import ApiDocumentation from './components/ApiDocumentation';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      <Hero />
      <Services />
      <KVMConfigurator />
      <Features />
      <Pricing />
      <ApiDocumentation />
      <Footer />
    </div>
  );
}

export default App;
