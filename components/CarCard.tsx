'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Heart, MapPin, Gauge, Fuel, Settings } from 'lucide-react';
import { Car } from '@/lib/store';
import { useStore } from '@/lib/store';

interface CarCardProps {
  car: Car;
  featured?: boolean;
}

export default function CarCard({ car, featured = false }: CarCardProps) {
  const { favorites, toggleFavorite } = useStore();
  const isFavorite = favorites.includes(car.id);

  const handleFavoriteClick = (e: React.MouseEvent) => {
    e.preventDefault();
    toggleFavorite(car.id);
  };

  return (
    <Link href={`/cars/${car.id}`}>
      <div className={`card group ${featured ? 'ring-2 ring-primary-500' : ''}`}>
        {/* Image */}
        <div className="relative h-64 overflow-hidden">
          <img
            src={car.images[0]}
            alt={car.title}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
          <button
            onClick={handleFavoriteClick}
            className="absolute top-4 right-4 bg-white p-2 rounded-full shadow-lg hover:bg-primary-50 transition-colors"
          >
            <Heart
              className={`w-5 h-5 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
            />
          </button>
          {featured && (
            <span className="absolute top-4 left-4 bg-yellow-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          )}
          <span className="absolute bottom-4 left-4 bg-primary-600 text-white px-4 py-2 rounded-lg text-xl font-bold">
            ${car.price.toLocaleString()}
          </span>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-bold mb-2 group-hover:text-primary-600 transition-colors">
            {car.title}
          </h3>
          <div className="flex items-center text-gray-600 mb-4">
            <MapPin className="w-4 h-4 mr-1" />
            <span className="text-sm">{car.location.city}</span>
          </div>

          {/* Specs */}
          <div className="grid grid-cols-3 gap-4 pt-4 border-t border-gray-200">
            <div className="flex items-center space-x-2">
              <Gauge className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Mileage</p>
                <p className="text-sm font-semibold">{car.mileage.toLocaleString()} mi</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Fuel className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Fuel</p>
                <p className="text-sm font-semibold">{car.fuelType}</p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <Settings className="w-4 h-4 text-gray-500" />
              <div>
                <p className="text-xs text-gray-500">Gearbox</p>
                <p className="text-sm font-semibold">{car.gearbox}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Link>
  );
}
