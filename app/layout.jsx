/**
 * Root Layout Component
 * This wraps around all pages and provides common layout elements
 * Think of it like the frame of a house - it holds everything together
 */

'use client';

import { useEffect } from 'react';
import { Provider } from 'react-redux';
import { store } from '@/store/store';
import { I18nextProvider } from 'react-i18next';
import i18n from '@/i18n/config';
import Header from '@/components/Layout/Header';
import Navigation from '@/components/Layout/Navigation';
import Sidebar from '@/components/Layout/Sidebar';
import Footer from '@/components/Layout/Footer';
import CartSidebar from '@/components/Cart/CartSidebar';
import MobileMenu from '@/components/Layout/MobileMenu';
import Notification from '@/components/ui/Notification';
import ErrorBoundary from '@/components/ui/ErrorBoundary';
import './globals.css';

export default function RootLayout({ children }) {
  useEffect(() => {
    // Set up theme when the app starts (like turning on the lights)
    const savedTheme = localStorage.getItem('theme');
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    const theme = savedTheme || systemTheme;
    
    // Apply the theme to the whole page
    document.documentElement.classList.toggle('dark', theme === 'dark');
  }, []);

  return (
    <html lang="en">
      <head>
        <title>Sree Ranga Department Stores - Your Trusted Shopping Partner</title>
        <meta name="description" content="Shop groceries, FMCG, medicines, electronics and more at Sree Ranga Department Stores. Quality products at affordable prices with fast delivery." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className="bg-background text-foreground">
        {/* Redux store provider - gives all components access to our data */}
        <Provider store={store}>
          {/* Language provider - helps with translations */}
          <I18nextProvider i18n={i18n}>
            {/* Error boundary - catches any errors and shows nice error page */}
            <ErrorBoundary>
              <div className="flex flex-col min-h-screen">
                
                {/* Header - top bar with logo and search */}
                <Header />
                
                {/* Navigation - menu bar below header */}
                <Navigation />
                
                {/* Main content - this is where each page shows */}
                <main className="flex-1">
                  {children}
                </main>
                
                {/* Footer - bottom section with links and info */}
                <Footer />
                
                {/* Sidebar overlays - these show on top when needed */}
                <Sidebar />
                <CartSidebar />
                <MobileMenu />
                
                {/* Notifications - popup messages */}
                <Notification />
              </div>
            </ErrorBoundary>
          </I18nextProvider>
        </Provider>
      </body>
    </html>
  );
}