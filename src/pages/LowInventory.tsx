
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
    <Container maxW="container.xl" py={6}>
      <VStack gap={6} align="stretch">
        <Box>
          <Text fontSize="2xl" fontWeight="bold" mb={2}>
            Low Inventory Products
          </Text>
          <Badge colorScheme="orange" fontSize="md" px={3} py={1} borderRadius="full">
            {lowInventoryProducts.length} items need attention
          </Badge>
        </Box>

        {lowInventoryProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              No products marked as low inventory.
            </Text>
            <Text color="gray.400" mt={2}>
              Products marked as needing replenishment will appear here.
            </Text>
          </Box>
        ) : (
          <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={6}>
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
  );
};

export default LowInventory;
