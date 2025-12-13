import React from 'react';
import { ArrowLeft, ShieldCheck, Truck, MessageCircle, Heart, Share2 } from 'lucide-react';
import { Link, useParams } from 'react-router-dom';
import { PRODUCTS } from '../data/mockData';
import toast, { Toaster } from 'react-hot-toast';

const ProductDetail = () => {
  const { id } = useParams();
  
  // Cari produk berdasarkan ID (konversi string ke number)
  const product = PRODUCTS.find(p => p.id === parseInt(id)) || PRODUCTS[0];

  const handleBuy = () => {
    toast.success('Dialihkan ke pembayaran...', {
        style: { borderRadius: '10px', background: '#333', color: '#fff' },
        icon: '🚀',
    });
    // Logic Midtrans disini
  };

  const handleWishlist = () => {
    toast('Ditambahkan ke Wishlist', { icon: '❤️' });
  }

  return (
    <div className="bg-slate-50 min-h-screen pb-32 md:pb-10 pt-20">
      <Toaster position="top-center" />
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
           <Link to="/" className="hover:text-primary">Home</Link>
           <span>/</span>
           <span className="text-gray-800 font-medium truncate">{product.title}</span>
        </div>

        <div className="grid md:grid-cols-12 gap-8 lg:gap-16">
          
          {/* Left Column: Images */}
          <div className="md:col-span-7">
             <div className="bg-white rounded-3xl overflow-hidden shadow-sm border border-gray-100 relative group cursor-zoom-in">
                <img src={product.image} alt={product.title} className="w-full h-[400px] md:h-[600px] object-cover" />
                <button className="absolute top-4 right-4 bg-white/60 backdrop-blur p-2 rounded-full hover:bg-white transition shadow-sm">
                   <Share2 className="w-5 h-5 text-gray-700" />
                </button>
             </div>
             {/* Thumbnail Gallery (Dummy) */}
             <div className="grid grid-cols-4 gap-4 mt-4">
                {[1,2,3,4].map((item) => (
                   <div key={item} className={`rounded-xl h-20 bg-white overflow-hidden border-2 cursor-pointer ${item === 1 ? 'border-primary' : 'border-transparent'}`}>
                      <img src={product.image} className="w-full h-full object-cover opacity-80 hover:opacity-100" />
                   </div>
                ))}
             </div>
          </div>

          {/* Right Column: Details */}
          <div className="md:col-span-5">
             <div className="bg-white p-6 md:p-8 rounded-3xl shadow-sm border border-gray-100 sticky top-24">
                
                <div className="flex justify-between items-start mb-4">
                   <span className="bg-accent/10 text-accent px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider">{product.category}</span>
                   <span className="text-gray-400 text-sm">Diupdate 2 jam lalu</span>
                </div>

                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight mb-2">{product.title}</h1>
                
                <div className="flex items-baseline gap-2 mb-6">
                   <span className="text-4xl font-black text-primary">Rp {product.price.toLocaleString('id-ID')}</span>
                   <span className="text-sm text-gray-400 line-through">Rp {(product.price * 1.2).toLocaleString('id-ID')}</span>
                </div>

                <hr className="border-gray-100 my-6" />

                {/* Seller Info */}
                <div className="flex items-center gap-4 mb-6">
                   <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-primary to-slate-700 flex items-center justify-center text-white font-bold text-lg">
                      GS
                   </div>
                   <div className="flex-1">
                      <h3 className="font-bold text-gray-900">Gadget Store ID</h3>
                      <div className="flex items-center text-xs text-gray-500 gap-2">
                         <span className="text-green-600 font-medium">● Online</span>
                         <span>•</span>
                         <span>{product.location}</span>
                      </div>
                   </div>
                   <button className="text-primary font-bold text-sm hover:underline">Lihat Profil</button>
                </div>

                {/* Desktop Buttons */}
                <div className="hidden md:flex gap-3 mb-8">
                   <button onClick={handleWishlist} className="px-4 py-3 border-2 border-gray-200 rounded-xl hover:border-red-500 hover:text-red-500 transition">
                      <Heart className="w-6 h-6" />
                   </button>
                   <button className="flex-1 border-2 border-primary text-primary font-bold py-3 rounded-xl hover:bg-blue-50 transition">
                      Chat Penjual
                   </button>
                   <button onClick={handleBuy} className="flex-[2] bg-primary text-white font-bold py-3 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-primary/25">
                      Beli Sekarang
                   </button>
                </div>

                {/* Trust Features */}
                <div className="space-y-4">
                   <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <ShieldCheck className="w-6 h-6 text-green-600 flex-shrink-0" />
                      <div>
                         <h4 className="font-bold text-sm text-gray-900">Proteksi Jaminan 100%</h4>
                         <p className="text-xs text-gray-500 mt-1">Uang kembali jika barang tidak sesuai deskripsi.</p>
                      </div>
                   </div>
                   <div className="flex gap-4 p-4 bg-slate-50 rounded-xl">
                      <Truck className="w-6 h-6 text-blue-600 flex-shrink-0" />
                      <div>
                         <h4 className="font-bold text-sm text-gray-900">Pengiriman Cepat</h4>
                         <p className="text-xs text-gray-500 mt-1">Tersedia layanan Instant & Sameday untuk area {product.location}.</p>
                      </div>
                   </div>
                </div>

             </div>
          </div>
        </div>
      </div>

      {/* Mobile Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 p-4 shadow-[0_-4px_20px_rgba(0,0,0,0.05)] z-50 flex gap-3">
         <button className="p-3 border border-gray-200 rounded-xl hover:bg-gray-50">
            <MessageCircle className="w-6 h-6 text-gray-600" />
         </button>
         <button onClick={handleBuy} className="flex-1 bg-primary text-white font-bold rounded-xl shadow-lg shadow-primary/20">
            Beli Sekarang
         </button>
      </div>

    </div>
  );
};

export default ProductDetail;