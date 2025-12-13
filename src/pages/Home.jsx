import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion'; // Import motion
import ProductCard from '../components/ProductCard';
import ProductSkeleton from '../components/ProductSkeleton';
import { PRODUCTS, CATEGORIES } from '../data/mockData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState('Semua');
  const [isLoading, setIsLoading] = useState(true);
  const [filteredProducts, setFilteredProducts] = useState([]);

  // Handler saat tombol kategori diklik
  const handleCategoryClick = (cat) => {
    setActiveCategory(cat);
    setIsLoading(true); // Set loading DISINI
  };

  // Efek hanya untuk simulasi fetch data
  useEffect(() => {
    const timer = setTimeout(() => {
      if (activeCategory === 'Semua') {
        setFilteredProducts(PRODUCTS);
      } else {
        setFilteredProducts(PRODUCTS.filter(p => p.category === activeCategory));
      }
      setIsLoading(false);
    }, 800);

    return () => clearTimeout(timer); // Cleanup function
  }, [activeCategory]);

  return (
    <div className="pb-20 bg-slate-50 min-h-screen">
      
      {/* Hero Section */}
      <div className="relative bg-primary overflow-hidden pt-32 pb-20 px-4 sm:px-6 lg:px-8 rounded-b-[40px] shadow-2xl">
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0">
           <div className="absolute top-[-10%] right-[-5%] w-96 h-96 bg-purple-500/30 rounded-full blur-[100px] animate-pulse"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-96 h-96 bg-accent/20 rounded-full blur-[100px]"></div>
        </div>

        <div className="relative z-10 max-w-7xl mx-auto text-center">
          {/* PERHATIKAN: Tag ini diganti jadi motion.div */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <span className="inline-block py-1 px-3 rounded-full bg-white/10 backdrop-blur-md border border-white/20 text-accent text-xs font-bold tracking-widest uppercase mb-4">
              Platform #1 Jual Beli Aman
            </span>
            <h1 className="text-5xl md:text-7xl font-black text-white tracking-tight leading-tight mb-6">
              Barang Bekas, <br/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent to-purple-400">Kualitas Berkelas.</span>
            </h1>
            <p className="text-slate-300 text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed">
              Upgrade gadgetmu tanpa menguras dompet. Sistem pembayaran aman, verifikasi penjual ketat, dan garansi uang kembali.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
               <button className="bg-accent text-primary px-8 py-4 rounded-full font-bold text-lg hover:bg-white hover:scale-105 transition-all shadow-[0_0_40px_rgba(56,189,248,0.4)]">
                 Mulai Belanja
               </button>
               <button className="px-8 py-4 rounded-full font-bold text-white border border-white/20 hover:bg-white/10 backdrop-blur-sm transition-all">
                 Pasang Iklan Gratis
               </button>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 -mt-10 relative z-20">
         
         {/* Category Filter */}
         <div className="bg-white/80 backdrop-blur-xl p-3 rounded-2xl shadow-xl border border-white/40 flex gap-3 overflow-x-auto scrollbar-hide mb-10 mx-auto max-w-4xl">
            {CATEGORIES.map((cat, idx) => (
                <button 
                  key={idx} 
                  onClick={() => handleCategoryClick(cat)}
                  className={`px-6 py-2.5 rounded-xl text-sm font-bold whitespace-nowrap transition-all duration-300 ${activeCategory === cat ? 'bg-primary text-white shadow-lg scale-105' : 'bg-transparent text-gray-500 hover:bg-gray-100 hover:text-gray-900'}`}
                >
                    {cat}
                </button>
            ))}
         </div>

         {/* Product Grid */}
         <div className="mb-8">
            <div className="flex items-end justify-between mb-6 px-2">
               <div>
                 <h2 className="text-2xl font-bold text-gray-800">Rekomendasi Pilihan</h2>
                 <p className="text-sm text-gray-500 mt-1">Menampilkan {activeCategory}</p>
               </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {isLoading ? (
                Array(8).fill(0).map((_, i) => <ProductSkeleton key={i} />)
              ) : filteredProducts.length > 0 ? (
                filteredProducts.map((product) => (
                  <ProductCard key={product.id} product={product} />
                ))
              ) : (
                <div className="col-span-full py-20 text-center">
                   <p className="text-gray-400 text-lg">Tidak ada barang di kategori ini.</p>
                </div>
              )}
            </div>
         </div>
      </div>
    </div>
  );
};

export default Home;