import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';
import { teas, teaTypes, countries, type Tea } from '@/data/teas';

export default function CatalogSection() {
  const [selectedType, setSelectedType] = useState('Все сорта');
  const [selectedCountry, setSelectedCountry] = useState('Все страны');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 6000]);

  const filteredTeas = teas.filter((tea) => {
    const typeMatch = selectedType === 'Все сорта' || tea.type === selectedType;
    const countryMatch = selectedCountry === 'Все страны' || tea.country === selectedCountry;
    const priceMatch = tea.price >= priceRange[0] && tea.price <= priceRange[1];
    return typeMatch && countryMatch && priceMatch;
  });

  return (
    <section id="catalog" className="py-20 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="font-cormorant text-5xl md:text-6xl font-bold text-primary mb-4">
            Каталог чая
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Премиальные сорта из лучших чайных регионов мира
          </p>
        </div>

        <div className="mb-12 space-y-6">
          <div>
            <label className="text-sm font-medium mb-3 block">Тип чая</label>
            <div className="flex flex-wrap gap-2">
              {teaTypes.map((type) => (
                <Button
                  key={type}
                  variant={selectedType === type ? 'default' : 'outline'}
                  onClick={() => setSelectedType(type)}
                  className={selectedType === type ? 'bg-primary' : ''}
                >
                  {type}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">Страна происхождения</label>
            <div className="flex flex-wrap gap-2">
              {countries.map((country) => (
                <Button
                  key={country}
                  variant={selectedCountry === country ? 'default' : 'outline'}
                  onClick={() => setSelectedCountry(country)}
                  className={selectedCountry === country ? 'bg-primary' : ''}
                >
                  {country}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <label className="text-sm font-medium mb-3 block">
              Цена: {priceRange[0]} - {priceRange[1]} ₽
            </label>
            <div className="flex gap-4 items-center max-w-md">
              <input
                type="range"
                min="0"
                max="6000"
                step="100"
                value={priceRange[1]}
                onChange={(e) => setPriceRange([priceRange[0], parseInt(e.target.value)])}
                className="flex-1"
              />
            </div>
          </div>
        </div>

        <div className="mb-6 text-sm text-muted-foreground">
          Найдено чаёв: {filteredTeas.length}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredTeas.map((tea) => (
            <TeaCard key={tea.id} tea={tea} />
          ))}
        </div>

        {filteredTeas.length === 0 && (
          <div className="text-center py-20">
            <Icon name="Search" size={48} className="mx-auto text-muted-foreground/50 mb-4" />
            <p className="text-muted-foreground text-lg">
              Не найдено чая по выбранным фильтрам
            </p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={() => {
                setSelectedType('Все сорта');
                setSelectedCountry('Все страны');
                setPriceRange([0, 6000]);
              }}
            >
              Сбросить фильтры
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}

function TeaCard({ tea }: { tea: Tea }) {
  return (
    <Card className="group overflow-hidden hover:shadow-xl transition-all duration-300">
      <div className="relative overflow-hidden aspect-square">
        <img
          src={tea.image}
          alt={tea.name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        {tea.featured && (
          <Badge className="absolute top-3 right-3 bg-secondary text-secondary-foreground">
            <Icon name="Star" size={12} className="mr-1" />
            Хит
          </Badge>
        )}
      </div>
      <CardContent className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h3 className="font-cormorant text-xl font-semibold text-primary group-hover:text-secondary transition-colors">
              {tea.name}
            </h3>
            <div className="flex gap-2 mt-1">
              <Badge variant="outline" className="text-xs">{tea.type}</Badge>
              <Badge variant="outline" className="text-xs">{tea.country}</Badge>
            </div>
          </div>
        </div>

        <p className="text-sm text-muted-foreground line-clamp-2">
          {tea.description}
        </p>

        <div className="flex items-center justify-between pt-2">
          <div className="font-cormorant text-2xl font-bold text-primary">
            {tea.price.toLocaleString()} ₽
          </div>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            <Icon name="ShoppingCart" size={16} className="mr-1" />
            В корзину
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
