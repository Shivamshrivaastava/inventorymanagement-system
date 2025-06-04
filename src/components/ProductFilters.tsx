
import { useState } from 'react';
import FilterSortControls from './FilterSortControls';

interface ProductFiltersProps {
  onAddProduct: () => void;
}

const ProductFilters = ({ onAddProduct }: ProductFiltersProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [category, setCategory] = useState('all');
  const [sortBy, setSortBy] = useState('name');
  const [lowInventoryOnly, setLowInventoryOnly] = useState(false);

  return (
    <FilterSortControls
      searchTerm={searchTerm}
      onSearchChange={setSearchTerm}
      category={category}
      onCategoryChange={setCategory}
      sortBy={sortBy}
      onSortChange={setSortBy}
      onAddProduct={onAddProduct}
      lowInventoryOnly={lowInventoryOnly}
      onLowInventoryToggle={() => setLowInventoryOnly(!lowInventoryOnly)}
    />
  );
};

export default ProductFilters;
