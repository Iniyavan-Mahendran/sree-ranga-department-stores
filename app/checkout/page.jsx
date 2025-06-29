/**
 * Checkout Page
 * This is where customers complete their purchase
 * Like the checkout counter at a store where you pay for your items
 */

'use client';

import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useTranslation } from 'react-i18next';
import { CreditCard, Truck, MapPin, Phone, User, Lock, AlertCircle } from 'lucide-react';
import { clearCart } from '@/store/slices/cartSlice';
import { showNotification } from '@/store/slices/uiSlice';
import { validateShippingAddress, validatePaymentForm } from '@/utils/validation';
import { processPayment, formatAmount } from '@/utils/payment';

const CheckoutPage = () => {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { items, totalPrice } = useSelector((state) => state.cart);
  const { user, isAuthenticated } = useSelector((state) => state.auth);
  
  // Form states (like different pages in a form)
  const [step, setStep] = useState(1); // Which step we're on (1, 2, or 3)
  const [loading, setLoading] = useState(false); // Is payment processing?
  const [errors, setErrors] = useState({}); // Any form errors
  
  // Shipping information (where to send the order)
  const [shippingInfo, setShippingInfo] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
    address: '',
    city: '',
    state: '',
    pincode: ''
  });
  
  // Payment information (how to pay)
  const [paymentInfo, setPaymentInfo] = useState({
    method: 'card', // card, upi, netbanking, cod
    cardNumber: '',
    expiryMonth: '',
    expiryYear: '',
    cvv: '',
    cardholderName: '',
    upiId: ''
  });
  
  // Calculate totals (like adding up your grocery bill)
  const subtotal = totalPrice;
  const tax = Math.round(subtotal * 0.18); // 18% GST
  const shipping = subtotal > 499 ? 0 : 50; // Free shipping over ₹499
  const total = subtotal + tax + shipping;
  
  // Handle form input changes
  const handleInputChange = (section, field, value) => {
    if (section === 'shipping') {
      setShippingInfo(prev => ({ ...prev, [field]: value }));
    } else if (section === 'payment') {
      setPaymentInfo(prev => ({ ...prev, [field]: value }));
    }
    
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: null }));
    }
  };
  
  // Validate and move to next step
  const handleNextStep = () => {
    if (step === 1) {
      // Validate shipping information
      const validation = validateShippingAddress(shippingInfo);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setStep(2);
    } else if (step === 2) {
      // Validate payment information
      const validation = validatePaymentForm(paymentInfo);
      if (!validation.isValid) {
        setErrors(validation.errors);
        return;
      }
      setStep(3);
    }
    setErrors({});
  };
  
  // Process the order (like completing the purchase)
  const handlePlaceOrder = async () => {
    setLoading(true);
    
    try {
      // Process payment
      const paymentResult = await processPayment({
        amount: total,
        method: paymentInfo.method,
        ...paymentInfo
      });
      
      // Clear cart after successful payment
      dispatch(clearCart());
      
      // Show success message
      dispatch(showNotification({
        type: 'success',
        title: 'Order Placed Successfully!',
        message: 'Your order has been confirmed and will be delivered soon.'
      }));
      
      // Redirect to success page
      window.location.href = `/payment/success?orderId=${paymentResult.transactionId}&amount=${total}&method=${paymentInfo.method}`;
      
    } catch (error) {
      console.error('Payment failed:', error);
      
      // Show error message
      dispatch(showNotification({
        type: 'error',
        title: 'Payment Failed',
        message: 'There was an issue processing your payment. Please try again.'
      }));
      
      // Redirect to failure page
      window.location.href = `/payment/failure?reason=${error.message.split(': ')[1] || 'payment_failed'}&orderId=ORD${Date.now()}&amount=${total}`;
      
    } finally {
      setLoading(false);
    }
  };
  
  // Check if user is logged in
  if (!isAuthenticated) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <User size={64} className="mx-auto text-gray-400 mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Please Sign In</h1>
          <p className="text-gray-600 mb-6">
            You need to be logged in to checkout.
          </p>
          <a
            href="/auth/login"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Sign In
          </a>
        </div>
      </div>
    );
  }
  
  // Check if cart is empty
  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16">
        <div className="text-center max-w-md mx-auto">
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Your cart is empty</h1>
          <p className="text-gray-600 mb-6">
            Add some items to your cart before checkout.
          </p>
          <a
            href="/"
            className="inline-block bg-orange-400 hover:bg-orange-500 text-white px-6 py-3 rounded-md font-medium transition-colors"
          >
            Continue Shopping
          </a>
        </div>
      </div>
    );
  }
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>
      
      {/* Progress indicator (shows which step user is on) */}
      <div className="flex items-center justify-center mb-8">
        <div className="flex items-center space-x-4">
          {[1, 2, 3].map((stepNumber) => (
            <div key={stepNumber} className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                step >= stepNumber ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
              }`}>
                {stepNumber}
              </div>
              {stepNumber < 3 && (
                <div className={`w-16 h-1 ${
                  step > stepNumber ? 'bg-orange-400' : 'bg-gray-200'
                }`}></div>
              )}
            </div>
          ))}
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main checkout form */}
        <div className="lg:col-span-2 space-y-6">
          
          {/* Step 1: Shipping Information */}
          {step >= 1 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 1 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  1
                </div>
                <h2 className="text-xl font-bold text-gray-900">Shipping Information</h2>
              </div>
              
              {step === 1 && (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="form-label">Full Name *</label>
                    <div className="relative">
                      <User className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={shippingInfo.name}
                        onChange={(e) => handleInputChange('shipping', 'name', e.target.value)}
                        className={`form-input pl-10 ${errors.name ? 'border-red-500' : ''}`}
                        placeholder="Enter your full name"
                      />
                    </div>
                    {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">Phone Number *</label>
                    <div className="relative">
                      <Phone className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="tel"
                        value={shippingInfo.phone}
                        onChange={(e) => handleInputChange('shipping', 'phone', e.target.value)}
                        className={`form-input pl-10 ${errors.phone ? 'border-red-500' : ''}`}
                        placeholder="+91 9876543210"
                      />
                    </div>
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                  </div>
                  
                  <div className="md:col-span-2">
                    <label className="form-label">Address *</label>
                    <div className="relative">
                      <MapPin className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                      <input
                        type="text"
                        value={shippingInfo.address}
                        onChange={(e) => handleInputChange('shipping', 'address', e.target.value)}
                        className={`form-input pl-10 ${errors.address ? 'border-red-500' : ''}`}
                        placeholder="Enter your address"
                      />
                    </div>
                    {errors.address && <p className="text-red-500 text-sm mt-1">{errors.address}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">City *</label>
                    <input
                      type="text"
                      value={shippingInfo.city}
                      onChange={(e) => handleInputChange('shipping', 'city', e.target.value)}
                      className={`form-input ${errors.city ? 'border-red-500' : ''}`}
                      placeholder="Enter city"
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">State *</label>
                    <input
                      type="text"
                      value={shippingInfo.state}
                      onChange={(e) => handleInputChange('shipping', 'state', e.target.value)}
                      className={`form-input ${errors.state ? 'border-red-500' : ''}`}
                      placeholder="Enter state"
                    />
                    {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
                  </div>
                  
                  <div>
                    <label className="form-label">PIN Code *</label>
                    <input
                      type="text"
                      value={shippingInfo.pincode}
                      onChange={(e) => handleInputChange('shipping', 'pincode', e.target.value)}
                      className={`form-input ${errors.pincode ? 'border-red-500' : ''}`}
                      placeholder="Enter PIN code"
                    />
                    {errors.pincode && <p className="text-red-500 text-sm mt-1">{errors.pincode}</p>}
                  </div>
                </div>
              )}
              
              {step > 1 && (
                <div className="text-gray-600">
                  <p>{shippingInfo.name}</p>
                  <p>{shippingInfo.address}</p>
                  <p>{shippingInfo.city}, {shippingInfo.state} - {shippingInfo.pincode}</p>
                  <p>{shippingInfo.phone}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 2: Payment Method */}
          {step >= 2 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                  step >= 2 ? 'bg-orange-400 text-white' : 'bg-gray-200 text-gray-600'
                }`}>
                  2
                </div>
                <h2 className="text-xl font-bold text-gray-900">Payment Method</h2>
              </div>
              
              {step === 2 && (
                <div className="space-y-4">
                  {/* Payment method selection */}
                  <div className="space-y-3">
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="card"
                        checked={paymentInfo.method === 'card'}
                        onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                        className="text-orange-600"
                      />
                      <CreditCard size={20} className="text-gray-600" />
                      <span className="font-medium">Credit/Debit Card</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="upi"
                        checked={paymentInfo.method === 'upi'}
                        onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                        className="text-orange-600"
                      />
                      <div className="w-5 h-5 bg-orange-400 rounded"></div>
                      <span className="font-medium">UPI Payment</span>
                    </label>
                    
                    <label className="flex items-center space-x-3 p-3 border border-gray-200 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input
                        type="radio"
                        name="payment"
                        value="cod"
                        checked={paymentInfo.method === 'cod'}
                        onChange={(e) => handleInputChange('payment', 'method', e.target.value)}
                        className="text-orange-600"
                      />
                      <Truck size={20} className="text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                  
                  {/* Card payment form */}
                  {paymentInfo.method === 'card' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg space-y-4">
                      <div>
                        <label className="form-label">Card Number *</label>
                        <input
                          type="text"
                          value={paymentInfo.cardNumber}
                          onChange={(e) => handleInputChange('payment', 'cardNumber', e.target.value)}
                          className={`form-input ${errors.cardNumber ? 'border-red-500' : ''}`}
                          placeholder="1234 5678 9012 3456"
                        />
                        {errors.cardNumber && <p className="text-red-500 text-sm mt-1">{errors.cardNumber}</p>}
                      </div>
                      
                      <div className="grid grid-cols-3 gap-4">
                        <div>
                          <label className="form-label">Month *</label>
                          <select
                            value={paymentInfo.expiryMonth}
                            onChange={(e) => handleInputChange('payment', 'expiryMonth', e.target.value)}
                            className={`form-input ${errors.expiry ? 'border-red-500' : ''}`}
                          >
                            <option value="">MM</option>
                            {Array.from({ length: 12 }, (_, i) => (
                              <option key={i + 1} value={String(i + 1).padStart(2, '0')}>
                                {String(i + 1).padStart(2, '0')}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="form-label">Year *</label>
                          <select
                            value={paymentInfo.expiryYear}
                            onChange={(e) => handleInputChange('payment', 'expiryYear', e.target.value)}
                            className={`form-input ${errors.expiry ? 'border-red-500' : ''}`}
                          >
                            <option value="">YY</option>
                            {Array.from({ length: 10 }, (_, i) => (
                              <option key={i} value={String(new Date().getFullYear() + i).slice(-2)}>
                                {String(new Date().getFullYear() + i).slice(-2)}
                              </option>
                            ))}
                          </select>
                        </div>
                        
                        <div>
                          <label className="form-label">CVV *</label>
                          <input
                            type="text"
                            value={paymentInfo.cvv}
                            onChange={(e) => handleInputChange('payment', 'cvv', e.target.value)}
                            className={`form-input ${errors.cvv ? 'border-red-500' : ''}`}
                            placeholder="123"
                            maxLength="4"
                          />
                        </div>
                      </div>
                      
                      {(errors.expiry || errors.cvv) && (
                        <p className="text-red-500 text-sm">{errors.expiry || errors.cvv}</p>
                      )}
                      
                      <div>
                        <label className="form-label">Cardholder Name *</label>
                        <input
                          type="text"
                          value={paymentInfo.cardholderName}
                          onChange={(e) => handleInputChange('payment', 'cardholderName', e.target.value)}
                          className={`form-input ${errors.cardholderName ? 'border-red-500' : ''}`}
                          placeholder="Name on card"
                        />
                        {errors.cardholderName && <p className="text-red-500 text-sm mt-1">{errors.cardholderName}</p>}
                      </div>
                    </div>
                  )}
                  
                  {/* UPI payment form */}
                  {paymentInfo.method === 'upi' && (
                    <div className="mt-4 p-4 bg-gray-50 rounded-lg">
                      <label className="form-label">UPI ID *</label>
                      <input
                        type="text"
                        value={paymentInfo.upiId}
                        onChange={(e) => handleInputChange('payment', 'upiId', e.target.value)}
                        className={`form-input ${errors.upiId ? 'border-red-500' : ''}`}
                        placeholder="yourname@upi"
                      />
                      {errors.upiId && <p className="text-red-500 text-sm mt-1">{errors.upiId}</p>}
                    </div>
                  )}
                </div>
              )}
              
              {step > 2 && (
                <div className="text-gray-600">
                  <p>Payment Method: {paymentInfo.method === 'card' ? 'Credit/Debit Card' : paymentInfo.method === 'upi' ? 'UPI Payment' : 'Cash on Delivery'}</p>
                </div>
              )}
            </div>
          )}
          
          {/* Step 3: Review Order */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-sm border p-6">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-orange-400 text-white rounded-full flex items-center justify-center">
                  3
                </div>
                <h2 className="text-xl font-bold text-gray-900">Review Order</h2>
              </div>
              
              <div className="space-y-4">
                <div className="flex items-center space-x-2 text-green-600">
                  <Lock size={16} />
                  <span className="text-sm">Your payment information is secure and encrypted</span>
                </div>
                
                <button
                  onClick={handlePlaceOrder}
                  disabled={loading}
                  className="w-full bg-green-600 hover:bg-green-700 text-white py-3 px-6 rounded-md font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {loading ? 'Processing...' : `Place Order - ${formatAmount(total)}`}
                </button>
              </div>
            </div>
          )}
          
          {/* Navigation buttons */}
          {step < 3 && (
            <div className="flex justify-between">
              {step > 1 && (
                <button
                  onClick={() => setStep(step - 1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-900 py-2 px-6 rounded-md font-medium transition-colors"
                >
                  Back
                </button>
              )}
              <button
                onClick={handleNextStep}
                className="bg-orange-400 hover:bg-orange-500 text-white py-2 px-6 rounded-md font-medium transition-colors ml-auto"
              >
                Continue
              </button>
            </div>
          )}
        </div>
        
        {/* Order Summary */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-sm border p-6 sticky top-4">
            <h2 className="text-xl font-bold text-gray-900 mb-4">Order Summary</h2>
            
            {/* Order Items */}
            <div className="space-y-3 mb-4">
              {items.map((item) => (
                <div key={item.id} className="flex items-center space-x-3">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-12 h-12 object-cover rounded"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-sm">{item.name}</p>
                    <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                  </div>
                  <p className="font-medium">₹{(item.price * item.quantity).toLocaleString()}</p>
                </div>
              ))}
            </div>
            
            {/* Price Breakdown */}
            <div className="space-y-2 mb-4 pt-4 border-t">
              <div className="flex justify-between">
                <span className="text-gray-600">Subtotal</span>
                <span>₹{subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Shipping</span>
                <span className={shipping === 0 ? 'text-green-600' : ''}>
                  {shipping === 0 ? 'FREE' : `₹${shipping}`}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Tax (GST)</span>
                <span>₹{tax.toLocaleString()}</span>
              </div>
              <hr />
              <div className="flex justify-between text-lg font-bold">
                <span>Total</span>
                <span>₹{total.toLocaleString()}</span>
              </div>
            </div>
            
            {/* Security info */}
            <div className="text-sm text-gray-600">
              <div className="flex items-center space-x-2 mb-2">
                <Lock size={16} className="text-green-600" />
                <span>Secure payment processing</span>
              </div>
              <p>• Free delivery on orders above ₹499</p>
              <p>• Easy 30-day returns</p>
              <p>• 24/7 customer support</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutPage;