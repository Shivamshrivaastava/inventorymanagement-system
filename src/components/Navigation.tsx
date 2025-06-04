
import {
  Box,
  Flex,
  Heading,
  Button,
  Badge,
} from '@chakra-ui/react';
import { Link, useLocation } from 'react-router-dom';
import { useAppSelector } from '../store/hooks';

const Navigation = () => {
  const location = useLocation();
  const products = useAppSelector((state) => state.products.products);
  const lowInventoryCount = products.filter(p => p.lowInventory).length;

  return (
    <Box
      bg="white"
      borderBottomWidth="1px"
      borderColor="gray.200"
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
            asChild
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme="blue"
          >
            <Link to="/">All Products</Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === '/low-inventory' ? 'solid' : 'ghost'}
            colorScheme="orange"
            position="relative"
          >
            <Link to="/low-inventory">
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
            </Link>
          </Button>
        </Flex>
      </Flex>
    </Box>
  );
};

export default Navigation;
