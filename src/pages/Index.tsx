import { useState } from 'react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CatalogSection from '@/components/CatalogSection';
import LoyaltySection from '@/components/LoyaltySection';
import Footer from '@/components/Footer';
import CartSheet from '@/components/CartSheet';
import CheckoutModal from '@/components/CheckoutModal';
import { toast } from 'sonner';

export default function Index() {
  const [loyaltyPoints, setLoyaltyPoints] = useState(350);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);

  const handleNavigate = (section: string) => {
    if (section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }

    const sectionMap: Record<string, string> = {
      catalog: 'catalog',
      loyalty: 'loyalty',
      about: 'catalog',
      delivery: 'catalog',
      blog: 'catalog',
      contacts: 'catalog',
    };

    const targetId = sectionMap[section];
    if (targetId) {
      const element = document.getElementById(targetId);
      if (element) {
        const offset = 100;
        const elementPosition = element.getBoundingClientRect().top;
        const offsetPosition = elementPosition + window.pageYOffset - offset;
        window.scrollTo({ top: offsetPosition, behavior: 'smooth' });
      }
    }
  };

  const handleEarnPoints = () => {
    const earnedPoints = Math.floor(Math.random() * 100) + 50;
    setLoyaltyPoints(prev => prev + earnedPoints);
    toast.success(`Вы заработали ${earnedPoints} баллов!`, {
      description: 'Баллы можно использовать при следующей покупке',
    });
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  return (
    <div className="min-h-screen">
      <Header 
        onNavigate={handleNavigate} 
        loyaltyPoints={loyaltyPoints}
        onCartOpen={() => setIsCartOpen(true)}
      />
      
      <main className="pt-20">
        <HeroSection onNavigate={handleNavigate} />
        <CatalogSection />
        <LoyaltySection loyaltyPoints={loyaltyPoints} onEarnPoints={handleEarnPoints} />
      </main>

      <Footer />

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        onCheckout={handleCheckout}
      />

      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
      />
    </div>
  );
}