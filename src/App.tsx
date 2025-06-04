
import { ChakraProvider, defaultSystem } from '@chakra-ui/react';
import { Provider } from 'react-redux';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { store } from './store/store';
import Navigation from './components/Navigation';
import Products from './pages/Products';
import LowInventory from './pages/LowInventory';
import NotFound from './pages/NotFound';

const App = () => (
  <Provider store={store}>
    <ChakraProvider value={defaultSystem}>
      <BrowserRouter>
        <Navigation />
        <Routes>
          <Route path="/" element={<Products />} />
          <Route path="/low-inventory" element={<LowInventory />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </ChakraProvider>
  </Provider>
);

export default App;
