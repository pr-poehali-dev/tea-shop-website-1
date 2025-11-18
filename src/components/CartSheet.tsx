import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetFooter } from '@/components/ui/sheet';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import Icon from '@/components/ui/icon';
import { useCartStore } from '@/store/cartStore';
import { ScrollArea } from '@/components/ui/scroll-area';

interface CartSheetProps {
  isOpen: boolean;
  onClose: () => void;
  onCheckout: () => void;
}

export default function CartSheet({ isOpen, onClose, onCheckout }: CartSheetProps) {
  const { items, removeItem, updateQuantity, getTotalPrice, getTotalItems } = useCartStore();

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle className="font-cormorant text-2xl">
            Корзина ({getTotalItems()})
          </SheetTitle>
        </SheetHeader>

        {items.length === 0 ? (
          <div className="flex-1 flex flex-col items-center justify-center text-center py-12">
            <Icon name="ShoppingBag" size={64} className="text-muted-foreground/30 mb-4" />
            <h3 className="font-cormorant text-2xl text-primary mb-2">
              Корзина пуста
            </h3>
            <p className="text-muted-foreground mb-6">
              Добавьте чай из каталога
            </p>
            <Button onClick={onClose}>
              Перейти к каталогу
            </Button>
          </div>
        ) : (
          <>
            <ScrollArea className="flex-1 -mx-6 px-6">
              <div className="space-y-4 py-4">
                {items.map((item) => (
                  <div key={`${item.teaId}-${item.weight}`} className="flex gap-4">
                    <div className="w-20 h-20 rounded-lg overflow-hidden flex-shrink-0">
                      <img
                        src={item.image}
                        alt={item.teaName}
                        className="w-full h-full object-cover"
                      />
                    </div>

                    <div className="flex-1 min-w-0">
                      <h4 className="font-medium truncate">{item.teaName}</h4>
                      <p className="text-sm text-muted-foreground">
                        {item.weight}г · {item.price}₽
                      </p>

                      <div className="flex items-center gap-2 mt-2">
                        <div className="flex items-center border rounded-lg">
                          <button
                            onClick={() => updateQuantity(item.teaId, item.weight, item.quantity - 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Icon name="Minus" size={16} />
                          </button>
                          <span className="px-3 py-1 text-sm font-medium">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.teaId, item.weight, item.quantity + 1)}
                            className="p-1 hover:bg-muted transition-colors"
                          >
                            <Icon name="Plus" size={16} />
                          </button>
                        </div>

                        <button
                          onClick={() => removeItem(item.teaId, item.weight)}
                          className="p-1 text-destructive hover:bg-destructive/10 rounded transition-colors ml-auto"
                        >
                          <Icon name="Trash2" size={16} />
                        </button>
                      </div>
                    </div>

                    <div className="text-right flex-shrink-0">
                      <div className="font-semibold">
                        {(item.price * item.quantity).toLocaleString()}₽
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </ScrollArea>

            <div className="space-y-4 -mx-6 px-6 pt-4 border-t">
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Товары ({getTotalItems()})</span>
                  <span>{getTotalPrice().toLocaleString()}₽</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Доставка</span>
                  <span className="text-secondary">
                    {getTotalPrice() >= 3000 ? 'Бесплатно' : '300₽'}
                  </span>
                </div>
                <Separator />
                <div className="flex justify-between text-lg font-bold">
                  <span>Итого</span>
                  <span className="font-cormorant text-2xl text-primary">
                    {(getTotalPrice() + (getTotalPrice() >= 3000 ? 0 : 300)).toLocaleString()}₽
                  </span>
                </div>
              </div>

              {getTotalPrice() < 3000 && (
                <div className="text-xs text-muted-foreground bg-muted/50 p-3 rounded-lg">
                  <Icon name="Truck" size={14} className="inline mr-1" />
                  До бесплатной доставки осталось {(3000 - getTotalPrice()).toLocaleString()}₽
                </div>
              )}

              <Button
                onClick={onCheckout}
                className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
              >
                Оформить заказ
                <Icon name="ArrowRight" size={20} className="ml-2" />
              </Button>
            </div>
          </>
        )}
      </SheetContent>
    </Sheet>
  );
}
