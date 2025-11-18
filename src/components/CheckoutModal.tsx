import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCartStore } from '@/store/cartStore';
import { useState } from 'react';
import { toast } from 'sonner';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CheckoutModal({ isOpen, onClose }: CheckoutModalProps) {
  const { items, getTotalPrice, clearCart } = useCartStore();
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    comment: '',
  });

  const deliveryPrice = getTotalPrice() >= 3000 ? 0 : 300;
  const totalPrice = getTotalPrice() + deliveryPrice;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    toast.success('Заказ оформлен!', {
      description: `Номер заказа: ${Math.floor(Math.random() * 100000)}. Мы свяжемся с вами в ближайшее время.`,
    });
    
    clearCart();
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-3xl text-primary">
            Оформление заказа
          </DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Контактные данные</h3>
            
            <div>
              <Label htmlFor="name">Имя *</Label>
              <Input
                id="name"
                required
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Иван Иванов"
              />
            </div>

            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="phone">Телефон *</Label>
                <Input
                  id="phone"
                  type="tel"
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  placeholder="+7 (999) 123-45-67"
                />
              </div>

              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  placeholder="example@mail.com"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="address">Адрес доставки *</Label>
              <Textarea
                id="address"
                required
                value={formData.address}
                onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                placeholder="Улица, дом, квартира"
                rows={3}
              />
            </div>

            <div>
              <Label htmlFor="comment">Комментарий к заказу</Label>
              <Textarea
                id="comment"
                value={formData.comment}
                onChange={(e) => setFormData({ ...formData, comment: e.target.value })}
                placeholder="Пожелания по доставке, упаковке и т.д."
                rows={3}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-4">
            <h3 className="font-semibold text-lg">Способ оплаты</h3>
            
            <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="card" id="card" />
                <Label htmlFor="card" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="CreditCard" size={20} />
                    <div>
                      <div className="font-medium">Картой онлайн</div>
                      <div className="text-xs text-muted-foreground">
                        Visa, Mastercard, МИР
                      </div>
                    </div>
                  </div>
                </Label>
              </div>

              <div className="flex items-center space-x-2 border rounded-lg p-4 cursor-pointer hover:bg-muted/50 transition-colors">
                <RadioGroupItem value="cash" id="cash" />
                <Label htmlFor="cash" className="flex-1 cursor-pointer">
                  <div className="flex items-center gap-2">
                    <Icon name="Wallet" size={20} />
                    <div>
                      <div className="font-medium">При получении</div>
                      <div className="text-xs text-muted-foreground">
                        Наличными или картой курьеру
                      </div>
                    </div>
                  </div>
                </Label>
              </div>
            </RadioGroup>
          </div>

          <Separator />

          <div className="space-y-3">
            <h3 className="font-semibold text-lg">Ваш заказ</h3>
            
            <div className="space-y-2 max-h-40 overflow-y-auto">
              {items.map((item) => (
                <div key={`${item.teaId}-${item.weight}`} className="flex justify-between text-sm">
                  <span className="text-muted-foreground">
                    {item.teaName} ({item.weight}г) × {item.quantity}
                  </span>
                  <span className="font-medium">
                    {(item.price * item.quantity).toLocaleString()}₽
                  </span>
                </div>
              ))}
            </div>

            <Separator />

            <div className="space-y-1">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Товары</span>
                <span>{getTotalPrice().toLocaleString()}₽</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Доставка</span>
                <span className={deliveryPrice === 0 ? 'text-secondary' : ''}>
                  {deliveryPrice === 0 ? 'Бесплатно' : `${deliveryPrice}₽`}
                </span>
              </div>
            </div>

            <Separator />

            <div className="flex justify-between text-lg font-bold">
              <span>Итого к оплате</span>
              <span className="font-cormorant text-2xl text-primary">
                {totalPrice.toLocaleString()}₽
              </span>
            </div>
          </div>

          <div className="flex gap-3">
            <Button type="button" variant="outline" onClick={onClose} className="flex-1">
              Назад
            </Button>
            <Button type="submit" className="flex-1 bg-primary hover:bg-primary/90">
              Подтвердить заказ
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
