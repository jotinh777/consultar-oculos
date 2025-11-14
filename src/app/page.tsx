'use client';

import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Glasses, Camera, Sparkles, MapPin, Crown, CheckCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const features = [
    {
      icon: Camera,
      title: 'Análise Facial com IA',
      description: 'Identifique seu formato de rosto com tecnologia avançada',
    },
    {
      icon: Sparkles,
      title: 'Recomendações Personalizadas',
      description: 'Sugestões baseadas no seu estilo e necessidades',
    },
    {
      icon: Glasses,
      title: 'Provador Virtual',
      description: 'Experimente armações em tempo real (Premium)',
    },
    {
      icon: MapPin,
      title: 'Localizador de Óticas',
      description: 'Encontre óticas próximas à sua localização',
    },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-12 md:py-20">
        <div className="text-center max-w-4xl mx-auto mb-16">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-6 py-2 rounded-full mb-6 shadow-lg">
            <Sparkles className="w-5 h-5" />
            <span className="font-medium">Consultor Virtual de Óculos</span>
          </div>
          
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
            Encontre a Armação
            <span className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent"> Perfeita </span>
            para Você
          </h1>
          
          <p className="text-lg md:text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Descubra qual formato de rosto você tem e receba recomendações personalizadas de armações que realçam sua beleza natural
          </p>

          <Button
            onClick={() => router.push('/login')}
            size="lg"
            className="bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white px-8 py-6 text-lg rounded-full shadow-2xl hover:shadow-3xl transition-all duration-300 hover:scale-105"
          >
            Começar Agora
            <Sparkles className="ml-2 w-5 h-5" />
          </Button>
        </div>

        {/* Preview Card */}
        <Card className="max-w-3xl mx-auto p-8 md:p-12 shadow-2xl bg-white/80 backdrop-blur-sm border-2 border-purple-100 mb-16">
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
              <Camera className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Como Funciona?</h3>
            <p className="text-gray-600">Simples, rápido e personalizado</p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-blue-600 font-bold text-lg">1</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Questionário</h4>
              <p className="text-sm text-gray-600">Responda perguntas sobre seu estilo e preferências</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-purple-600 font-bold text-lg">2</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Análise Facial</h4>
              <p className="text-sm text-gray-600">Tire uma foto ou faça upload para análise com IA</p>
            </div>

            <div className="text-center">
              <div className="w-12 h-12 bg-pink-100 rounded-full flex items-center justify-center mx-auto mb-3">
                <span className="text-pink-600 font-bold text-lg">3</span>
              </div>
              <h4 className="font-semibold text-gray-900 mb-2">Recomendações</h4>
              <p className="text-sm text-gray-600">Receba sugestões personalizadas de armações</p>
            </div>
          </div>
        </Card>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card key={index} className="p-6 hover:shadow-xl transition-all duration-300 hover:scale-105 bg-white/80 backdrop-blur-sm border border-purple-100">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center mb-4 shadow-md">
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2">{feature.title}</h3>
              <p className="text-sm text-gray-600">{feature.description}</p>
            </Card>
          ))}
        </div>

        {/* Premium CTA */}
        <Card className="max-w-2xl mx-auto p-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 text-white shadow-2xl">
          <div className="text-center">
            <Crown className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Experimente o Premium</h3>
            <p className="mb-6 text-blue-50">
              Acesso ao provador virtual com IA, recomendações ilimitadas e muito mais
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-6">
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Provador Virtual</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Análises Ilimitadas</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle className="w-5 h-5" />
                <span>Suporte Prioritário</span>
              </div>
            </div>
            <Button
              onClick={() => router.push('/upgrade')}
              size="lg"
              className="bg-white text-purple-600 hover:bg-gray-100 font-semibold px-8 shadow-lg"
            >
              Ver Planos Premium
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
