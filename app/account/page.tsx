'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { User, Mail, Phone, Car, Heart, LogOut } from 'lucide-react';
import CarCard from '@/components/CarCard';

export default function AccountPage() {
  const router = useRouter();
  const { user, setUser, cars, favorites } = useStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const userCars = cars.filter((car) => car.seller.id === user.id);
  const favoriteCars = cars.filter((car) => favorites.includes(car.id));

  const handleLogout = () => {
    setUser(null);
    router.push('/');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <div className="text-center mb-6">
                <div className="w-24 h-24 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <User className="w-12 h-12 text-primary-600" />
                </div>
                <h2 className="text-xl font-bold">{user.name}</h2>
              </div>

              <div className="space-y-4 mb-6">
                <div className="flex items-center space-x-3 text-gray-600">
                  <Mail className="w-5 h-5" />
                  <span className="text-sm">{user.email}</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600">
                  <Phone className="w-5 h-5" />
                  <span className="text-sm">{user.phone}</span>
                </div>
              </div>

              <button
                onClick={handleLogout}
                className="w-full btn-secondary flex items-center justify-center space-x-2"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="lg:col-span-3">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Listed Cars</p>
                    <p className="text-3xl font-bold text-primary-600">{userCars.length}</p>
                  </div>
                  <Car className="w-12 h-12 text-primary-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Favorites</p>
                    <p className="text-3xl font-bold text-red-600">{favoriteCars.length}</p>
                  </div>
                  <Heart className="w-12 h-12 text-red-600" />
                </div>
              </div>

              <div className="bg-white rounded-xl shadow-lg p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-500 text-sm">Active</p>
                    <p className="text-3xl font-bold text-green-600">
                      {userCars.filter((car) => car.status === 'approved').length}
                    </p>
                  </div>
                  <Car className="w-12 h-12 text-green-600" />
                </div>
              </div>
            </div>

            {/* My Listings */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-2xl font-bold">My Listings</h2>
                <a href="/post" className="btn-primary">
                  Add New Car
                </a>
              </div>

              {userCars.length > 0 ? (
                <div className="space-y-4">
                  {userCars.map((car) => (
                    <div key={car.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                      <div className="flex items-center space-x-4">
                        <img src={car.images[0]} alt={car.title} className="w-20 h-20 object-cover rounded-lg" />
                        <div>
                          <h3 className="font-semibold">{car.title}</h3>
                          <p className="text-sm text-gray-600">${car.price.toLocaleString()}</p>
                        </div>
                      </div>
                      <div className="flex items-center space-x-4">
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            car.status === 'approved'
                              ? 'bg-green-100 text-green-800'
                              : car.status === 'pending'
                              ? 'bg-yellow-100 text-yellow-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {car.status.charAt(0).toUpperCase() + car.status.slice(1)}
                        </span>
                        <a href={`/cars/${car.id}`} className="btn-secondary text-sm px-4 py-2">
                          View
                        </a>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Car className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't listed any cars yet</p>
                  <a href="/post" className="btn-primary inline-block mt-4">
                    List Your First Car
                  </a>
                </div>
              )}
            </div>

            {/* Favorites */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-6">Favorite Cars</h2>

              {favoriteCars.length > 0 ? (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {favoriteCars.map((car) => (
                    <CarCard key={car.id} car={car} />
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">You haven't added any favorites yet</p>
                  <a href="/search" className="btn-primary inline-block mt-4">
                    Browse Cars
                  </a>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
