import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface DesktopNavProps {
  selectedCategory?: string;
  onCategoryClick?: (categoryId: string) => void;
}

const DesktopNav: React.FC<DesktopNavProps> = ({ selectedCategory, onCategoryClick }) => {
  const { categories, loading } = useCategories();

  return (
    <nav className="sticky top-20 z-40 bg-white border-b border-primary-100 hidden md:block shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-6 py-4 overflow-x-auto scrollbar-hide">
          {loading ? (
            <div className="flex space-x-6">
              {[1, 2, 3, 4, 5, 6].map((i) => (
                <div key={i} className="w-20 h-8 bg-primary-50 rounded-full animate-pulse" />
              ))}
            </div>
          ) : (
            <>
              <button
                onClick={() => onCategoryClick?.('all')}
                className={`flex-shrink-0 flex items-center space-x-2 px-6 py-2 rounded-sm transition-all duration-300 font-semibold tracking-widest uppercase text-xs whitespace-nowrap ${selectedCategory === 'all' || !selectedCategory
                    ? 'bg-primary-900 text-accent-400 shadow-lg border-b-2 border-accent-500'
                    : 'text-primary-800 hover:text-primary-950 hover:bg-primary-50 transition-colors'
                  }`}
              >
                <span>All Items</span>
              </button>
              {categories.map((category) => (
                <button
                  key={category.id}
                  onClick={() => onCategoryClick?.(category.id)}
                  className={`flex-shrink-0 flex items-center space-x-2 px-6 py-2 rounded-sm transition-all duration-300 font-semibold tracking-widest uppercase text-xs whitespace-nowrap ${selectedCategory === category.id
                      ? 'bg-primary-900 text-accent-400 shadow-lg border-b-2 border-accent-500'
                      : 'text-primary-800 hover:text-primary-950 hover:bg-primary-50 transition-colors'
                    }`}
                >
                  <span className="text-base grayscale group-hover:grayscale-0 transition-all">{category.icon}</span>
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

