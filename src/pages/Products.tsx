
import {
  Container,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Text,
  Flex,
  Box,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleLowInventory, setCurrentPage, deleteProduct, Product } from '../store/slices/productsSlice';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';
import EditProductModal from '../components/EditProductModal';
import FilterSortControls from '../components/FilterSortControls';

const Products = () => {
  const dispatch = useAppDispatch();
  const {
    products,
    currentPage,
    productsPerPage,
    sortBy,
    sortOrder,
    filterMinPrice,
    filterMaxPrice,
    filterMinQuantity,
  } = useAppSelector((state) => state.products);

  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [isEditOpen, setIsEditOpen] = useState(false);

  const filteredAndSortedProducts = useMemo(() => {
    let filtered = products.filter(product => 
      product.price >= filterMinPrice &&
      product.price <= filterMaxPrice &&
      product.quantity >= filterMinQuantity
    );

    filtered.sort((a, b) => {
      let aValue = a[sortBy];
      let bValue = b[sortBy];
      
      if (typeof aValue === 'string') {
        aValue = aValue.toLowerCase();
        bValue = (bValue as string).toLowerCase();
      }
      
      if (sortOrder === 'asc') {
        return aValue < bValue ? -1 : aValue > bValue ? 1 : 0;
      } else {
        return aValue > bValue ? -1 : aValue < bValue ? 1 : 0;
      }
    });

    return filtered;
  }, [products, sortBy, sortOrder, filterMinPrice, filterMaxPrice, filterMinQuantity]);

  const totalPages = Math.ceil(filteredAndSortedProducts.length / productsPerPage);
  const startIndex = (currentPage - 1) * productsPerPage;
  const endIndex = startIndex + productsPerPage;
  const currentProducts = filteredAndSortedProducts.slice(startIndex, endIndex);

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setIsEditOpen(true);
  };

  const handleToggleLowInventory = (id: number) => {
    dispatch(toggleLowInventory(id));
  };

  const handleDelete = (id: number) => {
    dispatch(deleteProduct(id));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Box bg="gray.50" minH="100vh">
      <Container maxW="container.xl" py={8}>
        <VStack gap={8} align="stretch">
          <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
            <Box>
              <Text 
                fontSize="4xl" 
                fontWeight="extrabold"
                bgGradient="linear(to-r, blue.600, purple.600)"
                bgClip="text"
                mb={2}
              >
                📦 Product Inventory
              </Text>
              <Text fontSize="lg" color="gray.600" fontWeight="medium">
                Managing {filteredAndSortedProducts.length} products
              </Text>
            </Box>
            <Button 
              colorScheme="green" 
              size="lg"
              onClick={() => setIsAddOpen(true)}
              borderRadius="xl"
              fontWeight="bold"
              shadow="lg"
              _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
              transition="all 0.2s"
            >
              ➕ Add Product
            </Button>
          </Flex>

          <FilterSortControls />

          {currentProducts.length === 0 ? (
            <Box 
              textAlign="center" 
              py={20}
              bg="white"
              borderRadius="2xl"
              shadow="lg"
            >
              <Text fontSize="6xl" mb={4}>📭</Text>
              <Text fontSize="xl" color="gray.500" fontWeight="medium">
                No products found matching your criteria.
              </Text>
              <Text color="gray.400" mt={2}>
                Try adjusting your filters or add some products.
              </Text>
            </Box>
          ) : (
            <>
              <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={8}>
                {currentProducts.map((product) => (
                  <ProductCard
                    key={product.id}
                    product={product}
                    onEdit={handleEdit}
                    onToggleLowInventory={handleToggleLowInventory}
                    onDelete={handleDelete}
                  />
                ))}
              </SimpleGrid>

              {totalPages > 1 && (
                <Flex 
                  justify="center" 
                  align="center" 
                  gap={4} 
                  wrap="wrap"
                  bg="white"
                  p={6}
                  borderRadius="2xl"
                  shadow="lg"
                >
                  <Button
                    onClick={() => handlePageChange(currentPage - 1)}
                    disabled={currentPage === 1}
                    variant="outline"
                    size="lg"
                    borderRadius="xl"
                    fontWeight="semibold"
                    _hover={{ transform: 'translateY(-1px)' }}
                  >
                    ← Previous
                  </Button>
                  
                  <HStack>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                      <Button
                        key={page}
                        onClick={() => handlePageChange(page)}
                        variant={currentPage === page ? "solid" : "outline"}
                        colorScheme="blue"
                        size="md"
                        borderRadius="xl"
                        minW="12"
                        fontWeight="bold"
                        _hover={{ transform: 'translateY(-1px)' }}
                      >
                        {page}
                      </Button>
                    ))}
                  </HStack>
                  
                  <Button
                    onClick={() => handlePageChange(currentPage + 1)}
                    disabled={currentPage === totalPages}
                    variant="outline"
                    size="lg"
                    borderRadius="xl"
                    fontWeight="semibold"
                    _hover={{ transform: 'translateY(-1px)' }}
                  >
                    Next →
                  </Button>
                </Flex>
              )}
            </>
          )}
        </VStack>

        <AddProductModal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} />
        <EditProductModal
          isOpen={isEditOpen}
          onClose={() => setIsEditOpen(false)}
          product={editingProduct}
        />
      </Container>
    </Box>
  );
};

export default Products;
