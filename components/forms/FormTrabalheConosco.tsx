'use client';

import React, { useState, useRef } from 'react';
import { 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap, 
  Calendar, 
  Briefcase, 
  Upload, 
  CheckCircle2, 
  AlertTriangle,
  FileText,
  ShieldCheck,
  X
} from 'lucide-react';

interface FormState {
  nome: string;
  email: string;
  telefone: string;
  endereco: string;
  escolaridade: string;
  idade: string;
  experiencias: string;
}

const initialFormState: FormState = {
  nome: '',
  email: '',
  telefone: '',
  endereco: '',
  escolaridade: '',
  idade: '',
  experiencias: '',
};

export default function FormTrabalheConosco() {
  const [formData, setFormData] = useState<FormState>(initialFormState);
  const [file, setFile] = useState<File | null>(null);
  const [fileBase64, setFileBase64] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');
  const [dragActive, setDragActive] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [errors, setErrors] = useState<Partial<FormState & { file: string }>>({});

  const validate = (): boolean => {
    const newErrors: Partial<FormState & { file: string }> = {};

    if (!formData.nome.trim()) newErrors.nome = 'Nome completo é obrigatório.';
    
    if (!formData.email.trim()) {
      newErrors.email = 'E-mail é obrigatório.';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'E-mail inválido.';
    }

    if (!formData.telefone.trim()) {
      newErrors.telefone = 'Telefone é obrigatório.';
    } else if (formData.telefone.replace(/\D/g, '').length < 10) {
      newErrors.telefone = 'Número de telefone inválido (mínimo 10 dígitos).';
    }

    if (!formData.endereco.trim()) newErrors.endereco = 'Endereço completo é obrigatório.';
    if (!formData.escolaridade) newErrors.escolaridade = 'Selecione sua escolaridade.';
    
    if (!formData.idade.trim()) {
      newErrors.idade = 'Idade é obrigatória.';
    } else {
      const numIdade = parseInt(formData.idade, 10);
      if (isNaN(numIdade) || numIdade <= 0 || numIdade > 120) {
        newErrors.idade = 'Idade inválida.';
      }
    }

    if (!formData.experiencias.trim()) newErrors.experiencias = 'Campo de experiências é obrigatório.';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormState]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }));
    }
  };

  // Processamento do arquivo com limite de 5MB
  const processFile = (selectedFile: File) => {
    const allowedExtensions = ['pdf', 'doc', 'docx'];
    const fileExtension = selectedFile.name.split('.').pop()?.toLowerCase();

    if (!fileExtension || !allowedExtensions.includes(fileExtension)) {
      setErrors((prev) => ({ ...prev, file: 'Formato não suportado. Envie apenas PDF, DOC ou DOCX.' }));
      setFile(null);
      setFileBase64('');
      return;
    }

    // Limite de 5MB (5 * 1024 * 1024 bytes)
    if (selectedFile.size > 5 * 1024 * 1024) {
      setErrors((prev) => ({ ...prev, file: 'Tamanho excedido. O arquivo deve ter no máximo 5MB.' }));
      setFile(null);
      setFileBase64('');
      return;
    }

    setErrors((prev) => ({ ...prev, file: undefined }));
    setFile(selectedFile);

    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      setFileBase64(base64String);
    };
    reader.readAsDataURL(selectedFile);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      processFile(e.target.files[0]);
    }
  };

  const handleRemoveFile = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setFile(null);
    setFileBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
    setErrors((prev) => ({ ...prev, file: undefined }));
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      processFile(e.dataTransfer.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;

    setIsSubmitting(true);
    setSubmitStatus('idle');
    setErrorMessage('');

    try {
      // Montagem do payload completo conforme a API do motor
      const payload: Record<string, any> = {
        nome: formData.nome,
        email: formData.email,
        telefone: formData.telefone,
        endereco: formData.endereco,
        escolaridade: formData.escolaridade,
        idade: formData.idade,
        experiencias: formData.experiencias,
      };

      // Inclui anexo se houver
      if (file && fileBase64) {
        payload.file_base64 = fileBase64;
        payload.file_name = file.name;
        payload.file_mime = file.type;
      }

      const res = await fetch('/api/forms/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clienteId: 'alabz-teste-local',
          form_type: 'trabalhe_conosco',
          payload,
        }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        setSubmitStatus('success');
        setFormData(initialFormState);
        setFile(null);
        setFileBase64('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      } else {
        setSubmitStatus('error');
        setErrorMessage(data.error || 'Erro ao processar sua candidatura. Tente novamente mais tarde.');
      }
    } catch (err) {
      setSubmitStatus('error');
      setErrorMessage('Erro de rede. Verifique sua conexão e tente novamente.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (submitStatus === 'success') {
    return (
      <div 
        className="w-full bg-white/95 backdrop-blur-md border border-zinc-100 rounded-2xl p-6 md:p-8 text-center flex flex-col items-center justify-center min-h-[420px] sm:min-h-[460px] shadow-xl animate-fade-in"
        role="alert"
        aria-live="polite"
      >
        <div className="w-14 h-14 bg-emerald-800/10 rounded-full flex items-center justify-center text-emerald-800 mb-5 animate-bounce">
          <CheckCircle2 className="w-8 h-8" />
        </div>
        <h3 className="text-xl md:text-2xl font-serif text-[#1A331E] font-bold mb-3">
          Candidatura Enviada!
        </h3>
        <p className="text-xs sm:text-sm text-zinc-600 max-w-sm mb-6 leading-relaxed">
          Suas informações foram recebidas com total segurança e confidencialidade pelo nosso time.
        </p>
        <button
          onClick={() => setSubmitStatus('idle')}
          className="px-5 py-2 bg-[#1A331E] hover:bg-[#1A331E]/90 text-white rounded-full font-semibold transition-all shadow-md text-xs cursor-pointer"
        >
          Enviar Outra Candidatura
        </button>
      </div>
    );
  }

  return (
    <div className="w-full bg-white/95 backdrop-blur-md border border-zinc-100 rounded-2xl p-5 md:p-6 shadow-xl max-h-[90vh] md:max-h-none overflow-y-auto">
      <div className="mb-4 border-b border-zinc-100 pb-3 text-center">
        <h2 className="text-xl md:text-2xl font-serif text-[#1A331E] font-bold mb-1">
          Envie sua candidatura
        </h2>
        <p className="text-[11px] text-zinc-500">
          Preencha seus dados profissionais. O currículo em anexo é opcional.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        {/* Layout Bipartido dos campos principais */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5 gap-y-3.5">
          
          {/* COLUNA 1: Nome, Email, Telefone + Idade, Endereço */}
          <div className="space-y-3.5">
            {/* Nome Completo */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="nome">
                Nome completo *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                  <User className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  id="nome"
                  name="nome"
                  value={formData.nome}
                  onChange={handleInputChange}
                  placeholder="Seu nome"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                  required
                />
              </div>
              {errors.nome && <p className="text-red-500 text-[10px] mt-0.5">{errors.nome}</p>}
            </div>

            {/* Email */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="email">
                E-mail *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                  <Mail className="w-3.5 h-3.5" />
                </span>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="nome@email.com"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                  required
                />
              </div>
              {errors.email && <p className="text-red-500 text-[10px] mt-0.5">{errors.email}</p>}
            </div>

            {/* Telefone & Idade (Lado a Lado - 2/3 e 1/3) */}
            <div className="grid grid-cols-3 gap-3">
              <div className="col-span-2">
                <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="telefone">
                  Telefone *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                    <Phone className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="tel"
                    id="telefone"
                    name="telefone"
                    value={formData.telefone}
                    onChange={handleInputChange}
                    placeholder="(00) 90000-0000"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                    required
                  />
                </div>
                {errors.telefone && <p className="text-red-500 text-[10px] mt-0.5">{errors.telefone}</p>}
              </div>

              <div className="col-span-1">
                <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="idade">
                  Idade *
                </label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                    <Calendar className="w-3.5 h-3.5" />
                  </span>
                  <input
                    type="number"
                    id="idade"
                    name="idade"
                    value={formData.idade}
                    onChange={handleInputChange}
                    placeholder="Ex: 25"
                    min="1"
                    max="120"
                    className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                    required
                  />
                </div>
                {errors.idade && <p className="text-red-500 text-[10px] mt-0.5">{errors.idade}</p>}
              </div>
            </div>

            {/* Endereço completo */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="endereco">
                Endereço completo *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none">
                  <MapPin className="w-3.5 h-3.5" />
                </span>
                <input
                  type="text"
                  id="endereco"
                  name="endereco"
                  value={formData.endereco}
                  onChange={handleInputChange}
                  placeholder="Rua, nº, Bairro, Cidade - UF"
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                  required
                />
              </div>
              {errors.endereco && <p className="text-red-500 text-[10px] mt-0.5">{errors.endereco}</p>}
            </div>

            {/* Anexar Currículo (quadrinho de anexar - movido para a Coluna 1 conforme solicitação) */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1">
                Anexar Currículo <span className="text-[9px] text-zinc-400 font-normal lowercase">(PDF, DOC, DOCX · máx 5MB)</span>
              </label>
              
              {file ? (
                /* Layout quando possui arquivo anexado */
                <div className="flex items-center justify-between border border-emerald-800/20 bg-emerald-800/5 rounded-xl px-3 py-2 text-emerald-800 animate-fade-in w-full">
                  <div className="flex items-center gap-2 min-w-0">
                    <FileText className="w-4 h-4 shrink-0 text-emerald-800" />
                    <div className="min-w-0">
                      <p className="text-[11px] font-semibold truncate max-w-[130px] sm:max-w-[170px]">{file.name}</p>
                      <p className="text-[9px] text-emerald-800/70 font-medium">Anexado com sucesso</p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={handleRemoveFile}
                    className="p-1 text-emerald-800 hover:bg-emerald-800/10 rounded transition-all cursor-pointer flex items-center justify-center shrink-0 border border-emerald-800/10"
                    title="Remover arquivo"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>
              ) : (
                /* Layout para arrastar/clicar */
                <div
                  onDragEnter={handleDrag}
                  onDragLeave={handleDrag}
                  onDragOver={handleDrag}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`border-1.5 border-dashed rounded-xl py-2 px-3 text-center cursor-pointer transition-all flex items-center justify-center gap-2 w-full ${
                    dragActive 
                      ? 'border-[#C5A880] bg-[#C5A880]/5' 
                      : 'border-zinc-200 hover:border-zinc-300 bg-zinc-50/20'
                  }`}
                >
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="hidden"
                  />
                  <Upload className="w-4 h-4 text-zinc-400 shrink-0" />
                  <div className="text-left">
                    <p className="text-[11px] text-zinc-600 font-semibold leading-tight">
                      Clique ou arraste o currículo aqui
                    </p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* COLUNA 2: Escolaridade, Experiências Ampliada */}
          <div className="space-y-3.5 flex flex-col h-full justify-between">
            {/* Escolaridade (Aumentado / Largura total da coluna) */}
            <div>
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="escolaridade">
                Escolaridade *
              </label>
              <div className="relative">
                <span className="absolute inset-y-0 left-0 pl-3 flex items-center text-zinc-400 pointer-events-none z-10">
                  <GraduationCap className="w-3.5 h-3.5" />
                </span>
                <select
                  id="escolaridade"
                  name="escolaridade"
                  value={formData.escolaridade}
                  onChange={handleInputChange}
                  className="w-full pl-9 pr-7 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs appearance-none cursor-pointer border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                  required
                >
                  <option value="" disabled>Selecione</option>
                  <option value="Ensino fundamental incompleto">Ensino fundamental incompleto</option>
                  <option value="Ensino fundamental completo">Ensino fundamental completo</option>
                  <option value="Ensino médio incompleto">Ensino médio incompleto</option>
                  <option value="Ensino médio completo">Ensino médio completo</option>
                  <option value="Ensino superior incompleto">Ensino superior incompleto</option>
                  <option value="Ensino superior completo">Ensino superior completo</option>
                </select>
                <span className="absolute inset-y-0 right-0 pr-2.5 flex items-center text-zinc-400 pointer-events-none text-[8px]">
                  ▼
                </span>
              </div>
              {errors.escolaridade && <p className="text-red-500 text-[10px] mt-0.5">{errors.escolaridade}</p>}
            </div>

            {/* Experiências Profissionais (Esticado verticalmente com flex-1 / mais rows) */}
            <div className="flex-1 flex flex-col min-h-[160px] md:min-h-0">
              <label className="block text-[10px] font-bold text-zinc-700 uppercase tracking-wider mb-1" htmlFor="experiencias">
                Experiências profissionais *
              </label>
              <div className="relative flex-1 flex">
                <span className="absolute top-2.5 left-3 text-zinc-400 pointer-events-none">
                  <Briefcase className="w-3.5 h-3.5" />
                </span>
                <textarea
                  id="experiencias"
                  name="experiencias"
                  value={formData.experiencias}
                  onChange={handleInputChange}
                  placeholder="Descreva suas experiências anteriores (Empresa, tempo e cargo)"
                  rows={6}
                  className="w-full pl-9 pr-3 py-2 rounded-xl border bg-zinc-50/50 text-zinc-800 placeholder-zinc-400 focus:outline-none focus:ring-1.5 focus:bg-white transition-all text-xs resize-none flex-1 border-zinc-200 focus:border-[#C5A880] focus:ring-[#C5A880]/20"
                  required
                />
              </div>
              {errors.experiencias && <p className="text-red-500 text-[10px] mt-0.5">{errors.experiencias}</p>}
            </div>
          </div>

        </div>

        {/* Mensagem de Erro Geral */}
        {submitStatus === 'error' && (
          <div className="p-2.5 bg-red-50 border border-red-200 rounded-xl flex items-start gap-2 text-red-800 text-[11px]" role="alert">
            <AlertTriangle className="w-3.5 h-3.5 shrink-0 mt-0.5" />
            <span>{errorMessage}</span>
          </div>
        )}

        {/* Botão de Envio & Aviso LGPD */}
        <div className="space-y-3 pt-1">
          <button
            type="submit"
            disabled={isSubmitting}
            className={`w-full py-2.5 px-4 bg-[#1A331E] hover:bg-[#1A331E]/95 text-white font-bold rounded-xl transition-all shadow-md flex items-center justify-center gap-2 cursor-pointer text-xs tracking-wider uppercase ${
              isSubmitting ? 'opacity-80 cursor-wait' : ''
            }`}
          >
            {isSubmitting ? (
              <>
                <svg className="animate-spin h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                </svg>
                Enviando Candidatura...
              </>
            ) : (
              'Enviar Candidatura'
            )}
          </button>

          {/* Aviso LGPD / Coleta de IP */}
          <div className="border-t border-zinc-100 pt-2.5 flex gap-2 text-[9px] text-zinc-400 leading-relaxed">
            <ShieldCheck className="w-5 h-5 shrink-0 text-zinc-400 mt-0.5" />
            <p>
              Coleta de IP e dados cadastrais em conformidade com a LGPD (Art. 7º, II e IX). Seus dados serão mantidos confidenciais e usados exclusivamente para recrutamento.
            </p>
          </div>
        </div>
      </form>
    </div>
  );
}
