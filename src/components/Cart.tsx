import React from 'react';
import { Trash2, Plus, Minus, ArrowLeft } from 'lucide-react';
import { CartItem } from '../types';

interface CartProps {
  cartItems: CartItem[];
  updateQuantity: (id: string, quantity: number) => void;
  removeFromCart: (id: string) => void;
  clearCart: () => void;
  getTotalPrice: () => number;
  onContinueShopping: () => void;
  onCheckout: () => void;
}

const Cart: React.FC<CartProps> = ({
  cartItems,
  updateQuantity,
  removeFromCart,
  clearCart,
  getTotalPrice,
  onContinueShopping,
  onCheckout
}) => {
  if (cartItems.length === 0) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="text-center py-16">
          <div className="text-6xl mb-4">☕</div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-funnel font-semibold text-gray-900 mb-2">Your cart is empty</h2>
          <p className="text-sm sm:text-base text-gray-600 mb-6">Add some delicious items to get started!</p>
          <button
            onClick={onContinueShopping}
            className="bg-primary-600 text-white px-5 sm:px-6 py-2.5 sm:py-3 rounded-xl hover:bg-primary-700 transition-all duration-200 font-semibold text-sm sm:text-base shadow-md"
          >
            Browse Menu
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8 gap-4">
        <button
          onClick={onContinueShopping}
          className="flex items-center space-x-2 text-gray-600 hover:text-black transition-colors duration-200 self-start"
        >
          <ArrowLeft className="h-5 w-5" />
          <span className="hidden sm:inline">Continue Shopping</span>
          <span className="sm:hidden">Back</span>
        </button>
        
        <div className="flex items-center justify-center w-full gap-4 relative">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-funnel font-semibold text-gray-900">Your Cart</h1>
          <button
            onClick={clearCart}
            className="absolute right-0 text-primary-600 hover:text-primary-700 transition-colors duration-200 text-xs sm:text-sm md:text-base font-medium whitespace-nowrap"
          >
            Clear All
          </button>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md overflow-hidden mb-8 border border-gray-100">
        {cartItems.map((item, index) => (
          <div key={item.id} className={`p-4 sm:p-6 ${index !== cartItems.length - 1 ? 'border-b border-gray-200' : ''}`}>
            {/* Mobile Layout */}
            <div className="block sm:hidden">
              <div className="flex justify-between items-start mb-3">
                <div className="flex-1 pr-3">
                  <h3 className="text-sm sm:text-base font-sans font-medium text-gray-900 mb-1">{item.name}</h3>
                  {item.selectedVariation && (
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">Size: {item.selectedVariation.name}</p>
                  )}
                  {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                    <p className="text-xs sm:text-sm text-gray-500 mb-1">
                      Add-ons: {item.selectedAddOns.map(addOn => 
                        addOn.quantity && addOn.quantity > 1 
                          ? `${addOn.name} x${addOn.quantity}`
                          : addOn.name
                      ).join(', ')}
                    </p>
                  )}
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-1 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2 bg-primary-50 rounded-full p-1 border border-primary-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-primary-100 rounded-full transition-colors duration-200"
                  >
                    <Minus className="h-3 w-3 text-primary-700" />
                  </button>
                  <span className="font-semibold text-gray-900 min-w-[24px] text-center text-sm">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-primary-100 rounded-full transition-colors duration-200"
                  >
                    <Plus className="h-3 w-3 text-primary-700" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-xs sm:text-sm text-gray-500">₱{item.totalPrice} each</p>
                  <p className="text-base sm:text-lg font-semibold text-gray-900">₱{item.totalPrice * item.quantity}</p>
                </div>
              </div>
            </div>

            {/* Desktop Layout */}
            <div className="hidden sm:flex items-center justify-between">
              <div className="flex-1">
                <h3 className="text-base sm:text-lg font-sans font-medium text-gray-900 mb-1">{item.name}</h3>
                {item.selectedVariation && (
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">Size: {item.selectedVariation.name}</p>
                )}
                {item.selectedAddOns && item.selectedAddOns.length > 0 && (
                  <p className="text-xs sm:text-sm text-gray-500 mb-1">
                    Add-ons: {item.selectedAddOns.map(addOn => 
                      addOn.quantity && addOn.quantity > 1 
                        ? `${addOn.name} x${addOn.quantity}`
                        : addOn.name
                    ).join(', ')}
                  </p>
                )}
                <p className="text-base sm:text-lg font-semibold text-gray-900">₱{item.totalPrice} each</p>
              </div>
              
              <div className="flex items-center space-x-4 ml-4">
                <div className="flex items-center space-x-3 bg-primary-50 rounded-full p-1 border border-primary-200">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-2 hover:bg-primary-100 rounded-full transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-primary-700" />
                  </button>
                  <span className="text-sm sm:text-base font-semibold text-gray-900 min-w-[32px] text-center">{item.quantity}</span>
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-2 hover:bg-primary-100 rounded-full transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-primary-700" />
                  </button>
                </div>
                
                <div className="text-right">
                  <p className="text-base sm:text-lg font-semibold text-gray-900">₱{item.totalPrice * item.quantity}</p>
                </div>
                
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="p-2 text-primary-600 hover:text-primary-700 hover:bg-primary-50 rounded-full transition-all duration-200"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-white rounded-xl shadow-md p-4 sm:p-6 border border-gray-100">
        <div className="flex items-center justify-between text-xl sm:text-2xl font-funnel font-semibold text-gray-900 mb-4 sm:mb-6">
          <span>Total:</span>
          <span className="text-primary-600">₱{(getTotalPrice() || 0).toFixed(2)}</span>
        </div>
        
        <button
          onClick={onCheckout}
          className="w-full bg-primary-600 text-white py-3 sm:py-4 rounded-xl hover:bg-primary-700 transition-all duration-200 transform hover:scale-[1.02] font-semibold text-base sm:text-lg shadow-lg"
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};

export default Cart;