'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Bell, MessageSquare, Car, CheckCircle, XCircle } from 'lucide-react';
import Link from 'next/link';

export default function NotificationsPage() {
  const router = useRouter();
  const { user, notifications, markNotificationRead } = useStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const getIcon = (type: string) => {
    switch (type) {
      case 'message':
        return <MessageSquare className="w-6 h-6 text-primary-600" />;
      case 'car_approved':
        return <CheckCircle className="w-6 h-6 text-green-600" />;
      case 'car_rejected':
        return <XCircle className="w-6 h-6 text-red-600" />;
      default:
        return <Car className="w-6 h-6 text-gray-600" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Notifications</h1>

        <div className="bg-white rounded-xl shadow-lg overflow-hidden">
          {notifications.length > 0 ? (
            <div className="divide-y divide-gray-200">
              {notifications.map((notification) => (
                <Link
                  key={notification.id}
                  href={notification.link || '/account'}
                  onClick={() => markNotificationRead(notification.id)}
                  className={`block p-6 hover:bg-gray-50 transition-colors ${
                    !notification.read ? 'bg-primary-50' : ''
                  }`}
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex-shrink-0">{getIcon(notification.type)}</div>
                    <div className="flex-1">
                      <div className="flex items-start justify-between">
                        <div>
                          <h3 className="font-semibold text-lg">{notification.title}</h3>
                          <p className="text-gray-600 mt-1">{notification.message}</p>
                          <p className="text-sm text-gray-400 mt-2">
                            {new Date(notification.timestamp).toLocaleString()}
                          </p>
                        </div>
                        {!notification.read && (
                          <span className="flex-shrink-0 w-3 h-3 bg-primary-600 rounded-full"></span>
                        )}
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="p-12 text-center">
              <Bell className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <p className="text-xl text-gray-500">No notifications yet</p>
              <p className="text-gray-400 mt-2">We'll notify you when something important happens</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
