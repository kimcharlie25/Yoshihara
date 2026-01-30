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
    <header className="sticky top-0 z-50 bg-primary-900 shadow-xl border-b border-accent-950/20">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          <button
            onClick={onMenuClick}
            className="flex items-center text-white hover:text-accent-400 transition-colors duration-200"
          >
            {loading ? (
              <div className="w-12 h-12 bg-primary-800 rounded-full animate-pulse" />
            ) : (
              <img
                src={siteSettings?.site_logo || "/logo.jpg"}
                alt={siteSettings?.site_name || "Yoshihara"}
                className="w-16 h-16 rounded-full object-cover"
                onError={(e) => {
                  e.currentTarget.src = "/logo.jpg";
                }}
              />
            )}
            <div className="flex flex-col items-start">
              <h1 className="text-sm sm:text-lg md:text-2xl font-playfair font-bold text-white tracking-widest uppercase leading-tight">
                {loading ? (
                  <div className="w-32 h-6 bg-primary-800 rounded animate-pulse" />
                ) : (
                  siteSettings?.site_name || "Yoshihara"
                )}
              </h1>
              <span className="text-[8px] sm:text-[10px] text-accent-400 font-bold tracking-[0.2em] uppercase">Japanese Dining & Grocery</span>
            </div>
          </button>

          <div className="flex items-center space-x-3">
            {onOrderTrackingClick && (
              <button
                onClick={onOrderTrackingClick}
                className="flex items-center gap-2 px-4 py-2 text-white hover:text-accent-400 hover:bg-white/5 rounded-sm transition-all duration-200 text-xs font-semibold tracking-widest uppercase"
              >
                <Package className="h-5 w-5" />
                <span className="hidden sm:inline">Track Order</span>
              </button>
            )}
            <button
              onClick={onCartClick}
              className="relative p-3 text-white hover:text-accent-400 hover:bg-white/5 rounded-full transition-all duration-200"
            >
              <ShoppingCart className="h-6 w-6" />
              {cartItemsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-accent-500 text-primary-950 text-[10px] rounded-full h-5 w-5 flex items-center justify-center font-bold shadow-lg animate-bounce-gentle">
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