import React from 'react';
import { Sidebar } from '@/components/common/Sidebar';
import { Header } from '@/components/common/Header';

interface DashboardLayoutProps {
  children: React.ReactNode;
}

/**
 * DashboardLayout - Main layout component that combines Sidebar, Header, and Content
 * Follows the structure from the dashboard image:
 * - Fixed left sidebar (64 units wide)
 * - Fixed top header (starts after sidebar)
 * - Main content area (with padding to account for sidebar and header)
 */
export const DashboardLayout: React.FC<DashboardLayoutProps> = ({ children }) => {
  return (
    <div className="min-h-screen bg-slate-50">
      {/* Sidebar - Fixed on the left */}
      <Sidebar />

      {/* Header - Fixed at top, starts after sidebar */}
      <Header />

      {/* Main Content Area - Offset by sidebar width and header height */}
      <main className="ml-64 mt-16 min-h-[calc(100vh-4rem)]">
        <div className="p-6">
          {children}
        </div>
      </main>
    </div>
  );
};

