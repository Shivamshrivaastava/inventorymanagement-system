
import {
  DialogRoot,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogBody,
  DialogCloseTrigger,
  DialogTitle,
  Button,
  Field,
  Input,
  VStack,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useAppDispatch } from '../store/hooks';
import { addProduct } from '../store/slices/productsSlice';

interface AddProductModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AddProductModal = ({ isOpen, onClose }: AddProductModalProps) => {
  const dispatch = useAppDispatch();
  const [formData, setFormData] = useState({
    title: '',
    price: 0,
    quantity: 0,
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.title.trim()) {
      alert('Product title is required');
      return;
    }

    if (formData.price <= 0) {
      alert('Price must be greater than 0');
      return;
    }

    if (formData.quantity < 0) {
      alert('Quantity cannot be negative');
      return;
    }

    dispatch(addProduct({
      ...formData,
      lowInventory: false,
    }));

    alert('Product added successfully');
    setFormData({ title: '', price: 0, quantity: 0 });
    onClose();
  };

  return (
    <DialogRoot open={isOpen} onOpenChange={(e) => !e.open && onClose()}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Add New Product</DialogTitle>
          <DialogCloseTrigger />
        </DialogHeader>
        <DialogBody pb={6}>
          <form onSubmit={handleSubmit}>
            <VStack gap={4}>
              <Field label="Product Title" required>
                <Input
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  placeholder="Enter product title"
                />
              </Field>

              <Field label="Price (₹)" required>
                <Input
                  type="number"
                  value={formData.price}
                  onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) || 0 })}
                  placeholder="Enter price"
                  min={0}
                />
              </Field>

              <Field label="Quantity" required>
                <Input
                  type="number"
                  value={formData.quantity}
                  onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) || 0 })}
                  placeholder="Enter quantity"
                  min={0}
                />
              </Field>

              <Button type="submit" colorScheme="blue" width="full">
                Add Product
              </Button>
            </VStack>
          </form>
        </DialogBody>
      </DialogContent>
    </DialogRoot>
  );
};

export default AddProductModal;
