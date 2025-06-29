# Testing Guide - Step by Step

This guide will help you test the Sree Ranga API step by step. Even if you're completely new to this, just follow along!

## 🎯 What We're Going to Test

We'll test the main features of our online store:
1. Creating a user account
2. Logging in
3. Browsing products
4. Adding items to cart
5. Placing an order

Think of it like going through the entire shopping experience!

## 📋 Before We Start

### What You Need:
1. Postman installed on your computer
2. The API collection imported (see README.md)
3. The environment set up
4. A running backend server (ask your developer)

### Quick Check:
1. Open Postman
2. Make sure "Sree Ranga - Development" is selected in the top-right dropdown
3. You should see the collection "Sree Ranga Department Stores API" in the left sidebar

## 🚀 Step-by-Step Testing

### Step 1: Test User Registration
**What we're testing:** Can new users create accounts?

1. In Postman, find "Authentication" folder
2. Click on "Register"
3. Look at the request body - it should have:
   ```json
   {
     "name": "Test User",
     "email": "test@example.com",
     "password": "Test123!",
     "phone": "+91 9876543210"
   }
   ```
4. Click "Send"
5. **Expected result:** You should get a success message with user details and a token

**If it works:** ✅ Great! User registration is working
**If it fails:** ❌ Check if the server is running and the email isn't already used

### Step 2: Test User Login
**What we're testing:** Can users sign in with their credentials?

1. Click on "Login" in the Authentication folder
2. The request body should have:
   ```json
   {
     "email": "test@example.com",
     "password": "Test123!"
   }
   ```
3. Click "Send"
4. **Expected result:** Success message with user details and auth token

**Important:** Copy the token from the response! You'll need it for the next steps.

**If it works:** ✅ Login is working
**If it fails:** ❌ Check if you used the same email/password from registration

### Step 3: Set Up Authentication Token
**What we're doing:** Telling Postman to remember who we are

1. From the login response, copy the "token" value
2. Go to the "Environments" tab (gear icon in top right)
3. Click on "Sree Ranga - Development"
4. Find "auth_token" and paste your token in the "Current Value" field
5. Click "Save"

**Why this matters:** Now all your requests will include your login information automatically!

### Step 4: Test Getting Products
**What we're testing:** Can we see the store's products?

1. Go to "Products" folder
2. Click on "Get All Products"
3. Click "Send"
4. **Expected result:** A list of products with names, prices, and details

**If it works:** ✅ Product listing is working
**If it fails:** ❌ Check if the server has product data

### Step 5: Test Product Search
**What we're testing:** Can users search for specific items?

1. Click on "Search Products"
2. Look at the URL - it should have `?q=rice&category=groceries`
3. Click "Send"
4. **Expected result:** Products matching "rice" in the groceries category

**Try this:** Change "rice" to "phone" and see what happens!

### Step 6: Test Adding to Cart
**What we're testing:** Can users add items to their shopping cart?

1. Go to "Cart" folder
2. Click on "Add to Cart"
3. The request body should have:
   ```json
   {
     "productId": 1,
     "quantity": 2
   }
   ```
4. Click "Send"
5. **Expected result:** Success message showing the item was added

**If it works:** ✅ Cart functionality is working
**If it fails:** ❌ Make sure you have the auth token set up correctly

### Step 7: Test Viewing Cart
**What we're testing:** Can users see what's in their cart?

1. Click on "Get Cart"
2. Click "Send"
3. **Expected result:** Your cart contents with the item you just added

### Step 8: Test Creating an Order
**What we're testing:** Can users complete a purchase?

1. Go to "Orders" folder
2. Click on "Create Order"
3. The request body should have shipping address and payment method
4. Click "Send"
5. **Expected result:** Order confirmation with order ID

**If it works:** ✅ The entire shopping flow is working!
**If it fails:** ❌ Make sure your cart has items and auth token is set

## 🔍 What to Look For

### Successful Responses:
- Status code: 200 or 201
- Response has "success": true
- Data is returned as expected

### Error Responses:
- Status code: 400, 401, 404, or 500
- Response has "success": false
- Error message explains what went wrong

## 🐛 Common Issues and Solutions

### Issue: "401 Unauthorized"
**Problem:** You're not logged in or token expired
**Solution:** 
1. Login again
2. Copy the new token
3. Update the environment variable

### Issue: "404 Not Found"
**Problem:** The endpoint doesn't exist or server isn't running
**Solution:**
1. Check if the server is running
2. Verify the URL is correct

### Issue: "400 Bad Request"
**Problem:** Something wrong with your request data
**Solution:**
1. Check the request body format
2. Make sure all required fields are included

### Issue: No response at all
**Problem:** Server might be down
**Solution:**
1. Ask your developer if the server is running
2. Check the base_url in environment settings

## 📊 Testing Checklist

Use this checklist to make sure everything works:

- [ ] User can register
- [ ] User can login
- [ ] Can view all products
- [ ] Can search for products
- [ ] Can view product details
- [ ] Can add items to cart
- [ ] Can view cart contents
- [ ] Can update cart quantities
- [ ] Can remove items from cart
- [ ] Can create orders
- [ ] Can view order history

## 🎉 Success!

If all tests pass, congratulations! The API is working correctly. Users can:
- Create accounts
- Browse products
- Shop and add to cart
- Complete purchases

## 🆘 Need Help?

If you're stuck:
1. Check the console in Postman for error details
2. Look at the API-Examples.md for reference
3. Ask your development team
4. Remember: It's okay to make mistakes while learning!

## 💡 Pro Tips

1. **Save your work:** Export your collection after making changes
2. **Use variables:** Store commonly used values in environment variables
3. **Test edge cases:** Try invalid data to see how the API handles errors
4. **Document issues:** Keep notes of any problems you find

Remember: Testing is like being a detective - you're looking for clues about how well the system works!