
import {
  Container,
  VStack,
  Text,
  SimpleGrid,
  Box,
  Badge,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleLowInventory, Product } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import EditProductModal from '../components/EditProductModal';

const LowInventory = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const lowInventoryProducts = products.filter(product => product.lowInventory);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const handleToggleLowInventory = (id: number) => {
    dispatch(toggleLowInventory(id));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          <Box>
            <Text 
              fontSize="4xl" 
              fontWeight="extrabold"
              bgGradient="linear(to-r, orange.500, red.500)"
              bgClip="text"
              mb={4}
            >
              ⚠️ Low Inventory Alert
            </Text>
            <Badge 
              colorScheme="orange" 
              fontSize="lg" 
              px={6} 
              py={3} 
              borderRadius="full"
              fontWeight="bold"
              shadow="lg"
            >
              🚨 {lowInventoryProducts.length} items need immediate attention
            </Badge>
          </Box>

          {lowInventoryProducts.length === 0 ? (
            <Box 
              textAlign="center" 
              py={20}
              bg="white"
              borderRadius="2xl"
              shadow="xl"
            >
              <Text fontSize="6xl" mb={6}>✅</Text>
              <Text fontSize="2xl" fontWeight="bold" color="green.600" mb={4}>
                All Good! No Low Inventory Items
              </Text>
              <Text fontSize="lg" color="gray.500" mb={2}>
                No products marked as low inventory.
              </Text>
              <Text color="gray.400">
                Products that need replenishment will appear here when marked.
              </Text>
            </Box>
          ) : (
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
              {lowInventoryProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onToggleLowInventory={handleToggleLowInventory}
                />
              ))}
            </SimpleGrid>
          )}
        </VStack>

        <EditProductModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          product={editingProduct}
        />
      </Container>
    </Box>
  );
};

export default LowInventory;
