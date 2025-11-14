'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowLeft, Sparkles, RefreshCw, Download } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function ProvadorVirtualPage() {
  const router = useRouter();
  const [user, setUser] = useState(storage.getUser());
  const [analise, setAnalise] = useState(storage.getAnalise());
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedModel, setSelectedModel] = useState(0);
  const [generatedImage, setGeneratedImage] = useState<string | null>(null);

  const modelos = [
    { 
      id: 1, 
      nome: 'Classic Aviator', 
      cor: 'Dourado',
      descricao: 'Armação aviador clássica em metal dourado com lentes degradê'
    },
    { 
      id: 2, 
      nome: 'Modern Wayfarer', 
      cor: 'Preto Fosco',
      descricao: 'Armação wayfarer moderna em acetato preto fosco'
    },
    { 
      id: 3, 
      nome: 'Elegant Cat Eye', 
      cor: 'Tartaruga',
      descricao: 'Armação cat eye elegante em acetato tartaruga'
    },
    { 
      id: 4, 
      nome: 'Sport Wrap', 
      cor: 'Azul Metálico',
      descricao: 'Armação esportiva wrap em material leve azul metálico'
    },
    { 
      id: 5, 
      nome: 'Vintage Round', 
      cor: 'Rose Gold',
      descricao: 'Armação redonda vintage em metal rose gold'
    },
  ];

  useEffect(() => {
    // Verificar se é premium
    if (user?.tier !== 'premium') {
      router.push('/upgrade');
      return;
    }

    // Verificar se tem análise facial
    if (!analise?.imageData) {
      alert('Você precisa fazer a análise facial primeiro!');
      router.push('/analise-facial');
      return;
    }
  }, [user, analise, router]);

  const handleGenerateWithModel = async (index: number) => {
    setIsGenerating(true);
    setSelectedModel(index);
    setGeneratedImage(null);
    
    // Simular geração de imagem com IA (em produção, usar API real de geração de imagens)
    // A API receberia: analise.imageData (foto do usuário) + modelos[index] (modelo de óculos)
    // E retornaria: imagem do usuário usando o modelo de óculos
    
    setTimeout(() => {
      // Por enquanto, mostrar a foto original com overlay indicando o modelo
      // Em produção, isso seria a imagem gerada pela IA
      setGeneratedImage(analise?.imageData || null);
      setIsGenerating(false);
    }, 2500);
  };

  const handleDownloadImage = () => {
    if (generatedImage) {
      const link = document.createElement('a');
      link.href = generatedImage;
      link.download = `provador-virtual-${modelos[selectedModel].nome}.jpg`;
      link.click();
    }
  };

  if (user?.tier !== 'premium' || !analise?.imageData) {
    return null;
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

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Preview da Imagem Gerada */}
          <div className="lg:col-span-2">
            <Card className="p-6 shadow-2xl bg-white/90 backdrop-blur-sm">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-2xl font-bold text-gray-900">Provador Virtual</h2>
                <Badge className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Premium
                </Badge>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-gray-100 aspect-[3/4] mb-4">
                {!generatedImage && !isGenerating && (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center text-gray-500 p-8">
                      <Sparkles className="w-16 h-16 mx-auto mb-4 text-purple-400" />
                      <p className="text-lg font-semibold mb-2">Selecione um modelo</p>
                      <p className="text-sm">Escolha um modelo de óculos ao lado para visualizar em você</p>
                    </div>
                  </div>
                )}

                {isGenerating && (
                  <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center backdrop-blur-sm">
                    <div className="text-center text-gray-900">
                      <RefreshCw className="w-16 h-16 mx-auto mb-4 animate-spin text-purple-600" />
                      <p className="text-xl font-bold mb-2">Gerando sua imagem...</p>
                      <p className="text-sm text-gray-600">Nossa IA está aplicando o modelo em você</p>
                    </div>
                  </div>
                )}

                {generatedImage && !isGenerating && (
                  <>
                    <img 
                      src={generatedImage} 
                      alt="Você com o modelo de óculos" 
                      className="w-full h-full object-cover"
                    />
                    
                    {/* Overlay com informações do modelo */}
                    <div className="absolute top-4 left-4 right-4">
                      <div className="bg-black/70 text-white px-4 py-3 rounded-lg backdrop-blur-sm">
                        <p className="font-bold text-lg">{modelos[selectedModel].nome}</p>
                        <p className="text-sm text-gray-300">{modelos[selectedModel].cor}</p>
                      </div>
                    </div>

                    {/* Badge "Gerado por IA" */}
                    <div className="absolute bottom-4 left-4">
                      <Badge className="bg-gradient-to-r from-purple-600 to-pink-600 text-white">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Gerado por IA
                      </Badge>
                    </div>
                  </>
                )}
              </div>

              {generatedImage && !isGenerating && (
                <Button
                  onClick={handleDownloadImage}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Download className="w-5 h-5 mr-2" />
                  Baixar Imagem
                </Button>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-4">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Como funciona:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>Usamos sua foto da análise facial</li>
                      <li>Nossa IA aplica o modelo de óculos escolhido</li>
                      <li>Você vê como ficaria com cada armação</li>
                      <li>Baixe e compartilhe suas favoritas!</li>
                    </ul>
                  </div>
                </div>
              </div>
            </Card>
          </div>

          {/* Lista de Modelos */}
          <div>
            <Card className="p-6 shadow-2xl bg-white/90 backdrop-blur-sm">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Escolha um Modelo</h3>
              
              <div className="space-y-3 max-h-[600px] overflow-y-auto">
                {modelos.map((modelo, index) => (
                  <button
                    key={modelo.id}
                    onClick={() => handleGenerateWithModel(index)}
                    disabled={isGenerating}
                    className={`w-full text-left p-4 rounded-lg border-2 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed ${
                      selectedModel === index && generatedImage
                        ? 'border-purple-600 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-300 bg-white hover:bg-purple-50/50'
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1">
                        <p className="font-semibold text-gray-900 mb-1">{modelo.nome}</p>
                        <p className="text-sm text-gray-600 mb-2">{modelo.cor}</p>
                        <p className="text-xs text-gray-500">{modelo.descricao}</p>
                      </div>
                      {selectedModel === index && generatedImage && (
                        <div className="w-3 h-3 bg-purple-600 rounded-full flex-shrink-0 mt-1" />
                      )}
                    </div>
                  </button>
                ))}
              </div>
            </Card>

            <Card className="p-4 mt-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
              <p className="text-sm text-center">
                💡 <strong>Dica:</strong> Experimente todos os modelos e compare para encontrar o perfeito!
              </p>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
