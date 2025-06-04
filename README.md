
# Inventory Management Application

A comprehensive inventory management system built with React, Redux Toolkit, and Chakra UI. This application allows you to manage product inventory with features like pagination, filtering, sorting, and low inventory tracking.

## Features

### Core Functionality
- **Product Display**: View products in a responsive card layout with product details
- **Pagination**: Navigate through products with customizable items per page (5, 10, 15, 20)
- **Add Products**: Create new products using a modal form
- **Edit Products**: Modify existing product details (title, price, quantity)
- **Low Inventory Tracking**: Mark products as needing replenishment and view them on a separate page

### Advanced Features
- **Filtering**: Filter products by price range and minimum quantity
- **Sorting**: Sort products by title, price, or quantity in ascending/descending order
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Real-time Updates**: State managed with Redux for consistent data flow
- **Toast Notifications**: User feedback for successful operations and errors

## Technology Stack

- **Frontend**: React 18 with TypeScript
- **State Management**: Redux Toolkit
- **UI Library**: Chakra UI
- **Routing**: React Router v6
- **Build Tool**: Vite
- **Styling**: Emotion (included with Chakra UI)

## Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ProductCard.tsx
│   ├── AddProductModal.tsx
│   ├── EditProductModal.tsx
│   ├── FilterSortControls.tsx
│   └── Navigation.tsx
├── data/                # Static data
│   └── products.json
├── pages/               # Page components
│   ├── Products.tsx
│   ├── LowInventory.tsx
│   └── Index.tsx
├── store/               # Redux store configuration
│   ├── store.ts
│   ├── hooks.ts
│   └── slices/
│       └── productsSlice.ts
└── App.tsx
```

## Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn

### Installation

1. Clone the repository
```bash
git clone <repository-url>
cd inventory-management-app
```

2. Install dependencies
```bash
npm install
```

3. Start the development server
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:8080`

## Usage Guide

### Managing Products

1. **View Products**: The main page displays all products with pagination
2. **Add Product**: Click "Add Product" button to open the creation modal
3. **Edit Product**: Click "Edit" on any product card to modify details
4. **Mark Low Inventory**: Use "Mark Low" button to flag products needing replenishment

### Filtering and Sorting

1. **Sort**: Choose sort criteria (title, price, quantity) and order (ascending/descending)
2. **Filter by Price**: Set minimum and maximum price ranges
3. **Filter by Quantity**: Set minimum quantity threshold
4. **Items per Page**: Choose how many products to display per page

### Low Inventory Management

1. Navigate to "Low Inventory" page using the top navigation
2. View all products marked as needing replenishment
3. The badge shows the count of low inventory items
4. Remove items from low inventory by clicking "Remove Flag"

## Data Structure

Each product contains:
```typescript
{
  id: number;
  title: string;
  price: number;
  quantity: number;
  lowInventory: boolean;
}
```

## Redux State Management

The application uses Redux Toolkit for state management with the following structure:

- **Products Array**: Complete list of all products
- **Pagination State**: Current page and items per page
- **Sorting State**: Sort field and order
- **Filter State**: Price and quantity filters

## Responsive Design

The application is fully responsive with breakpoints:
- **Mobile**: Single column layout
- **Tablet**: Two column grid
- **Desktop**: Three column grid

## Performance Optimizations

- **Memoized Calculations**: Filtering and sorting using useMemo
- **Efficient Pagination**: Only renders current page items
- **Optimized Re-renders**: Redux selectors prevent unnecessary updates

## Future Enhancements

- **Search Functionality**: Text-based product search
- **Category Management**: Product categorization
- **Bulk Operations**: Select and modify multiple products
- **Export/Import**: CSV data handling
- **Advanced Analytics**: Inventory insights and reports
- **User Authentication**: Multi-user support
- **Real-time Sync**: Backend integration

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -am 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Create a Pull Request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the GitHub repository.
