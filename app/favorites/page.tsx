'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Heart } from 'lucide-react';
import CarCard from '@/components/CarCard';

export default function FavoritesPage() {
  const router = useRouter();
  const { user, cars, favorites } = useStore();

  useEffect(() => {
    if (!user) {
      router.push('/login');
    }
  }, [user, router]);

  if (!user) return null;

  const favoriteCars = cars.filter((car) => favorites.includes(car.id) && car.status === 'approved');

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">My Favorites</h1>

        {favoriteCars.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <Heart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <p className="text-xl text-gray-500 mb-2">No favorites yet</p>
            <p className="text-gray-400 mb-6">Start browsing and save your favorite cars</p>
            <a href="/search" className="btn-primary inline-block">
              Browse Cars
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
