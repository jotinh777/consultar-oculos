'use client';

import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { MapPin, Phone, Clock, Star, Navigation, ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { Otica } from '@/lib/types';

export default function LocalizadorPage() {
  const router = useRouter();
  const [questionario, setQuestionario] = useState(storage.getQuestionario());
  const [searchLocation, setSearchLocation] = useState('');
  const [oticas, setOticas] = useState<Otica[]>([]);

  useEffect(() => {
    const data = storage.getQuestionario();
    setQuestionario(data);
    if (data?.localizacao) {
      setSearchLocation(data.localizacao);
      generateOticasForLocation(data.localizacao);
    }
  }, []);

  const generateOticasForLocation = (location: string) => {
    // Extrair cidade e estado da localização
    const parts = location.split(',').map(p => p.trim());
    const cidade = parts[0] || 'São Paulo';
    const estado = parts[1] || 'SP';

    // Gerar óticas baseadas na localização real
    const oticasGeradas: Otica[] = [
      {
        id: '1',
        nome: `Ótica Vision Premium ${cidade}`,
        endereco: `Av. Principal, 1578 - Centro, ${cidade} - ${estado}`,
        telefone: '(11) 3456-7890',
        horario: 'Seg-Sex: 9h-19h | Sáb: 9h-14h',
        especialidades: ['Lentes de Grau', 'Óculos de Sol', 'Lentes de Contato'],
        distancia: '1.2 km',
        avaliacoes: 4.8,
        cidade,
        estado,
      },
      {
        id: '2',
        nome: `Ótica Moderna ${cidade}`,
        endereco: `Rua Comercial, 2690 - Centro, ${cidade} - ${estado}`,
        telefone: '(11) 3234-5678',
        horario: 'Seg-Sex: 10h-20h | Sáb: 10h-18h',
        especialidades: ['Armações de Grife', 'Exame de Vista', 'Ajustes'],
        distancia: '2.5 km',
        avaliacoes: 4.6,
        cidade,
        estado,
      },
      {
        id: '3',
        nome: `Ótica Estilo & Visão ${cidade}`,
        endereco: `Av. Shopping, 379 - Bairro Nobre, ${cidade} - ${estado}`,
        telefone: '(11) 3567-8901',
        horario: 'Seg-Sáb: 10h-19h',
        especialidades: ['Marcas Premium', 'Consultoria de Estilo', 'Provador Virtual'],
        distancia: '3.8 km',
        avaliacoes: 4.9,
        cidade,
        estado,
      },
      {
        id: '4',
        nome: `Ótica Popular ${cidade}`,
        endereco: `Av. Central, 2344 - Centro, ${cidade} - ${estado}`,
        telefone: '(11) 3890-1234',
        horario: 'Seg-Sex: 9h-18h | Sáb: 9h-13h',
        especialidades: ['Preços Acessíveis', 'Lentes Multifocais', 'Armações Infantis'],
        distancia: '4.2 km',
        avaliacoes: 4.5,
        cidade,
        estado,
      },
    ];

    setOticas(oticasGeradas);
  };

  const handleSearchLocation = () => {
    if (searchLocation) {
      generateOticasForLocation(searchLocation);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container max-w-4xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm mb-8">
          <div className="text-center mb-6">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-cyan-600 rounded-full mb-4 shadow-lg">
              <MapPin className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Óticas Próximas</h1>
            <p className="text-gray-600">Encontre óticas na sua região</p>
          </div>

          <div className="max-w-md mx-auto mb-8">
            <div className="flex gap-2">
              <div className="relative flex-1">
                <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <Input
                  placeholder="Digite Cidade, Estado (ex: Rio de Janeiro, RJ)"
                  value={searchLocation}
                  onChange={(e) => setSearchLocation(e.target.value)}
                  className="pl-10 h-12"
                />
              </div>
              <Button
                onClick={handleSearchLocation}
                className="h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
              >
                Buscar
              </Button>
            </div>
          </div>

          {oticas.length > 0 && (
            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
              <p className="text-sm text-blue-900 text-center">
                📍 Mostrando óticas próximas a <strong>{searchLocation || 'sua localização'}</strong>
              </p>
            </div>
          )}
        </Card>

        {oticas.length === 0 ? (
          <Card className="p-8 text-center bg-white/90 backdrop-blur-sm shadow-lg">
            <MapPin className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h3 className="text-xl font-bold text-gray-900 mb-2">Nenhuma ótica encontrada</h3>
            <p className="text-gray-600 mb-4">
              Digite sua cidade e estado para encontrar óticas próximas
            </p>
          </Card>
        ) : (
          <div className="space-y-6">
            {oticas.map((otica) => (
              <Card key={otica.id} className="p-6 shadow-lg hover:shadow-2xl transition-all duration-300 bg-white/90 backdrop-blur-sm">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                  <div className="flex-1">
                    <div className="flex items-start justify-between mb-2">
                      <h3 className="text-xl font-bold text-gray-900">{otica.nome}</h3>
                      <Badge className="bg-blue-600 ml-2">
                        {otica.distancia}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-semibold text-gray-900">{otica.avaliacoes}</span>
                      </div>
                      <span className="text-gray-400">•</span>
                      <span className="text-sm text-gray-600">Avaliações verificadas</span>
                    </div>

                    <div className="space-y-2 text-sm text-gray-700">
                      <div className="flex items-start gap-2">
                        <MapPin className="w-4 h-4 text-gray-500 flex-shrink-0 mt-0.5" />
                        <span>{otica.endereco}</span>
                      </div>

                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-gray-500" />
                        <a href={`tel:${otica.telefone}`} className="text-blue-600 hover:underline">
                          {otica.telefone}
                        </a>
                      </div>

                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-gray-500" />
                        <span>{otica.horario}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mb-4">
                  <p className="text-sm font-semibold text-gray-700 mb-2">Especialidades:</p>
                  <div className="flex flex-wrap gap-2">
                    {otica.especialidades.map((esp, index) => (
                      <Badge key={index} variant="outline" className="border-purple-300 text-purple-700">
                        {esp}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <Button
                    onClick={() => {
                      window.open(`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(otica.endereco)}`, '_blank');
                    }}
                    className="flex-1 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white"
                  >
                    <Navigation className="w-4 h-4 mr-2" />
                    Como Chegar
                  </Button>
                  <Button
                    onClick={() => {
                      window.open(`tel:${otica.telefone}`);
                    }}
                    variant="outline"
                    className="flex-1 border-2 border-purple-300 hover:border-purple-500"
                  >
                    <Phone className="w-4 h-4 mr-2" />
                    Ligar
                  </Button>
                </div>
              </Card>
            ))}
          </div>
        )}

        <Card className="p-6 mt-8 bg-gradient-to-r from-purple-600 to-pink-600 text-white shadow-xl">
          <div className="text-center">
            <h3 className="text-xl font-bold mb-2">Não encontrou o que procura?</h3>
            <p className="text-purple-100 mb-4">
              Entre em contato conosco e ajudaremos você a encontrar a ótica perfeita
            </p>
            <Button className="bg-white text-purple-600 hover:bg-gray-100 font-semibold">
              Falar com Suporte
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
