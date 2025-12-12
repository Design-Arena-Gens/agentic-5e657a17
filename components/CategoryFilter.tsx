'use client';

import { Car, Truck, Zap, Crown, Wind } from 'lucide-react';

interface CategoryFilterProps {
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
}

const categories = [
  { id: 'all', name: 'All', icon: Car },
  { id: 'suv', name: 'SUV', icon: Truck },
  { id: 'sedan', name: 'Sedan', icon: Car },
  { id: 'luxury', name: 'Luxury', icon: Crown },
  { id: 'sports', name: 'Sports', icon: Wind },
  { id: 'electric', name: 'Electric', icon: Zap },
];

export default function CategoryFilter({ selectedCategory, onCategoryChange }: CategoryFilterProps) {
  return (
    <div className="flex flex-wrap gap-4">
      {categories.map((category) => {
        const Icon = category.icon;
        return (
          <button
            key={category.id}
            onClick={() => onCategoryChange(category.id)}
            className={`flex items-center space-x-2 px-6 py-3 rounded-lg font-semibold transition-all duration-200 ${
              selectedCategory === category.id
                ? 'bg-primary-600 text-white shadow-lg'
                : 'bg-white text-gray-700 hover:bg-primary-50 border-2 border-gray-200'
            }`}
          >
            <Icon className="w-5 h-5" />
            <span>{category.name}</span>
          </button>
        );
      })}
    </div>
  );
}
