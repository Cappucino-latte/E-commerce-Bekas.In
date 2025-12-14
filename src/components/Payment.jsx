
import React, { useState, useEffect } from 'react';
import { CreditCard, Shield, CheckCircle } from 'lucide-react';
import { useCart } from '../contexts/CartContext';
import toast from 'react-hot-toast';

// Utility function for generating order IDs
const generateOrderId = () => {
  return `ORDER-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
};

const Payment = ({ onPaymentSuccess }) => {
  const [paymentMethod, setPaymentMethod] = useState('midtrans');
  const [isProcessing, setIsProcessing] = useState(false);
  const { cartItems, getTotalPrice, clearCart } = useCart();

  const totalAmount = getTotalPrice();

  // Load Midtrans SDK
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://app.midtrans.com/snap/snap.js';
    script.setAttribute('data-client-key', 'SB-Mid-client-YourClientKey'); // Replace with actual client key
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);




  const handlePayment = async () => {
    if (cartItems.length === 0) {
      toast.error('Keranjang kosong!');
      return;
    }

    setIsProcessing(true);

    try {
      // Generate order ID using utility function
      const orderId = generateOrderId();

      // Prepare order data
      const orderData = {
        transaction_details: {
          order_id: orderId,
          gross_amount: totalAmount
        },
        item_details: cartItems.map(item => ({
          id: item.id,
          price: item.price,
          quantity: item.quantity,
          name: item.title
        })),
        customer_details: {
          first_name: 'John',
          last_name: 'Doe',
          email: 'john.doe@example.com',
          phone: '+6281234567890'
        }
      };

      // In a real implementation, you would send this to your backend
      // which would then create a transaction with Midtrans
      console.log('Order Data:', orderData);

      // Simulate Midtrans payment
      if (window.snap) {
        window.snap.pay(orderData.transaction_details.order_id, {
          onSuccess: function(result) {
            console.log('Payment success:', result);
            toast.success('Pembayaran berhasil!');
            clearCart();
            onPaymentSuccess && onPaymentSuccess(result);
            setIsProcessing(false);
          },
          onPending: function(result) {
            console.log('Payment pending:', result);
            toast('Pembayaran sedang diproses...');
            setIsProcessing(false);
          },
          onError: function(result) {
            console.log('Payment error:', result);
            toast.error('Pembayaran gagal!');
            setIsProcessing(false);
          },
          onClose: function() {
            console.log('Payment popup closed');
            setIsProcessing(false);
          }
        });
      } else {
        // Fallback for demo
        setTimeout(() => {
          toast.success('Pembayaran berhasil! (Demo)');
          clearCart();
          onPaymentSuccess && onPaymentSuccess({ status: 'success' });
          setIsProcessing(false);
        }, 2000);
      }
    } catch (error) {
      console.error('Payment error:', error);
      toast.error('Terjadi kesalahan saat memproses pembayaran');
      setIsProcessing(false);
    }
  };

  return (
    <div className="bg-white rounded-3xl p-6 md:p-8 shadow-sm border border-gray-100">
      <div className="flex items-center gap-3 mb-6">
        <CreditCard className="w-6 h-6 text-primary" />
        <h3 className="text-xl font-bold text-gray-900">Pembayaran</h3>
      </div>

      {/* Payment Method Selection */}
      <div className="mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Metode Pembayaran</h4>
        <div className="space-y-3">
          <label className="flex items-center p-4 border border-gray-200 rounded-xl cursor-pointer hover:border-primary transition">
            <input
              type="radio"
              name="paymentMethod"
              value="midtrans"
              checked={paymentMethod === 'midtrans'}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mr-3"
            />
            <div className="flex items-center gap-3">
              <img src="https://via.placeholder.com/40x24/0066CC/FFFFFF?text=MIDTRANS" alt="Midtrans" className="w-10 h-6 object-cover rounded" />
              <div>
                <div className="font-medium text-gray-900">Midtrans</div>
                <div className="text-sm text-gray-500">Transfer Bank, E-Wallet, Kartu Kredit</div>
              </div>
            </div>
          </label>
        </div>
      </div>

      {/* Order Summary */}
      <div className="bg-gray-50 rounded-xl p-4 mb-6">
        <h4 className="font-semibold text-gray-800 mb-3">Ringkasan Pesanan</h4>
        <div className="space-y-2">
          {cartItems.map(item => (
            <div key={item.id} className="flex justify-between text-sm">
              <span>{item.title} x{item.quantity}</span>
              <span>Rp {(item.price * item.quantity).toLocaleString('id-ID')}</span>
            </div>
          ))}
          <hr className="my-2" />
          <div className="flex justify-between font-semibold">
            <span>Total</span>
            <span>Rp {totalAmount.toLocaleString('id-ID')}</span>
          </div>
        </div>
      </div>

      {/* Security Notice */}
      <div className="flex items-center gap-3 p-4 bg-green-50 rounded-xl mb-6">
        <Shield className="w-5 h-5 text-green-600" />
        <div className="text-sm">
          <div className="font-medium text-green-800">Pembayaran Aman 100%</div>
          <div className="text-green-600">Dijamin oleh Midtrans dengan enkripsi SSL</div>
        </div>
      </div>

      {/* Pay Button */}
      <button
        onClick={handlePayment}
        disabled={isProcessing || cartItems.length === 0}
        className="w-full bg-primary text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition shadow-lg shadow-primary/20 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        {isProcessing ? (
          <>
            <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
            Memproses...
          </>
        ) : (
          <>
            <CheckCircle className="w-5 h-5" />
            Bayar Sekarang - Rp {totalAmount.toLocaleString('id-ID')}
          </>
        )}
      </button>

      <p className="text-xs text-gray-500 text-center mt-3">
        Dengan melanjutkan, Anda menyetujui syarat dan ketentuan pembayaran
      </p>
    </div>
  );
};

export default Payment;
