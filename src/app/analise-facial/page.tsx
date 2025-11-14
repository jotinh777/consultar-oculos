'use client';

import { useState, useRef, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Camera, Upload, ArrowLeft, Sparkles, AlertCircle } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { storage } from '@/lib/storage';

export default function AnaliseFacialPage() {
  const router = useRouter();
  const [step, setStep] = useState<'choose' | 'camera' | 'upload' | 'analyzing'>('choose');
  const [imageData, setImageData] = useState<string | null>(null);
  const [cameraPermission, setCameraPermission] = useState<'unknown' | 'granted' | 'denied'>('unknown');
  const [stream, setStream] = useState<MediaStream | null>(null);
  
  const videoRef = useRef<HTMLVideoElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Verificar disponibilidade da câmera sem solicitar permissão
  useEffect(() => {
    const checkCameraAvailability = async () => {
      try {
        // Verificar se a API está disponível
        if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          setCameraPermission('denied');
          return;
        }

        // Verificar se há dispositivos de vídeo
        const devices = await navigator.mediaDevices.enumerateDevices();
        const hasCamera = devices.some(device => device.kind === 'videoinput');
        
        if (!hasCamera) {
          setCameraPermission('denied');
        }
      } catch (error) {
        console.warn('Não foi possível verificar câmera:', error);
        setCameraPermission('unknown');
      }
    };

    checkCameraAvailability();

    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, []);

  // Limpar stream quando componente desmontar
  useEffect(() => {
    return () => {
      if (stream) {
        stream.getTracks().forEach(track => track.stop());
      }
    };
  }, [stream]);

  const startCamera = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ 
        video: { 
          facingMode: 'user',
          width: { ideal: 1280 },
          height: { ideal: 720 }
        } 
      });
      setStream(mediaStream);
      if (videoRef.current) {
        videoRef.current.srcObject = mediaStream;
      }
      setStep('camera');
      setCameraPermission('granted');
    } catch (error: any) {
      console.error('Erro ao acessar câmera:', error);
      setCameraPermission('denied');
      
      let errorMessage = 'Não foi possível acessar a câmera.';
      
      if (error.name === 'NotFoundError' || error.name === 'DevicesNotFoundError') {
        errorMessage = 'Nenhuma câmera foi encontrada no seu dispositivo.';
      } else if (error.name === 'NotAllowedError' || error.name === 'PermissionDeniedError') {
        errorMessage = 'Permissão para acessar a câmera foi negada. Por favor, permita o acesso nas configurações do navegador.';
      } else if (error.name === 'NotReadableError' || error.name === 'TrackStartError') {
        errorMessage = 'A câmera está sendo usada por outro aplicativo.';
      }
      
      alert(errorMessage + ' Por favor, faça upload de uma foto.');
      setStep('choose');
    }
  };

  const capturePhoto = () => {
    if (videoRef.current && canvasRef.current) {
      const video = videoRef.current;
      const canvas = canvasRef.current;
      
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
      
      const ctx = canvas.getContext('2d');
      if (ctx) {
        ctx.drawImage(video, 0, 0);
        const data = canvas.toDataURL('image/jpeg', 0.9);
        setImageData(data);
        
        // Parar stream
        if (stream) {
          stream.getTracks().forEach(track => track.stop());
        }
        
        analyzeImage(data);
      }
    }
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const data = reader.result as string;
        setImageData(data);
        analyzeImage(data);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = (data: string) => {
    setStep('analyzing');
    
    // Simular análise com IA (em produção, chamar API real)
    setTimeout(() => {
      const formatos = ['Oval', 'Redondo', 'Quadrado', 'Coração', 'Diamante', 'Triangular'];
      const formatoDetectado = formatos[Math.floor(Math.random() * formatos.length)];
      
      const analise = {
        imageData: data,
        formatoRosto: formatoDetectado,
        analiseCompleta: `Seu rosto tem formato ${formatoDetectado.toLowerCase()}, com características harmoniosas que combinam perfeitamente com armações específicas.`,
        timestamp: new Date().toISOString(),
      };
      
      storage.setAnalise(analise);
      router.push('/resultados');
    }, 3000);
  };

  const handleChooseCamera = () => {
    startCamera();
  };

  const handleChooseUpload = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-purple-50 to-pink-50 py-8 px-4">
      <div className="container max-w-2xl mx-auto">
        <Button
          onClick={() => router.back()}
          variant="outline"
          className="mb-6"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Voltar
        </Button>

        <Card className="p-8 shadow-2xl bg-white/90 backdrop-blur-sm">
          {/* Choose Method */}
          {step === 'choose' && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-4 shadow-lg">
                  <Camera className="w-8 h-8 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Análise Facial com IA</h2>
                <p className="text-gray-600">Escolha como deseja enviar sua foto</p>
              </div>

              <div className="space-y-4">
                {cameraPermission !== 'denied' && (
                  <Button
                    onClick={handleChooseCamera}
                    className="w-full h-20 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white text-lg font-semibold shadow-lg"
                  >
                    <Camera className="w-6 h-6 mr-3" />
                    Tirar Foto Agora
                  </Button>
                )}

                <Button
                  onClick={handleChooseUpload}
                  variant="outline"
                  className="w-full h-20 border-2 border-purple-300 hover:border-purple-500 text-lg font-semibold"
                >
                  <Upload className="w-6 h-6 mr-3" />
                  Fazer Upload de Foto
                </Button>
              </div>

              {cameraPermission === 'denied' && (
                <div className="bg-amber-50 border border-amber-200 rounded-lg p-4">
                  <div className="flex gap-3">
                    <AlertCircle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                    <div className="text-sm text-amber-900">
                      <p className="font-semibold mb-1">Câmera não disponível</p>
                      <p>Você pode fazer upload de uma foto existente do seu dispositivo.</p>
                    </div>
                  </div>
                </div>
              )}

              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mt-6">
                <div className="flex gap-3">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-0.5" />
                  <div className="text-sm text-blue-900">
                    <p className="font-semibold mb-1">Dicas para melhor resultado:</p>
                    <ul className="list-disc list-inside space-y-1 text-blue-800">
                      <li>Tire a foto de frente, com boa iluminação</li>
                      <li>Remova acessórios que cubram o rosto</li>
                      <li>Mantenha expressão neutra</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Camera View */}
          {step === 'camera' && (
            <div className="space-y-6">
              <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Posicione seu rosto</h2>
                <p className="text-gray-600">Centralize seu rosto na câmera</p>
              </div>

              <div className="relative rounded-lg overflow-hidden bg-black aspect-video">
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  muted
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 border-4 border-purple-500/50 rounded-lg pointer-events-none" />
              </div>

              <canvas ref={canvasRef} className="hidden" />

              <div className="flex gap-4">
                <Button
                  onClick={() => {
                    if (stream) {
                      stream.getTracks().forEach(track => track.stop());
                    }
                    setStep('choose');
                  }}
                  variant="outline"
                  className="flex-1"
                >
                  Cancelar
                </Button>
                <Button
                  onClick={capturePhoto}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white"
                >
                  <Camera className="w-5 h-5 mr-2" />
                  Capturar Foto
                </Button>
              </div>
            </div>
          )}

          {/* Upload (hidden input) */}
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileUpload}
            className="hidden"
          />

          {/* Analyzing */}
          {step === 'analyzing' && (
            <div className="space-y-6">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full mb-6 shadow-lg animate-pulse">
                  <Sparkles className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900 mb-2">Analisando seu rosto...</h2>
                <p className="text-gray-600 mb-8">Nossa IA está identificando seu formato facial</p>

                {imageData && (
                  <div className="max-w-sm mx-auto rounded-lg overflow-hidden shadow-lg mb-6">
                    <img src={imageData} alt="Sua foto" className="w-full" />
                  </div>
                )}

                <div className="flex items-center justify-center gap-2">
                  <div className="w-3 h-3 bg-blue-600 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <div className="w-3 h-3 bg-purple-600 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <div className="w-3 h-3 bg-pink-600 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}
        </Card>
      </div>
    </div>
  );
}
