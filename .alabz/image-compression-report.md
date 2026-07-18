# Relatório de compressão de imagens

Data: 2026-07-17

## Resumo

Conversão segura aplicada apenas em imagens efetivamente referenciadas pelo código e validadas após a geração do WebP. Logos, favicon e assinatura foram preservados em PNG para manter fidelidade visual.

- Tamanho original dos arquivos convertidos: 9.586.051 bytes
- Tamanho final em WebP: 1.362.202 bytes
- Economia estimada: 8.223.849 bytes, aproximadamente 85,8%

## Arquivos convertidos e substituídos

| Arquivo original | Arquivo final | Qualidade | Antes | Depois |
| --- | --- | ---: | ---: | ---: |
| `public/images/microfone.png` | `public/images/microfone.webp` | 95 | 2.005.250 B | 268.188 B |
| `public/images/fundadora/fundadora2.png` | `public/images/fundadora/fundadora2.webp` | 98 | 1.230.016 B | 190.444 B |
| `public/images/fundadora/fundadora3.png` | `public/images/fundadora/fundadora3.webp` | 98 | 952.715 B | 144.954 B |
| `public/images/founder_bg.png` | `public/images/founder_bg.webp` | 90 | 691.291 B | 118.696 B |
| `public/images/faixada dia.png` | `public/images/faixada dia.webp` | 90 | 2.432.903 B | 342.404 B |
| `public/images/faixada noite.png` | `public/images/faixada noite.webp` | 90 | 2.273.876 B | 297.516 B |

## Arquivos preservados

- `public/images/favicon-sem-fundo.png`
- `public/images/assinatura-dirce.png`
- `public/images/logo.png`
- `public/logo.png`
- `public/Logofooter 1.png`

## Validação de assets críticos

Os arquivos convertidos e os assets de marca preservados responderam `200` no servidor local:

- `/images/microfone.webp`
- `/images/fundadora/fundadora2.webp`
- `/images/fundadora/fundadora3.webp`
- `/images/founder_bg.webp`
- `/images/faixada dia.webp`
- `/images/faixada noite.webp`
- `/images/favicon-sem-fundo.png`
- `/images/assinatura-dirce.png`
