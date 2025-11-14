import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface DesktopNavProps {
  selectedCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <nav className="sticky top-20 z-40 bg-white border-b border-gray-200 hidden md:block shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 py-3 overflow-x-auto scrollbar-hide">
          {loading ? (
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-20 h-8 bg-gray-200 rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick?.('all')}
                className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 font-medium whitespace-nowrap ${
                  selectedCategory === 'all' || !selectedCategory
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                }`}
              >
                <span>All</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryClick?.(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-4 py-2 rounded-full transition-all duration-200 font-medium whitespace-nowrap ${
                    selectedCategory === category.id
                      ? 'bg-primary-600 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200 border border-gray-200'
                  }`}
                >
                  <span className="text-lg">{category.icon}</span>
                  <span>{category.name}</span>
                </button>
              ))}
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default DesktopNav;

