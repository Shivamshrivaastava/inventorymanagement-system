
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
      p={6}
      bg="white"
      borderWidth="1px"
      borderColor="gray.200"
      borderRadius="2xl"
      shadow="xl"
    >
      <VStack gap={6} align="stretch">
        <Box>
          <Text 
            fontSize="xl" 
            fontWeight="bold"
            color="gray.800"
            mb={2}
          >
            🔍 Filter & Sort Options
          </Text>
          <Text color="gray.600">
            Customize your product view with these controls
          </Text>
        </Box>
        
        <HStack gap={6} wrap="wrap">
          <Box minW="150px">
            <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
              📊 Sort By
            </Text>
            <NativeSelectRoot
              bg="gray.50"
              borderRadius="xl"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              transition="all 0.2s"
            >
              <NativeSelectField
                value={sortBy}
                onChange={(e) => dispatch(setSortBy(e.target.value as 'title' | 'price' | 'quantity'))}
                fontWeight="medium"
              >
                <option value="title">📝 Title</option>
                <option value="price">💰 Price</option>
                <option value="quantity">📦 Quantity</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box minW="120px">
            <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
              ↕️ Order
            </Text>
            <NativeSelectRoot
              bg="gray.50"
              borderRadius="xl"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              transition="all 0.2s"
            >
              <NativeSelectField
                value={sortOrder}
                onChange={(e) => dispatch(setSortOrder(e.target.value as 'asc' | 'desc'))}
                fontWeight="medium"
              >
                <option value="asc">⬆️ Ascending</option>
                <option value="desc">⬇️ Descending</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>

          <Box minW="120px">
            <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
              📄 Per Page
            </Text>
            <NativeSelectRoot
              bg="gray.50"
              borderRadius="xl"
              borderColor="gray.300"
              _hover={{ borderColor: 'blue.400' }}
              transition="all 0.2s"
            >
              <NativeSelectField
                value={productsPerPage}
                onChange={(e) => dispatch(setProductsPerPage(Number(e.target.value)))}
                fontWeight="medium"
              >
                <option value={5}>5 items</option>
                <option value={10}>10 items</option>
                <option value={15}>15 items</option>
                <option value={20}>20 items</option>
              </NativeSelectField>
            </NativeSelectRoot>
          </Box>
        </HStack>

        <Separator borderColor="gray.200" />

        <Box>
          <Text fontSize="lg" fontWeight="bold" color="gray.800" mb={4}>
            🎛️ Price & Quantity Filters
          </Text>
          <HStack gap={6} wrap="wrap">
            <Box minW="150px">
              <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
                💰 Min Price (₹)
              </Text>
              <Input
                type="number"
                value={filterMinPrice}
                onChange={(e) => dispatch(setFilterMinPrice(Number(e.target.value) || 0))}
                min={0}
                bg="gray.50"
                borderRadius="xl"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                transition="all 0.2s"
                fontWeight="medium"
              />
            </Box>

            <Box minW="150px">
              <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
                💰 Max Price (₹)
              </Text>
              <Input
                type="number"
                value={filterMaxPrice}
                onChange={(e) => dispatch(setFilterMaxPrice(Number(e.target.value) || 25000))}
                min={0}
                bg="gray.50"
                borderRadius="xl"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                transition="all 0.2s"
                fontWeight="medium"
              />
            </Box>

            <Box minW="150px">
              <Text fontSize="sm" fontWeight="semibold" mb={3} color="gray.700">
                📦 Min Quantity
              </Text>
              <Input
                type="number"
                value={filterMinQuantity}
                onChange={(e) => dispatch(setFilterMinQuantity(Number(e.target.value) || 0))}
                min={0}
                bg="gray.50"
                borderRadius="xl"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                transition="all 0.2s"
                fontWeight="medium"
              />
            </Box>
          </HStack>
        </Box>
      </VStack>
    </Box>
  );
};

export default FilterSortControls;
