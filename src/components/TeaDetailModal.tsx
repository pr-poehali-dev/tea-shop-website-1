import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import Icon from '@/components/ui/icon';
import type { Tea } from '@/data/teas';
import { useCartStore } from '@/store/cartStore';
import { toast } from 'sonner';
import { useState } from 'react';
import { reviews } from '@/data/reviews';

interface TeaDetailModalProps {
  tea: Tea | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function TeaDetailModal({ tea, isOpen, onClose }: TeaDetailModalProps) {
  const [selectedWeight, setSelectedWeight] = useState<20 | 50 | 100 | 500>(50);
  const addItem = useCartStore(state => state.addItem);

  if (!tea) return null;

  const handleAddToCart = () => {
    addItem(tea.id, tea.name, selectedWeight, tea.prices[selectedWeight], tea.image);
    toast.success(`${tea.name} добавлен в корзину`, {
      description: `${selectedWeight}г за ${tea.prices[selectedWeight]}₽`,
    });
  };

  const flavorData = [
    { name: 'Сладость', value: tea.flavorProfile.sweetness, color: 'bg-pink-500' },
    { name: 'Горечь', value: tea.flavorProfile.bitterness, color: 'bg-amber-700' },
    { name: 'Терпкость', value: tea.flavorProfile.astringency, color: 'bg-orange-600' },
    { name: 'Тело', value: tea.flavorProfile.body, color: 'bg-stone-600' },
    { name: 'Цветочность', value: tea.flavorProfile.floral, color: 'bg-purple-400' },
    { name: 'Фруктовость', value: tea.flavorProfile.fruity, color: 'bg-red-400' },
    { name: 'Землистость', value: tea.flavorProfile.earthy, color: 'bg-green-700' },
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="font-cormorant text-3xl text-primary">
            {tea.name}
          </DialogTitle>
        </DialogHeader>

        <Tabs defaultValue="details" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="details">Детали</TabsTrigger>
            <TabsTrigger value="reviews">Отзывы ({reviews.filter(r => r.teaId === tea.id).length})</TabsTrigger>
          </TabsList>

          <TabsContent value="details">
            <div className="grid md:grid-cols-2 gap-6 mt-4">
          <div className="space-y-4">
            <div className="relative aspect-square rounded-lg overflow-hidden">
              <img
                src={tea.image}
                alt={tea.name}
                className="w-full h-full object-cover"
              />
              {tea.featured && (
                <Badge className="absolute top-3 right-3 bg-secondary">
                  <Icon name="Star" size={12} className="mr-1" />
                  Хит
                </Badge>
              )}
            </div>

            <div className="flex items-center gap-2">
              <div className="flex items-center gap-1">
                <Icon name="Star" size={16} className="text-secondary fill-secondary" />
                <span className="font-semibold">{tea.ratings}</span>
              </div>
              <span className="text-sm text-muted-foreground">
                ({tea.reviewCount} отзывов)
              </span>
            </div>

            <div className="flex gap-2">
              <Badge variant="outline">{tea.type}</Badge>
              <Badge variant="outline">{tea.country}</Badge>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <h3 className="font-semibold mb-2">Описание</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">
                {tea.detailedDescription}
              </p>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Вкусовой профиль</h3>
              <div className="space-y-2">
                {flavorData.map((flavor) => (
                  <div key={flavor.name}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="text-muted-foreground">{flavor.name}</span>
                      <span className="font-medium">{flavor.value}/10</span>
                    </div>
                    <Progress value={flavor.value * 10} className="h-2" />
                  </div>
                ))}
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-2">Вкусовые ноты</h3>
              <div className="flex flex-wrap gap-2">
                {tea.tastingNotes.map((note) => (
                  <Badge key={note} variant="secondary" className="px-3 py-1">
                    {note}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-muted-foreground mb-1">Температура заварки</div>
                <div className="font-medium flex items-center gap-1">
                  <Icon name="Thermometer" size={14} />
                  {tea.brewingTemp}
                </div>
              </div>
              <div>
                <div className="text-muted-foreground mb-1">Время заварки</div>
                <div className="font-medium flex items-center gap-1">
                  <Icon name="Timer" size={14} />
                  {tea.brewingTime}
                </div>
              </div>
            </div>

            <Separator />

            <div>
              <h3 className="font-semibold mb-3">Выберите вес</h3>
              <div className="grid grid-cols-4 gap-2">
                {[20, 50, 100, 500].map((weight) => (
                  <button
                    key={weight}
                    onClick={() => setSelectedWeight(weight as any)}
                    className={`p-3 rounded-lg border-2 transition-all ${
                      selectedWeight === weight
                        ? 'border-primary bg-primary/5'
                        : 'border-border hover:border-primary/50'
                    }`}
                  >
                    <div className="text-sm font-medium">{weight}г</div>
                    <div className="text-xs text-muted-foreground mt-1">
                      {tea.prices[weight as keyof typeof tea.prices]}₽
                    </div>
                  </button>
                ))}
              </div>
            </div>

            <Button
              onClick={handleAddToCart}
              className="w-full bg-primary hover:bg-primary/90 text-lg py-6"
            >
              <Icon name="ShoppingCart" size={20} className="mr-2" />
              Добавить в корзину — {tea.prices[selectedWeight]}₽
            </Button>
          </div>
            </div>
          </TabsContent>

          <TabsContent value="reviews">
            <ReviewsSection teaId={tea.id} />
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  );
}

function ReviewsSection({ teaId }: { teaId: number }) {
  const teaReviews = reviews.filter(r => r.teaId === teaId);

  if (teaReviews.length === 0) {
    return (
      <div className="py-12 text-center">
        <Icon name="MessageSquare" size={48} className="mx-auto text-muted-foreground/30 mb-4" />
        <p className="text-muted-foreground">Пока нет отзывов на этот чай</p>
        <p className="text-sm text-muted-foreground mt-2">Станьте первым, кто оставит отзыв!</p>
      </div>
    );
  }

  return (
    <div className="space-y-4 mt-4">
      {teaReviews.map((review) => (
        <div key={review.id} className="border rounded-lg p-4 space-y-2">
          <div className="flex items-start justify-between">
            <div>
              <div className="font-semibold">{review.userName}</div>
              <div className="text-xs text-muted-foreground">
                {new Date(review.date).toLocaleDateString('ru-RU', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
            </div>
            <div className="flex items-center gap-1">
              {Array.from({ length: 5 }).map((_, i) => (
                <Icon
                  key={i}
                  name="Star"
                  size={14}
                  className={i < review.rating ? 'text-secondary fill-secondary' : 'text-muted-foreground/30'}
                />
              ))}
            </div>
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">{review.text}</p>
        </div>
      ))}
    </div>
  );
}