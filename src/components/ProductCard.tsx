
import {
  Box,
  Text,
  Button,
  Card,
  Stack,
  Heading,
  Badge,
  Flex,
} from '@chakra-ui/react';
import { Product } from '../store/slices/productsSlice';

interface ProductCardProps {
  product: Product;
  onEdit: (product: Product) => void;
  onToggleLowInventory: (id: number) => void;
}

const ProductCard = ({ product, onEdit, onToggleLowInventory }: ProductCardProps) => {
  return (
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
      <Card.Body p={6}>
        <Stack gap={4}>
          <Flex justify="space-between" align="flex-start">
            <Heading 
              size="md" 
              lineClamp={2}
              color="gray.800"
              fontWeight="bold"
            >
              {product.title}
            </Heading>
            {product.lowInventory && (
              <Badge 
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
          </Flex>
          
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

          <Flex gap={3} mt={2}>
            <Button
              colorScheme="blue"
              size="md"
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
              size="md"
              onClick={() => onToggleLowInventory(product.id)}
              flex={1}
              borderRadius="xl"
              fontWeight="semibold"
              _hover={{ transform: 'translateY(-1px)', shadow: 'md' }}
              transition="all 0.2s"
            >
              {product.lowInventory ? "✅ Remove Flag" : "⚠️ Mark Low"}
            </Button>
          </Flex>
        </Stack>
      </Card.Body>
    </Card.Root>
  );
};

export default ProductCard;
