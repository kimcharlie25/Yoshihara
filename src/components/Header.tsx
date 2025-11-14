import React from 'react';
import { ShoppingCart, Package } from 'lucide-react';
import { useSiteSettings } from '../hooks/useSiteSettings';

interface HeaderProps {
  cartItemsCount: number;
  onCartClick: () => void;
  onMenuClick: () => void;
  onOrderTrackingClick?: () => void;
}

const Header: React.FC<HeaderProps> = ({ cartItemsCount, onCartClick, onMenuClick, onOrderTrackingClick }) => {
  const { siteSettings, loading } = useSiteSettings();

  return (
    <header className="sticky top-0 z-50 bg-primary-600 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={onMenuClick}
            className="flex items-center space-x-3 text-white hover:text-primary-50 transition-colors duration-200"
          >
            {loading ? (
              <div className="w-12 h-12 bg-primary-400 rounded-full animate-pulse" />
            ) : (
              <img 
                src={siteSettings?.site_logo || "/logo.jpg"} 
                alt={siteSettings?.site_name || "Beracah Cafe"}
                className="w-12 h-12 rounded-full object-cover ring-2 ring-white/30"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <h1 className="text-2xl font-funnel font-semibold text-white">
              {loading ? (
                <div className="w-32 h-6 bg-primary-400 rounded animate-pulse" />
              ) : (
                siteSettings?.site_name || "Beracah Cafe"
              )}
            </h1>
          </button>

          <div className="flex items-center space-x-3">
            <button 
              onClick={onOrderTrackingClick}
              className="flex items-center gap-2 px-4 py-2 text-white hover:text-white hover:bg-primary-700 rounded-lg transition-all duration-200 text-sm font-medium"
            >
              <Package className="h-5 w-5" />
              <span className="hidden sm:inline">Track Order</span>
            </button>
            <button 
              onClick={onCartClick}
              className="relative p-3 text-white hover:text-white hover:bg-primary-700 rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-white text-primary-600 text-xs rounded-full h-6 w-6 flex items-center justify-center font-semibold shadow-lg animate-bounce-gentle">
                  {cartItemsCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;