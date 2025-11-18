import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import Icon from '@/components/ui/icon';

interface LoyaltySectionProps {
  loyaltyPoints: number;
  onEarnPoints: () => void;
}

export default function LoyaltySection({ loyaltyPoints, onEarnPoints }: LoyaltySectionProps) {
  const tiers = [
    { name: 'Новичок', minPoints: 0, discount: 0, color: 'bg-gray-400' },
    { name: 'Ценитель', minPoints: 500, discount: 5, color: 'bg-blue-400' },
    { name: 'Мастер', minPoints: 2000, discount: 10, color: 'bg-purple-400' },
    { name: 'Гуру', minPoints: 5000, discount: 15, color: 'bg-secondary' },
  ];

  const currentTierIndex = tiers.findIndex((tier, index) => {
    const nextTier = tiers[index + 1];
    return loyaltyPoints >= tier.minPoints && (!nextTier || loyaltyPoints < nextTier.minPoints);
  });

  const currentTier = tiers[currentTierIndex];
  const nextTier = tiers[currentTierIndex + 1];
  const pointsToNextTier = nextTier ? nextTier.minPoints - loyaltyPoints : 0;
  const progressPercent = nextTier 
    ? ((loyaltyPoints - currentTier.minPoints) / (nextTier.minPoints - currentTier.minPoints)) * 100
    : 100;

  const benefits = [
    {
      icon: 'Gift',
      title: 'Кэшбэк баллами',
      description: `${currentTier.discount}% от каждой покупки возвращается бонусами`
    },
    {
      icon: 'Star',
      title: 'Эксклюзивные предложения',
      description: 'Доступ к редким сортам и спецпредложениям'
    },
    {
      icon: 'Calendar',
      title: 'Подарок на день рождения',
      description: 'Премиальный чай в подарок от чайного дома'
    },
    {
      icon: 'Truck',
      title: 'Бесплатная доставка',
      description: 'При заказе от 3000 ₽ доставка бесплатно'
    },
  ];

  return (
    <section id="loyalty" className="py-20 bg-gradient-to-b from-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <Badge className="mb-4 bg-secondary">
            <Icon name="Sparkles" size={14} className="mr-1" />
            Программа лояльности
          </Badge>
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-primary mb-4">
            Смысл чайного дома КИЦУНЭ
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Ваше путешествие в мир премиального чая вознаграждается на каждом шагу
          </p>
        </div>

        <div className="max-w-4xl mx-auto space-y-8">
          <Card className="overflow-hidden border-2 border-primary/20">
            <CardHeader className="bg-gradient-to-r from-primary/5 to-secondary/5">
              <CardTitle className="flex items-center justify-between">
                <span className="font-cormorant text-2xl">Ваш статус</span>
                <Badge className={`${currentTier.color} text-white px-4 py-1`}>
                  {currentTier.name}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-4xl font-cormorant font-bold text-primary">
                    {loyaltyPoints}
                  </div>
                  <div className="text-sm text-muted-foreground">накоплено баллов</div>
                </div>
                <Button 
                  onClick={onEarnPoints}
                  className="bg-secondary hover:bg-secondary/90"
                >
                  <Icon name="Plus" size={16} className="mr-2" />
                  Заработать баллы
                </Button>
              </div>

              {nextTier && (
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">
                      До статуса "{nextTier.name}"
                    </span>
                    <span className="font-medium text-primary">
                      {pointsToNextTier} баллов
                    </span>
                  </div>
                  <Progress value={progressPercent} className="h-2" />
                </div>
              )}

              <div className="grid grid-cols-2 gap-4 pt-4 border-t">
                <div className="text-center">
                  <div className="text-2xl font-cormorant font-bold text-secondary">
                    {currentTier.discount}%
                  </div>
                  <div className="text-xs text-muted-foreground">Кэшбэк</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-cormorant font-bold text-primary">
                    {loyaltyPoints}₽
                  </div>
                  <div className="text-xs text-muted-foreground">Можно потратить</div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-2 gap-6">
            {benefits.map((benefit, index) => (
              <Card key={index} className="hover:shadow-lg transition-shadow">
                <CardContent className="p-6 flex gap-4">
                  <div className="flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                      <Icon name={benefit.icon as any} size={24} className="text-primary" />
                    </div>
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-1">{benefit.title}</h3>
                    <p className="text-sm text-muted-foreground">{benefit.description}</p>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-gradient-to-r from-primary to-primary/80 text-primary-foreground">
            <CardContent className="p-8 text-center">
              <Icon name="Sparkles" size={48} className="mx-auto mb-4 opacity-80" />
              <h3 className="font-cormorant text-3xl font-bold mb-2">
                Философия КИЦУНЭ
              </h3>
              <p className="text-primary-foreground/90 mb-6 max-w-2xl mx-auto">
                Как лиса-кицунэ в японской мифологии олицетворяет мудрость и долголетие, 
                так и мы помогаем вам открыть путь к гармонии через культуру чаепития. 
                Каждая чашка — это медитация, каждый глоток — шаг к просветлению.
              </p>
              <div className="flex flex-wrap gap-4 justify-center">
                <div className="flex items-center gap-2">
                  <Icon name="Leaf" size={20} />
                  <span className="text-sm">Натуральность</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Heart" size={20} />
                  <span className="text-sm">Традиции</span>
                </div>
                <div className="flex items-center gap-2">
                  <Icon name="Award" size={20} />
                  <span className="text-sm">Качество</span>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {tiers.map((tier, index) => (
              <Card 
                key={tier.name}
                className={`text-center ${
                  index === currentTierIndex 
                    ? 'border-2 border-primary shadow-lg' 
                    : 'opacity-60'
                }`}
              >
                <CardContent className="p-4">
                  <div className={`w-12 h-12 rounded-full ${tier.color} mx-auto mb-2`}></div>
                  <div className="font-semibold mb-1">{tier.name}</div>
                  <div className="text-xs text-muted-foreground mb-1">
                    от {tier.minPoints} баллов
                  </div>
                  <div className="text-sm font-bold text-secondary">
                    {tier.discount}% кэшбэк
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
