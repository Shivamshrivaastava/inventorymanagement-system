
import {
  Box,
  Text,
  Button,
  Card,
  CardBody,
  Stack,
  Heading,
  Badge,
  Flex,
  useColorModeValue,
} from '@chakra-ui/react';
import { Product } from '../store/slices/productsSlice';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onToggleLowInventory: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onToggleLowInventory }: ProductCardProps) => {
  const cardBg = useColorModeValue('white', 'gray.700');
  const borderColor = useColorModeValue('gray.200', 'gray.600');

  return (
    <Card
      bg={cardBg}
      borderWidth="1px"
      borderColor={borderColor}
      shadow="md"
      _hover={{ shadow: 'lg', transform: 'translateY(-2px)' }}
      transition="all 0.2s"
    >
      <CardBody>
        <Stack spacing={3}>
          <Flex justify="space-between" align="flex-start">
            <Heading size="md" noOfLines={2}>
              {product.title}
            </Heading>
            {product.lowInventory && (
              <Badge colorScheme="red" variant="solid">
                Low Stock
              </Badge>
            )}
          </Flex>
          
          <Box>
            <Text fontSize="2xl" fontWeight="bold" color="green.500">
              ₹{product.price.toLocaleString()}
            </Text>
            <Text color="gray.600">
              Stock: {product.quantity} units
            </Text>
          </Box>

          <Flex gap={2} wrap="wrap">
            <Button
              colorScheme="blue"
              size="sm"
              onClick={() => onEdit(product)}
              flex={1}
            >
              Edit
            </Button>
            <Button
              colorScheme={product.lowInventory ? "green" : "orange"}
              size="sm"
              onClick={() => onToggleLowInventory(product.id)}
              flex={1}
            >
              {product.lowInventory ? "Remove Flag" : "Mark Low"}
            </Button>
          </Flex>
        </Stack>
      </CardBody>
    </Card>
  );
};

export default ProductCard;
