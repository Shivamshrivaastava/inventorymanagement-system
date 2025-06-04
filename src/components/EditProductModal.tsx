
import {
  DialogRoot,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogTitle,
  Button,
  Input,
  VStack,
  Box,
  Text,
  HStack,
  Switch,
} from '@chakra-ui/react';
import { useState, useEffect } from 'react';
import { useAppDispatch } from '../store/hooks';
import { updateProduct, Product } from '../store/slices/productsSlice';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProductModal = ({ isOpen, onClose, product }: EditProductModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    quantity: 0,
    imageUrl: '',
    lowInventory: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        quantity: product.quantity,
        imageUrl: product.imageUrl,
        lowInventory: product.lowInventory,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;

    if (!formData.title.trim()) {
      alert('Product title is required');
      return;
    }

    if (formData.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    if (formData.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    dispatch(updateProduct({
      id: product.id,
      ...formData,
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/400x200?text=Product+Image',
    }));

    alert('Product updated successfully');
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent
        borderRadius="2xl"
        shadow="2xl"
        bg="white"
        border="1px solid"
        borderColor="gray.200"
        maxW="lg"
      >
        <DialogHeader
          bg="blue.50"
          borderTopRadius="2xl"
          p={6}
        >
          <DialogTitle
            fontSize="2xl"
            fontWeight="bold"
            color="blue.700"
          >
            ✏️ Edit Product
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody pb={6} px={6}>
          <form onSubmit={handleSubmit}>
            <VStack gap={6}>
              <Box width="full">
                <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                  📝 Product Title *
                </Text>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter product title"
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                  fontWeight="medium"
                />
              </Box>

              <Box width="full">
                <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                  🖼️ Image URL
                </Text>
                <Input
                  value={formData.imageUrl}
                  onChange={(e) => setFormData({ ...formData, imageUrl: e.target.value })}
                  placeholder="Enter image URL (optional)"
                  size="lg"
                  borderRadius="xl"
                  bg="gray.50"
                  borderColor="gray.300"
                  _hover={{ borderColor: 'blue.400' }}
                  _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                  fontWeight="medium"
                />
              </Box>

              <HStack width="full" gap={4}>
                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                    💰 Price (₹) *
                  </Text>
                  <Input
                    type="number"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })}
                    placeholder="Enter price"
                    min={0}
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                    fontWeight="medium"
                  />
                </Box>

                <Box flex={1}>
                  <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                    📦 Quantity *
                  </Text>
                  <Input
                    type="number"
                    value={formData.quantity}
                    onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) || 0 })}
                    placeholder="Enter quantity"
                    min={0}
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                    fontWeight="medium"
                  />
                </Box>
              </HStack>

              <Box width="full">
                <HStack justify="space-between" align="center">
                  <Text fontSize="sm" fontWeight="bold" color="gray.700">
                    ⚠️ Low Inventory Flag
                  </Text>
                  <Switch
                    isChecked={formData.lowInventory}
                    onChange={(e) => setFormData({ ...formData, lowInventory: e.target.checked })}
                    colorScheme="orange"
                    size="lg"
                  />
                </HStack>
              </Box>

              <Button 
                type="submit" 
                colorScheme="blue" 
                width="full"
                size="lg"
                borderRadius="xl"
                fontWeight="bold"
                shadow="lg"
                _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                transition="all 0.2s"
              >
                💾 Update Product
              </Button>
            </VStack>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default EditProductModal;
