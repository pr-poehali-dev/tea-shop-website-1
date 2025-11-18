import { useState } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { useCartStore } from '@/store/cartStore';

interface HeaderProps {
  onNavigate: (section: string) => void;
  loyaltyPoints: number;
  onCartOpen: () => void;
}

export default function Header({ onNavigate, loyaltyPoints, onCartOpen }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const getTotalItems = useCartStore(state => state.getTotalItems);

  const navItems = [
    { label: 'Главная', value: 'home' },
    { label: 'Каталог', value: 'catalog' },
    { label: 'О чае', value: 'about' },
    { label: 'Доставка', value: 'delivery' },
    { label: 'Блог', value: 'blog' },
    { label: 'Контакты', value: 'contacts' },
  ];

  return (
    <header className="fixed top-0 w-full bg-background/95 backdrop-blur-sm z-50 border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-20">
          <button 
            onClick={() => onNavigate('home')}
            className="flex items-center gap-2 hover:opacity-80 transition-opacity"
          >
            <span className="text-3xl">🦊</span>
            <div className="flex flex-col">
              <span className="font-cormorant text-2xl font-semibold text-primary">КИЦУНЭ</span>
              <span className="text-xs text-muted-foreground tracking-widest">TEA HOUSE</span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <button
                key={item.value}
                onClick={() => onNavigate(item.value)}
                className="text-sm font-medium hover:text-primary transition-colors relative group"
              >
                {item.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all group-hover:w-full"></span>
              </button>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <button 
              onClick={() => onNavigate('loyalty')}
              className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full bg-secondary/20 hover:bg-secondary/30 transition-colors"
            >
              <Icon name="Sparkles" size={16} className="text-secondary" />
              <span className="text-sm font-medium">{loyaltyPoints} баллов</span>
            </button>

            <Button variant="ghost" size="icon" className="relative" onClick={onCartOpen}>
              <Icon name="ShoppingBag" size={20} />
              {getTotalItems() > 0 && (
                <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 bg-secondary text-xs">
                  {getTotalItems()}
                </Badge>
              )}
            </Button>

            <Button
              variant="ghost"
              size="icon"
              className="lg:hidden"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Icon name={isMenuOpen ? "X" : "Menu"} size={24} />
            </Button>
          </div>
        </div>

        {isMenuOpen && (
          <nav className="lg:hidden py-4 border-t border-border animate-accordion-down">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <button
                  key={item.value}
                  onClick={() => {
                    onNavigate(item.value);
                    setIsMenuOpen(false);
                  }}
                  className="text-left py-2 hover:text-primary transition-colors"
                >
                  {item.label}
                </button>
              ))}
              <button 
                onClick={() => {
                  onNavigate('loyalty');
                  setIsMenuOpen(false);
                }}
                className="flex items-center gap-2 py-2 text-secondary"
              >
                <Icon name="Sparkles" size={16} />
                <span>Программа лояльности ({loyaltyPoints} баллов)</span>
              </button>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}