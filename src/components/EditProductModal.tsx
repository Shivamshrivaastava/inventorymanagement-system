
import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Textarea,
  Card,
} from '@chakra-ui/react';
import { X, Save, DollarSign, Package } from 'lucide-react';
import { useAppDispatch } from '../store/hooks';
import { updateProduct, Product } from '../store/slices/productsSlice';
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from './ui/dialog';
import { Switch } from './ui/switch';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from './ui/select';

interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  product: Product | null;
}

const EditProductModal = ({ isOpen, onClose, product }: EditProductModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    price: '',
    stock: '',
    category: '',
    lowInventory: false,
  });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        description: product.description,
        price: product.price.toString(),
        stock: product.stock.toString(),
        category: product.category,
        lowInventory: product.lowInventory,
      });
    }
  }, [product]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!product) return;

    const updatedProduct: Product = {
      ...product,
      name: formData.name,
      description: formData.description,
      price: parseFloat(formData.price),
      stock: parseInt(formData.stock),
      category: formData.category,
      lowInventory: formData.lowInventory,
    };

    dispatch(updateProduct(updatedProduct));
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold text-gray-800">
            ✏️ Edit Product
          </DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-6">
          <VStack gap={4} align="stretch">
            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Product Name
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
                required
              />
            </Box>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Description
              </Text>
              <Textarea
                value={formData.description}
                onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                placeholder="Enter product description"
                rows={3}
                borderRadius="xl"
                bg="gray.50"
                borderColor="gray.300"
                _hover={{ borderColor: 'blue.400' }}
                _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                required
              />
            </Box>

            <HStack gap={4}>
              <Box flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                  💰 Price
                </Text>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    zIndex={2}
                  >
                    <DollarSign size={18} />
                  </Box>
                  <Input
                    type="number"
                    step="0.01"
                    value={formData.price}
                    onChange={(e) => setFormData({ ...formData, price: e.target.value })}
                    placeholder="0.00"
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                    pl={12}
                    required
                  />
                </Box>
              </Box>

              <Box flex="1">
                <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                  📦 Stock
                </Text>
                <Box position="relative">
                  <Box
                    position="absolute"
                    left={3}
                    top="50%"
                    transform="translateY(-50%)"
                    color="gray.400"
                    zIndex={2}
                  >
                    <Package size={18} />
                  </Box>
                  <Input
                    type="number"
                    value={formData.stock}
                    onChange={(e) => setFormData({ ...formData, stock: e.target.value })}
                    placeholder="0"
                    size="lg"
                    borderRadius="xl"
                    bg="gray.50"
                    borderColor="gray.300"
                    _hover={{ borderColor: 'blue.400' }}
                    _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                    pl={12}
                    required
                  />
                </Box>
              </Box>
            </HStack>

            <Box>
              <Text fontSize="sm" fontWeight="semibold" color="gray.700" mb={2}>
                Category
              </Text>
              <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Electronics">Electronics</SelectItem>
                  <SelectItem value="Clothing">Clothing</SelectItem>
                  <SelectItem value="Books">Books</SelectItem>
                  <SelectItem value="Home & Garden">Home & Garden</SelectItem>
                  <SelectItem value="Sports">Sports</SelectItem>
                </SelectContent>
              </Select>
            </Box>

            <HStack justify="space-between" p={4} bg="orange.50" borderRadius="xl" border="1px" borderColor="orange.200">
              <VStack align="start" gap={0}>
                <Text fontWeight="semibold" color="orange.800">
                  ⚠️ Low Inventory Alert
                </Text>
                <Text fontSize="sm" color="orange.600">
                  Mark this product as low inventory
                </Text>
              </VStack>
              <Switch
                checked={formData.lowInventory}
                onCheckedChange={(checked) => setFormData({ ...formData, lowInventory: checked })}
              />
            </HStack>
          </VStack>

          <HStack justify="end" gap={3} pt={4}>
            <Button
              variant="outline"
              size="lg"
              borderRadius="xl"
              onClick={onClose}
            >
              <HStack gap={2}>
                <X size={18} />
                <Text>Cancel</Text>
              </HStack>
            </Button>
            <Button
              type="submit"
              colorScheme="blue"
              size="lg"
              borderRadius="xl"
              fontWeight="semibold"
              shadow="lg"
              _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
              transition="all 0.2s"
            >
              <HStack gap={2}>
                <Save size={18} />
                <Text>Save Changes</Text>
              </HStack>
            </Button>
          </HStack>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EditProductModal;
