import { useState } from 'react';
import DashboardLayout from '../components/dashboard/DashboardLayout';
import Overview from '../components/dashboard/Overview';
import Services from '../components/dashboard/Services';
import ApiKey from '../components/dashboard/ApiKey';
import Activity from '../components/dashboard/Activity';
import Settings from '../components/dashboard/Settings';

export default function Dashboard() {
  const [currentPage, setCurrentPage] = useState('overview');

  const renderPage = () => {
    switch (currentPage) {
      case 'overview':
        return <Overview />;
      case 'services':
        return <Services />;
      case 'api':
        return <ApiKey />;
      case 'activity':
        return <Activity />;
      case 'settings':
        return <Settings />;
      default:
        return <Overview />;
    }
  };

  return (
    <DashboardLayout currentPage={currentPage} onNavigate={setCurrentPage}>
      {renderPage()}
    </DashboardLayout>
  );
}
