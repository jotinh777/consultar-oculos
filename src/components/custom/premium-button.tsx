'use client';

import { Crown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { useEffect, useState } from 'react';

export function PremiumButton() {
  const router = useRouter();
  const [user, setUser] = useState(storage.getUser());

  useEffect(() => {
    // Atualizar estado quando usuário mudar
    const interval = setInterval(() => {
      setUser(storage.getUser());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Se já é premium, não mostrar botão
  if (user?.tier === 'premium') {
    return null;
  }

  return (
    <Button
      onClick={() => router.push('/upgrade')}
      className="fixed top-4 right-4 z-50 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
      size="lg"
    >
      <Crown className="w-5 h-5 mr-2" />
      Seja Premium
    </Button>
  );
}
