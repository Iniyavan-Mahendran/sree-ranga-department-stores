# Sree Ranga API - Postman Collection

This folder contains Postman collections and documentation for testing the Sree Ranga Department Stores API.

## What is Postman?

Postman is like a tool that helps developers test websites and apps. Think of it like a way to send messages to our website and see what it says back. It's very useful for:

- Testing if our website works correctly
- Checking if user login works
- Making sure products can be added to cart
- Verifying payment processing

## Files in this folder:

1. **sree-ranga-api.postman_collection.json** - The main collection with all API tests
2. **sree-ranga-environment.postman_environment.json** - Settings for different environments (development, production)
3. **API-Examples.md** - Simple examples of how to use each API
4. **Testing-Guide.md** - Step-by-step guide for testing

## How to use these files:

### Step 1: Install Postman
1. Go to https://www.postman.com/downloads/
2. Download and install Postman (it's free!)
3. Create a free account

### Step 2: Import the collection
1. Open Postman
2. Click "Import" button
3. Select the `sree-ranga-api.postman_collection.json` file
4. Click "Import"

### Step 3: Import the environment
1. Click the gear icon (⚙️) in top right
2. Click "Import"
3. Select the `sree-ranga-environment.postman_environment.json` file
4. Click "Import"

### Step 4: Select environment
1. In the top right dropdown, select "Sree Ranga - Development"
2. Now you're ready to test!

## What each API does:

### Authentication APIs
- **Login** - Like signing into your account
- **Register** - Like creating a new account
- **Refresh Token** - Like renewing your login session

### Product APIs
- **Get All Products** - Like browsing all items in the store
- **Get Product by ID** - Like looking at one specific item
- **Search Products** - Like using the search box to find items

### Cart APIs
- **Add to Cart** - Like putting items in your shopping basket
- **Remove from Cart** - Like taking items out of your basket
- **Update Quantity** - Like changing how many of something you want

### Order APIs
- **Create Order** - Like going to checkout and buying your items
- **Get Orders** - Like checking your purchase history

## For Beginners:

If you're new to APIs and Postman, think of it this way:

1. **API** = A way for different computer programs to talk to each other
2. **Request** = Asking the website to do something (like "show me all products")
3. **Response** = The website's answer (like sending back a list of products)
4. **Postman** = A tool that helps you send these requests and see the responses

It's like having a conversation with the website, but instead of talking, you're sending structured messages!

## Need Help?

If you're stuck or confused:
1. Read the Testing-Guide.md file
2. Check the API-Examples.md for simple examples
3. Contact our development team at dev@sreeranga.com

Remember: Don't worry if this seems complicated at first. Even experienced developers had to learn this step by step!