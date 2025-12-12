'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useStore } from '@/lib/store';
import { Menu, X, User, Heart, MessageSquare, Bell, Car } from 'lucide-react';

export default function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, notifications } = useStore();
  const unreadNotifications = notifications.filter((n) => !n.read).length;

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2">
            <Car className="w-8 h-8 text-primary-600" />
            <span className="text-2xl font-bold text-primary-600">CarMarket</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
              Home
            </Link>
            <Link href="/search" className="text-gray-700 hover:text-primary-600 font-medium">
              Search Cars
            </Link>
            <Link href="/post" className="text-gray-700 hover:text-primary-600 font-medium">
              Sell Your Car
            </Link>
            {user && (
              <>
                <Link href="/favorites" className="relative text-gray-700 hover:text-primary-600">
                  <Heart className="w-6 h-6" />
                </Link>
                <Link href="/messages" className="relative text-gray-700 hover:text-primary-600">
                  <MessageSquare className="w-6 h-6" />
                </Link>
                <Link href="/notifications" className="relative text-gray-700 hover:text-primary-600">
                  <Bell className="w-6 h-6" />
                  {unreadNotifications > 0 && (
                    <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {unreadNotifications}
                    </span>
                  )}
                </Link>
              </>
            )}
          </nav>

          {/* User Menu */}
          <div className="hidden md:flex items-center space-x-4">
            {user ? (
              <Link href="/account" className="flex items-center space-x-2 text-gray-700 hover:text-primary-600">
                <User className="w-6 h-6" />
                <span className="font-medium">{user.name}</span>
              </Link>
            ) : (
              <>
                <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                  Login
                </Link>
                <Link href="/register" className="btn-primary">
                  Sign Up
                </Link>
              </>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6 text-gray-700" />
            ) : (
              <Menu className="w-6 h-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <nav className="md:hidden mt-4 pb-4 border-t border-gray-200 pt-4">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-700 hover:text-primary-600 font-medium">
                Home
              </Link>
              <Link href="/search" className="text-gray-700 hover:text-primary-600 font-medium">
                Search Cars
              </Link>
              <Link href="/post" className="text-gray-700 hover:text-primary-600 font-medium">
                Sell Your Car
              </Link>
              {user ? (
                <>
                  <Link href="/favorites" className="text-gray-700 hover:text-primary-600 font-medium">
                    Favorites
                  </Link>
                  <Link href="/messages" className="text-gray-700 hover:text-primary-600 font-medium">
                    Messages
                  </Link>
                  <Link href="/notifications" className="text-gray-700 hover:text-primary-600 font-medium">
                    Notifications {unreadNotifications > 0 && `(${unreadNotifications})`}
                  </Link>
                  <Link href="/account" className="text-gray-700 hover:text-primary-600 font-medium">
                    My Account
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/login" className="text-gray-700 hover:text-primary-600 font-medium">
                    Login
                  </Link>
                  <Link href="/register" className="btn-primary text-center">
                    Sign Up
                  </Link>
                </>
              )}
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
