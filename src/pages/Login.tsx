
import {
  Container,
  Box,
  VStack,
  HStack,
  Text,
  Input,
  Button,
  Card,
  Image,
  FormControl,
  FormLabel,
  InputGroup,
  InputLeftElement,
  Link,
  Divider,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../store/hooks';
import { login } from '../store/slices/authSlice';
import { LogIn, Mail, Lock, Eye, EyeOff } from 'lucide-react';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    // Simple validation
    if (!formData.email || !formData.password) {
      alert('Please fill in all fields');
      setIsLoading(false);
      return;
    }

    // Simulate login delay
    setTimeout(() => {
      // For demo purposes, accept any email/password
      const userData = {
        email: formData.email,
        name: formData.email.split('@')[0] || 'User',
      };
      
      dispatch(login(userData));
      setIsLoading(false);
      navigate('/');
    }, 1000);
  };

  return (
    <Box 
      minH="100vh" 
      bg="linear-gradient(135deg, #667eea 0%, #764ba2 100%)"
      display="flex"
      alignItems="center"
      justifyContent="center"
      p={4}
    >
      <Container maxW="md">
        <Card.Root
          bg="white"
          shadow="2xl"
          borderRadius="3xl"
          overflow="hidden"
          border="1px solid"
          borderColor="gray.100"
        >
          <Box bg="blue.600" p={8} textAlign="center">
            <VStack gap={4}>
              <Box
                bg="white"
                borderRadius="full"
                p={4}
                shadow="lg"
              >
                <Box fontSize="4xl">📦</Box>
              </Box>
              <VStack gap={1}>
                <Text 
                  fontSize="3xl" 
                  fontWeight="extrabold" 
                  color="white"
                >
                  Inventory Manager
                </Text>
                <Text 
                  fontSize="lg" 
                  color="blue.100"
                  fontWeight="medium"
                >
                  Welcome back! Please sign in to continue
                </Text>
              </VStack>
            </VStack>
          </Box>

          <Card.Body p={8}>
            <form onSubmit={handleSubmit}>
              <VStack gap={6}>
                <FormControl>
                  <FormLabel 
                    fontSize="sm" 
                    fontWeight="bold" 
                    color="gray.700"
                    mb={3}
                  >
                    📧 Email Address
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <Mail size={18} />
                    </InputLeftElement>
                    <Input
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="Enter your email"
                      size="lg"
                      borderRadius="xl"
                      bg="gray.50"
                      borderColor="gray.300"
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                      pl={12}
                    />
                  </InputGroup>
                </FormControl>

                <FormControl>
                  <FormLabel 
                    fontSize="sm" 
                    fontWeight="bold" 
                    color="gray.700"
                    mb={3}
                  >
                    🔒 Password
                  </FormLabel>
                  <InputGroup>
                    <InputLeftElement color="gray.400">
                      <Lock size={18} />
                    </InputLeftElement>
                    <Input
                      type={showPassword ? 'text' : 'password'}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="Enter your password"
                      size="lg"
                      borderRadius="xl"
                      bg="gray.50"
                      borderColor="gray.300"
                      _hover={{ borderColor: 'blue.400' }}
                      _focus={{ borderColor: 'blue.500', shadow: 'outline' }}
                      pl={12}
                      pr={12}
                    />
                    <Button
                      variant="ghost"
                      size="sm"
                      position="absolute"
                      right={2}
                      top="50%"
                      transform="translateY(-50%)"
                      onClick={() => setShowPassword(!showPassword)}
                      color="gray.400"
                      _hover={{ color: 'gray.600' }}
                    >
                      {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                    </Button>
                  </InputGroup>
                </FormControl>

                <Button
                  type="submit"
                  colorScheme="blue"
                  size="lg"
                  width="full"
                  borderRadius="xl"
                  fontWeight="bold"
                  shadow="lg"
                  _hover={{ transform: 'translateY(-2px)', shadow: 'xl' }}
                  transition="all 0.2s"
                  isLoading={isLoading}
                  loadingText="Signing in..."
                  leftIcon={<LogIn size={20} />}
                >
                  Sign In
                </Button>

                <Divider />

                <VStack gap={2} textAlign="center">
                  <Text color="gray.600" fontSize="sm">
                    Demo credentials: Any email and password will work
                  </Text>
                  <HStack gap={1} fontSize="sm">
                    <Text color="gray.500">Don't have an account?</Text>
                    <Link color="blue.500" fontWeight="bold">
                      Sign up here
                    </Link>
                  </HStack>
                </VStack>
              </VStack>
            </form>
          </Card.Body>
        </Card.Root>
      </Container>
    </Box>
  );
};

export default Login;
