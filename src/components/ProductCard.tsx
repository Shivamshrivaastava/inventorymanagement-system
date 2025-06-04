
import {
  Box,
  Text,
  Button,
  Card,
  Stack,
  Heading,
  Badge,
  Flex,
  Image,
  useDisclosure,
} from '@chakra-ui/react';
import { useRef } from 'react';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from './ui/alert-dialog';
import { Product } from '../store/slices/productsSlice';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onToggleLowInventory: (id: number) => void;
  onDelete: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onToggleLowInventory, onDelete }: ProductCardProps) => {
  const { open, onOpen, onClose } = useDisclosure();
  const cancelRef = useRef<HTMLButtonElement>(null);

  const handleDelete = () => {
    onDelete(product.id);
    onClose();
  };

  return (
    <>
      <Card.Root
        bg="white"
        borderWidth="1px"
        borderColor="gray.200"
        shadow="xl"
        borderRadius="2xl"
        _hover={{ 
          shadow: '2xl', 
          transform: 'translateY(-4px)',
          borderColor: 'blue.200'
        }}
        transition="all 0.3s ease"
        overflow="hidden"
      >
        <Box position="relative">
          <Image
            src={product.imageUrl}
            alt={product.title}
            w="full"
            h="200px"
            objectFit="cover"
            onError={(e) => {
              e.currentTarget.src = "https://via.placeholder.com/400x200?text=Product+Image";
            }}
          />
          {product.lowInventory && (
            <Badge 
              position="absolute"
              top={3}
              right={3}
              colorScheme="red" 
              variant="solid"
              borderRadius="full"
              px={3}
              py={1}
              fontSize="xs"
              fontWeight="bold"
            >
              🚨 Low Stock
            </Badge>
          )}
        </Box>

        <Card.Body p={6}>
          <Stack gap={4}>
            <Heading 
              size="md" 
              lineClamp={2}
              color="gray.800"
              fontWeight="bold"
            >
              {product.title}
            </Heading>
            
            <Box>
              <Text 
                fontSize="3xl" 
                fontWeight="extrabold" 
                color="green.500"
                mb={1}
              >
                ₹{product.price.toLocaleString()}
              </Text>
              <Flex align="center" gap={2}>
                <Text color="gray.600" fontWeight="medium">
                  📦 Stock: 
                </Text>
                <Badge
                  colorScheme={product.quantity > 50 ? "green" : product.quantity > 20 ? "yellow" : "red"}
                  variant="subtle"
                  borderRadius="md"
                  px={2}
                  py={1}
                >
                  {product.quantity} units
                </Badge>
              </Flex>
            </Box>

            <Flex gap={2} mt={2} wrap="wrap">
              <Button
                colorScheme="blue"
                size="sm"
                onClick={() => onEdit(product)}
                flex={1}
                borderRadius="xl"
                fontWeight="semibold"
                _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                transition="all 0.2s"
              >
                ✏️ Edit
              </Button>
              <Button
                colorScheme={product.lowInventory ? "green" : "orange"}
                size="sm"
                onClick={() => onToggleLowInventory(product.id)}
                flex={1}
                borderRadius="xl"
                fontWeight="semibold"
                _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                transition="all 0.2s"
              >
                {product.lowInventory ? "✅ Remove Flag" : "⚠️ Mark Low"}
              </Button>
              
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    colorScheme="red"
                    size="sm"
                    flex={1}
                    borderRadius="xl"
                    fontWeight="semibold"
                    _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
                    transition="all 0.2s"
                  >
                    🗑️ Delete
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Delete Product</AlertDialogTitle>
                    <AlertDialogDescription>
                      Are you sure you want to delete "{product.title}"? This action cannot be undone.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel ref={cancelRef}>Cancel</AlertDialogCancel>
                    <AlertDialogAction onClick={handleDelete}>Delete</AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </Flex>
          </Stack>
        </Card.Body>
      </Card.Root>
    </>
  );
};

export default ProductCard;
