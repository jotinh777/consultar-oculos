'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { ArrowLeft, ArrowRight, MapPin, Palette, Activity, Glasses, User, DollarSign } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';
import { QuestionarioData } from '@/lib/types';

export default function QuestionarioPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<QuestionarioData>>({
    atividadesUso: [],
  });

  const totalSteps = 6;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      // Salvar e ir para análise facial
      storage.setQuestionario(formData as QuestionarioData);
      router.push('/analise-facial');
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    } else {
      router.back();
    }
  };

  const canProceed = () => {
    switch (step) {
      case 1:
        return !!formData.localizacao;
      case 2:
        return !!formData.estiloArmacao;
      case 3:
        return formData.atividadesUso && formData.atividadesUso.length > 0;
      case 4:
        return !!formData.tipoOculos;
      case 5:
        return !!formData.tomPele;
      case 6:
        return !!formData.faixaInvestimento;
      default:
        return false;
    }
  };

  const toggleAtividade = (atividade: string) => {
    const current = formData.atividadesUso || [];
    if (current.includes(atividade)) {
      setFormData({
        ...formData,
        atividadesUso: current.filter(a => a !== atividade),
      });
    } else {
      setFormData({
        ...formData,
        atividadesUso: [...current, atividade],
      });
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm font-medium text-gray-600">
              Etapa {step} de {totalSteps}
            </span>
            <span className="text-sm font-medium text-purple-600">
              {Math.round((step / totalSteps) * 100)}%
            </span>
          </div>
          <div className="h-2 bg-gray-200 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 transition-all duration-500"
              style={{ width: `${(step / totalSteps) * 100}%` }}
            />
          </div>
        </div>

        <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm">
          {/* Step 1: Localização */}
          {step === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <MapPin className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Onde você está?</h2>
                <p className="text-gray-600">Isso nos ajuda a encontrar óticas próximas</p>
              </div>

              <div className="space-y-2">
                <Label htmlFor="localizacao">Cidade e Estado</Label>
                <Input
                  id="localizacao"
                  placeholder="Ex: São Paulo, SP"
                  value={formData.localizacao || ''}
                  onChange={(e) => setFormData({ ...formData, localizacao: e.target.value })}
                  className="h-12"
                />
              </div>
            </div>
          )}

          {/* Step 2: Estilo de Armação */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Palette className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual seu estilo preferido?</h2>
                <p className="text-gray-600">Escolha o estilo que mais combina com você</p>
              </div>

              <RadioGroup
                value={formData.estiloArmacao}
                onValueChange={(value) => setFormData({ ...formData, estiloArmacao: value })}
                className="space-y-3"
              >
                {['Clássico', 'Moderno', 'Retrô/Vintage', 'Esportivo', 'Fashion/Ousado'].map((estilo) => (
                  <div key={estilo} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value={estilo} id={estilo} />
                    <Label htmlFor={estilo} className="flex-1 cursor-pointer font-medium">
                      {estilo}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 3: Atividades de Uso */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Activity className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Para quais atividades?</h2>
                <p className="text-gray-600">Selecione todas que se aplicam</p>
              </div>

              <div className="space-y-3">
                {['Trabalho/Escritório', 'Leitura', 'Computador', 'Dirigir', 'Esportes', 'Uso Social'].map((atividade) => (
                  <div
                    key={atividade}
                    className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer"
                    onClick={() => toggleAtividade(atividade)}
                  >
                    <Checkbox
                      checked={formData.atividadesUso?.includes(atividade)}
                      onCheckedChange={() => toggleAtividade(atividade)}
                    />
                    <Label className="flex-1 cursor-pointer font-medium">
                      {atividade}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 4: Tipo de Óculos */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Glasses className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Que tipo de óculos?</h2>
                <p className="text-gray-600">Escolha a finalidade principal</p>
              </div>

              <RadioGroup
                value={formData.tipoOculos}
                onValueChange={(value) => setFormData({ ...formData, tipoOculos: value })}
                className="space-y-3"
              >
                {['Grau', 'Sol', 'Grau + Sol (Transitions)', 'Leitura'].map((tipo) => (
                  <div key={tipo} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value={tipo} id={tipo} />
                    <Label htmlFor={tipo} className="flex-1 cursor-pointer font-medium">
                      {tipo}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 5: Tom de Pele */}
          {step === 5 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <User className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual seu tom de pele?</h2>
                <p className="text-gray-600">Isso ajuda a escolher cores que harmonizam</p>
              </div>

              <RadioGroup
                value={formData.tomPele}
                onValueChange={(value) => setFormData({ ...formData, tomPele: value })}
                className="space-y-3"
              >
                {['Claro', 'Médio', 'Moreno', 'Escuro'].map((tom) => (
                  <div key={tom} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value={tom} id={tom} />
                    <Label htmlFor={tom} className="flex-1 cursor-pointer font-medium">
                      {tom}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Step 6: Faixa de Investimento */}
          {step === 6 && (
            <div className="space-y-6">
              <div className="text-center mb-6">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <DollarSign className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Qual sua faixa de investimento?</h2>
                <p className="text-gray-600">Escolha o valor que cabe no seu orçamento</p>
              </div>

              <RadioGroup
                value={formData.faixaInvestimento}
                onValueChange={(value) => setFormData({ ...formData, faixaInvestimento: value })}
                className="space-y-3"
              >
                {[
                  'Até R$ 300',
                  'R$ 300 - R$ 600',
                  'R$ 600 - R$ 1.000',
                  'R$ 1.000 - R$ 2.000',
                  'Acima de R$ 2.000',
                ].map((faixa) => (
                  <div key={faixa} className="flex items-center space-x-3 p-4 border-2 border-gray-200 rounded-lg hover:border-purple-400 transition-colors cursor-pointer">
                    <RadioGroupItem value={faixa} id={faixa} />
                    <Label htmlFor={faixa} className="flex-1 cursor-pointer font-medium">
                      {faixa}
                    </Label>
                  </div>
                ))}
              </RadioGroup>
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex gap-4 mt-8">
            <Button
              onClick={handleBack}
              variant="outline"
              className="flex-1 h-12"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Voltar
            </Button>
            <Button
              onClick={handleNext}
              disabled={!canProceed()}
              className="flex-1 h-12 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 hover:from-blue-700 hover:via-purple-700 hover:to-pink-700 text-white disabled:opacity-50"
            >
              {step === totalSteps ? 'Continuar' : 'Próximo'}
              <ArrowRight className="w-5 h-5 ml-2" />
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
