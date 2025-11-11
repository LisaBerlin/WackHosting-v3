import { useState, useEffect } from 'react';
import { useAuth } from './contexts/AuthContext';
import LandingPage from './pages/LandingPage';
import AuthPage from './pages/AuthPage';
import Dashboard from './pages/Dashboard';
import { Loader } from 'lucide-react';

export default function AppRouter() {
  const { session, loading } = useAuth();
  const [currentRoute, setCurrentRoute] = useState(window.location.pathname);

  useEffect(() => {
    const handleRouteChange = () => {
      setCurrentRoute(window.location.pathname);
    };

    window.addEventListener('popstate', handleRouteChange);
    return () => window.removeEventListener('popstate', handleRouteChange);
  }, []);

  useEffect(() => {
    if (session && (currentRoute === '/auth' || currentRoute === '/login' || currentRoute === '/register')) {
      navigate('/dashboard');
    } else if (!session && currentRoute === '/dashboard') {
      navigate('/auth');
    }
  }, [session, currentRoute]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center">
        <Loader className="animate-spin text-blue-400" size={48} />
      </div>
    );
  }

  if (currentRoute === '/auth' || currentRoute === '/login' || currentRoute === '/register') {
    return <AuthPage />;
  }

  if (currentRoute === '/dashboard') {
    if (!session) {
      navigate('/auth');
      return null;
    }
    return <Dashboard />;
  }

  return <LandingPage />;
}

export function navigate(path: string) {
  window.history.pushState({}, '', path);
  window.dispatchEvent(new PopStateEvent('popstate'));
}
