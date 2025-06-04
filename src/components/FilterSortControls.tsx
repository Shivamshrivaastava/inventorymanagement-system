
import { useState } from 'react';
import { 
  Box, 
  HStack, 
  VStack, 
  Input, 
  Button, 
  Text 
} from '@chakra-ui/react';
import { Search, Plus, Filter } from 'lucide-react';
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface FilterSortControlsProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  category: string;
  onCategoryChange: (value: string) => void;
  sortBy: string;
  onSortChange: (value: string) => void;
  onAddProduct: () => void;
  lowInventoryOnly: boolean;
  onLowInventoryToggle: () => void;
}

const FilterSortControls = ({
  searchTerm,
  onSearchChange,
  category,
  onCategoryChange,
  sortBy,
  onSortChange,
  onAddProduct,
  lowInventoryOnly,
  onLowInventoryToggle,
}: FilterSortControlsProps) => {
  return (
    <Box bg="white" p={6} borderRadius="xl" shadow="lg" border="1px" borderColor="gray.200">
      <VStack gap={4}>
        <HStack width="full" gap={4} flexWrap="wrap">
          <Box position="relative" flex="1" minW="250px">
            <Box
              position="absolute"
              left={3}
              top="50%"
              transform="translateY(-50%)"
              color="gray.400"
              zIndex={2}
            >
              <Search size={18} />
            </Box>
            <Input
              placeholder="Search products..."
              value={searchTerm}
              onChange={(e) => onSearchChange(e.target.value)}
              size="lg"
              borderRadius="xl"
              bg="gray.50"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
              pl={12}
            />
          </Box>
          
          <Button
            colorScheme="blue"
            size="lg"
            borderRadius="xl"
            fontWeight="semibold"
            shadow="md"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
            onClick={onAddProduct}
          >
            <HStack gap={2}>
              <Plus size={20} />
              <Text>Add Product</Text>
            </HStack>
          </Button>
        </HStack>

        <HStack width="full" gap={4} flexWrap="wrap">
          <Box minW="200px">
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Category
            </Text>
            <Select value={category} onValueChange={onCategoryChange}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                <SelectItem value="Electronics">Electronics</SelectItem>
                <SelectItem value="Clothing">Clothing</SelectItem>
                <SelectItem value="Books">Books</SelectItem>
                <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                <SelectItem value="Sports">Sports</SelectItem>
              </SelectContent>
            </Select>
          </Box>

          <Box minW="200px">
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Sort By
            </Text>
            <Select value={sortBy} onValueChange={onSortChange}>
              <SelectTrigger>
                <SelectValue placeholder="Sort by..." />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="name">Name (A-Z)</SelectItem>
                <SelectItem value="name-desc">Name (Z-A)</SelectItem>
                <SelectItem value="price">Price (Low to High)</SelectItem>
                <SelectItem value="price-desc">Price (High to Low)</SelectItem>
                <SelectItem value="stock">Stock (Low to High)</SelectItem>
                <SelectItem value="stock-desc">Stock (High to Low)</SelectItem>
              </SelectContent>
            </Select>
          </Box>

          <Box>
            <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
              Filters
            </Text>
            <Button
              variant={lowInventoryOnly ? "solid" : "outline"}
              colorScheme={lowInventoryOnly ? "orange" : "gray"}
              size="md"
              borderRadius="xl"
              onClick={onLowInventoryToggle}
              _hover={{ transform: 'translateY(-1px)' }}
            >
              <HStack gap={2}>
                <Filter size={16} />
                <Text>Low Stock Only</Text>
              </HStack>
            </Button>
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FilterSortControls;
