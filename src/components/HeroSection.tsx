import { Button } from '@/components/ui/button';
import Icon from '@/components/ui/icon';

interface HeroSectionProps {
  onNavigate: (section: string) => void;
}

export default function HeroSection({ onNavigate }: HeroSectionProps) {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-muted/30 to-background">
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-32 h-32 rounded-full bg-primary blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-40 h-40 rounded-full bg-secondary blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="inline-block px-4 py-2 rounded-full bg-secondary/10 text-secondary text-sm font-medium mb-4">
            Традиции премиального чаепития
          </div>

          <h1 className="font-cormorant text-6xl md:text-7xl lg:text-8xl font-bold text-primary leading-tight">
            Искусство<br />Чайной Церемонии
          </h1>

          <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Откройте для себя коллекцию редчайших чаёв со всего мира. 
            Каждый лист собран вручную и хранит древние традиции Востока.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center pt-4">
            <Button 
              size="lg" 
              onClick={() => onNavigate('catalog')}
              className="bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg"
            >
              Открыть каталог
              <Icon name="ArrowRight" size={20} className="ml-2" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              onClick={() => onNavigate('about')}
              className="border-primary text-primary hover:bg-primary/5 px-8 py-6 text-lg"
            >
              О философии чая
            </Button>
          </div>

          <div className="grid grid-cols-3 gap-8 max-w-2xl mx-auto pt-12 border-t border-border">
            <div className="space-y-2">
              <div className="text-3xl font-cormorant font-bold text-primary">50+</div>
              <div className="text-sm text-muted-foreground">Сортов чая</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-cormorant font-bold text-primary">8</div>
              <div className="text-sm text-muted-foreground">Стран происхождения</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl font-cormorant font-bold text-primary">15+</div>
              <div className="text-sm text-muted-foreground">Лет опыта</div>
            </div>
          </div>
        </div>
      </div>

      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
        <Icon name="ChevronDown" size={32} className="text-muted-foreground/50" />
      </div>
    </section>
  );
}
