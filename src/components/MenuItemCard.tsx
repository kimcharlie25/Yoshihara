import React, { useState } from 'react';
import { Plus, Minus, X, ShoppingCart } from 'lucide-react';
import { MenuItem, Variation, AddOn } from '../types';

interface MenuItemCardProps {
  item: MenuItem;
  onAddToCart: (item: MenuItem, quantity?: number, variation?: Variation, addOns?: AddOn[]) => void;
  quantity: number;
  cartItemId?: string;
  onUpdateQuantity: (id: string, quantity: number) => void;
}

const MenuItemCard: React.FC<MenuItemCardProps> = ({
  item,
  onAddToCart,
  quantity,
  cartItemId,
  onUpdateQuantity
}) => {
  const [showCustomization, setShowCustomization] = useState(false);
  const [selectedVariation, setSelectedVariation] = useState<Variation | undefined>(
    item.variations?.[0]
  );
  const [selectedAddOns, setSelectedAddOns] = useState<(AddOn & { quantity: number })[]>([]);

  // Determine discount display values
  const basePrice = item.basePrice;
  const effectivePrice = item.effectivePrice ?? basePrice;
  const hasExplicitDiscount = Boolean(item.isOnDiscount && item.discountPrice !== undefined);
  const hasImplicitDiscount = effectivePrice < basePrice;
  const showDiscount = hasExplicitDiscount || hasImplicitDiscount;
  const discountedPrice = hasExplicitDiscount
    ? (item.discountPrice as number)
    : (hasImplicitDiscount ? effectivePrice : undefined);

  const calculatePrice = () => {
    // Use effective price (discounted or regular) as base
    let price = effectivePrice;
    if (selectedVariation) {
      price = effectivePrice + selectedVariation.price;
    }
    selectedAddOns.forEach(addOn => {
      price += addOn.price * addOn.quantity;
    });
    return price;
  };

  const handleAddToCart = () => {
    if (item.variations?.length || item.addOns?.length) {
      setShowCustomization(true);
    } else {
      onAddToCart(item, 1);
    }
  };

  const handleCustomizedAddToCart = () => {
    // Convert selectedAddOns back to regular AddOn array for cart
    const addOnsForCart: AddOn[] = selectedAddOns.flatMap(addOn =>
      Array(addOn.quantity).fill({ ...addOn, quantity: undefined })
    );
    onAddToCart(item, 1, selectedVariation, addOnsForCart);
    setShowCustomization(false);
    setSelectedAddOns([]);
  };

  const handleIncrement = () => {
    if (!cartItemId) return;
    onUpdateQuantity(cartItemId, quantity + 1);
  };

  const handleDecrement = () => {
    if (quantity > 0 && cartItemId) {
      onUpdateQuantity(cartItemId, quantity - 1);
    }
  };

  const updateAddOnQuantity = (addOn: AddOn, quantity: number) => {
    setSelectedAddOns(prev => {
      const existingIndex = prev.findIndex(a => a.id === addOn.id);

      if (quantity === 0) {
        // Remove add-on if quantity is 0
        return prev.filter(a => a.id !== addOn.id);
      }

      if (existingIndex >= 0) {
        // Update existing add-on quantity
        const updated = [...prev];
        updated[existingIndex] = { ...updated[existingIndex], quantity };
        return updated;
      } else {
        // Add new add-on with quantity
        return [...prev, { ...addOn, quantity }];
      }
    });
  };

  const groupedAddOns = item.addOns?.reduce((groups, addOn) => {
    const category = addOn.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(addOn);
    return groups;
  }, {} as Record<string, AddOn[]>);

  return (
    <>
      <div className={`bg-white rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 overflow-hidden group animate-scale-in border border-gray-200 ${!item.available ? 'opacity-60' : ''}`}>
        {/* Image Container with Badges */}
        <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
          {item.image ? (
            <img
              src={item.image}
              alt={item.name}
              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
              decoding="async"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
                e.currentTarget.nextElementSibling?.classList.remove('hidden');
              }}
            />
          ) : null}
          <div className={`absolute inset-0 flex items-center justify-center ${item.image ? 'hidden' : ''}`}>
            <div className="text-6xl opacity-20 text-gray-400">☕</div>
          </div>

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2">
            {item.isOnDiscount && item.discountPrice && (
              <div className="bg-red-600 text-white text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg tracking-widest uppercase">
                SALE
              </div>
            )}
            {item.popular && (
              <div className="bg-accent-500 text-primary-950 text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg tracking-widest uppercase">
                ⭐ POPULAR
              </div>
            )}
          </div>

          {!item.available && (
            <div className="absolute top-3 right-3 bg-primary-950/80 backdrop-blur-sm text-white text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg tracking-widest uppercase">
              UNAVAILABLE
            </div>
          )}

          {/* Discount Percentage Badge */}
          {showDiscount && discountedPrice !== undefined && (
            <div className="absolute bottom-3 right-3 bg-white/95 backdrop-blur-sm text-red-600 text-xs font-bold px-3 py-1.5 rounded-sm shadow-lg border border-red-100 uppercase tracking-widest">
              {Math.round(((basePrice - discountedPrice) / basePrice) * 100)}% OFF
            </div>
          )}
        </div>

        {/* Content */}
        <div className="p-5">
          <div className="flex items-start justify-between mb-3">
            <h4 className="text-xl font-playfair font-bold text-primary-900 leading-tight flex-1 pr-2">{item.name}</h4>
            {item.variations && item.variations.length > 0 && (
              <div className="text-[10px] font-semibold tracking-widest uppercase text-primary-500 bg-primary-50 px-2 py-1 rounded-sm whitespace-nowrap">
                {item.variations.length} Options
              </div>
            )}
          </div>

          <p className={`text-sm mb-4 leading-relaxed ${!item.available ? 'text-gray-400' : 'text-gray-600'}`}>
            {!item.available ? 'Currently Unavailable' : item.description}
          </p>

          {/* Pricing Section */}
          <div className="flex items-center justify-between mb-4">
            <div className="flex-1">
              {showDiscount && discountedPrice !== undefined ? (
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-playfair font-bold text-red-600">
                      ₱{discountedPrice.toFixed(2)}
                    </span>
                    <span className="text-sm text-gray-400 line-through font-light">
                      ₱{basePrice.toFixed(2)}
                    </span>
                  </div>
                </div>
              ) : (
                <div className="text-2xl font-playfair font-bold text-primary-900">
                  ₱{basePrice.toFixed(2)}
                </div>
              )}
            </div>

            {/* Action Buttons */}
            <div className="flex-shrink-0">
              {!item.available ? (
                <button
                  disabled
                  className="bg-primary-50 text-primary-300 px-6 py-2.5 rounded-sm cursor-not-allowed font-semibold text-xs tracking-widest uppercase"
                >
                  Sold Out
                </button>
              ) : quantity === 0 ? (
                <button
                  onClick={handleAddToCart}
                  className="bg-primary-900 text-accent-400 px-6 py-2.5 rounded-sm hover:bg-primary-800 transition-all duration-300 transform font-bold text-xs tracking-widest uppercase shadow-md active:scale-95"
                >
                  {item.variations?.length || item.addOns?.length ? 'Options' : 'Order'}
                </button>
              ) : (
                <div className="flex items-center space-x-2 bg-primary-50 rounded-sm p-1 border border-primary-100">
                  <button
                    onClick={handleDecrement}
                    className="p-2 hover:bg-primary-100 rounded-sm transition-colors duration-200"
                  >
                    <Minus className="h-4 w-4 text-primary-900" />
                  </button>
                  <span className="font-bold text-primary-900 min-w-[28px] text-center text-sm">{quantity}</span>
                  <button
                    onClick={handleIncrement}
                    className="p-2 hover:bg-primary-100 rounded-sm transition-colors duration-200"
                  >
                    <Plus className="h-4 w-4 text-primary-900" />
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* Stock indicator */}
          {item.trackInventory && item.stockQuantity !== null && (
            <div className="mt-3">
              {item.stockQuantity > item.lowStockThreshold ? (
                <div className="flex items-center space-x-2 text-xs text-green-700 bg-green-50 px-3 py-2 rounded-lg border border-green-200">
                  <span className="font-semibold">✓</span>
                  <span className="font-medium">{item.stockQuantity} in stock</span>
                </div>
              ) : item.stockQuantity > 0 ? (
                <div className="flex items-center space-x-2 text-xs text-orange-700 bg-orange-50 px-3 py-2 rounded-lg border border-orange-200 animate-pulse">
                  <span className="font-semibold">⚠️</span>
                  <span className="font-medium">Only {item.stockQuantity} left!</span>
                </div>
              ) : (
                <div className="flex items-center space-x-2 text-xs text-red-700 bg-red-50 px-3 py-2 rounded-lg border border-red-200">
                  <span className="font-semibold">✕</span>
                  <span className="font-medium">Out of stock</span>
                </div>
              )}
            </div>
          )}

          {/* Add-ons indicator */}
          {item.addOns && item.addOns.length > 0 && (
            <div className="flex items-center space-x-1 text-xs text-gray-500 bg-gray-50 px-2 py-1 rounded-lg mt-2">
              <span>+</span>
              <span>{item.addOns.length} add-on{item.addOns.length > 1 ? 's' : ''} available</span>
            </div>
          )}
        </div>
      </div>

      {/* Customization Modal */}
      {showCustomization && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl max-w-md w-full max-h-[90vh] overflow-y-auto shadow-2xl">
            <div className="sticky top-0 bg-white border-b border-gray-200 p-6 flex items-center justify-between rounded-t-2xl">
              <div>
                <h3 className="text-xl font-semibold text-gray-900">Customize {item.name}</h3>
                <p className="text-sm text-gray-500 mt-1">Choose your preferences</p>
              </div>
              <button
                onClick={() => setShowCustomization(false)}
                className="p-2 hover:bg-gray-100 rounded-full transition-colors duration-200"
              >
                <X className="h-5 w-5 text-gray-500" />
              </button>
            </div>

            <div className="p-6">
              {/* Stock indicator in modal */}
              {item.trackInventory && item.stockQuantity !== null && (
                <div className="mb-6">
                  {item.stockQuantity > item.lowStockThreshold ? (
                    <div className="flex items-center space-x-2 text-sm text-green-700 bg-green-50 px-4 py-3 rounded-lg border border-green-200">
                      <span className="font-semibold">✓</span>
                      <span className="font-medium">{item.stockQuantity} available in stock</span>
                    </div>
                  ) : item.stockQuantity > 0 ? (
                    <div className="flex items-center space-x-2 text-sm text-orange-700 bg-orange-50 px-4 py-3 rounded-lg border border-orange-200">
                      <span className="font-semibold">⚠️</span>
                      <span className="font-medium">Hurry! Only {item.stockQuantity} left in stock</span>
                    </div>
                  ) : (
                    <div className="flex items-center space-x-2 text-sm text-red-700 bg-red-50 px-4 py-3 rounded-lg border border-red-200">
                      <span className="font-semibold">✕</span>
                      <span className="font-medium">Currently out of stock</span>
                    </div>
                  )}
                </div>
              )}

              {/* Size Variations */}
              {item.variations && item.variations.length > 0 && (
                <div className="mb-6">
                  <h4 className="font-playfair font-bold text-primary-900 mb-4 text-lg">Choose Options</h4>
                  <div className="space-y-3">
                    {item.variations.map((variation) => (
                      <label
                        key={variation.id}
                        className={`flex items-center justify-between p-4 border rounded-sm cursor-pointer transition-all duration-300 ${selectedVariation?.id === variation.id
                          ? 'border-accent-500 bg-primary-50 shadow-sm'
                          : 'border-primary-100 hover:border-primary-300 hover:bg-primary-50'
                          }`}
                      >
                        <div className="flex items-center space-x-3">
                          <input
                            type="radio"
                            name="variation"
                            checked={selectedVariation?.id === variation.id}
                            onChange={() => setSelectedVariation(variation)}
                            className="text-primary-900 focus:ring-primary-900"
                          />
                          <span className="font-semibold text-primary-900">{variation.name}</span>
                        </div>
                        <span className="text-primary-900 font-bold font-playfair">
                          ₱{((item.effectivePrice || item.basePrice) + variation.price).toFixed(2)}
                        </span>
                      </label>
                    ))}
                  </div>
                </div>
              )}

              {/* Add-ons */}
              {groupedAddOns && Object.keys(groupedAddOns).length > 0 && (
                <div className="mb-6">
                  <h4 className="font-playfair font-bold text-primary-900 mb-4 text-lg">Enhance Your Dish</h4>
                  {Object.entries(groupedAddOns).map(([category, addOns]) => (
                    <div key={category} className="mb-4">
                      <h5 className="text-[10px] font-bold text-primary-400 mb-3 tracking-[0.2em] uppercase">
                        {category.replace('-', ' ')}
                      </h5>
                      <div className="space-y-3">
                        {addOns.map((addOn) => (
                          <div
                            key={addOn.id}
                            className="flex items-center justify-between p-4 border border-primary-50 rounded-sm hover:border-primary-100 hover:bg-primary-50 transition-all duration-300"
                          >
                            <div className="flex-1">
                              <span className="font-semibold text-primary-900 text-sm tracking-wide">{addOn.name}</span>
                              <div className="text-xs text-primary-500 font-light mt-0.5">
                                {addOn.price > 0 ? `+ ₱${addOn.price.toFixed(2)}` : 'Included'}
                              </div>
                            </div>

                            <div className="flex items-center space-x-2">
                              {selectedAddOns.find(a => a.id === addOn.id) ? (
                                <div className="flex items-center space-x-2 bg-primary-100 rounded-sm p-1 border border-primary-200">
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 1) - 1);
                                    }}
                                    className="p-1.5 hover:bg-primary-200 rounded-sm transition-colors duration-200"
                                  >
                                    <Minus className="h-3 w-3 text-primary-900" />
                                  </button>
                                  <span className="font-bold text-primary-900 min-w-[24px] text-center text-xs">
                                    {selectedAddOns.find(a => a.id === addOn.id)?.quantity || 0}
                                  </span>
                                  <button
                                    type="button"
                                    onClick={() => {
                                      const current = selectedAddOns.find(a => a.id === addOn.id);
                                      updateAddOnQuantity(addOn, (current?.quantity || 0) + 1);
                                    }}
                                    className="p-1.5 hover:bg-primary-200 rounded-sm transition-colors duration-200"
                                  >
                                    <Plus className="h-3 w-3 text-primary-900" />
                                  </button>
                                </div>
                              ) : (
                                <button
                                  type="button"
                                  onClick={() => updateAddOnQuantity(addOn, 1)}
                                  className="flex items-center space-x-1 px-4 py-2 bg-accent-500 text-primary-950 rounded-sm hover:bg-accent-400 transition-all duration-300 text-[10px] font-bold tracking-widest uppercase shadow-sm"
                                >
                                  <Plus className="h-3 w-3" />
                                  <span>Add</span>
                                </button>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Price Summary */}
              <div className="border-t border-primary-100 pt-6 mb-6">
                <div className="flex items-center justify-between text-3xl font-playfair font-bold text-primary-900">
                  <span>Total</span>
                  <span className="text-accent-600">₱{calculatePrice().toFixed(2)}</span>
                </div>
              </div>

              <button
                onClick={handleCustomizedAddToCart}
                className="w-full bg-primary-900 text-accent-400 py-4 rounded-sm hover:bg-primary-850 transition-all duration-300 font-bold flex items-center justify-center space-x-3 shadow-xl transform active:scale-95 tracking-widest uppercase text-sm"
              >
                <ShoppingCart className="h-5 w-5" />
                <span>Add to Order - ₱{calculatePrice().toFixed(2)}</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default MenuItemCard;
