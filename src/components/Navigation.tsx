
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
      px={6}
      py={4}
      shadow="lg"
      position="sticky"
      top={0}
      zIndex={10}
    >
      <Flex justify="space-between" align="center" maxW="container.xl" mx="auto">
        <Heading 
          size="xl" 
          bgGradient="linear(to-r, blue.500, purple.600)"
          bgClip="text"
          fontWeight="extrabold"
        >
          📦 Inventory Manager
        </Heading>
        
        <Flex gap={3}>
          <Button
            asChild
            variant={location.pathname === '/' ? 'solid' : 'ghost'}
            colorScheme="blue"
            size="lg"
            borderRadius="xl"
            fontWeight="semibold"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
          >
            <Link to="/">All Products</Link>
          </Button>
          <Button
            asChild
            variant={location.pathname === '/low-inventory' ? 'solid' : 'ghost'}
            colorScheme="orange"
            size="lg"
            borderRadius="xl"
            fontWeight="semibold"
            position="relative"
            _hover={{ transform: 'translateY(-2px)', shadow: 'lg' }}
            transition="all 0.2s"
          >
            <Link to="/low-inventory">
              ⚠️ Low Inventory
              {lowInventoryCount > 0 && (
                <Badge
                  colorScheme="red"
                  variant="solid"
                  borderRadius="full"
                  position="absolute"
                  top="-1"
                  right="-1"
                  fontSize="xs"
                  minW="6"
                  h="6"
                  display="flex"
                  alignItems="center"
                  justifyContent="center"
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
