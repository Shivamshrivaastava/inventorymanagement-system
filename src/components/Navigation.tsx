
import {
  Box,
  Flex,
  Heading,
  Button,
  Badge,
  HStack,
  Text,
} from '@chakra-ui/react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useAppSelector, useAppDispatch } from '../store/hooks';
import { logout } from '../store/slices/authSlice';
import { LogOut, User } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const products = useAppSelector((state) => state.products.products);
  const user = useAppSelector((state) => state.auth.user);
  const lowInventoryCount = products.filter(p => p.lowInventory).length;

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

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
        
        <HStack gap={4}>
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
          
          <HStack gap={3} ml={4}>
            <HStack gap={2} color="gray.600">
              <User size={18} />
              <Text fontSize="sm" fontWeight="medium">
                {user?.name || 'User'}
              </Text>
            </HStack>
            <Button
              colorScheme="red"
              variant="ghost"
              size="sm"
              onClick={handleLogout}
              borderRadius="xl"
              _hover={{ transform: 'translateY(-1px)' }}
            >
              <HStack gap={2}>
                <LogOut size={16} />
                <Text>Logout</Text>
              </HStack>
            </Button>
          </HStack>
        </HStack>
      </Flex>
    </Box>
  );
};

export default Navigation;
