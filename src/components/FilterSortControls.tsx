
import {
  Box,
  HStack,
  VStack,
  Text,
  Select,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  FormControl,
  FormLabel,
  useColorModeValue,
  Divider,
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

  const bgColor = useColorModeValue('gray.50', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Box
      p={4}
      bg={bgColor}
      borderWidth="1px"
      borderColor={borderColor}
      borderRadius="md"
    >
      <VStack spacing={4} align="stretch">
        <Text fontSize="lg" fontWeight="semibold">
          Filter & Sort Options
        </Text>
        
        <HStack spacing={4} wrap="wrap">
          <FormControl minW="150px">
            <FormLabel fontSize="sm">Sort By</FormLabel>
            <Select
              value={sortBy}
              onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'price' | 'quantity'))}
              size="sm"
            >
              <option value="title">Title</option>
              <option value="price">Price</option>
              <option value="quantity">Quantity</option>
            </Select>
          </FormControl>

          <FormControl minW="120px">
            <FormLabel fontSize="sm">Order</FormLabel>
            <Select
              value={sortOrder}
              onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
              size="sm"
            >
              <option value="asc">Ascending</option>
              <option value="desc">Descending</option>
            </Select>
          </FormControl>

          <FormControl minW="120px">
            <FormLabel fontSize="sm">Per Page</FormLabel>
            <Select
              value={productsPerPage}
              onChange={(e) => dispatch(setProductsPerPage(Number(e.target.value)))}
              size="sm"
            >
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
            </Select>
          </FormControl>
        </HStack>

        <Divider />

        <HStack spacing={4} wrap="wrap">
          <FormControl minW="150px">
            <FormLabel fontSize="sm">Min Price (₹)</FormLabel>
            <NumberInput
              value={filterMinPrice}
              onChange={(_, value) => dispatch(setFilterMinPrice(value || 0))}
              min={0}
              size="sm"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl minW="150px">
            <FormLabel fontSize="sm">Max Price (₹)</FormLabel>
            <NumberInput
              value={filterMaxPrice}
              onChange={(_, value) => dispatch(setFilterMaxPrice(value || 25000))}
              min={0}
              size="sm"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl minW="150px">
            <FormLabel fontSize="sm">Min Quantity</FormLabel>
            <NumberInput
              value={filterMinQuantity}
              onChange={(_, value) => dispatch(setFilterMinQuantity(value || 0))}
              min={0}
              size="sm"
            >
              <NumberInputField />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FilterSortControls;
