'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Glasses, Mail, Sparkles } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!email || !email.includes('@')) {
      alert('Por favor, insira um e-mail válido');
      return;
    }

    setIsLoading(true);

    // Simular login
    setTimeout(() => {
      storage.setUser({
        email,
        tier: 'free',
        createdAt: new Date().toISOString(),
      });

      router.push('/questionario');
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 flex items-center justify-center p-4">
      <Card className="w-full max-w-md p-8 shadow-2xl bg-white/90 backdrop-blur-sm">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-full mb-4 shadow-lg">
            <Glasses className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Bem-vindo!</h1>
          <p className="text-gray-600">Entre para começar sua jornada</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email" className="text-gray-700 font-medium">
              E-mail
            </Label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                id="email"
                type="email"
                placeholder="seu@email.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="pl-10 h-12 border-gray-300 focus:border-purple-500 focus:ring-purple-500"
                required
              />
            </div>
          </div>

          <Button
            type="submit"
            disabled={isLoading}
            className="w-full h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
          >
            {isLoading ? (
              'Entrando...'
            ) : (
              <>
                Continuar
                <Sparkles className="ml-2 w-5 h-5" />
              </>
            )}
          </Button>
        </form>

        <div className="mt-6 text-center text-sm text-gray-600">
          <p>Ao continuar, você concorda com nossos</p>
          <p className="text-purple-600 font-medium">Termos de Uso e Política de Privacidade</p>
        </div>
      </Card>
    </div>
  );
}
