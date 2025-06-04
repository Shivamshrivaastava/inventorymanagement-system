
import {
  Box,
  HStack,
  VStack,
  Text,
  Input,
  NativeSelectRoot,
  NativeSelectField,
  Separator,
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
      p={4}
      bg="gray.50"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="md"
    >
      <VStack gap={4} align="stretch">
        <Text fontSize="lg" fontWeight="semibold">
          Filter & Sort Options
        </Text>
        
        <HStack gap={4} wrap="wrap">
          <Box minW="150px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Sort By</Text>
            <NativeSelectRoot>
              <NativeSelectField
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'price' | 'quantity'))}
              >
                <option value="title">Title</option>
                <option value="price">Price</option>
                <option value="quantity">Quantity</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box minW="120px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Order</Text>
            <NativeSelectRoot>
              <NativeSelectField
                value={sortOrder}
                onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
              >
                <option value="asc">Ascending</option>
                <option value="desc">Descending</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box minW="120px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Per Page</Text>
            <NativeSelectRoot>
              <NativeSelectField
                value={productsPerPage}
                onChange={(e) => dispatch(setProductsPerPage(Number(e.target.value)))}
              >
                <option value={5}>5</option>
                <option value={10}>10</option>
                <option value={15}>15</option>
                <option value={20}>20</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>
        </HStack>

        <Separator />

        <HStack gap={4} wrap="wrap">
          <Box minW="150px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Min Price (₹)</Text>
            <Input
              type="number"
              value={filterMinPrice}
              onChange={(e) => dispatch(setFilterMinPrice(Number(e.target.value) || 0))}
              min={0}
            />
          </Box>

          <Box minW="150px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Max Price (₹)</Text>
            <Input
              type="number"
              value={filterMaxPrice}
              onChange={(e) => dispatch(setFilterMaxPrice(Number(e.target.value) || 25000))}
              min={0}
            />
          </Box>

          <Box minW="150px">
            <Text fontSize="sm" fontWeight="medium" mb={2}>Min Quantity</Text>
            <Input
              type="number"
              value={filterMinQuantity}
              onChange={(e) => dispatch(setFilterMinQuantity(Number(e.target.value) || 0))}
              min={0}
            />
          </Box>
        </HStack>
      </VStack>
    </Box>
  );
};

export default FilterSortControls;
