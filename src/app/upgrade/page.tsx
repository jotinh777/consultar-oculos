'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Crown, Check, Sparkles, Eye, Zap, ArrowLeft, Mail, Lock, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function UpgradePage() {
  const router = useRouter();
  const [showSignup, setShowSignup] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState<'monthly' | 'yearly' | null>(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');

  const handleSelectPlan = (plan: 'monthly' | 'yearly') => {
    const user = storage.getUser();
    
    // Se usuário já está logado, fazer upgrade direto
    if (user && user.email) {
      handleUpgrade(plan);
    } else {
      // Se não está logado, mostrar formulário de cadastro
      setSelectedPlan(plan);
      setShowSignup(true);
    }
  };

  const handleSignupAndUpgrade = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Validações
    if (!email || !email.includes('@')) {
      setError('Por favor, insira um e-mail válido');
      return;
    }

    if (!password || password.length < 6) {
      setError('A senha deve ter no mínimo 6 caracteres');
      return;
    }

    if (password !== confirmPassword) {
      setError('As senhas não coincidem');
      return;
    }

    // Criar conta e fazer upgrade
    storage.setUser({
      email,
      password, // Em produção, isso seria hash
      tier: 'premium',
      createdAt: new Date().toISOString(),
    });

    alert(`Conta criada com sucesso! Você agora é Premium ${selectedPlan === 'yearly' ? 'Anual' : 'Mensal'}!`);
    router.push('/provador-virtual');
  };

  const handleUpgrade = (plan: 'monthly' | 'yearly') => {
    const user = storage.getUser();
    if (user) {
      storage.setUser({
        ...user,
        tier: 'premium',
      });
      
      alert(`Parabéns! Você agora é Premium ${plan === 'yearly' ? 'Anual' : 'Mensal'}!`);
      router.push('/provador-virtual');
    }
  };

  const features = {
    free: [
      'Análise facial básica',
      '1 recomendação gratuita',
      'Localizador de óticas',
      'Suporte por e-mail',
    ],
    premium: [
      'Análise facial avançada com IA',
      'Recomendações ilimitadas',
      'Provador virtual em tempo real',
      'Histórico de análises',
      'Comparação de modelos',
      'Suporte prioritário 24/7',
      'Descontos em óticas parceiras',
      'Alertas de novas coleções',
    ],
  };

  // Se está mostrando formulário de cadastro
  if (showSignup && selectedPlan) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
        <div className="container max-w-md mx-auto">
          <Button
            onClick={() => setShowSignup(false)}
            variant="outline"
            className="mb-6"
          >
            <ArrowLeft className="w-5 h-5 mr-2" />
            Voltar
          </Button>

          <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-4 shadow-lg">
                <Crown className="w-8 h-8 text-white" />
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-2">Criar Conta Premium</h1>
              <p className="text-gray-600">
                Plano {selectedPlan === 'yearly' ? 'Anual' : 'Mensal'} - R$ {selectedPlan === 'yearly' ? '299,90/ano' : '29,90/mês'}
              </p>
            </div>

            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-2">
                <AlertCircle className="w-5 h-5 text-red-600 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800">{error}</p>
              </div>
            )}

            <form onSubmit={handleSignupAndUpgrade} className="space-y-6">
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
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-gray-700 font-medium">
                  Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="Mínimo 6 caracteres"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword" className="text-gray-700 font-medium">
                  Confirmar Senha
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <Input
                    id="confirmPassword"
                    type="password"
                    placeholder="Digite a senha novamente"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="pl-10 h-12"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
              >
                <Crown className="w-5 h-5 mr-2" />
                Criar Conta e Assinar
              </Button>
            </form>

            <div className="mt-6 text-center text-sm text-gray-600">
              <p>Ao continuar, você concorda com nossos</p>
              <p className="text-purple-600 font-medium">Termos de Uso e Política de Privacidade</p>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container max-w-6xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-purple-600 to-pink-600 rounded-full mb-6 shadow-2xl">
            <Crown className="w-10 h-10 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
            Desbloqueie Todo o Potencial
          </h1>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Experimente armações em tempo real e tenha acesso a recursos exclusivos
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 mb-12">
          {/* Plano Gratuito */}
          <Card className="p-8 shadow-lg bg-white/90 backdrop-blur-sm">
            <div className="text-center mb-6">
              <Badge variant="outline" className="mb-4">
                Gratuito
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Free</h3>
              <div className="text-4xl font-bold text-gray-900 mb-2">R$ 0</div>
              <p className="text-gray-600">Para sempre</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.free.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-green-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              variant="outline"
              className="w-full"
              disabled
            >
              Plano Atual
            </Button>
          </Card>

          {/* Plano Mensal */}
          <Card className="p-8 shadow-2xl bg-white border-2 border-purple-300 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white px-4 py-1">
                Mais Popular
              </Badge>
            </div>

            <div className="text-center mb-6">
              <Badge className="bg-purple-600 mb-4">
                Premium
              </Badge>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">Mensal</h3>
              <div className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
                R$ 29,90
              </div>
              <p className="text-gray-600">por mês</p>
            </div>

            <ul className="space-y-3 mb-8">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                  <span className="text-gray-700">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelectPlan('monthly')}
              className="w-full h-12 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-semibold shadow-lg"
            >
              <Sparkles className="w-5 h-5 mr-2" />
              Assinar Agora
            </Button>
          </Card>

          {/* Plano Anual */}
          <Card className="p-8 shadow-xl bg-gradient-to-br from-purple-600 to-pink-600 text-white relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2">
              <Badge className="bg-yellow-500 text-yellow-900 px-4 py-1">
                Melhor Valor
              </Badge>
            </div>

            <div className="text-center mb-6">
              <Badge className="bg-white/20 mb-4 text-white border-white/30">
                Premium Anual
              </Badge>
              <h3 className="text-2xl font-bold mb-2">Anual</h3>
              <div className="text-4xl font-bold mb-2">R$ 299,90</div>
              <p className="text-purple-100">por ano</p>
              <div className="mt-2 inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">
                Economize R$ 59,00
              </div>
            </div>

            <ul className="space-y-3 mb-8">
              {features.premium.map((feature, index) => (
                <li key={index} className="flex items-start gap-2">
                  <Check className="w-5 h-5 text-white flex-shrink-0 mt-0.5" />
                  <span className="text-white">{feature}</span>
                </li>
              ))}
            </ul>

            <Button
              onClick={() => handleSelectPlan('yearly')}
              className="w-full h-12 bg-white text-purple-600 hover:bg-gray-100 font-semibold shadow-lg"
            >
              <Crown className="w-5 h-5 mr-2" />
              Assinar Anual
            </Button>
          </Card>
        </div>

        {/* Benefícios Premium */}
        <div className="grid md:grid-cols-3 gap-6 mb-12">
          <Card className="p-6 text-center bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-purple-100 rounded-full mb-4">
              <Eye className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Provador Virtual</h3>
            <p className="text-sm text-gray-600">
              Experimente centenas de modelos em tempo real com tecnologia de IA
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-full mb-4">
              <Sparkles className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">IA Avançada</h3>
            <p className="text-sm text-gray-600">
              Análises mais precisas e recomendações personalizadas ilimitadas
            </p>
          </Card>

          <Card className="p-6 text-center bg-white/90 backdrop-blur-sm shadow-lg">
            <div className="inline-flex items-center justify-center w-12 h-12 bg-pink-100 rounded-full mb-4">
              <Zap className="w-6 h-6 text-pink-600" />
            </div>
            <h3 className="font-bold text-gray-900 mb-2">Suporte Premium</h3>
            <p className="text-sm text-gray-600">
              Atendimento prioritário 24/7 e descontos exclusivos em óticas parceiras
            </p>
          </Card>
        </div>

        {/* FAQ */}
        <Card className="p-8 bg-white/90 backdrop-blur-sm shadow-lg">
          <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">Perguntas Frequentes</h2>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Posso cancelar a qualquer momento?</h3>
              <p className="text-gray-600">Sim! Você pode cancelar sua assinatura a qualquer momento, sem multas ou taxas adicionais.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">O provador virtual funciona em qualquer dispositivo?</h3>
              <p className="text-gray-600">Sim, funciona em smartphones, tablets e computadores com câmera.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Posso mudar de plano depois?</h3>
              <p className="text-gray-600">Claro! Você pode fazer upgrade ou downgrade do seu plano a qualquer momento.</p>
            </div>

            <div>
              <h3 className="font-semibold text-gray-900 mb-2">Os descontos em óticas são reais?</h3>
              <p className="text-gray-600">Sim! Temos parcerias com diversas óticas que oferecem descontos exclusivos para assinantes Premium.</p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
}
