'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import { useStore } from '@/lib/store';
import { Heart, Phone, Mail, MapPin, Gauge, Fuel, Settings, Calendar, Palette, Info, ChevronLeft, ChevronRight, MessageSquare } from 'lucide-react';
import dynamic from 'next/dynamic';

const MapComponent = dynamic(() => import('@/components/MapComponent'), { ssr: false });

export default function CarDetailPage() {
  const params = useParams();
  const { cars, favorites, toggleFavorite, user } = useStore();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const car = cars.find((c) => c.id === params.id);

  if (!car) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-gray-500">Car not found</p>
      </div>
    );
  }

  const isFavorite = favorites.includes(car.id);

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % car.images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + car.images.length) % car.images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Image Carousel */}
            <div className="bg-white rounded-xl shadow-lg overflow-hidden mb-8">
              <div className="relative h-96 md:h-[500px]">
                <img
                  src={car.images[currentImageIndex]}
                  alt={car.title}
                  className="w-full h-full object-cover"
                />
                {car.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronLeft className="w-6 h-6" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 p-2 rounded-full shadow-lg hover:bg-white"
                    >
                      <ChevronRight className="w-6 h-6" />
                    </button>
                  </>
                )}
                <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                  {car.images.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-2 h-2 rounded-full ${
                        index === currentImageIndex ? 'bg-white' : 'bg-white/50'
                      }`}
                    />
                  ))}
                </div>
              </div>

              {/* Thumbnails */}
              <div className="p-4 flex space-x-2 overflow-x-auto">
                {car.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden ${
                      index === currentImageIndex ? 'ring-2 ring-primary-600' : ''
                    }`}
                  >
                    <img src={image} alt={`${car.title} ${index + 1}`} className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            </div>

            {/* Title and Price */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h1 className="text-3xl font-bold mb-2">{car.title}</h1>
                  <div className="flex items-center text-gray-600">
                    <MapPin className="w-5 h-5 mr-2" />
                    <span>{car.location.city}</span>
                  </div>
                </div>
                <button
                  onClick={() => toggleFavorite(car.id)}
                  className="p-3 rounded-full bg-gray-100 hover:bg-primary-50 transition-colors"
                >
                  <Heart
                    className={`w-6 h-6 ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                  />
                </button>
              </div>
              <p className="text-4xl font-bold text-primary-600">${car.price.toLocaleString()}</p>
            </div>

            {/* Specifications */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-6">Specifications</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
                <div className="flex items-start space-x-3">
                  <Calendar className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Year</p>
                    <p className="font-semibold">{car.year}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Gauge className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Mileage</p>
                    <p className="font-semibold">{car.mileage.toLocaleString()} miles</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Fuel className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Fuel Type</p>
                    <p className="font-semibold">{car.fuelType}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Settings className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Gearbox</p>
                    <p className="font-semibold">{car.gearbox}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Engine Size</p>
                    <p className="font-semibold">{car.engineSize}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Palette className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Color</p>
                    <p className="font-semibold">{car.color}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Condition</p>
                    <p className="font-semibold">{car.condition}</p>
                  </div>
                </div>
                <div className="flex items-start space-x-3">
                  <Info className="w-5 h-5 text-primary-600 mt-1" />
                  <div>
                    <p className="text-sm text-gray-500">Body Type</p>
                    <p className="font-semibold">{car.bodyType}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Description */}
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h2 className="text-2xl font-bold mb-4">Description</h2>
              <p className="text-gray-700 leading-relaxed">{car.description}</p>
            </div>

            {/* Location Map */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <h2 className="text-2xl font-bold mb-4">Location</h2>
              <div className="h-80 rounded-lg overflow-hidden">
                <MapComponent lat={car.location.lat} lng={car.location.lng} />
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-4">Seller Information</h2>
              <div className="mb-6">
                <p className="font-semibold text-lg mb-2">{car.seller.name}</p>
                <div className="space-y-2 text-gray-600">
                  <div className="flex items-center space-x-2">
                    <Phone className="w-4 h-4" />
                    <span>{car.seller.phone}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Mail className="w-4 h-4" />
                    <span>{car.seller.email}</span>
                  </div>
                </div>
              </div>

              <div className="space-y-3">
                <a
                  href={`tel:${car.seller.phone}`}
                  className="btn-primary w-full flex items-center justify-center space-x-2"
                >
                  <Phone className="w-5 h-5" />
                  <span>Call Seller</span>
                </a>
                {user ? (
                  <a
                    href={`/messages?carId=${car.id}`}
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Send Message</span>
                  </a>
                ) : (
                  <a
                    href="/login"
                    className="btn-secondary w-full flex items-center justify-center space-x-2"
                  >
                    <MessageSquare className="w-5 h-5" />
                    <span>Login to Message</span>
                  </a>
                )}
              </div>

              <div className="mt-6 pt-6 border-t border-gray-200">
                <p className="text-sm text-gray-500">
                  Listed {new Date(car.createdAt).toLocaleDateString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
