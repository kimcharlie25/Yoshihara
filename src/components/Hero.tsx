import React from 'react';

const Hero: React.FC = () => {
  return (
    <section className="relative bg-primary-900 overflow-hidden py-24 px-4">
      {/* Decorative floral/pattern background element could go here */}
      <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/shippo.png')]"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        <h1 className="text-5xl md:text-7xl font-playfair font-bold text-accent-400 mb-6 animate-fade-in drop-shadow-md">
          Yoshihara
          <span className="block text-white text-2xl md:text-4xl mt-2 font-normal tracking-widest uppercase">Japanese Dining & Grocery</span>
        </h1>
        <p className="text-xl text-primary-100 mb-10 max-w-2xl mx-auto animate-slide-up font-light tracking-wide">
          Exquisite Japanese cuisine crafted with tradition and passion.
        </p>
        <div className="flex justify-center">
          <a
            href="#menu"
            className="bg-accent-500 text-primary-950 px-10 py-4 rounded-sm hover:bg-accent-400 transition-all duration-300 transform hover:scale-105 font-semibold tracking-widest uppercase text-sm shadow-xl"
          >
            Experience Our Menu
          </a>
        </div>
      </div>
    </section>
  );
};

export default Hero;