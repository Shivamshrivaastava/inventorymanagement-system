
import {
  Box,
  Flex,
  Heading,
  Button,
  Badge,
  useColorModeValue,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Navigation = () => {
  const location = useLocation();
  const bgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.600');
  const products = useAppSelector((state) => state.products.products);
  const lowInventoryCount = products.filter(p => p.lowInventory).length;

  return (
    <Box
      bg={bgColor}
      borderBottomWidth="1px"
      borderColor={borderColor}
      px={4}
      py={3}
      shadow="sm"
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Heading size="lg" color="blue.500">
          Inventory Manager
        </Heading>
        
        <Flex gap={2}>
          <Button
            as={Link}
            to="/"
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme="blue"
          >
            All Products
          </Button>
          <Button
            as={Link}
            to="/low-inventory"
            variant={location.pathname === '/low-inventory' ? 'solid' : 'ghost'}
            colorScheme="orange"
            position="relative"
          >
            Low Inventory
            {lowInventoryCount > 0 && (
              <Badge
                colorScheme="red"
                variant="solid"
                borderRadius="full"
                position="absolute"
                top="-1"
                right="-1"
                fontSize="xs"
              >
                {lowInventoryCount}
              </Badge>
            )}
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
