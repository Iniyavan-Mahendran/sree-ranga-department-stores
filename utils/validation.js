/**
 * Validation Helper Functions
 * These functions check if user input is correct
 * Think of them like spell-checkers for different types of information
 */

/**
 * Check if email address is valid
 * @param {string} email - The email to check
 * @returns {boolean} - True if email is valid, false if not
 */
export const isValidEmail = (email) => {
  // This pattern checks if email looks like: someone@example.com
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailPattern.test(email);
};

/**
 * Check if phone number is valid (Indian format)
 * @param {string} phone - The phone number to check
 * @returns {boolean} - True if phone is valid, false if not
 */
export const isValidPhone = (phone) => {
  // This pattern checks for Indian phone numbers like: +91 9876543210 or 9876543210
  const phonePattern = /^(\+91[\-\s]?)?[0]?(91)?[6-9]\d{9}$/;
  return phonePattern.test(phone.replace(/\s/g, ''));
};

/**
 * Check if password is strong enough
 * @param {string} password - The password to check
 * @returns {object} - Object with isValid and errors
 */
export const validatePassword = (password) => {
  const errors = [];
  
  // Check minimum length (like making sure a key is long enough)
  if (password.length < 8) {
    errors.push('Password must be at least 8 characters long');
  }
  
  // Check for uppercase letter (like A, B, C)
  if (!/[A-Z]/.test(password)) {
    errors.push('Password must contain at least one uppercase letter');
  }
  
  // Check for lowercase letter (like a, b, c)
  if (!/[a-z]/.test(password)) {
    errors.push('Password must contain at least one lowercase letter');
  }
  
  // Check for number (like 1, 2, 3)
  if (!/\d/.test(password)) {
    errors.push('Password must contain at least one number');
  }
  
  // Check for special character (like !, @, #)
  if (!/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
    errors.push('Password must contain at least one special character');
  }
  
  return {
    isValid: errors.length === 0,
    errors: errors
  };
};

/**
 * Check if name is valid
 * @param {string} name - The name to check
 * @returns {boolean} - True if name is valid, false if not
 */
export const isValidName = (name) => {
  // Name should be at least 2 characters and only contain letters and spaces
  const namePattern = /^[a-zA-Z\s]{2,50}$/;
  return namePattern.test(name.trim());
};

/**
 * Check if PIN code is valid (Indian format)
 * @param {string} pincode - The PIN code to check
 * @returns {boolean} - True if PIN code is valid, false if not
 */
export const isValidPincode = (pincode) => {
  // Indian PIN codes are 6 digits
  const pincodePattern = /^[1-9][0-9]{5}$/;
  return pincodePattern.test(pincode);
};

/**
 * Check if age is valid
 * @param {number} age - The age to check
 * @returns {boolean} - True if age is valid, false if not
 */
export const isValidAge = (age) => {
  return age >= 13 && age <= 120; // Reasonable age range for online shopping
};

/**
 * Validate form data for user registration
 * @param {object} formData - The form data to validate
 * @returns {object} - Object with isValid and errors
 */
export const validateRegistrationForm = (formData) => {
  const errors = {};
  
  // Check name
  if (!formData.name || !isValidName(formData.name)) {
    errors.name = 'Please enter a valid name (2-50 characters, letters only)';
  }
  
  // Check email
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Check phone
  if (!formData.phone || !isValidPhone(formData.phone)) {
    errors.phone = 'Please enter a valid Indian phone number';
  }
  
  // Check password
  if (!formData.password) {
    errors.password = 'Password is required';
  } else {
    const passwordValidation = validatePassword(formData.password);
    if (!passwordValidation.isValid) {
      errors.password = passwordValidation.errors[0]; // Show first error
    }
  }
  
  // Check password confirmation
  if (formData.password !== formData.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
};

/**
 * Validate form data for user login
 * @param {object} formData - The form data to validate
 * @returns {object} - Object with isValid and errors
 */
export const validateLoginForm = (formData) => {
  const errors = {};
  
  // Check email
  if (!formData.email || !isValidEmail(formData.email)) {
    errors.email = 'Please enter a valid email address';
  }
  
  // Check password
  if (!formData.password || formData.password.length < 1) {
    errors.password = 'Password is required';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
};

/**
 * Validate shipping address
 * @param {object} address - The address to validate
 * @returns {object} - Object with isValid and errors
 */
export const validateShippingAddress = (address) => {
  const errors = {};
  
  // Check name
  if (!address.name || !isValidName(address.name)) {
    errors.name = 'Please enter a valid name';
  }
  
  // Check phone
  if (!address.phone || !isValidPhone(address.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }
  
  // Check address line
  if (!address.address || address.address.trim().length < 10) {
    errors.address = 'Please enter a complete address (at least 10 characters)';
  }
  
  // Check city
  if (!address.city || address.city.trim().length < 2) {
    errors.city = 'Please enter a valid city name';
  }
  
  // Check state
  if (!address.state || address.state.trim().length < 2) {
    errors.state = 'Please enter a valid state name';
  }
  
  // Check PIN code
  if (!address.pincode || !isValidPincode(address.pincode)) {
    errors.pincode = 'Please enter a valid 6-digit PIN code';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors: errors
  };
};

/**
 * Sanitize user input (remove dangerous characters)
 * @param {string} input - The input to sanitize
 * @returns {string} - Clean input
 */
export const sanitizeInput = (input) => {
  if (typeof input !== 'string') return input;
  
  return input
    .trim() // Remove spaces from beginning and end
    .replace(/[<>]/g, '') // Remove < and > characters
    .replace(/javascript:/gi, '') // Remove javascript: links
    .replace(/on\w+=/gi, ''); // Remove event handlers like onclick=
};

/**
 * Format phone number for display
 * @param {string} phone - The phone number to format
 * @returns {string} - Formatted phone number
 */
export const formatPhoneNumber = (phone) => {
  // Remove all non-digits
  const cleaned = phone.replace(/\D/g, '');
  
  // Format as +91 XXXXX XXXXX
  if (cleaned.length === 10) {
    return `+91 ${cleaned.slice(0, 5)} ${cleaned.slice(5)}`;
  } else if (cleaned.length === 12 && cleaned.startsWith('91')) {
    return `+91 ${cleaned.slice(2, 7)} ${cleaned.slice(7)}`;
  }
  
  return phone; // Return original if can't format
};

/**
 * Check if a string contains only numbers
 * @param {string} str - The string to check
 * @returns {boolean} - True if only numbers, false if not
 */
export const isNumeric = (str) => {
  return /^\d+$/.test(str);
};

/**
 * Check if a value is empty or null
 * @param {any} value - The value to check
 * @returns {boolean} - True if empty, false if not
 */
export const isEmpty = (value) => {
  return value === null || value === undefined || value === '' || 
         (Array.isArray(value) && value.length === 0) ||
         (typeof value === 'object' && Object.keys(value).length === 0);
};

/**
 * Validate credit card number (basic check)
 * @param {string} cardNumber - The card number to check
 * @returns {boolean} - True if valid format, false if not
 */
export const isValidCardNumber = (cardNumber) => {
  // Remove spaces and dashes
  const cleaned = cardNumber.replace(/[\s-]/g, '');
  
  // Check if it's 13-19 digits (most cards are in this range)
  return /^\d{13,19}$/.test(cleaned);
};

/**
 * Validate CVV code
 * @param {string} cvv - The CVV to check
 * @returns {boolean} - True if valid, false if not
 */
export const isValidCVV = (cvv) => {
  // CVV is usually 3 or 4 digits
  return /^\d{3,4}$/.test(cvv);
};