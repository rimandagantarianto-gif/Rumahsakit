import React from 'react';
import { Activity, LayoutDashboard, Stethoscope, Landmark, Menu, User } from 'lucide-react';
import { AppRoute } from '../types';

interface LayoutProps {
  children: React.ReactNode;
  currentRoute: AppRoute;
  onNavigate: (route: AppRoute) => void;
}

const Layout: React.FC<LayoutProps> = ({ children, currentRoute, onNavigate }) => {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const NavItem = ({ route, icon: Icon, label }: { route: AppRoute; icon: any; label: string }) => (
    <button
      onClick={() => {
        onNavigate(route);
        setIsSidebarOpen(false);
      }}
      className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${
        currentRoute === route
          ? 'bg-teal-600 text-white shadow-md'
          : 'text-slate-600 hover:bg-slate-100'
      }`}
    >
      <Icon size={20} />
      <span className="font-medium">{label}</span>
    </button>
  );

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row">
      {/* Mobile Header */}
      <div className="md:hidden bg-white border-b p-4 flex justify-between items-center sticky top-0 z-20">
        <div className="flex items-center gap-2 text-teal-700 font-bold text-xl">
          <Activity /> SCHOA
        </div>
        <button onClick={() => setIsSidebarOpen(!isSidebarOpen)} className="p-2 text-slate-600">
          <Menu />
        </button>
      </div>

      {/* Sidebar */}
      <aside
        className={`fixed md:sticky md:top-0 h-screen w-64 bg-white border-r border-slate-200 p-6 flex flex-col gap-8 z-30 transition-transform duration-300 ease-in-out ${
          isSidebarOpen ? 'translate-x-0' : '-translate-x-full md:translate-x-0'
        }`}
      >
        <div className="hidden md:flex items-center gap-2 text-teal-700 font-bold text-2xl px-2">
          <Activity className="h-8 w-8" /> SCHOA
        </div>

        <nav className="flex flex-col gap-2">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider px-4 mb-2">
            Main Menu
          </div>
          <NavItem route={AppRoute.DASHBOARD} icon={LayoutDashboard} label="Dashboard" />
          <NavItem route={AppRoute.CLINICAL} icon={Stethoscope} label="Clinical Assistant" />
          <NavItem route={AppRoute.ADMIN} icon={Landmark} label="Admin & Finance" />
        </nav>

        <div className="mt-auto pt-6 border-t border-slate-100">
          <div className="flex items-center gap-3 px-4 py-2">
            <div className="h-10 w-10 bg-teal-100 rounded-full flex items-center justify-center text-teal-700">
              <User size={20} />
            </div>
            <div>
              <p className="text-sm font-semibold text-slate-700">Dr. Sarah L.</p>
              <p className="text-xs text-slate-500">Chief Resident</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/50 z-20 md:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-4 md:p-8 overflow-y-auto h-[calc(100vh-64px)] md:h-screen">
        <div className="max-w-7xl mx-auto">
          {children}
        </div>
      </main>
    </div>
  );
};

export default Layout;