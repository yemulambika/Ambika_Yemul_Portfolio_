import React from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import { Toaster } from 'react-hot-toast';

const Layout = () => {
  return (
    <div className="min-h-screen flex flex-col bg-dark">
      <Navbar />
      <main className="flex-grow pt-20 pb-12">
        <Outlet />
      </main>
      <Footer />
      <Toaster
        position="bottom-right"
        toastOptions={{
          className: 'bg-card text-fg border border-fg/10',
          iconTheme: { primary: '#6366f1', secondary: '#ffffff' },
        }}
      />
    </div>
  );
};

export default Layout;