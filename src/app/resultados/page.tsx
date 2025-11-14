'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Sparkles, Lock, Eye, MapPin, Crown, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { AnaliseFacial, RecomendacaoOculos } from '@/lib/types';

export default function ResultadosPage() {
  const router = useRouter();
  const [analise, setAnalise] = useState<AnaliseFacial | null>(null);
  const [user, setUser] = useState(storage.getUser());
  const [recomendacoes, setRecomendacoes] = useState<RecomendacaoOculos[]>([]);

  useEffect(() => {
    const analiseData = storage.getAnalise();
    if (!analiseData) {
      router.push('/questionario');
      return;
    }
    setAnalise(analiseData);
    
    // Gerar recomendações baseadas no formato do rosto
    const recomendacoesPersonalizadas = getRecomendacoesPorFormato(analiseData.formatoRosto);
    setRecomendacoes(recomendacoesPersonalizadas);
  }, [router]);

  // Recomendações específicas por formato de rosto (baseado em pesquisa real)
  const getRecomendacoesPorFormato = (formato: string): RecomendacaoOculos[] => {
    const formatoLower = formato.toLowerCase();

    // ROSTO OVAL - Equilibrado, aceita quase todos os estilos
    if (formatoLower.includes('oval')) {
      return [
        {
          id: '1',
          nome: 'Classic Aviator',
          marca: 'Ray-Ban',
          preco: 450,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação aviador clássica em metal. Ideal para rostos ovais, mantém o equilíbrio natural das proporções.',
          isPremium: false,
          formatosRecomendados: ['Oval'],
        },
        {
          id: '2',
          nome: 'Wayfarer Bold',
          marca: 'Oakley',
          preco: 680,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Armação quadrada em acetato. Perfeita para rostos ovais, adiciona definição sem quebrar a harmonia.',
          isPremium: true,
          formatosRecomendados: ['Oval'],
        },
        {
          id: '3',
          nome: 'Round Vintage',
          marca: 'Prada',
          preco: 890,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação redonda vintage. Complementa a suavidade do rosto oval com estilo sofisticado.',
          isPremium: true,
          formatosRecomendados: ['Oval'],
        },
      ];
    }

    // ROSTO REDONDO - Precisa de armações angulares para alongar
    if (formatoLower.includes('redondo')) {
      return [
        {
          id: '1',
          nome: 'Angular Rectangle',
          marca: 'Ray-Ban',
          preco: 520,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação retangular com ângulos definidos. Alonga o rosto redondo e adiciona estrutura.',
          isPremium: false,
          formatosRecomendados: ['Redondo'],
        },
        {
          id: '2',
          nome: 'Cat Eye Sharp',
          marca: 'Gucci',
          preco: 780,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Cat eye com pontas acentuadas. Cria linhas verticais que alongam rostos redondos.',
          isPremium: true,
          formatosRecomendados: ['Redondo'],
        },
        {
          id: '3',
          nome: 'Geometric Bold',
          marca: 'Prada',
          preco: 850,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação geométrica ousada. Adiciona ângulos e definição para equilibrar a suavidade do rosto.',
          isPremium: true,
          formatosRecomendados: ['Redondo'],
        },
      ];
    }

    // ROSTO QUADRADO - Precisa de armações arredondadas para suavizar
    if (formatoLower.includes('quadrado')) {
      return [
        {
          id: '1',
          nome: 'Round Soft',
          marca: 'Ray-Ban',
          preco: 480,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação redonda suave. Suaviza os ângulos marcantes do rosto quadrado.',
          isPremium: false,
          formatosRecomendados: ['Quadrado'],
        },
        {
          id: '2',
          nome: 'Oval Delicate',
          marca: 'Oakley',
          preco: 650,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Armação oval delicada. Equilibra a mandíbula forte com curvas suaves.',
          isPremium: true,
          formatosRecomendados: ['Quadrado'],
        },
        {
          id: '3',
          nome: 'Aviator Curved',
          marca: 'Tom Ford',
          preco: 920,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Aviador com curvas acentuadas. Contrasta com os ângulos retos do rosto quadrado.',
          isPremium: true,
          formatosRecomendados: ['Quadrado'],
        },
      ];
    }

    // ROSTO CORAÇÃO - Precisa de armações que equilibrem testa larga e queixo estreito
    if (formatoLower.includes('coração') || formatoLower.includes('triangular invertido')) {
      return [
        {
          id: '1',
          nome: 'Bottom Heavy Frame',
          marca: 'Ray-Ban',
          preco: 510,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação com base mais larga. Equilibra a testa larga com o queixo delicado.',
          isPremium: false,
          formatosRecomendados: ['Coração'],
        },
        {
          id: '2',
          nome: 'Cat Eye Classic',
          marca: 'Prada',
          preco: 790,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Cat eye clássico. Adiciona largura na parte inferior e harmoniza as proporções.',
          isPremium: true,
          formatosRecomendados: ['Coração'],
        },
        {
          id: '3',
          nome: 'Rimless Light',
          marca: 'Silhouette',
          preco: 880,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação sem aro, leve. Não adiciona peso visual à testa já proeminente.',
          isPremium: true,
          formatosRecomendados: ['Coração'],
        },
      ];
    }

    // ROSTO DIAMANTE - Precisa de armações que suavizem maçãs do rosto proeminentes
    if (formatoLower.includes('diamante')) {
      return [
        {
          id: '1',
          nome: 'Oval Wide',
          marca: 'Ray-Ban',
          preco: 490,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação oval larga. Suaviza as maçãs do rosto proeminentes e equilibra as proporções.',
          isPremium: false,
          formatosRecomendados: ['Diamante'],
        },
        {
          id: '2',
          nome: 'Cat Eye Soft',
          marca: 'Gucci',
          preco: 820,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Cat eye suave. Adiciona largura na parte superior e inferior, equilibrando o meio do rosto.',
          isPremium: true,
          formatosRecomendados: ['Diamante'],
        },
        {
          id: '3',
          nome: 'Rimless Elegant',
          marca: 'Silhouette',
          preco: 950,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação sem aro elegante. Não enfatiza as maçãs do rosto, mantém leveza.',
          isPremium: true,
          formatosRecomendados: ['Diamante'],
        },
      ];
    }

    // ROSTO TRIANGULAR (base larga) - Precisa de armações que equilibrem mandíbula larga
    if (formatoLower.includes('triangular') && !formatoLower.includes('invertido')) {
      return [
        {
          id: '1',
          nome: 'Top Heavy Frame',
          marca: 'Ray-Ban',
          preco: 530,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação com topo mais largo. Equilibra a mandíbula larga com peso visual superior.',
          isPremium: false,
          formatosRecomendados: ['Triangular'],
        },
        {
          id: '2',
          nome: 'Cat Eye Bold',
          marca: 'Tom Ford',
          preco: 860,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Cat eye ousado. Adiciona largura na parte superior para balancear a base larga.',
          isPremium: true,
          formatosRecomendados: ['Triangular'],
        },
        {
          id: '3',
          nome: 'Browline Classic',
          marca: 'Ray-Ban',
          preco: 720,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação browline clássica. Enfatiza a parte superior e equilibra a mandíbula forte.',
          isPremium: true,
          formatosRecomendados: ['Triangular'],
        },
      ];
    }

    // ROSTO RETANGULAR/OBLONGO - Precisa de armações que encurtem o rosto
    if (formatoLower.includes('retangular') || formatoLower.includes('oblongo') || formatoLower.includes('alongado')) {
      return [
        {
          id: '1',
          nome: 'Oversized Round',
          marca: 'Ray-Ban',
          preco: 560,
          imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
          descricao: 'Armação redonda grande. Adiciona largura e encurta visualmente o rosto alongado.',
          isPremium: false,
          formatosRecomendados: ['Retangular', 'Oblongo'],
        },
        {
          id: '2',
          nome: 'Wayfarer Large',
          marca: 'Oakley',
          preco: 690,
          imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
          descricao: 'Wayfarer grande. Armação larga que quebra a verticalidade do rosto.',
          isPremium: true,
          formatosRecomendados: ['Retangular', 'Oblongo'],
        },
        {
          id: '3',
          nome: 'Geometric Wide',
          marca: 'Prada',
          preco: 840,
          imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
          descricao: 'Armação geométrica larga. Adiciona proporção horizontal ao rosto alongado.',
          isPremium: true,
          formatosRecomendados: ['Retangular', 'Oblongo'],
        },
      ];
    }

    // Padrão caso não identifique o formato
    return [
      {
        id: '1',
        nome: 'Classic Aviator',
        marca: 'Ray-Ban',
        preco: 450,
        imagem: 'https://images.unsplash.com/photo-1511499767150-a48a237f0083?w=400&h=400&fit=crop',
        descricao: 'Armação clássica versátil que funciona bem com diversos formatos de rosto.',
        isPremium: false,
        formatosRecomendados: ['Universal'],
      },
      {
        id: '2',
        nome: 'Modern Wayfarer',
        marca: 'Oakley',
        preco: 680,
        imagem: 'https://images.unsplash.com/photo-1574258495973-f010dfbb5371?w=400&h=400&fit=crop',
        descricao: 'Design moderno e atemporal adequado para a maioria dos formatos.',
        isPremium: true,
        formatosRecomendados: ['Universal'],
      },
      {
        id: '3',
        nome: 'Elegant Frame',
        marca: 'Prada',
        preco: 890,
        imagem: 'https://images.unsplash.com/photo-1577803645773-f96470509666?w=400&h=400&fit=crop',
        descricao: 'Armação elegante e sofisticada com apelo universal.',
        isPremium: true,
        formatosRecomendados: ['Universal'],
      },
    ];
  };

  if (!analise) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        {/* Resultado da Análise */}
        <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Sparkles className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Análise Completa!</h1>
            <p className="text-gray-600">Identificamos seu formato de rosto</p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="rounded-lg overflow-hidden shadow-lg">
              <img src={analise.imageData} alt="Sua foto" className="w-full" />
            </div>

            <div className="space-y-4">
              <div>
                <h3 className="text-sm font-medium text-gray-600 mb-2">Formato do Rosto</h3>
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-3 rounded-full font-bold text-xl shadow-lg">
                  {analise.formatoRosto}
                </div>
              </div>

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <p className="text-sm text-blue-900">{analise.analiseCompleta}</p>
              </div>

              <div className="pt-4">
                <h4 className="font-semibold text-gray-900 mb-2">Características ideais:</h4>
                <ul className="space-y-2 text-sm text-gray-700">
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Armações que equilibram proporções
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Cores que harmonizam com seu tom de pele
                  </li>
                  <li className="flex items-center gap-2">
                    <CheckCircle className="w-4 h-4 text-green-600" />
                    Estilos adequados ao seu perfil
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </Card>

        {/* Recomendações */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Suas Recomendações Personalizadas</h2>
          
          <div className="grid md:grid-cols-3 gap-6">
            {recomendacoes.map((recomendacao, index) => (
              <Card
                key={recomendacao.id}
                className={`overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  recomendacao.isPremium ? 'opacity-75' : ''
                }`}
              >
                <div className="relative">
                  <img
                    src={recomendacao.imagem}
                    alt={recomendacao.nome}
                    className="w-full h-48 object-cover"
                  />
                  {recomendacao.isPremium && (
                    <div className="absolute inset-0 bg-black/60 flex items-center justify-center backdrop-blur-sm">
                      <div className="text-center text-white">
                        <Lock className="w-12 h-12 mx-auto mb-2" />
                        <p className="font-semibold">Premium</p>
                      </div>
                    </div>
                  )}
                  {index === 0 && (
                    <Badge className="absolute top-3 right-3 bg-green-600">
                      Gratuito
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <h3 className="font-bold text-lg text-gray-900 mb-1">{recomendacao.nome}</h3>
                  <p className="text-sm text-gray-600 mb-2">{recomendacao.marca}</p>
                  <p className="text-sm text-gray-700 mb-3">{recomendacao.descricao}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-lg font-bold text-purple-600">
                      R$ {recomendacao.preco}
                    </span>
                    {recomendacao.isPremium && (
                      <Crown className="w-5 h-5 text-yellow-600" />
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>

        {/* CTAs */}
        <div className="grid md:grid-cols-2 gap-6">
          <Card className="p-6 bg-gradient-to-br from-purple-600 to-pink-600 text-white shadow-xl">
            <Eye className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Provador Virtual</h3>
            <p className="text-purple-100 mb-4">
              Experimente as armações em tempo real com nossa tecnologia de IA
            </p>
            <Button
              onClick={() => {
                if (user?.tier === 'premium') {
                  router.push('/provador-virtual');
                } else {
                  router.push('/upgrade');
                }
              }}
              className="w-full bg-white text-purple-600 hover:bg-gray-100 font-semibold"
            >
              {user?.tier === 'premium' ? 'Experimentar Agora' : 'Desbloquear Premium'}
            </Button>
          </Card>

          <Card className="p-6 bg-gradient-to-br from-blue-600 to-cyan-600 text-white shadow-xl">
            <MapPin className="w-10 h-10 mb-4" />
            <h3 className="text-xl font-bold mb-2">Óticas Próximas</h3>
            <p className="text-blue-100 mb-4">
              Encontre óticas na sua região para experimentar pessoalmente
            </p>
            <Button
              onClick={() => router.push('/localizador')}
              className="w-full bg-white text-blue-600 hover:bg-gray-100 font-semibold"
            >
              Ver Óticas
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}
