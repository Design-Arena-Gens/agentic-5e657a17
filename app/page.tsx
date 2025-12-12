'use client';

import { useEffect, useState } from 'react';
import { useStore } from '@/lib/store';
import { mockCars } from '@/lib/mock-data';
import SearchBar from '@/components/SearchBar';
import CarCard from '@/components/CarCard';
import CategoryFilter from '@/components/CategoryFilter';
import { Car } from '@/lib/store';

export default function Home() {
  const { cars, setCars } = useStore();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  useEffect(() => {
    setCars(mockCars);
  }, [setCars]);

  useEffect(() => {
    setFilteredCars(cars.filter((car) => car.status === 'approved'));
  }, [cars]);

  const handleSearch = (filters: any) => {
    let filtered = cars.filter((car) => car.status === 'approved');

    if (filters.brand) {
      filtered = filtered.filter((car) =>
        car.brand.toLowerCase().includes(filters.brand.toLowerCase())
      );
    }

    if (filters.model) {
      filtered = filtered.filter((car) =>
        car.model.toLowerCase().includes(filters.model.toLowerCase())
      );
    }

    if (filters.year) {
      filtered = filtered.filter((car) => car.year === parseInt(filters.year));
    }

    if (filters.minPrice) {
      filtered = filtered.filter((car) => car.price >= parseFloat(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter((car) => car.price <= parseFloat(filters.maxPrice));
    }

    if (filters.city) {
      filtered = filtered.filter((car) =>
        car.location.city.toLowerCase().includes(filters.city.toLowerCase())
      );
    }

    setFilteredCars(filtered);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    if (category === 'all') {
      setFilteredCars(cars.filter((car) => car.status === 'approved'));
    } else {
      setFilteredCars(
        cars.filter(
          (car) => car.status === 'approved' && car.bodyType.toLowerCase() === category.toLowerCase()
        )
      );
    }
  };

  const featuredCars = filteredCars.slice(0, 3);
  const latestCars = filteredCars.slice(0, 6);

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary-600 to-primary-800 text-white py-20 px-4">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">
              Find Your Dream Car
            </h1>
            <p className="text-xl md:text-2xl text-primary-100">
              Browse thousands of verified listings from trusted sellers
            </p>
          </div>
          <SearchBar onSearch={handleSearch} />
        </div>
      </section>

      {/* Categories */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Browse by Category</h2>
          <CategoryFilter
            selectedCategory={selectedCategory}
            onCategoryChange={handleCategoryChange}
          />
        </div>
      </section>

      {/* Featured Cars */}
      {featuredCars.length > 0 && (
        <section className="py-12 px-4">
          <div className="max-w-7xl mx-auto">
            <h2 className="text-3xl font-bold mb-8">Featured Cars</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {featuredCars.map((car) => (
                <CarCard key={car.id} car={car} featured />
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Latest Listings */}
      <section className="py-12 px-4 bg-white">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-3xl font-bold mb-8">Latest Listings</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {latestCars.map((car) => (
              <CarCard key={car.id} car={car} />
            ))}
          </div>
          {filteredCars.length === 0 && (
            <div className="text-center py-12">
              <p className="text-xl text-gray-500">No cars found. Try adjusting your search.</p>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary-600 to-primary-800 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Sell Your Car?</h2>
          <p className="text-xl mb-8 text-primary-100">
            List your car in minutes and reach thousands of potential buyers
          </p>
          <a href="/post" className="btn-secondary inline-block">
            List Your Car Now
          </a>
        </div>
      </section>
    </div>
  );
}
