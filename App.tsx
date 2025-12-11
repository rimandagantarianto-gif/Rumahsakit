import React, { useState } from 'react';
import { HashRouter } from 'react-router-dom';
import Layout from './components/Layout';
import Dashboard from './components/Dashboard';
import ClinicalAssistant from './components/ClinicalAssistant';
import AdminPanel from './components/AdminPanel';
import { AppRoute } from './types';

function App() {
  const [currentRoute, setCurrentRoute] = useState<AppRoute>(AppRoute.DASHBOARD);

  const renderContent = () => {
    switch (currentRoute) {
      case AppRoute.DASHBOARD:
        return <Dashboard />;
      case AppRoute.CLINICAL:
        return <ClinicalAssistant />;
      case AppRoute.ADMIN:
        return <AdminPanel />;
      default:
        return <Dashboard />;
    }
  };

  return (
    <HashRouter>
      <Layout currentRoute={currentRoute} onNavigate={setCurrentRoute}>
        {renderContent()}
      </Layout>
    </HashRouter>
  );
}

export default App;