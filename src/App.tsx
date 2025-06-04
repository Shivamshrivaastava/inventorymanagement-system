
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store';
import Navigation from './components/Navigation';
import ProtectedRoute from './components/ProtectedRoute';
import Products from './pages/Products';
import LowInventory from './pages/LowInventory';
import Login from './pages/Login';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/" element={
            <ProtectedRoute>
              <Navigation />
              <Products />
            </ProtectedRoute>
          } />
          <Route path="/low-inventory" element={
            <ProtectedRoute>
              <Navigation />
              <LowInventory />
            </ProtectedRoute>
          } />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

export default App;
