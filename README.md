# Sree Ranga Department Stores - E-commerce Platform

A modern, full-featured e-commerce platform built with Next.js, Redux, and Tailwind CSS for Sree Ranga Department Stores - celebrating 30 years of excellence in retail.

## 🏪 About Sree Ranga Department Stores

Sree Ranga Department Stores has been serving the Dharmapuri community since 1994, providing quality products at affordable prices. With 5 branches across Tamil Nadu, we offer everything from groceries and FMCG products to electronics and fashion.

## ✨ Features

### 🛒 E-commerce Functionality
- **Product Catalog**: Browse thousands of products across 12+ categories
- **Advanced Search**: Find products quickly with smart search and filters
- **Shopping Cart**: Add, remove, and manage items with real-time updates
- **Wishlist**: Save favorite products for later
- **Checkout Process**: Secure and streamlined order placement
- **Order Tracking**: Real-time order status and delivery tracking

### 🎨 User Experience
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Dark Mode**: Toggle between light and dark themes
- **Multi-language Support**: Available in English, Hindi, and Tamil
- **Accessibility**: WCAG compliant with keyboard navigation and screen reader support
- **Progressive Web App**: Install and use like a native mobile app

### 🔐 User Management
- **Authentication**: Secure login and registration system
- **User Profiles**: Manage personal information and preferences
- **Order History**: View past orders and reorder items
- **Address Management**: Save multiple delivery addresses

### 💼 Business Features
- **Bulk Orders**: Special pricing for wholesale and business customers
- **Store Locator**: Find nearby branches with contact information
- **Customer Support**: Comprehensive help center and contact options
- **Notifications**: Real-time updates for orders and promotions

## 🛠 Technology Stack

### Frontend
- **Next.js 13+**: React framework with App Router
- **React 18**: Modern React with hooks and concurrent features
- **Redux Toolkit**: State management with RTK Query
- **Tailwind CSS**: Utility-first CSS framework
- **TypeScript**: Type-safe JavaScript development

### UI Components
- **Lucide React**: Beautiful and consistent icons
- **Headless UI**: Unstyled, accessible UI components
- **React Hook Form**: Performant forms with easy validation
- **Framer Motion**: Smooth animations and transitions

### Development Tools
- **ESLint**: Code linting and formatting
- **Prettier**: Code formatting
- **Husky**: Git hooks for code quality
- **PostCSS**: CSS processing and optimization

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ 
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/sreeranga/ecommerce-platform.git
   cd ecommerce-platform
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```
   
   Configure the following variables:
   ```env
   NEXT_PUBLIC_API_URL=http://localhost:3000/api
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Open your browser**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📁 Project Structure

```
├── app/                    # Next.js App Router pages
│   ├── (auth)/            # Authentication pages
│   ├── category/          # Category pages
│   ├── products/          # Product pages
│   └── globals.css        # Global styles
├── components/            # Reusable React components
│   ├── Layout/           # Layout components
│   ├── Product/          # Product-related components
│   ├── Cart/             # Shopping cart components
│   └── UI/               # Generic UI components
├── store/                # Redux store and slices
│   ├── slices/           # Redux slices
│   └── store.ts          # Store configuration
├── hooks/                # Custom React hooks
├── utils/                # Utility functions
├── i18n/                 # Internationalization
│   └── locales/          # Translation files
├── public/               # Static assets
│   ├── images/           # Images and icons
│   └── mocks/            # Mock data for development
├── backend/              # Spring Boot backend
├── postman/              # API testing collection
└── docs/                 # Documentation
```

## 🎯 Key Features Implementation

### State Management
- **Redux Toolkit** for global state management
- **Slices** for cart, authentication, products, and UI state
- **Persistent storage** for cart and user preferences

### Internationalization
- **react-i18next** for multi-language support
- **Translation files** for English, Hindi, and Tamil
- **Dynamic language switching** with persistent preferences

