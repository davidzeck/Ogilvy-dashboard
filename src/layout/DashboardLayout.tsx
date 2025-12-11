import React, { useState } from 'react';
import { Sidebar } from '@/components/common/Sidebar';
import { Header } from '@/components/common/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout - Main layout component that combines Sidebar, Header, and Content
 * Responsive design:
 * - Desktop: Fixed left sidebar (64 units wide)
 * - Mobile/Tablet: Hidden sidebar with toggle menu
 * - Fixed top header (responsive positioning)
 * - Main content area (with responsive padding)
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Responsive */}
      <Sidebar isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      {/* Header - Responsive */}
      <Header onMenuClick={() => setSidebarOpen(!sidebarOpen)} />

      {/* Overlay for mobile sidebar */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content Area - Responsive offset */}
      <main className="lg:ml-64 mt-14 md:mt-16 min-h-[calc(100vh-3.5rem)] md:min-h-[calc(100vh-4rem)]">
        <div className="p-0">
          {children}
        </div>
      </main>
    </div>
  );
};

