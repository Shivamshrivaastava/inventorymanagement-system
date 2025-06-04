
import {
  Container,
  VStack,
  HStack,
  Button,
  SimpleGrid,
  Text,
  Flex,
  useDisclosure,
  Select,
  Box,
} from '@chakra-ui/react';
import { useState, useMemo } from 'react';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { toggleLowInventory, setCurrentPage, Product } from '../store/slices/productsSlice';
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
  const { isOpen: isAddOpen, onOpen: onAddOpen, onClose: onAddClose } = useDisclosure();
  const { isOpen: isEditOpen, onOpen: onEditOpen, onClose: onEditClose } = useDisclosure();

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
    onEditOpen();
  };

  const handleToggleLowInventory = (id: number) => {
    dispatch(toggleLowInventory(id));
  };

  const handlePageChange = (page: number) => {
    dispatch(setCurrentPage(page));
  };

  return (
    <Container maxW="container.xl" py={6}>
      <VStack spacing={6} align="stretch">
        <Flex justify="space-between" align="center" wrap="wrap" gap={4}>
          <Text fontSize="2xl" fontWeight="bold">
            Products ({filteredAndSortedProducts.length})
          </Text>
          <Button colorScheme="green" onClick={onAddOpen}>
            Add Product
          </Button>
        </Flex>

        <FilterSortControls />

        {currentProducts.length === 0 ? (
          <Box textAlign="center" py={10}>
            <Text fontSize="lg" color="gray.500">
              No products found matching your criteria.
            </Text>
          </Box>
        ) : (
          <>
            <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={6}>
              {currentProducts.map((product) => (
                <ProductCard
                  key={product.id}
                  product={product}
                  onEdit={handleEdit}
                  onToggleLowInventory={handleToggleLowInventory}
                />
              ))}
            </SimpleGrid>

            {totalPages > 1 && (
              <Flex justify="center" align="center" gap={4} wrap="wrap">
                <Button
                  onClick={() => handlePageChange(currentPage - 1)}
                  isDisabled={currentPage === 1}
                  variant="outline"
                >
                  Previous
                </Button>
                
                <HStack>
                  {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                    <Button
                      key={page}
                      onClick={() => handlePageChange(page)}
                      variant={currentPage === page ? "solid" : "outline"}
                      colorScheme="blue"
                      size="sm"
                    >
                      {page}
                    </Button>
                  ))}
                </HStack>
                
                <Button
                  onClick={() => handlePageChange(currentPage + 1)}
                  isDisabled={currentPage === totalPages}
                  variant="outline"
                >
                  Next
                </Button>
              </Flex>
            )}
          </>
        )}
      </VStack>

      <AddProductModal isOpen={isAddOpen} onClose={onAddClose} />
      <EditProductModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        product={editingProduct}
      />
    </Container>
  );
};

export default Products;