### Responsive Design
- **Mobile-first approach** with Tailwind CSS
- **Flexible grid layouts** that adapt to screen sizes
- **Touch-friendly interfaces** for mobile devices

### Performance Optimization
- **Next.js Image optimization** for faster loading
- **Code splitting** for smaller bundle sizes
- **Lazy loading** for improved performance
- **Caching strategies** for API responses

## 🔧 Development

### Available Scripts

```bash
# Development
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run lint:fix     # Fix ESLint errors

# Testing
npm run test         # Run tests
npm run test:watch   # Run tests in watch mode
npm run test:coverage # Generate coverage report
```

### Code Quality
- **ESLint** configuration for consistent code style
- **Prettier** for automatic code formatting
- **TypeScript** for type safety
- **Git hooks** for pre-commit validation

## 📱 Mobile App Features

The platform is designed as a Progressive Web App (PWA) with:
- **Offline functionality** for browsing cached products
- **Push notifications** for order updates
- **App-like experience** when installed on mobile devices
- **Fast loading** with service worker caching

## 🛡 Security Features

- **Input validation** on all forms
- **XSS protection** with proper sanitization
- **CSRF protection** for form submissions
- **Secure authentication** with JWT tokens
- **Data encryption** for sensitive information

## 🌐 SEO Optimization

- **Meta tags** for better search engine visibility
- **Structured data** for rich snippets
- **Sitemap generation** for search engines
- **Open Graph tags** for social media sharing
- **Performance optimization** for Core Web Vitals

## 📊 Analytics & Monitoring

- **Google Analytics** integration for user behavior tracking
- **Performance monitoring** with Core Web Vitals
- **Error tracking** for debugging and improvements
- **Conversion tracking** for business metrics

## 🧪 Testing

### API Testing with Postman
We provide a comprehensive Postman collection for testing all API endpoints:

1. **Import Collection**: Use `postman/sree-ranga-api.postman_collection.json`
2. **Set Environment**: Import `postman/sree-ranga-environment.postman_environment.json`
3. **Follow Guide**: Check `postman/Testing-Guide.md` for step-by-step instructions

### Test Coverage
- **Unit Tests**: Individual component and function testing
- **Integration Tests**: API and component interaction testing
- **E2E Tests**: Full user journey testing

## 📚 Documentation

### For Beginners
- **[Beginner's Guide](docs/BEGINNER_GUIDE.md)**: Complete introduction to the project
- **[API Examples](postman/API-Examples.md)**: Simple API usage examples
- **[Testing Guide](postman/Testing-Guide.md)**: Step-by-step testing instructions

### For Developers
- **[Architecture Guide](docs/ARCHITECTURE.md)**: System architecture and design patterns
- **[Deployment Guide](docs/DEPLOYMENT.md)**: Production deployment instructions
- **[Contributing Guidelines](CONTRIBUTING.md)**: How to contribute to the project

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Workflow
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Support

For support and questions:

- **Email**: support@sreeranga.com
- **Phone**: +91 89712 90721
- **Website**: [https://sreeranga.com](https://sreeranga.com)
- **Address**: 10-A, Nethaji By Pass Road, Dharmapuri - 636701

## 🏆 Acknowledgments

- **Sree Ranga Team** for 30 years of retail excellence
- **Open Source Community** for the amazing tools and libraries
- **Customers** for their continued trust and support

---

**Sree Ranga Department Stores** - *Your Trusted Shopping Partner Since 1994*

## 🚀 Quick Start for New Developers

If you're new to this project, start here:

1. **Read the [Beginner's Guide](docs/BEGINNER_GUIDE.md)** - Understand the project from scratch
2. **Set up the development environment** - Follow the installation steps above
3. **Explore the codebase** - Start with `app/page.jsx` and `components/Product/ProductCard.jsx`
4. **Test the API** - Use the Postman collection in the `postman/` folder
5. **Make your first change** - Try modifying some text and see it update in the browser

Remember: Every expert was once a beginner. Don't hesitate to ask questions and experiment!