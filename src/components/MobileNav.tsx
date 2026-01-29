import React from 'react';
import { useCategories } from '../hooks/useCategories';

interface MobileNavProps {
  activeCategory: string;
  onCategoryClick: (categoryId: string) => void;
}

const MobileNav: React.FC<MobileNavProps> = ({ activeCategory, onCategoryClick }) => {
  const { categories } = useCategories();

  return (
    <div className="sticky top-20 z-40 bg-white border-b border-primary-50 md:hidden shadow-sm">
      <div className="flex overflow-x-auto scrollbar-hide px-4 py-4">
        <button
          onClick={() => onCategoryClick('all')}
          className={`flex-shrink-0 flex items-center space-x-2 px-5 py-2 rounded-sm mr-3 transition-all duration-300 font-bold tracking-widest uppercase text-[10px] whitespace-nowrap ${activeCategory === 'all'
              ? 'bg-primary-900 text-accent-400 shadow-lg border-b-2 border-accent-500'
              : 'text-primary-800 hover:bg-primary-50'
            }`}
        >
          <span>All Items</span>
        </button>
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => onCategoryClick(category.id)}
            className={`flex-shrink-0 flex items-center space-x-2 px-5 py-2 rounded-sm mr-3 transition-all duration-300 font-bold tracking-widest uppercase text-[10px] whitespace-nowrap ${activeCategory === category.id
                ? 'bg-primary-900 text-accent-400 shadow-lg border-b-2 border-accent-500'
                : 'text-primary-800 hover:bg-primary-50'
              }`}
          >
            <span className="text-base grayscale">{category.icon}</span>
            <span>{category.name}</span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default MobileNav;