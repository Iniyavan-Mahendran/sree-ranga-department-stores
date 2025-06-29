/**
 * Payment Processing Utilities
 * These functions help handle payments safely
 * Like a cashier that processes your payment at a store
 */

/**
 * Validate credit card number using Luhn algorithm
 * @param {string} cardNumber - The card number to validate
 * @returns {boolean} - True if valid, false if not
 */
export const validateCardNumber = (cardNumber) => {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it's all digits and reasonable length
  if (!/^\d{13,19}$/.test(cleaned)) {
    return false;
  }
  
  // Luhn algorithm (like a math formula to check if card number is real)
  let sum = 0;
  let isEven = false;
  
  // Go through each digit from right to left
  for (let i = cleaned.length - 1; i >= 0; i--) {
    let digit = parseInt(cleaned[i]);
    
    if (isEven) {
      digit *= 2;
      if (digit > 9) {
        digit -= 9;
      }
    }
    
    sum += digit;
    isEven = !isEven;
  }
  
  return sum % 10 === 0;
};

/**
 * Get card type from card number
 * @param {string} cardNumber - The card number
 * @returns {string} - Card type (visa, mastercard, etc.)
 */
export const getCardType = (cardNumber) => {
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Visa cards start with 4
  if (/^4/.test(cleaned)) {
    return 'visa';
  }
  
  // Mastercard starts with 5 or 2
  if (/^5[1-5]/.test(cleaned) || /^2[2-7]/.test(cleaned)) {
    return 'mastercard';
  }
  
  // American Express starts with 34 or 37
  if (/^3[47]/.test(cleaned)) {
    return 'amex';
  }
  
  // Discover starts with 6
  if (/^6/.test(cleaned)) {
    return 'discover';
  }
  
  return 'unknown';
};

/**
 * Format card number for display
 * @param {string} cardNumber - The card number
 * @returns {string} - Formatted card number
 */
export const formatCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  const cardType = getCardType(cleaned);
  
  // American Express has different formatting (4-6-5)
  if (cardType === 'amex') {
    return cleaned.replace(/(\d{4})(\d{6})(\d{5})/, '$1 $2 $3');
  }
  
  // Most cards use 4-4-4-4 format
  return cleaned.replace(/(\d{4})(?=\d)/g, '$1 ');
};

/**
 * Mask card number for security
 * @param {string} cardNumber - The card number
 * @returns {string} - Masked card number (like **** **** **** 1234)
 */
export const maskCardNumber = (cardNumber) => {
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  if (cleaned.length < 4) return cardNumber;
  
  const lastFour = cleaned.slice(-4);
  const masked = '*'.repeat(cleaned.length - 4);
  
  return formatCardNumber(masked + lastFour);
};

/**
 * Validate expiry date
 * @param {string} month - Month (01-12)
 * @param {string} year - Year (YY or YYYY)
 * @returns {boolean} - True if valid and not expired
 */
export const validateExpiryDate = (month, year) => {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // JavaScript months are 0-based
  
  // Convert to numbers
  const expMonth = parseInt(month);
  const expYear = year.length === 2 ? 2000 + parseInt(year) : parseInt(year);
  
  // Check if month is valid
  if (expMonth < 1 || expMonth > 12) {
    return false;
  }
  
  // Check if date is in the future
  if (expYear > currentYear) {
    return true;
  } else if (expYear === currentYear) {
    return expMonth >= currentMonth;
  } else {
    return false;
  }
};

/**
 * Validate CVV code
 * @param {string} cvv - The CVV code
 * @param {string} cardType - The card type
 * @returns {boolean} - True if valid
 */
export const validateCVV = (cvv, cardType = 'unknown') => {
  // American Express CVV is 4 digits, others are 3
  const expectedLength = cardType === 'amex' ? 4 : 3;
  return /^\d+$/.test(cvv) && cvv.length === expectedLength;
};

/**
 * Calculate payment processing fee
 * @param {number} amount - The payment amount
 * @param {string} method - Payment method
 * @returns {number} - Processing fee
 */
export const calculateProcessingFee = (amount, method) => {
  switch (method) {
    case 'card':
      return Math.round(amount * 0.025); // 2.5% for cards
    case 'upi':
      return 0; // UPI is usually free
    case 'netbanking':
      return Math.round(amount * 0.01); // 1% for net banking
    case 'wallet':
      return 0; // Wallet payments are usually free
    default:
      return 0;
  }
};

/**
 * Generate payment reference ID
 * @returns {string} - Unique payment reference
 */
export const generatePaymentReference = () => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substr(2, 9);
  return `PAY_${timestamp}_${random}`.toUpperCase();
};

/**
 * Validate payment form data
 * @param {object} paymentData - Payment form data
 * @returns {object} - Validation result
 */
export const validatePaymentForm = (paymentData) => {
  const errors = {};
  
  if (paymentData.method === 'card') {
    // Validate card number
    if (!paymentData.cardNumber || !validateCardNumber(paymentData.cardNumber)) {
      errors.cardNumber = 'Please enter a valid card number';
    }
    
    // Validate expiry date
    if (!paymentData.expiryMonth || !paymentData.expiryYear) {
      errors.expiry = 'Please enter expiry date';
    } else if (!validateExpiryDate(paymentData.expiryMonth, paymentData.expiryYear)) {
      errors.expiry = 'Card has expired or invalid date';
    }
    
    // Validate CVV
    const cardType = getCardType(paymentData.cardNumber || '');
    if (!paymentData.cvv || !validateCVV(paymentData.cvv, cardType)) {
      errors.cvv = 'Please enter a valid CVV';
    }
    
    // Validate cardholder name
    if (!paymentData.cardholderName || paymentData.cardholderName.trim().length < 2) {
      errors.cardholderName = 'Please enter cardholder name';
    }
  }
  
  if (paymentData.method === 'upi') {
    // Validate UPI ID
    if (!paymentData.upiId || !/^[\w.-]+@[\w.-]+$/.test(paymentData.upiId)) {
      errors.upiId = 'Please enter a valid UPI ID';
    }
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

/**
 * Mock payment processing (for development)
 * @param {object} paymentData - Payment information
 * @returns {Promise} - Payment result
 */
export const processPayment = async (paymentData) => {
  // Simulate network delay
  await new Promise(resolve => setTimeout(resolve, 2000));
  
  // Simulate random success/failure for testing
  const shouldSucceed = Math.random() > 0.1; // 90% success rate
  
  if (shouldSucceed) {
    return {
      success: true,
      transactionId: generatePaymentReference(),
      amount: paymentData.amount,
      method: paymentData.method,
      timestamp: new Date().toISOString()
    };
  } else {
    // Simulate different failure reasons
    const failureReasons = [
      'insufficient_funds',
      'card_declined',
      'expired_card',
      'network_error'
    ];
    
    const randomReason = failureReasons[Math.floor(Math.random() * failureReasons.length)];
    
    throw new Error(`Payment failed: ${randomReason}`);
  }
};

/**
 * Format amount for display
 * @param {number} amount - Amount in smallest currency unit
 * @returns {string} - Formatted amount
 */
export const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2
  }).format(amount);
};

/**
 * Get payment method display name
 * @param {string} method - Payment method code
 * @returns {string} - Display name
 */
export const getPaymentMethodName = (method) => {
  const methods = {
    card: 'Credit/Debit Card',
    upi: 'UPI Payment',
    netbanking: 'Net Banking',
    wallet: 'Digital Wallet',
    cod: 'Cash on Delivery'
  };
  
  return methods[method] || method;
};