
import {
  HStack,
  VStack,
  Select,
  Input,
  Text,
  Box,
  Flex,
  Button,
} from '@chakra-ui/react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import {
  setSortBy,
  setSortOrder,
  setFilterMinPrice,
  setFilterMaxPrice,
  setFilterMinQuantity,
  setProductsPerPage,
} from '../store/slices/productsSlice';

const FilterSortControls = () => {
  const dispatch = useAppDispatch();
  const {
    sortBy,
    sortOrder,
    filterMinPrice,
    filterMaxPrice,
    filterMinQuantity,
    productsPerPage,
  } = useAppSelector((state) => state.products);

  return (
    <Box 
      bg="white" 
      p={6} 
      borderRadius="2xl" 
      shadow="lg"
      border="1px solid"
      borderColor="gray.200"
    >
      <VStack gap={6} align="stretch">
        <Text fontSize="xl" fontWeight="bold" color="gray.800">
          🎛️ Filter & Sort Controls
        </Text>
        
        <Flex gap={6} wrap="wrap">
          <VStack align="stretch" flex={1} minW="200px">
            <Text fontWeight="semibold" color="gray.700">Sort By</Text>
            <HStack>
              <Select
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'price' | 'quantity'))}
                bg="gray.50"
                borderColor="gray.300"
                borderRadius="xl"
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </Select>
              <Select
                value={sortOrder}
                onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
                bg="gray.50"
                borderColor="gray.300"
                borderRadius="xl"
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </Select>
            </HStack>
          </VStack>

          <VStack align="stretch" flex={1} minW="200px">
            <Text fontWeight="semibold" color="gray.700">Price Range (₹)</Text>
            <HStack>
              <Input
                type="number"
                placeholder="Min"
                value={filterMinPrice}
                onChange={(e) => dispatch(setFilterMinPrice(Number(e.target.value) || 0))}
                bg="gray.50"
                borderColor="gray.300"
                borderRadius="xl"
              />
              <Input
                type="number"
                placeholder="Max"
                value={filterMaxPrice}
                onChange={(e) => dispatch(setFilterMaxPrice(Number(e.target.value) || 25000))}
                bg="gray.50"
                borderColor="gray.300"
                borderRadius="xl"
              />
            </HStack>
          </VStack>

          <VStack align="stretch" flex={1} minW="200px">
            <Text fontWeight="semibold" color="gray.700">Min Quantity</Text>
            <Input
              type="number"
              placeholder="Min quantity"
              value={filterMinQuantity}
              onChange={(e) => dispatch(setFilterMinQuantity(Number(e.target.value) || 0))}
              bg="gray.50"
              borderColor="gray.300"
              borderRadius="xl"
            />
          </VStack>

          <VStack align="stretch" minW="150px">
            <Text fontWeight="semibold" color="gray.700">Items Per Page</Text>
            <Select
              value={productsPerPage}
              onChange={(e) => dispatch(setProductsPerPage(Number(e.target.value)))}
              bg="gray.50"
              borderColor="gray.300"
              borderRadius="xl"
            >
              <option value={5}>5 items</option>
              <option value={10}>10 items</option>
              <option value={20}>20 items</option>
              <option value={50}>50 items</option>
            </Select>
          </VStack>
        </Flex>

        <Button
          onClick={() => {
            dispatch(setFilterMinPrice(0));
            dispatch(setFilterMaxPrice(25000));
            dispatch(setFilterMinQuantity(0));
            dispatch(setSortBy('title'));
            dispatch(setSortOrder('asc'));
          }}
          variant="outline"
          colorScheme="gray"
          size="sm"
          alignSelf="flex-start"
          borderRadius="xl"
        >
          🔄 Reset Filters
        </Button>
      </VStack>
    </Box>
  );
};

export default FilterSortControls;
