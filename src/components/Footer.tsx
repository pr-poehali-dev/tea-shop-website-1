import Icon from '@/components/ui/icon';

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground py-12 mt-20">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-3xl">🦊</span>
              <div>
                <div className="font-cormorant text-2xl font-semibold">КИЦУНЭ</div>
                <div className="text-xs opacity-80 tracking-widest">TEA HOUSE</div>
              </div>
            </div>
            <p className="text-sm opacity-80">
              Премиальный чайный дом с традициями Востока
            </p>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Каталог</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>Зелёный чай</li>
              <li>Чёрный чай</li>
              <li>Белый чай</li>
              <li>Улуны</li>
              <li>Пуэры</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Информация</h4>
            <ul className="space-y-2 text-sm opacity-80">
              <li>О нас</li>
              <li>Доставка</li>
              <li>Оплата</li>
              <li>Блог</li>
              <li>Контакты</li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Контакты</h4>
            <div className="space-y-3 text-sm opacity-80">
              <div className="flex items-center gap-2">
                <Icon name="Phone" size={16} />
                <span>+7 (495) 123-45-67</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="Mail" size={16} />
                <span>info@kitsune.tea</span>
              </div>
              <div className="flex items-center gap-2">
                <Icon name="MapPin" size={16} />
                <span>Москва, ул. Чайная, 1</span>
              </div>
            </div>
            <div className="flex gap-3 mt-4">
              <button className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Icon name="Instagram" size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Icon name="Facebook" size={16} />
              </button>
              <button className="w-8 h-8 rounded-full bg-primary-foreground/10 hover:bg-primary-foreground/20 flex items-center justify-center transition-colors">
                <Icon name="MessageCircle" size={16} />
              </button>
            </div>
          </div>
        </div>

        <div className="border-t border-primary-foreground/20 pt-6 text-center text-sm opacity-60">
          © 2024 КИЦУНЭ Tea House. Все права защищены.
        </div>
      </div>
    </footer>
  );
}
