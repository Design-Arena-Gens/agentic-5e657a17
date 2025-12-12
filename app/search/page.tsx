'use client';

import { useState, useEffect } from 'react';
import { useStore } from '@/lib/store';
import { brands, fuelTypes, gearboxTypes, bodyTypes, conditions } from '@/lib/mock-data';
import CarCard from '@/components/CarCard';
import { SlidersHorizontal } from 'lucide-react';
import { Car } from '@/lib/store';

export default function SearchPage() {
  const { cars } = useStore();
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [showFilters, setShowFilters] = useState(true);
  const [filters, setFilters] = useState({
    brand: '',
    model: '',
    yearFrom: '',
    yearTo: '',
    priceFrom: '',
    priceTo: '',
    mileageMax: '',
    fuelType: '',
    gearbox: '',
    bodyType: '',
    condition: '',
    location: '',
  });
  const [sortBy, setSortBy] = useState('newest');

  useEffect(() => {
    applyFilters();
  }, [cars, filters, sortBy]);

  const applyFilters = () => {
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

    if (filters.yearFrom) {
      filtered = filtered.filter((car) => car.year >= parseInt(filters.yearFrom));
    }

    if (filters.yearTo) {
      filtered = filtered.filter((car) => car.year <= parseInt(filters.yearTo));
    }

    if (filters.priceFrom) {
      filtered = filtered.filter((car) => car.price >= parseFloat(filters.priceFrom));
    }

    if (filters.priceTo) {
      filtered = filtered.filter((car) => car.price <= parseFloat(filters.priceTo));
    }

    if (filters.mileageMax) {
      filtered = filtered.filter((car) => car.mileage <= parseInt(filters.mileageMax));
    }

    if (filters.fuelType) {
      filtered = filtered.filter((car) => car.fuelType === filters.fuelType);
    }

    if (filters.gearbox) {
      filtered = filtered.filter((car) => car.gearbox === filters.gearbox);
    }

    if (filters.bodyType) {
      filtered = filtered.filter((car) => car.bodyType === filters.bodyType);
    }

    if (filters.condition) {
      filtered = filtered.filter((car) => car.condition === filters.condition);
    }

    if (filters.location) {
      filtered = filtered.filter((car) =>
        car.location.city.toLowerCase().includes(filters.location.toLowerCase())
      );
    }

    // Sort
    if (sortBy === 'newest') {
      filtered.sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime());
    } else if (sortBy === 'price-low') {
      filtered.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'price-high') {
      filtered.sort((a, b) => b.price - a.price);
    }

    setFilteredCars(filtered);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-3xl font-bold">Search Cars</h1>
          <button
            onClick={() => setShowFilters(!showFilters)}
            className="md:hidden btn-secondary flex items-center space-x-2"
          >
            <SlidersHorizontal className="w-5 h-5" />
            <span>Filters</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          <div className={`lg:col-span-1 ${showFilters ? 'block' : 'hidden lg:block'}`}>
            <div className="bg-white rounded-xl shadow-lg p-6 sticky top-24">
              <h2 className="text-xl font-bold mb-6">Filters</h2>

              <div className="space-y-6">
                {/* Brand */}
                <div>
                  <label className="label">Brand</label>
                  <select
                    value={filters.brand}
                    onChange={(e) => setFilters({ ...filters, brand: e.target.value })}
                    className="input"
                  >
                    <option value="">All Brands</option>
                    {brands.map((brand) => (
                      <option key={brand} value={brand}>
                        {brand}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Model */}
                <div>
                  <label className="label">Model</label>
                  <input
                    type="text"
                    value={filters.model}
                    onChange={(e) => setFilters({ ...filters, model: e.target.value })}
                    placeholder="Enter model"
                    className="input"
                  />
                </div>

                {/* Year Range */}
                <div>
                  <label className="label">Year Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.yearFrom}
                      onChange={(e) => setFilters({ ...filters, yearFrom: e.target.value })}
                      placeholder="From"
                      className="input"
                    />
                    <input
                      type="number"
                      value={filters.yearTo}
                      onChange={(e) => setFilters({ ...filters, yearTo: e.target.value })}
                      placeholder="To"
                      className="input"
                    />
                  </div>
                </div>

                {/* Price Range */}
                <div>
                  <label className="label">Price Range</label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      value={filters.priceFrom}
                      onChange={(e) => setFilters({ ...filters, priceFrom: e.target.value })}
                      placeholder="Min"
                      className="input"
                    />
                    <input
                      type="number"
                      value={filters.priceTo}
                      onChange={(e) => setFilters({ ...filters, priceTo: e.target.value })}
                      placeholder="Max"
                      className="input"
                    />
                  </div>
                </div>

                {/* Mileage */}
                <div>
                  <label className="label">Max Mileage</label>
                  <input
                    type="number"
                    value={filters.mileageMax}
                    onChange={(e) => setFilters({ ...filters, mileageMax: e.target.value })}
                    placeholder="Max mileage"
                    className="input"
                  />
                </div>

                {/* Fuel Type */}
                <div>
                  <label className="label">Fuel Type</label>
                  <select
                    value={filters.fuelType}
                    onChange={(e) => setFilters({ ...filters, fuelType: e.target.value })}
                    className="input"
                  >
                    <option value="">All Types</option>
                    {fuelTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Gearbox */}
                <div>
                  <label className="label">Gearbox</label>
                  <select
                    value={filters.gearbox}
                    onChange={(e) => setFilters({ ...filters, gearbox: e.target.value })}
                    className="input"
                  >
                    <option value="">All Types</option>
                    {gearboxTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Body Type */}
                <div>
                  <label className="label">Body Type</label>
                  <select
                    value={filters.bodyType}
                    onChange={(e) => setFilters({ ...filters, bodyType: e.target.value })}
                    className="input"
                  >
                    <option value="">All Types</option>
                    {bodyTypes.map((type) => (
                      <option key={type} value={type}>
                        {type}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Condition */}
                <div>
                  <label className="label">Condition</label>
                  <select
                    value={filters.condition}
                    onChange={(e) => setFilters({ ...filters, condition: e.target.value })}
                    className="input"
                  >
                    <option value="">All Conditions</option>
                    {conditions.map((cond) => (
                      <option key={cond} value={cond}>
                        {cond}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Location */}
                <div>
                  <label className="label">Location</label>
                  <input
                    type="text"
                    value={filters.location}
                    onChange={(e) => setFilters({ ...filters, location: e.target.value })}
                    placeholder="City"
                    className="input"
                  />
                </div>

                {/* Reset Filters */}
                <button
                  onClick={() =>
                    setFilters({
                      brand: '',
                      model: '',
                      yearFrom: '',
                      yearTo: '',
                      priceFrom: '',
                      priceTo: '',
                      mileageMax: '',
                      fuelType: '',
                      gearbox: '',
                      bodyType: '',
                      condition: '',
                      location: '',
                    })
                  }
                  className="w-full btn-secondary"
                >
                  Reset Filters
                </button>
              </div>
            </div>
          </div>

          {/* Results */}
          <div className="lg:col-span-3">
            <div className="flex items-center justify-between mb-6">
              <p className="text-gray-600">
                <span className="font-semibold">{filteredCars.length}</span> cars found
              </p>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary-500"
              >
                <option value="newest">Newest First</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
              </select>
            </div>

            {filteredCars.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                {filteredCars.map((car) => (
                  <CarCard key={car.id} car={car} />
                ))}
              </div>
            ) : (
              <div className="bg-white rounded-xl shadow-lg p-12 text-center">
                <p className="text-xl text-gray-500">No cars found matching your criteria</p>
                <p className="text-gray-400 mt-2">Try adjusting your filters</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
