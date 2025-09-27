'use client';

import { useState } from 'react';
import { Trophy, Menu, X, Home, Plus, BarChart3, Settings2 } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface AppShellProps {
  children: React.ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { theme, setTheme } = useTheme();

  const navigation = [
    { name: 'Dashboard', href: '/', icon: Home },
    { name: 'Create Draw', href: '/create', icon: Plus },
    { name: 'Analytics', href: '/analytics', icon: BarChart3 },
    { name: 'Settings', href: '/settings', icon: Settings2 },
  ];

  return (
    <div className="min-h-screen bg-bg">
      {/* Header */}
      <header className="glass-card border-b border-neutral border-opacity-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-gradient-to-r from-accent to-primary rounded-lg">
                <Trophy className="h-6 w-6 text-bg" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gradient">FairChain Draws</h1>
                <p className="text-xs text-neutral">Blockchain-Verified</p>
              </div>
            </div>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex space-x-8">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link flex items-center space-x-2"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </a>
              ))}
            </nav>

            {/* Theme Selector */}
            <div className="hidden md:flex items-center space-x-4">
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value as any)}
                className="bg-surface border border-neutral border-opacity-30 rounded-lg px-3 py-1 text-sm text-fg"
              >
                <option value="default">Finance</option>
                <option value="celo">Celo</option>
                <option value="solana">Solana</option>
                <option value="base">Base</option>
                <option value="coinbase">Coinbase</option>
              </select>
            </div>

            {/* Mobile menu button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="md:hidden p-2 rounded-lg text-neutral hover:text-accent transition-colors"
            >
              {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden border-t border-neutral border-opacity-20">
            <div className="px-4 py-4 space-y-3">
              {navigation.map((item) => (
                <a
                  key={item.name}
                  href={item.href}
                  className="nav-link flex items-center space-x-3 py-2"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  <span>{item.name}</span>
                </a>
              ))}
              <div className="pt-3 border-t border-neutral border-opacity-20">
                <select
                  value={theme}
                  onChange={(e) => setTheme(e.target.value as any)}
                  className="w-full bg-surface border border-neutral border-opacity-30 rounded-lg px-3 py-2 text-sm text-fg"
                >
                  <option value="default">Finance Theme</option>
                  <option value="celo">Celo Theme</option>
                  <option value="solana">Solana Theme</option>
                  <option value="base">Base Theme</option>
                  <option value="coinbase">Coinbase Theme</option>
                </select>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
