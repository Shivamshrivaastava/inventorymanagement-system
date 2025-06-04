
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  Button,
  FormControl,
  FormLabel,
  Input,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  VStack,
  useToast,
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
  const toast = useToast();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    quantity: 0,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        title: product.title,
        price: product.price,
        quantity: product.quantity,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!product) return;

    if (!formData.title.trim()) {
      toast({
        title: 'Error',
        description: 'Product title is required',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.price <= 0) {
      toast({
        title: 'Error',
        description: 'Price must be greater than 0',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (formData.quantity < 0) {
      toast({
        title: 'Error',
        description: 'Quantity cannot be negative',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    dispatch(updateProduct({
      ...product,
      ...formData,
    }));

    toast({
      title: 'Success',
      description: 'Product updated successfully',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });

    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="md">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Product Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter product title"
                />
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Price (₹)</FormLabel>
                <NumberInput
                  value={formData.price}
                  onChange={(_, valueAsNumber) => 
                    setFormData({ ...formData, price: valueAsNumber || 0 })
                  }
                  min={0}
                >
                  <NumberInputField placeholder="Enter price" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <FormControl isRequired>
                <FormLabel>Quantity</FormLabel>
                <NumberInput
                  value={formData.quantity}
                  onChange={(_, valueAsNumber) => 
                    setFormData({ ...formData, quantity: valueAsNumber || 0 })
                  }
                  min={0}
                >
                  <NumberInputField placeholder="Enter quantity" />
                  <NumberInputStepper>
                    <NumberIncrementStepper />
                    <NumberDecrementStepper />
                  </NumberInputStepper>
                </NumberInput>
              </FormControl>

              <Button type="submit" colorScheme="blue" width="full">
                Update Product
              </Button>
            </VStack>
          </form>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
