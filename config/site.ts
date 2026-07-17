export const siteConfig = {
  // ATENÇÃO: Substitua as informações abaixo pelas informações reais do briefing do cliente
  name: "CLIENT_NAME_PLACEHOLDER",
  subtitle: "CLIENT_SUBTITLE_PLACEHOLDER",
  description: "CLIENT_DESCRIPTION_PLACEHOLDER - Insira aqui a descrição institucional curta que virá no briefing do cliente.",
  crm: "CLIENT_CRM_PLACEHOLDER", // Registro profissional (ex: CRM-GO 35001), deixe vazio se não aplicável ao segmento
  logoIconName: "HeartPulse", // Nome do ícone Lucide correspondente ao ícone do Header do site (ex: HeartPulse, Stethoscope, Sparkles, Utensils, Scissors, etc.)
  contact: {
    phone: "CLIENT_PHONE_PLACEHOLDER", // Ex: (62) 98227-7200
    phoneUrl: "https://wa.me/CLIENT_PHONE_NUMBER_PLACEHOLDER", // Link do WhatsApp (somente números, ex: https://wa.me/5562982277200)
    whatsappMessage: "Olá, gostaria de agendar uma consulta.", // Mensagem pré-definida do WhatsApp
    email: "CLIENT_EMAIL_PLACEHOLDER",
    address: "CLIENT_ADDRESS_PLACEHOLDER - Cidade/UF | Detalhes de Atendimento",
  },
  navigation: [
    { label: "Início", href: "#inicio" },
    { label: "Serviços", href: "#servicos" },
    { label: "Sobre", href: "#sobre" },
    { label: "Como Funciona", href: "#como-funciona" },
    { label: "Dúvidas", href: "#faq" },
  ]
};
