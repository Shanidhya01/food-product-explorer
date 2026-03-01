# Food Product Explorer

A modern web application for exploring and managing food products with detailed nutritional information. Built with Next.js and powered by the Open Food Facts API, this application allows users to browse, search, and compare food products efficiently.

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Documentation](#api-documentation)
- [Components Overview](#components-overview)
- [Usage Examples](#usage-examples)
- [Contributing](#contributing)

## Features

- **Product Browsing**: Paginated product listing with smooth infinite scrolling
- **Search Functionality**:
  - Search products by name with real-time results
  - Search by barcode for quick product lookup
- **Category Filtering**: Filter products by food category
- **Sorting Options**: Sort products by:
  - Name (A-Z and Z-A)
  - Nutritional grade
  - Popularity (page count)
  - Ranking
- **Shopping Cart**: Add/remove products to a persistent shopping cart
- **Product Details**: View detailed product information including:
  - Nutritional information
  - Ingredients
  - Brand information
  - Product images
  - Ecoscore and Nutriscore ratings
  - Origins and labels
- **Responsive Design**: Fully responsive UI built with Tailwind CSS
- **Toast Notifications**: User feedback for cart actions

## Tech Stack

- **Framework**: [Next.js 16.1.6](https://nextjs.org) with App Router
- **Language**: [TypeScript 5](https://www.typescriptlang.org)
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com) with PostCSS
- **Runtime**: React 19.2.3 with React DOM 19.2.3
- **API**: Open Food Facts API (world.openfoodfacts.org)
- **Linting**: ESLint 9

## Project Structure

```
food-product-explorer/
├── app/                          # Next.js App Router
│   ├── globals.css              # Global styles
│   ├── layout.tsx               # Root layout
│   ├── page.tsx                 # Home page with product browsing
│   ├── api/
│   │   └── products/
│   │       └── route.ts         # Products API endpoint
│   ├── cart/
│   │   └── page.tsx             # Shopping cart page
│   └── product/
│       └── [barcode]/
│           └── page.tsx         # Individual product detail page
├── components/                  # Reusable React components
│   ├── Addtocartbutton.tsx     # Add to cart button component
│   ├── CartContext.tsx          # Shopping cart context provider
│   ├── CartSummary.tsx          # Cart summary display
│   ├── CartToast.tsx            # Toast notifications for cart
│   ├── CategoryFilter.tsx       # Category filtering component
│   ├── LoadMoreButton.tsx       # Load more products button
│   ├── ProductCard.tsx          # Individual product card
│   ├── ProductGrid.tsx          # Grid layout for products
│   ├── SearchByBarcode.tsx      # Barcode search component
│   ├── SearchByName.tsx         # Name search component
│   ├── SkeletonCard.tsx         # Loading skeleton UI
│   └── SortDropdown.tsx         # Sorting options dropdown
├── lib/
│   └── api.ts                   # API utility functions
├── types/
│   └── product.ts               # TypeScript product interface
├── public/                      # Static assets
├── package.json                 # Project dependencies
├── tsconfig.json                # TypeScript configuration
├── next.config.ts               # Next.js configuration
├── tailwind.config.ts           # Tailwind CSS configuration
├── postcss.config.mjs           # PostCSS configuration
└── eslint.config.mjs            # ESLint configuration
```

## Getting Started

### Prerequisites

- Node.js 18+ and npm/yarn
- Git (optional)

### Installation

1. Clone the repository or navigate to the project directory:

```bash
cd food-product-explorer
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

The page will automatically update as you edit files. Changes to components and styles are reflected instantly.

### Production Build

Create an optimized production build:

```bash
npm run build
npm start
# or
yarn build
yarn start
# or
pnpm build
pnpm start
```

## API Documentation

### Products Endpoint

**Base URL**: `/api/products`

#### Get Products (Paginated)

```
GET /api/products?page={page_number}
```

**Parameters**:

- `page` (number, optional): Page number for pagination (default: 1)

**Returns**: JSON object with paginated product list and metadata

**Example**:

```bash
curl http://localhost:3000/api/products?page=1
```

#### Search Products

```
GET /api/products?search={query}
```

**Parameters**:

- `search` (string, required): Search query term

**Returns**: JSON object with matching products

**Example**:

```bash
curl http://localhost:3000/api/products?search=apple
```

### External APIs

The application integrates with the Open Food Facts API:

- **Product Search**: `https://world.openfoodfacts.org/cgi/search.pl`
- **Category Search**: `https://world.openfoodfacts.org/category/{category}.json`
- **Barcode Lookup**: `https://world.openfoodfacts.org/api/v0/product/{barcode}.json`

## Components Overview

### Core Components

- **ProductGrid**: Displays products in a responsive grid layout with loading states
- **SearchByName**: Input component for searching by product name
- **SearchByBarcode**: Barcode input scanner for quick product lookup
- **CategoryFilter**: Filter products by category with dropdown selection
- **SortDropdown**: Sort products by various criteria
- **ProductCard**: Individual product card with image, name, and quick actions
- **SkeletonCard**: Loading placeholder with skeleton animation

### Cart Components

- **CartContext**: Global state management for shopping cart
- **Addtocartbutton**: Button to add/remove products from cart
- **CartSummary**: Display cart count and total items
- **CartToast**: Toast notification for cart actions

### UI Components

- **LoadMoreButton**: Button to load additional products
- **SortDropdown**: Dropdown for sorting options

## Usage Examples

### Browsing Products

1. Navigate to the home page
2. Browse products with pagination using the "Load More" button
3. Products are displayed with images, names, brands, and nutritional grades

### Searching

1. **By Name**: Use the search input field to find products by name
2. **By Barcode**: Enter or scan a barcode to find a specific product
3. **By Category**: Select a category from the category filter dropdown

### Adding to Cart

1. Click "Add to Cart" on any product card
2. A toast notification confirms the action
3. View your cart summary in the top-right corner
4. Navigate to the Cart page to view full details

### Viewing Product Details

1. Click on any product card to view detailed information
2. View nutritional information, ingredients, and product metadata
3. Add product to cart from the detail page

### Sorting

1. Use the sort dropdown to change product order:
   - A-Z: Alphabetical ascending
   - Z-A: Alphabetical descending
   - Grade: By nutritional grade
   - Page Count: By popularity
   - Ranking: By product ranking

## Key Features Implementation

### State Management

The application uses React Context API for cart state management, providing a clean and efficient way to manage shopping cart data across components.

### Performance Optimization

- Server-side revalidation (10-minute cache) for API responses
- Skeleton loading states for better UX
- Lazy loading of products with pagination
- Image optimization with Next.js Image component

### Error Handling

- Graceful error handling for API failures
- Fallback UI for missing product information
- User-friendly error messages

## Contributing

Contributions are welcome! To contribute:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## Future Enhancements

- User authentication and accounts
- Wishlist functionality
- Nutritional comparison tool
- Advanced filtering options
- Product ratings and reviews
- Dark mode support

## Support

For questions or issues, please open an issue in the repository or contact the development team.
