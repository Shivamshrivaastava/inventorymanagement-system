
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
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addProduct } from '../store/slices/productsSlice';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    title: '',
    description: '',
    price: 0,
    stock: 0,
    quantity: 0,
    category: '',
    imageUrl: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
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

    dispatch(addProduct({
      name: formData.name,
      title: formData.title,
      description: formData.description,
      price: formData.price,
      stock: formData.stock,
      quantity: formData.quantity,
      category: formData.category,
      imageUrl: formData.imageUrl || 'https://via.placeholder.com/400x200?text=Product+Image',
      image: formData.imageUrl,
      lowInventory: false,
    }));

    alert('Product added successfully');
    setFormData({ name: '', title: '', description: '', price: 0, stock: 0, quantity: 0, category: '', imageUrl: '' });
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
            ➕ Add New Product
          </DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody pb={6} px={6}>
          <form onSubmit={handleSubmit}>
            <VStack gap={6}>
              <Box width="full">
                <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                  📝 Product Name *
                </Text>
                <Input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  placeholder="Enter product name"
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
                  📝 Description
                </Text>
                <Input
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  placeholder="Enter description"
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

              <Box width="full">
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

              <Box width="full">
                <Text fontSize="sm" fontWeight="bold" mb={3} color="gray.700">
                  📦 Stock *
                </Text>
                <Input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: Number(e.target.value) || 0 })}
                  placeholder="Enter stock"
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

              <Box width="full">
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
                ✨ Add Product
              </Button>
            </VStack>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddProductModal;
