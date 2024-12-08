import React from 'react';
import Sidebar from '../Sidebar/Sidebar';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';

type LayoutProps = {
  children: React.ReactNode;
};

const DashboardLayout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="dashboard-layout">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content Area */}
      <div className="dashboard-right-section">
        {/* Navbar */}
        <Navbar />

        {/* Page Content */}
        <main className="dashboard-content">{children}</main>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
};

export default DashboardLayout;
