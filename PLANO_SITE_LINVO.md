# Plano de Implementacao — Site linvo.one

> Documento gerado a partir de mapeamento de requisitos com o fundador.
> Data: 2026-03-18 | Revisao: v4.0 (terceiro refinamento — metadata auxiliar, paleta, cleanup final)

---

## 1. Visao Geral do Projeto

| Item                | Definicao                                                                 |
|---------------------|---------------------------------------------------------------------------|
| **Produto**         | Site institucional + pre-lancamento da startup Linvo                      |
| **Dominio**         | linvo.one                                                                 |
| **Objetivo**        | Apresentar a proposta de valor, construir comunidade (waitlist/early access) e validar interesse antes do lancamento |
| **Publico-alvo**    | Sindicos profissionais + Administradoras de condominios (decisores B2B)   |
| **Tom**             | Moderno mas acessivel — visual SaaS limpo com toque humano               |
| **Idioma**          | Bilingue: PT-BR (padrao) + EN (alternativo), com deteccao automatica     |
| **Deploy**          | GitHub Pages (static export) — hosting 100% estatico, sem servidor       |
| **Formularios**     | Formspree (CLI integration, Project ID: 2960331414546939869, dominio: linvo.one) |

### 1.1 Contexto das Decisoes

O site serve como canal de validacao de mercado enquanto o produto (plataforma Linvo) amadurece em fase MVP. O publico primario sao decisores B2B brasileiros (sindicos e administradoras), portanto PT-BR e o idioma padrao. EN existe como alternativo para alcance futuro e profissionalismo. O deploy em GitHub Pages foi escolhido por custo zero e simplicidade — isso implica **restricoes tecnicas importantes** (sem servidor, sem middleware, sem API routes) que moldam todas as decisoes de implementacao abaixo.

---

## 2. Stack Tecnologica

| Camada          | Tecnologia                          | Justificativa                                        |
|-----------------|-------------------------------------|------------------------------------------------------|
| Framework       | Next.js 15 (App Router)             | SSG com `output: 'export'`, consistencia com admin-web |
| Linguagem       | TypeScript (strict)                 | Type safety, padrao do ecossistema Linvo             |
| Estilizacao     | Tailwind CSS 4 (CSS-first config)   | Consistencia com admin-web, utility-first            |
| Fontes          | Manrope (headings) + Inter (body)   | Design tokens existentes, via `next/font` (self-hosted) |
| i18n            | next-intl (sem middleware)          | Subpath routing via `generateStaticParams`, SSG compativel |
| Formularios     | @formspree/react                    | Integracao nativa React, CLI project ja configurado  |
| Icones          | lucide-react                        | Leve, tree-shakeable, consistente                    |
| Animacoes       | framer-motion (opcional)            | Scroll animations leves, hero entrance               |
| Linting         | ESLint 9 (flat config) + Prettier   | Padrao do ecossistema                                |
| Deploy          | GitHub Pages + GitHub Actions       | Static export automatizado via CI                    |

### 2.1 Configuracao Next.js para GitHub Pages

```ts
// next.config.ts
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin('./src/i18n/request.ts');

const nextConfig = {
  output: 'export',                  // Gera site estatico em /out
  images: { unoptimized: true },     // GitHub Pages nao suporta Image Optimization API
  trailingSlash: true,               // /pt/ em vez de /pt (compatibilidade GitHub Pages)
};

export default withNextIntl(nextConfig);
```

**Restricao critica**: `output: 'export'` desabilita completamente middleware, API routes e server-side rendering. Toda logica dinamica (deteccao de idioma, formularios) deve ser client-side.

### 2.2 Tailwind CSS 4 — Configuracao via CSS

Tailwind v4 usa configuracao CSS-first via `@theme`, **sem** `tailwind.config.ts` (padrao do v3, deprecated).

**Importante**: Fonts carregadas via `next/font` criam CSS custom properties no runtime. Para Tailwind v4 reconhece-las, usar `@theme inline` (referencia variaveis externas) separado de `@theme` (valores estaticos):

```css
/* src/app/globals.css */
@import "tailwindcss";

/* Fonts: referencia as CSS vars injetadas pelo next/font no <html> */
@theme inline {
  --font-body: var(--font-inter);
  --font-heading: var(--font-manrope);
}

/* Valores estaticos do tokens.json */
@theme {
  /* Cores */
  --color-primary: #1F4E79;
  --color-primary-dark: #163A5F;
  --color-primary-light: #2A679C;
  --color-accent: #2A9D8F;
  --color-accent-dark: #247C73;
  --color-accent-light: #4DB6AC;
  --color-background: #F7F8FA;
  --color-surface: #FFFFFF;
  --color-border: #E2E6EB;
  --color-text-primary: #1A1D21;
  --color-text-secondary: #5F6B7A;
  --color-text-muted: #9CA3AF;
  --color-text-on-primary: #FFFFFF;
  --color-text-on-accent: #FFFFFF;
  --color-primary-bg: #EEF2FF;
  --color-urgent: #D94F4F;
  --color-urgent-bg: #FEF2F2;
  --color-success: #2A9D8F;
  --color-success-bg: #F0FAF8;
  --color-warning: #E5A100;
  --color-warning-bg: #FFFBEB;

  /* Border radius */
  --radius-sm: 8px;
  --radius-md: 10px;
  --radius-lg: 14px;
  --radius-xl: 16px;
}
```

**Por que dois blocos `@theme`**: `@theme inline` diz ao Tailwind que os valores vem do DOM (injetados pelo next/font), nao do build. `@theme` normal define valores estaticos conhecidos em build time. Mistura-los causa conflito de resolucao.

---

## 3. Identidade Visual

### 3.1 Paleta de Cores Completa (todos os 26 tokens de tokens.json)

| Token              | Cor       | Uso no site                              |
|--------------------|-----------|------------------------------------------|
| primary            | #1F4E79   | Navbar, footer background, headings      |
| primaryDark        | #163A5F   | Hover states de botoes primary, footer    |
| primaryLight       | #2A679C   | Links, destaques secundarios              |
| accent             | #2A9D8F   | Icones de features, badges, bordas decorativas (focus de inputs) — NAO usar como fundo com texto branco (ratio 3.9:1, WCAG fail) |
| accentDark         | #247C73   | **Background de botoes CTA** com texto branco (ratio 5.1:1, WCAG pass), hover do accent |
| accentLight        | #4DB6AC   | Backgrounds decorativos leves             |
| white              | #FFFFFF   | Texto sobre primary/accent                |
| background         | #F7F8FA   | Fundo de secoes alternadas                |
| surface            | #FFFFFF   | Cards, formularios, modais                |
| border             | #E2E6EB   | Bordas de cards, inputs, dividers         |
| textPrimary        | #1A1D21   | Texto principal (body, titulos)           |
| textSecondary      | #5F6B7A   | Subtitulos, descricoes de features        |
| textMuted          | #9CA3AF   | Placeholders, labels auxiliares           |
| textOnPrimary      | #FFFFFF   | Texto sobre fundo primary                 |
| textOnAccent       | #FFFFFF   | Texto sobre fundo accentDark (botoes CTA) |
| primaryBackground  | #EEF2FF   | Background leve de badges, destaques      |
| urgent             | #D94F4F   | Erros de formulario, alertas              |
| urgentBackground   | #FEF2F2   | Background de mensagens de erro           |
| success            | #2A9D8F   | Confirmacoes, sucesso de formulario       |
| successBackground  | #F0FAF8   | Background de mensagens de sucesso        |
| warning            | #E5A100   | Avisos                                    |
| warningBackground  | #FFFBEB   | Background de avisos                      |
| tabActive          | #1F4E79   | Nav link ativo (scroll spy)               |
| tabInactive        | #9CA3AF   | Nav links inativos                        |

### 3.2 Tipografia

| Elemento     | Fonte    | Peso       | Desktop | Mobile | Line-height |
|-------------|----------|------------|---------|--------|-------------|
| H1 (hero)   | Manrope  | 700 (Bold) | 56px    | 36px   | 1.1         |
| H2 (secoes) | Manrope  | 700        | 40px    | 28px   | 1.2         |
| H3 (cards)  | Manrope  | 600 (Semi) | 24px    | 20px   | 1.3         |
| Body        | Inter    | 400        | 18px    | 16px   | 1.6         |
| Body small  | Inter    | 400        | 16px    | 14px   | 1.5         |
| CTA button  | Inter    | 600        | 18px    | 16px   | 1.0         |
| Nav links   | Inter    | 500        | 16px    | 14px   | 1.0         |
| Caption     | Inter    | 400        | 14px    | 12px   | 1.4         |

**Carregamento via next/font** (self-hosted, elimina CLS e dependency externa):
```ts
// app/layout.tsx
import { Inter, Manrope } from 'next/font/google';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

// Aplicar no <html>: className={`${inter.variable} ${manrope.variable}`}
// Tailwind cria utilities: font-body (Inter) e font-heading (Manrope) via @theme inline
```

**Fluxo**: `next/font` injeta `--font-inter` e `--font-manrope` no DOM → `@theme inline` mapeia para `--font-body` e `--font-heading` → Tailwind gera `font-body` e `font-heading` utilities.

### 3.3 Logos Disponiveis

| Arquivo                            | Dimensao original | Uso no site                                  |
|------------------------------------|-------------------|----------------------------------------------|
| `logo-linvo.png`                   | 508 KB            | Navbar, footer (logo principal com nome)     |
| `logo-icon.png`                    | 260 KB            | Favicon (converter), Open Graph, icone isolado |
| `logo-app-icon.png`               | 226 KB            | Secao de solucao (visual do app)             |
| `logo-linvo-community-builder.png` | 662 KB            | Pagina Sobre, materiais institucionais       |

**Pipeline de otimizacao de imagens** (Fase 5):
- Converter PNGs para WebP (qualidade 85) para uso no site
- Manter PNGs originais em `assets/brand/` como fonte
- Gerar favicon: `logo-icon.png` → `favicon.ico` (32x32), `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (180x180)
- Gerar OG images: `og-image-pt.png` e `og-image-en.png` (1200x630) com logo + headline do hero

---

## 4. Internacionalizacao (i18n)

### 4.1 Estrategia

Replica o **comportamento** do azebratech.com (deteccao automatica + localStorage + bandeiras + hreflang), adaptado para Next.js static export.

| Aspecto              | Implementacao                                                       |
|----------------------|---------------------------------------------------------------------|
| Routing              | Subpath: `/pt/` (PT-BR) e `/en/` (English)                         |
| Root `/`             | Pagina de redirect com deteccao client-side (script inline no head) |
| Deteccao automatica  | Client-side JS, 3 camadas: localStorage → browser lang → IP geo    |
| Persistencia         | `localStorage['linvo-lang']` salva escolha explicita do usuario     |
| Toggle visual        | Bandeiras BR/US no navbar e footer                                  |
| SEO                  | Hreflang tags em todas as paginas + sitemap com xhtml:link          |
| x-default            | Aponta para `/pt/` (publico primario brasileiro)                    |
| Traducoes            | Arquivos JSON em `/messages/pt-BR.json` e `/messages/en.json`       |
| Static generation    | `generateStaticParams` + `setRequestLocale` em cada layout/page     |
| Slugs                | Localizados: `/pt/sobre/`, `/en/about/` (por page generateStaticParams) |

**Por que subpath e nao PT no root**: `next-intl` com `output: 'export'` exige `[locale]` como dynamic segment, gerando obrigatoriamente `/pt/` e `/en/`. Servir PT no root exigiria abandonar o `[locale]` pattern e duplicar toda a logica manualmente — complexidade sem beneficio proporcional.

### 4.2 Deteccao de Idioma — Client-Side (SEM middleware)

**Restricao critica**: `output: 'export'` desabilita middleware do Next.js. Toda deteccao ocorre via JavaScript no browser.

**Implementacao**: Script inline no `<head>` da pagina root (`app/page.tsx`), executado antes do render (mesmo padrao do azebratech):

```
Visitante acessa linvo.one/
    |
    ├─ Tem localStorage['linvo-lang']?
    |   ├─ 'pt' → redirect para /pt/
    |   └─ 'en' → redirect para /en/
    |
    ├─ navigator.language comeca com 'pt'? → redirect para /pt/
    |
    ├─ navigator.language comeca com 'en'? → redirect para /en/
    |
    ├─ Fallback: fetch('https://ipapi.co/country_code/')
    |   ├─ Pais == 'BR' → redirect para /pt/
    |   ├─ Qualquer outro pais → redirect para /en/
    |   └─ Falha na API → redirect para /pt/ (default seguro)
    |
    └─ Default: /pt/ (publico primario e brasileiro)
```

**Mitigacao do flash de redirect**: A pagina root renderiza um loading state minimo (logo Linvo + spinner sutil) enquanto a deteccao executa. O redirect usa `window.location.replace()` (nao gera historico). Tempo tipico: < 100ms para browser lang, < 500ms se precisar de IP.

**Visitantes com idiomas diferentes de PT/EN** (espanhol, frances, etc.): Caem no fallback de IP geolocation. Se estao no Brasil, vao para PT. Se estao fora, vao para EN. Comportamento intencional: o site so existe em dois idiomas.

```tsx
// app/page.tsx — Pagina root (redirect)
'use client';

import { useEffect } from 'react';

export default function RootRedirect() {
  useEffect(() => {
    const saved = localStorage.getItem('linvo-lang');
    if (saved === 'pt' || saved === 'en') {
      window.location.replace(`/${saved}/`);
      return;
    }

    const browserLang = (navigator.language || '').toLowerCase();
    if (browserLang.startsWith('pt')) {
      window.location.replace('/pt/');
      return;
    }
    if (browserLang.startsWith('en')) {
      window.location.replace('/en/');
      return;
    }

    // Fallback: IP geolocation
    fetch('https://ipapi.co/country_code/')
      .then(r => r.text())
      .then(code => {
        const country = (code || '').trim();
        window.location.replace(country === 'BR' ? '/pt/' : '/en/');
      })
      .catch(() => {
        window.location.replace('/pt/'); // Default seguro
      });
  }, []);

  // Loading state minimo enquanto detecta idioma
  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <img src="/images/logo-icon.webp" alt="Linvo" className="w-16 h-16 animate-pulse" />
    </div>
  );
}
```

### 4.3 Configuracao next-intl para Static Export

```ts
// src/i18n/config.ts
export const locales = ['pt', 'en'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'pt';

// Mapeamento de slugs localizados (page slug → locale)
export const localizedSlugs = {
  about:        { pt: 'sobre',        en: 'about' },
  contact:      { pt: 'contato',      en: 'contact' },
  privacy:      { pt: 'privacidade',  en: 'privacy' },
} as const;
```

```ts
// src/i18n/request.ts
import { getRequestConfig } from 'next-intl/server';
import { locales, defaultLocale } from './config';

export default getRequestConfig(async ({ requestLocale }) => {
  // requestLocale vem do [locale] param na URL
  let locale = await requestLocale;

  // Fallback se locale invalido ou ausente
  if (!locale || !locales.includes(locale as any)) {
    locale = defaultLocale;
  }

  return {
    locale,
    messages: (await import(`../../messages/${locale === 'pt' ? 'pt-BR' : 'en'}.json`)).default,
  };
});
```

**Por que `requestLocale` e nao `locale`**: A API do next-intl 3.22+ usa `requestLocale` (Promise) para suportar o modelo async do Next.js 15. A versao antiga `({ locale })` esta deprecated.

**Cada layout com [locale] deve ter** (Next.js 15 — `params` e Promise):
```tsx
// app/[locale]/layout.tsx
import { setRequestLocale } from 'next-intl/server';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { locales } from '@/i18n/config';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params; // Next.js 15: params e Promise
  setRequestLocale(locale);
  const messages = await getMessages();

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <SetHtmlLang locale={locale} />
      <Navbar />
      <main>{children}</main>
      <Footer />
      <CookieConsent />
    </NextIntlClientProvider>
  );
}
```

**Componente SetHtmlLang** (atualiza `<html lang>` por locale):
```tsx
// components/layout/SetHtmlLang.tsx
'use client';
import { useEffect } from 'react';

export function SetHtmlLang({ locale }: { locale: string }) {
  useEffect(() => {
    document.documentElement.lang = locale === 'pt' ? 'pt-BR' : 'en';
  }, [locale]);
  return null;
}
```

**Por que `SetHtmlLang`**: O root layout (`app/layout.tsx`) define `<html lang="pt-BR">` como default (requisito do Next.js: root layout DEVE ter `<html>` e `<body>`). Como o locale layout e nested, ele nao pode redefinir `<html>`. O `SetHtmlLang` atualiza o atributo no client para paginas EN. Para SEO, as hreflang tags sao mais relevantes que o atributo lang.

**Root layout** (obrigatorio pelo Next.js, define html + body):
```tsx
// app/layout.tsx
import { Inter, Manrope } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });
const manrope = Manrope({ subsets: ['latin'], variable: '--font-manrope' });

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR" suppressHydrationWarning>
      <body className={`${inter.variable} ${manrope.variable}`}>
        {children}
      </body>
    </html>
  );
}
```

### 4.4 Slugs Localizados — generateStaticParams por Pagina

Cada pagina com slug localizado exporta seu proprio `generateStaticParams` restringindo a qual locale pertence. Isso evita a geracao de rotas invalidas (ex: `/en/sobre/` nao existira).

```tsx
// app/[locale]/sobre/page.tsx — so gera para PT
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export function generateStaticParams() {
  return [{ locale: 'pt' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = getAlternates('/pt/sobre/'); // retorna hreflang mapeado

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates,
  };
}

export default async function SobrePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent />;
}
```

```tsx
// app/[locale]/about/page.tsx — so gera para EN
import { setRequestLocale, getTranslations } from 'next-intl/server';
import { type Metadata } from 'next';
import { getAlternates } from '@/i18n/navigation';
import { AboutPageContent } from '@/components/pages/AboutPageContent';

export function generateStaticParams() {
  return [{ locale: 'en' }];
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });
  const alternates = getAlternates('/en/about/');

  return {
    title: t('about.title'),
    description: t('about.description'),
    alternates,
  };
}

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);
  return <AboutPageContent />;
}
```

**Helper `getAlternates`** (em `i18n/navigation.ts`):
```ts
// Gera alternates com hreflang a partir do routeMap
export function getAlternates(currentPath: string) {
  const entry = routeMap[currentPath];
  if (!entry) return {};

  const ptPath = currentPath.startsWith('/pt/') ? currentPath : entry.pt;
  const enPath = currentPath.startsWith('/en/') ? currentPath : entry.en;

  return {
    canonical: `https://linvo.one${currentPath}`,
    languages: {
      'pt-BR': `https://linvo.one${ptPath}`,
      'en': `https://linvo.one${enPath}`,
    },
  };
}
```

**Ambas as paginas renderizam o mesmo componente** (`AboutPageContent`), que usa `useTranslations()` para exibir o conteudo no idioma correto. Zero duplicacao de logica. O `generateMetadata` de cada page file usa o `routeMap` via `getAlternates` para construir hreflang corretos entre slugs localizados.

**Mesmo padrao para contato/contact e privacidade/privacy** — cada page file exporta `generateStaticParams` (locale) + `generateMetadata` (titulo, descricao, alternates) + default function (renderiza componente compartilhado).

### 4.5 Hreflang e SEO

Cada pagina inclui no `<head>` (via `generateMetadata`):

```html
<!-- Exemplo: pagina Sobre (PT) -->
<html lang="pt-BR">
<link rel="alternate" hreflang="pt-BR" href="https://linvo.one/pt/sobre/" />
<link rel="alternate" hreflang="en" href="https://linvo.one/en/about/" />
<link rel="alternate" hreflang="x-default" href="https://linvo.one/pt/sobre/" />
<link rel="canonical" href="https://linvo.one/pt/sobre/" />
```

**Mapeamento de alternates por pagina** (para `generateMetadata`):

| Pagina     | PT-BR                             | EN                               |
|------------|-----------------------------------|----------------------------------|
| Landing    | `https://linvo.one/pt/`           | `https://linvo.one/en/`          |
| Sobre      | `https://linvo.one/pt/sobre/`     | `https://linvo.one/en/about/`    |
| Contato    | `https://linvo.one/pt/contato/`   | `https://linvo.one/en/contact/`  |
| Privacidade| `https://linvo.one/pt/privacidade/`| `https://linvo.one/en/privacy/` |

### 4.6 Toggle de Idioma (Componente)

**Comportamento**:
1. Exibe bandeira do idioma **alternativo** (se em PT, mostra bandeira US; se em EN, mostra bandeira BR)
2. Ao clicar: salva escolha em `localStorage['linvo-lang']` e navega para a pagina equivalente
3. Navegacao mapeia automaticamente para o slug correto do outro idioma (ex: `/pt/sobre/` → `/en/about/`)
4. Bandeiras servidas via `flagcdn.com/24x18/{code}.png` com srcset para retina

**Mapeamento de navegacao entre idiomas**:
```ts
// i18n/navigation.ts
const routeMap: Record<string, Record<string, string>> = {
  '/pt/':              { en: '/en/' },
  '/en/':              { pt: '/pt/' },
  '/pt/sobre/':        { en: '/en/about/' },
  '/en/about/':        { pt: '/pt/sobre/' },
  '/pt/contato/':      { en: '/en/contact/' },
  '/en/contact/':      { pt: '/pt/contato/' },
  '/pt/privacidade/':  { en: '/en/privacy/' },
  '/en/privacy/':      { pt: '/pt/privacidade/' },
};
```

**Posicionamento**: Presente no navbar (desktop e mobile) e no footer.

---

## 5. Estrutura de Paginas

### 5.1 Mapa do Site

```
linvo.one/                              ← Redirect page (deteccao de idioma)
linvo.one/pt/                           ← Landing page principal (PT-BR)
linvo.one/en/                           ← Landing page principal (EN)
linvo.one/pt/sobre/                     ← Pagina Sobre (PT-BR)
linvo.one/en/about/                     ← Pagina Sobre (EN)
linvo.one/pt/contato/                   ← Pagina Contato (PT-BR)
linvo.one/en/contact/                   ← Pagina Contato (EN)
linvo.one/pt/privacidade/               ← Privacidade & Termos (PT-BR)
linvo.one/en/privacy/                   ← Privacy & Terms (EN)
```

**Output estatico gerado** (pasta `/out`):
```
out/
├── index.html                          ← Redirect page (client-side detection)
├── pt/
│   ├── index.html                      ← Landing PT
│   ├── sobre/index.html                ← Sobre PT
│   ├── contato/index.html              ← Contato PT
│   └── privacidade/index.html          ← Privacidade PT
├── en/
│   ├── index.html                      ← Landing EN
│   ├── about/index.html                ← About EN
│   ├── contact/index.html              ← Contact EN
│   └── privacy/index.html              ← Privacy EN
├── 404.html                            ← Pagina de erro customizada
├── _next/static/                       ← Assets compartilhados (CSS, JS, fontes)
├── images/                             ← Imagens otimizadas
├── CNAME                               ← Dominio customizado
├── .nojekyll                           ← Desabilita processamento Jekyll
└── robots.txt
```

### 5.2 Estrutura de Pastas (App Router + next-intl)

```
src/
  app/
    layout.tsx                          ← Root layout (html lang, fonts, analytics)
    page.tsx                            ← Redirect page (deteccao de idioma)
    not-found.tsx                       ← Pagina 404 customizada
    globals.css                         ← Tailwind + @theme tokens
    [locale]/
      layout.tsx                        ← Locale layout (navbar + footer + setRequestLocale)
      page.tsx                          ← Landing page principal
      sobre/
        page.tsx                        ← Sobre (generateStaticParams: [{locale:'pt'}])
      about/
        page.tsx                        ← About (generateStaticParams: [{locale:'en'}])
      contato/
        page.tsx                        ← Contato (generateStaticParams: [{locale:'pt'}])
      contact/
        page.tsx                        ← Contact (generateStaticParams: [{locale:'en'}])
      privacidade/
        page.tsx                        ← Privacidade (generateStaticParams: [{locale:'pt'}])
      privacy/
        page.tsx                        ← Privacy (generateStaticParams: [{locale:'en'}])
  components/
    layout/
      Navbar.tsx                        ← Navbar responsiva (desktop + mobile drawer)
      MobileMenu.tsx                    ← Menu hamburger mobile
      Footer.tsx                        ← Footer com links, social, lang toggle
      LanguageSwitcher.tsx              ← Bandeira + localStorage + route mapping
      CookieConsent.tsx                 ← Banner LGPD de consentimento de cookies
    sections/
      Hero.tsx                          ← Hero section
      Problem.tsx                       ← Secao "O Problema"
      Solution.tsx                      ← Secao "A Solucao"
      Features.tsx                      ← Grid de 6 features
      HowItWorks.tsx                    ← 3 passos
      SocialProof.tsx                   ← Credibilidade (fundador + selo)
      FAQ.tsx                           ← Accordion de perguntas
      WaitlistCTA.tsx                   ← CTA final com formulario
    pages/
      AboutPageContent.tsx              ← Conteudo compartilhado Sobre/About
      ContactPageContent.tsx            ← Conteudo compartilhado Contato/Contact
      PrivacyPageContent.tsx            ← Conteudo compartilhado Privacidade/Privacy
    ui/
      Button.tsx                        ← primary, secondary, outline, ghost
      Input.tsx                         ← text, email, tel com validacao visual
      Select.tsx                        ← Dropdown estilizado
      Card.tsx                          ← Container com variantes
      Badge.tsx                         ← Selos e tags
      Accordion.tsx                     ← Expand/collapse para FAQ
      Section.tsx                       ← Wrapper de secao (padding, max-width, bg)
      Spinner.tsx                       ← Loading indicator
    forms/
      WaitlistForm.tsx                  ← Formulario 2 etapas
      ContactForm.tsx                   ← Formulario de contato
  i18n/
    config.ts                           ← Locales, defaultLocale, slug maps
    request.ts                          ← getRequestConfig para next-intl
    navigation.ts                       ← Mapeamento de rotas entre idiomas
  lib/
    formspree.ts                        ← Form IDs e configuracao
    analytics.ts                        ← GA4 helpers (futuro)
    language-detection.ts               ← Logica de deteccao de idioma
```

---

## 6. Secoes da Landing Page Principal

### 6.1 Layout Geral e Alternancia de Backgrounds

| Secao          | Background       | Por que                                        |
|----------------|------------------|------------------------------------------------|
| Navbar         | `surface` (#FFF) | Limpo, fixo no topo                            |
| Hero           | `primary` (#1F4E79) com gradiente → `primaryLight` | Impacto visual, headline em branco |
| O Problema     | `background` (#F7F8FA) | Separacao visual do hero                 |
| A Solucao      | `surface` (#FFF) | Destaque limpo                                 |
| Features       | `background` (#F7F8FA) | Contraste com secoes adjacentes          |
| Como Funciona  | `surface` (#FFF) | Alternancia                                    |
| Prova Social   | `primaryBackground` (#EEF2FF) | Destaque sutil, cor da marca       |
| FAQ            | `surface` (#FFF) | Legibilidade maxima para texto longo            |
| CTA Waitlist   | `primary` (#1F4E79) | Impacto visual, espelha o hero, fecha o ciclo  |
| Footer         | `primaryDark` (#163A5F) | Escuro, ancora visual                    |

### 6.2 Hero

| Elemento          | PT-BR                                                                  | EN                                                                   |
|-------------------|------------------------------------------------------------------------|----------------------------------------------------------------------|
| **Headline**      | Transforme seu condominio em uma comunidade conectada                   | Transform your building into a connected community                    |
| **Subtitulo**     | A plataforma que conecta sindicos, administradoras e moradores em uma experiencia moderna de gestao e convivencia | The platform that connects managers, administrators and residents in a modern management and living experience |
| **CTA primario**  | Entrar na lista de acesso antecipado                                   | Join the early access list                                            |
| **CTA secundario**| Saiba mais ↓                                                           | Learn more ↓                                                         |

**Layout**: Split 50/50 (desktop) — texto a esquerda, visual a direita. Stack (mobile) — texto em cima, visual embaixo.

**Comportamento**:
- CTA primario: scroll suave ate a secao `#waitlist` (WaitlistCTA)
- CTA secundario: scroll suave ate a proxima secao (`#problem`)
- Headline renderizada como `<h1>`, subtitulo como `<p>` com `text-on-primary`
- Visual: mockup do app ou ilustracao (placeholder ate asset final ser fornecido)

**Background**: Gradiente de `primary` (#1F4E79) para `primaryLight` (#2A679C), diagonal sutil.

### 6.3 O Problema

**Titulo**: "Gerenciar um condominio nao deveria ser tao dificil" / "Managing a building shouldn't be this hard"

| Dor (PT-BR)                                                | Dor (EN)                                                        | Icone (lucide) |
|------------------------------------------------------------|-----------------------------------------------------------------|----------------|
| Comunicados perdidos em grupos de WhatsApp                 | Announcements lost in WhatsApp groups                           | MessageSquareX |
| Votacoes por papel ou e-mail sem controle                  | Paper or email voting with no tracking                          | FileX          |
| Reservas de espaco por caderninho na portaria              | Space bookings on paper at the front desk                       | CalendarX      |
| Moradores que nao sabem o que acontece no condominio       | Residents who don't know what's happening in their building     | EyeOff         |

**Layout**: Grid 2x2 (desktop), stack (mobile). Cada item: icone 48px (cor `urgent`) + titulo em `textPrimary` + descricao curta em `textSecondary`.

### 6.4 A Solucao

**Titulo**: "Conheca a Linvo" / "Meet Linvo"

> PT-BR: "A Linvo e a plataforma que centraliza toda a gestao e comunicacao do seu condominio em um so lugar. Moderna, simples e feita para quem vive e administra comunidades residenciais."

> EN: "Linvo is the platform that centralizes all your building's management and communication in one place. Modern, simple, and built for those who live in and manage residential communities."

**Layout**: Texto a esquerda + imagem/screenshot do app a direita (desktop). Stack (mobile).

### 6.5 Features (6 com narrativa de valor)

| # | Titulo PT-BR              | Titulo EN                  | Descricao PT-BR                                                         | Descricao EN                                                                    | Icone (lucide)  |
|---|---------------------------|----------------------------|--------------------------------------------------------------------------|---------------------------------------------------------------------------------|-----------------|
| 1 | Comunicacao sem ruido     | Noise-free communication   | Comunicados, documentos e avisos organizados. Chega de informacao perdida em grupos de WhatsApp. | Organized announcements, documents, and notices. No more information lost in WhatsApp groups. | Megaphone       |
| 2 | Decisoes democraticas     | Democratic decisions       | Enquetes e votacoes digitais com resultados transparentes e rastreabilidade completa. | Digital polls and votes with transparent results and full traceability.          | Vote            |
| 3 | Espacos sem conflito      | Conflict-free spaces       | Reservas de areas comuns com regras claras, calendario visual e confirmacao automatica. | Common area bookings with clear rules, visual calendar, and automatic confirmation. | CalendarCheck   |
| 4 | Tudo registrado           | Everything on record       | Solicitacoes e ocorrencias com acompanhamento em tempo real. Nada se perde. | Requests and incidents with real-time tracking. Nothing gets lost.               | ClipboardList   |
| 5 | Servicos de confianca     | Trusted services           | Diretorio de prestadores avaliados pela comunidade. Encontre quem precisa com seguranca. | A directory of community-rated service providers. Find who you need with confidence. | ShieldCheck     |
| 6 | Financeiro transparente   | Transparent finances       | Boletos, prestacao de contas e extrato acessiveis a qualquer momento pelo celular. | Bills, financial reports, and statements accessible anytime from your phone.     | Wallet          |

**Layout**: Grid 3x2 (desktop), 2x3 (tablet), stack (mobile). Card com icone 40px (cor `accent`) + titulo H3 + 2 linhas descricao.

### 6.6 Como Funciona (3 passos pre-lancamento)

| Passo | Titulo PT-BR                          | Titulo EN                           | Descricao PT-BR                                              | Descricao EN                                                        |
|-------|---------------------------------------|--------------------------------------|---------------------------------------------------------------|---------------------------------------------------------------------|
| 1     | Entre na lista de acesso antecipado   | Join the early access list           | Preencha o formulario e garanta sua vaga entre os primeiros.  | Fill out the form and secure your spot among the first.             |
| 2     | Participe do programa piloto gratuito | Join the free pilot program          | Convidamos os primeiros inscritos para testar a plataforma sem custo. | We invite early subscribers to test the platform at no cost.        |
| 3     | Seja um dos primeiros a transformar   | Be one of the first to transform     | Leve a experiencia Linvo para o seu condominio antes de todo mundo. | Bring the Linvo experience to your building before everyone else.   |

**Layout**: Horizontal com numeracao circular (1, 2, 3) e linha conectora (desktop). Vertical (mobile).

**Nota visual abaixo** (texto em `textSecondary`, fonte Body small):
> PT-BR: "Quando a plataforma estiver pronta, o onboarding sera simples: cadastre-se, configure seu condominio e convide os moradores."
> EN: "When the platform is ready, onboarding will be simple: sign up, set up your building, and invite residents."

### 6.7 Prova Social / Credibilidade

**3 elementos em linha (desktop) / stack (mobile)**:

1. **Texto de convite** (sem contador numerico):
   - PT-BR: "Junte-se aos primeiros sindicos e administradoras"
   - EN: "Join the first building managers and administrators"
   - **Por que sem contador**: Formspree free nao expoe API de contagem. Um contador em zero ou com numero baixo reduz credibilidade. Quando houver volume relevante (50+), adicionar numero manualmente no codigo.

2. **Quem esta por tras**:
   - Foto do fundador (circular, 120px, borda `accent`)
   - Nome + cargo (ex: "Fundador & CEO")
   - Bio: 2-3 linhas sobre experiencia relevante
   - Link LinkedIn (icone + texto discreto)

3. **Selo**: Badge visual "Programa Piloto Aberto" / "Open Pilot Program"
   - Background: `primaryBackground` (#EEF2FF)
   - Icone: Rocket (lucide)
   - Texto: `primary` (#1F4E79)

### 6.8 FAQ (8 perguntas)

| # | Pergunta PT-BR                                          | Pergunta EN                                                     |
|---|--------------------------------------------------------|-----------------------------------------------------------------|
| 1 | O que e a Linvo?                                       | What is Linvo?                                                  |
| 2 | Para quem a Linvo e feita?                             | Who is Linvo for?                                               |
| 3 | Quanto vai custar?                                     | How much will it cost?                                          |
| 4 | Meus dados estao seguros?                              | Is my data secure?                                              |
| 5 | Funciona para condominios pequenos?                    | Does it work for small buildings?                               |
| 6 | O que acontece depois que eu entrar na waitlist?        | What happens after I join the waitlist?                         |
| 7 | Preciso trocar meu sistema atual?                      | Do I need to replace my current system?                         |
| 8 | Qual a diferenca para grupos de WhatsApp ou planilhas?  | How is it different from WhatsApp groups or spreadsheets?       |

**Componente**: Accordion com comportamento "single open" (abrir um fecha os demais). Animacao de altura suave (200ms ease). Icone ChevronDown rotaciona 180° ao expandir. Aria-expanded e role="region" para acessibilidade.

**Respostas**: Devem ser redigidas com 2-4 frases, linguagem direta, sem jargao tecnico. Conteudo completo a ser fornecido pelo fundador (item pendente).

### 6.9 CTA Final + Formulario Waitlist

**Titulo**: "Faca parte da transformacao" / "Be part of the transformation"
**Subtitulo**: "Entre na lista de acesso antecipado e seja um dos primeiros a conhecer a Linvo." / "Join the early access list and be one of the first to experience Linvo."

**Background**: `primary` (#1F4E79) — espelha o hero para fechar a narrativa visual.

#### Formulario em 2 Etapas

**Arquitetura de dados**: Etapa 1 e Etapa 2 sao **envios separados ao Formspree** (dois submits independentes). A Etapa 2 inclui o email da Etapa 1 como campo oculto para permitir deduplicacao/vinculacao por email na Google Sheets downstream.

**Etapa 1 (obrigatoria) — Form ID: WAITLIST_FORM_ID**

| Campo   | Tipo   | Placeholder PT-BR     | Placeholder EN       | Validacao                      |
|---------|--------|-----------------------|----------------------|--------------------------------|
| Nome    | text   | Seu nome completo     | Your full name       | Minimo 2 caracteres            |
| Email   | email  | seu@email.com         | your@email.com       | Formato email valido (regex)   |
| Perfil  | select | Selecione seu perfil  | Select your profile  | Selecao obrigatoria (!= "")   |

**Opcoes do select Perfil**:
- "" (placeholder, valor vazio)
- `sindico_profissional` → "Sindico(a) profissional" / "Professional building manager"
- `sindico_morador` → "Sindico(a) morador(a)" / "Resident building manager"
- `administradora` → "Administradora de condominios" / "Property management company"
- `outro` → "Outro" / "Other"

**Campos ocultos Etapa 1**:
```html
<input type="hidden" name="source" value="waitlist-homepage-{locale}" />
<input type="hidden" name="_subject" value="[Waitlist] Nova inscricao - linvo.one" />
<input type="hidden" name="step" value="1" />
```

**Botao**: "Garantir minha vaga" / "Secure my spot" (fundo `accentDark` #247C73 para WCAG AA, texto `textOnAccent`)

**Estados da Etapa 1**:
- **Idle**: Formulario visivel, campos vazios
- **Validating**: Validacao inline ao sair do campo (onBlur) — borda `urgent` + mensagem em `urgent` abaixo do campo
- **Submitting**: Botao desabilitado com spinner, texto muda para "Enviando..." / "Sending..."
- **Success**: Formulario da Etapa 1 colapsa com animacao, mensagem de sucesso aparece + Etapa 2 expande
- **Error**: Mensagem de erro em `urgentBackground` com texto `urgent` acima do formulario. Botao reabilitado.

**Etapa 2 (opcional, aparece apos sucesso da Etapa 1) — Form ID: WAITLIST_EXTRA_FORM_ID**

**Mensagem**: "Obrigado, {nome}! Quer nos ajudar a preparar a melhor experiencia para voce?" / "Thank you, {name}! Want to help us prepare the best experience for you?"

| Campo               | Tipo   | Placeholder PT-BR          | Placeholder EN          | Validacao          |
|---------------------|--------|----------------------------|-------------------------|--------------------|
| Telefone/WhatsApp   | tel    | (11) 99999-9999            | +55 11 99999-9999       | Opcional, sem mascara |
| Nome do condominio  | text   | Nome do seu condominio     | Your building's name    | Opcional           |
| Qtd de unidades     | select | Quantas unidades?          | How many units?         | Opcional           |

**Opcoes de quantidade**:
- "" (placeholder)
- `ate_30` → "Ate 30 unidades" / "Up to 30 units"
- `31_100` → "31 a 100 unidades" / "31 to 100 units"
- `101_300` → "101 a 300 unidades" / "101 to 300 units"
- `mais_300` → "Mais de 300 unidades" / "More than 300 units"

**Campos ocultos Etapa 2**:
```html
<input type="hidden" name="email" value="{email da etapa 1}" />
<input type="hidden" name="source" value="waitlist-extra-{locale}" />
<input type="hidden" name="step" value="2" />
```

**Botao**: "Enviar informacoes adicionais" / "Send additional info"
**Link abaixo do botao**: "Pular esta etapa →" / "Skip this step →" (fecha a Etapa 2, mostra apenas confirmacao final)

**Estado final (apos Etapa 2 ou skip)**:
- Icone CheckCircle (cor `success`) + mensagem: "Voce esta na lista! Entraremos em contato em breve." / "You're on the list! We'll be in touch soon."

---

## 7. Paginas Auxiliares

### 7.1 Sobre (`/pt/sobre/` | `/en/about/`)

| Secao                  | Conteudo                                                          |
|------------------------|-------------------------------------------------------------------|
| Hero simples           | Titulo "Sobre a Linvo" / "About Linvo" + subtitulo breve         |
| Historia               | Como surgiu a ideia da Linvo, motivacao do fundador               |
| Missao                 | Transformar a experiencia de viver em comunidade                  |
| Visao                  | Ser a plataforma referencia para comunidades residenciais no Brasil |
| Fundador               | Foto + bio completa + LinkedIn                                    |
| Valores                | 3-4 valores (transparencia, simplicidade, comunidade, inovacao)   |
| Logo Community Builder | Usar `logo-linvo-community-builder.png` como elemento visual      |
| CTA                    | Link para waitlist da landing page (`/pt/#waitlist`)              |

### 7.2 Contato (`/pt/contato/` | `/en/contact/`)

| Secao             | Conteudo                                                    |
|-------------------|-------------------------------------------------------------|
| Titulo            | "Fale conosco" / "Get in touch"                             |
| Formulario        | Nome + Email + Assunto (select) + Mensagem (textarea)       |
| Email direto      | contato@linvo.one (ou similar) — pendente definicao         |
| Redes sociais     | Links para Instagram, LinkedIn (quando disponiveis)          |

**Formulario de contato**: Form ID separado no Formspree. Campos ocultos: `source: contact-{locale}`, `_subject: [Contato] {assunto}`.

**Opcoes de Assunto**:
- "Quero saber mais sobre a Linvo" / "I want to learn more about Linvo"
- "Interesse em parceria" / "Partnership interest"
- "Imprensa" / "Press"
- "Outro" / "Other"

**Validacao**: Nome (min 2 chars), Email (formato valido), Assunto (obrigatorio), Mensagem (min 10 chars).
**Estados**: Mesmos da Etapa 1 do waitlist (idle, validating, submitting, success, error).

### 7.3 Privacidade & Termos (`/pt/privacidade/` | `/en/privacy/`)

Pagina unica combinada com navegacao por anchor links no topo:

| Secao                     | Conteudo                                                   |
|---------------------------|------------------------------------------------------------|
| Sumario navegavel         | Links para cada secao abaixo                                |
| Politica de Privacidade   | Dados coletados (nome, email, perfil, telefone opcional), finalidade (comunicacao sobre o produto, convite para piloto), armazenamento (Formspree + Google Sheets), retencao (enquanto relevante ou ate solicitacao de exclusao) |
| Conformidade LGPD         | Base legal (consentimento via formulario), direitos do titular (acesso, correcao, exclusao, portabilidade), canal de contato para exercicio de direitos |
| Cookies                   | Cookies essenciais (localStorage para idioma), cookies analiticos (GA4, apenas com consentimento) |
| Termos de Uso             | Uso do site, propriedade intelectual, limitacao de responsabilidade |
| Ultima atualizacao        | Data da ultima revisao do documento                        |

### 7.4 Pagina 404

**Rota**: `app/not-found.tsx` → gera `404.html`

**Contexto de layout**: Renderiza dentro do root layout (`app/layout.tsx`), **fora** do `[locale]/layout.tsx`. Portanto, NAO tem navbar, footer, nem provider de traducao. E uma pagina standalone com estilo proprio.

**Conteudo**:
- Logo Linvo centralizado (usar `<img>` direto, sem componente)
- Titulo: "Pagina nao encontrada" / "Page not found" (detectar via `window.location.pathname` se contem `/en/`)
- Texto: "A pagina que voce procura nao existe ou foi movida." / "The page you're looking for doesn't exist or has been moved."
- CTA: "Voltar para o inicio" / "Back to home" → link para `/pt/` ou `/en/` (detectar via pathname)
- Language toggle simples (bandeiras) para trocar entre versoes da 404
- Background: `background` (#F7F8FA)
- Implementar como client component (`'use client'`) para poder detectar pathname

---

## 8. Componentes — Especificacoes de Comportamento

### 8.1 Navbar

| Estado   | Comportamento                                                    |
|----------|------------------------------------------------------------------|
| Desktop  | Logo (esquerda) + links de secao (centro) + lang toggle + CTA (direita) |
| Mobile   | Logo (esquerda) + hamburger (direita). Toque abre MobileMenu     |
| Scroll   | Fixed no topo, `z-50`. Background `surface` com `shadow-sm` apos scroll > 20px |
| Ativo    | Link da secao visivel no viewport recebe cor `tabActive` (scroll spy) |

**Links de secao** (landing page apenas, nas paginas auxiliares mostra links para paginas):
- Funcionalidades → scroll `#features`
- Como funciona → scroll `#how-it-works`
- FAQ → scroll `#faq`
- Sobre → link `/pt/sobre/` ou `/en/about/`
- Contato → link `/pt/contato/` ou `/en/contact/`

**Scroll suave**: `scroll-behavior: smooth` no CSS + offset de -80px (altura da navbar) via `scroll-margin-top` nos IDs de secao.

### 8.2 MobileMenu (drawer)

- Abre da direita com animacao slide (300ms ease)
- Overlay escuro (50% opacity) fecha ao clicar
- Links empilhados verticalmente, fonte maior (18px)
- Language toggle com bandeira + nome do idioma
- CTA "Waitlist" como botao full-width no final
- Fecha automaticamente ao clicar em qualquer link

### 8.3 Footer

| Coluna 1 (esquerda) | Coluna 2 (centro)     | Coluna 3 (direita)           |
|---------------------|-----------------------|------------------------------|
| Logo Linvo          | Sobre                 | Language toggle (bandeira)   |
| Tagline curta       | Contato               | Redes sociais (icones)       |
|                     | Privacidade & Termos  |                              |

**Linha inferior**: "© 2026 Linvo. Todos os direitos reservados." / "© 2026 Linvo. All rights reserved."
**Background**: `primaryDark` (#163A5F). Texto: `textOnPrimary` com opacidade reduzida para links.

### 8.4 CookieConsent (Banner LGPD)

**Quando aparece**: Na primeira visita, se nao houver `localStorage['linvo-cookies']`.

**Posicao**: Fixed bottom, full-width, `z-40` (abaixo da Navbar que e `z-50`).

**Conteudo**:
- PT-BR: "Usamos cookies para melhorar sua experiencia. Ao continuar, voce concorda com nossa [Politica de Privacidade](/pt/privacidade/)."
- EN: "We use cookies to improve your experience. By continuing, you agree to our [Privacy Policy](/en/privacy/)."

**Botoes**:
- "Aceitar" / "Accept" → salva `localStorage['linvo-cookies'] = 'accepted'`, ativa GA4 (quando configurado)
- "Rejeitar" / "Decline" → salva `localStorage['linvo-cookies'] = 'declined'`, nao ativa GA4

**Comportamento**: Desaparece apos clique em qualquer botao. Nao bloqueia navegacao.

### 8.5 UI Components — Estados

| Componente  | Estados                                                |
|------------|--------------------------------------------------------|
| `Button`   | default, hover, active, disabled, loading (com spinner) |
| `Input`    | default, focus (borda `accent` — OK para bordas decorativas, WCAG aplica a texto-sobre-fundo), error (borda `urgent` + mensagem), disabled |
| `Select`   | default, focus, error, disabled                         |
| `Accordion`| collapsed (ChevronDown), expanded (ChevronUp, conteudo visivel) |
| `Card`     | default, hover (sombra elevada para features interativos) |

---

## 9. SEO e Meta Tags

### 9.1 Meta Tags por Pagina

Cada pagina exporta `generateMetadata` com conteudo localizado:

```tsx
// Exemplo: Landing page (Next.js 15 — params e Promise)
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'metadata' });

  return {
    title: t('home.title'),           // 'Linvo — Transforme seu condominio...'
    description: t('home.description'),
    keywords: t('home.keywords'),
    openGraph: {
      title: t('home.og_title'),
      description: t('home.og_description'),
      url: `https://linvo.one/${locale}/`,
      siteName: 'Linvo',
      images: [{ url: `/images/og-image-${locale}.png`, width: 1200, height: 630 }],
      locale: locale === 'pt' ? 'pt_BR' : 'en_US',
      type: 'website',
    },
    twitter: {
      card: 'summary_large_image',
      title: t('home.og_title'),
      description: t('home.og_description'),
    },
    alternates: {
      canonical: `https://linvo.one/${locale}/`,
      languages: {
        'pt-BR': 'https://linvo.one/pt/',
        'en': 'https://linvo.one/en/',
      },
    },
  };
}
```

### 9.2 Sitemap

Gerar manualmente ou via script de build (next-sitemap requer adaptacao para static export). Formato:

```xml
<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
  <url>
    <loc>https://linvo.one/pt/</loc>
    <lastmod>2026-03-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://linvo.one/pt/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://linvo.one/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://linvo.one/pt/"/>
  </url>
  <url>
    <loc>https://linvo.one/en/</loc>
    <lastmod>2026-03-18</lastmod>
    <changefreq>weekly</changefreq>
    <priority>1.0</priority>
    <xhtml:link rel="alternate" hreflang="pt-BR" href="https://linvo.one/pt/"/>
    <xhtml:link rel="alternate" hreflang="en" href="https://linvo.one/en/"/>
    <xhtml:link rel="alternate" hreflang="x-default" href="https://linvo.one/pt/"/>
  </url>
  <!-- Repetir para cada par: sobre/about, contato/contact, privacidade/privacy -->
</urlset>
```

### 9.3 robots.txt

```
User-agent: *
Allow: /

Sitemap: https://linvo.one/sitemap.xml
```

---

## 10. Performance e Acessibilidade

| Aspecto              | Meta                                                |
|----------------------|-----------------------------------------------------|
| Lighthouse Score     | 90+ em todas as 4 categorias                        |
| Core Web Vitals      | LCP < 2.5s, INP < 200ms, CLS < 0.1                 |
| Imagens              | WebP com fallback PNG, lazy loading (`loading="lazy"`) abaixo do fold |
| Fontes               | `next/font` para Manrope e Inter (self-hosted, elimina CLS de font swap) |
| Acessibilidade       | WCAG 2.1 AA — contraste minimo 4.5:1, alt texts, keyboard nav, aria labels, focus visible |
| Mobile-first         | Design responsivo, breakpoints: `sm` 640px, `md` 768px, `lg` 1024px, `xl` 1280px |
| Bundle size          | Code splitting automatico por pagina (Next.js), tree-shaking de lucide-react |

**Contraste validado** (tokens.json):
| Combinacao                          | Ratio  | WCAG AA |
|-------------------------------------|--------|---------|
| textPrimary (#1A1D21) em surface (#FFF) | 16.4:1 | Pass    |
| textOnPrimary (#FFF) em primary (#1F4E79) | 8.1:1  | Pass    |
| textOnAccent (#FFF) em accent (#2A9D8F) | 3.9:1  | **Fail (large text only)** |

**Acao**: Usar `accentDark` (#247C73) como background de botoes CTA em vez de `accent` para garantir contraste 4.5:1+ com texto branco. Ratio: 5.1:1 (Pass).

---

## 11. Deploy e CI/CD

### 11.1 GitHub Pages + GitHub Actions

```yaml
# .github/workflows/deploy.yml
name: Deploy to GitHub Pages

on:
  push:
    branches: [main]

permissions:
  contents: read
  pages: write
  id-token: write

concurrency:
  group: "pages"
  cancel-in-progress: false

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4

      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - run: npm ci

      - run: npm run build
      # .nojekyll ja esta em public/ e e copiado para out/ pelo build

      - uses: actions/upload-pages-artifact@v3
        with:
          path: ./out

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 11.2 Dominio Customizado

- Arquivo `public/CNAME` com conteudo: `linvo.one`
- Arquivo `public/.nojekyll` (vazio) — **essencial**: sem ele, GitHub Pages ignora `_next/`
- Configurar DNS: CNAME record `linvo.one` → `{username}.github.io`
- Ou: 4 A records apontando para IPs do GitHub Pages
- HTTPS: Automatico via GitHub Pages (Let's Encrypt)
- Ativar "Enforce HTTPS" nas configuracoes do repositorio

### 11.3 Scripts npm

```json
{
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "eslint src/",
    "lint:fix": "eslint src/ --fix",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "type-check": "tsc --noEmit",
    "generate-sitemap": "node scripts/generate-sitemap.mjs"
  }
}
```

---

## 12. Estrutura de Arquivos Completa

```
linvo-site/
├── .github/
│   └── workflows/
│       └── deploy.yml                    ← CI/CD GitHub Pages (completo)
├── assets/
│   ├── brand/
│   │   ├── logo-linvo.png               ← Logo fonte (508KB)
│   │   ├── logo-icon.png                ← Icone fonte (260KB)
│   │   ├── logo-app-icon.png            ← App icon fonte (226KB)
│   │   └── logo-linvo-community-builder.png ← Community builder fonte (662KB)
│   └── tokens.json                       ← Design tokens de referencia
├── messages/
│   ├── pt-BR.json                        ← Todas as strings PT-BR
│   └── en.json                           ← Todas as strings EN
├── public/
│   ├── CNAME                             ← linvo.one
│   ├── .nojekyll                         ← Desabilita Jekyll no GitHub Pages
│   ├── robots.txt                        ← Crawling rules
│   ├── sitemap.xml                       ← Sitemap com hreflang
│   ├── favicon.ico                       ← 32x32 (gerado de logo-icon)
│   ├── icon-192.png                      ← PWA icon
│   ├── icon-512.png                      ← PWA icon
│   ├── apple-touch-icon.png              ← iOS icon (180x180)
│   └── images/
│       ├── logo-linvo.webp               ← Logo otimizado
│       ├── logo-icon.webp                ← Icone otimizado
│       ├── logo-community-builder.webp   ← CB logo otimizado
│       ├── og-image-pt.png               ← Open Graph PT (1200x630)
│       └── og-image-en.png               ← Open Graph EN (1200x630)
├── scripts/
│   └── generate-sitemap.mjs              ← Gerador de sitemap
├── src/
│   ├── app/
│   │   ├── layout.tsx                    ← Root layout (html, fonts, analytics)
│   │   ├── page.tsx                      ← Redirect page (deteccao idioma)
│   │   ├── not-found.tsx                 ← Pagina 404
│   │   ├── globals.css                   ← Tailwind + @theme (tokens)
│   │   └── [locale]/
│   │       ├── layout.tsx                ← Locale layout (navbar, footer, setRequestLocale)
│   │       ├── page.tsx                  ← Landing page
│   │       ├── sobre/page.tsx            ← Sobre (PT only)
│   │       ├── about/page.tsx            ← About (EN only)
│   │       ├── contato/page.tsx          ← Contato (PT only)
│   │       ├── contact/page.tsx          ← Contact (EN only)
│   │       ├── privacidade/page.tsx      ← Privacidade (PT only)
│   │       └── privacy/page.tsx          ← Privacy (EN only)
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── MobileMenu.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── LanguageSwitcher.tsx
│   │   │   ├── CookieConsent.tsx
│   │   │   └── SetHtmlLang.tsx              ← Client component: atualiza html lang
│   │   ├── sections/
│   │   │   ├── Hero.tsx
│   │   │   ├── Problem.tsx
│   │   │   ├── Solution.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── SocialProof.tsx
│   │   │   ├── FAQ.tsx
│   │   │   └── WaitlistCTA.tsx
│   │   ├── pages/
│   │   │   ├── AboutPageContent.tsx
│   │   │   ├── ContactPageContent.tsx
│   │   │   └── PrivacyPageContent.tsx
│   │   ├── ui/
│   │   │   ├── Button.tsx
│   │   │   ├── Input.tsx
│   │   │   ├── Select.tsx
│   │   │   ├── Card.tsx
│   │   │   ├── Badge.tsx
│   │   │   ├── Accordion.tsx
│   │   │   ├── Section.tsx
│   │   │   └── Spinner.tsx
│   │   └── forms/
│   │       ├── WaitlistForm.tsx
│   │       └── ContactForm.tsx
│   ├── i18n/
│   │   ├── config.ts                     ← Locales, slugs, defaultLocale
│   │   ├── request.ts                    ← getRequestConfig
│   │   └── navigation.ts                ← Route mapping entre idiomas
│   └── lib/
│       ├── formspree.ts                  ← Form IDs
│       ├── analytics.ts                  ← GA4 helpers (condicional ao consent)
│       └── language-detection.ts         ← Logica de deteccao de idioma
├── eslint.config.mjs                     ← ESLint 9 flat config
├── .prettierrc                           ← Prettier config
├── next.config.ts                        ← Next.js config (export + next-intl)
├── package.json
├── tsconfig.json
└── PLANO_SITE_LINVO.md
```

---

## 13. Fases de Implementacao

### Fase 1 — Setup e Infraestrutura

- [ ] Inicializar projeto Next.js 15 + TypeScript (`npx create-next-app@latest`)
- [ ] Configurar `next.config.ts` (`output: 'export'`, `trailingSlash: true`)
- [ ] Instalar e configurar Tailwind CSS 4 (CSS-first com `@theme` e tokens)
- [ ] Instalar e configurar next-intl (sem middleware)
  - [ ] Criar `src/i18n/config.ts` com locales e slug maps
  - [ ] Criar `src/i18n/request.ts` com getRequestConfig
  - [ ] Criar `app/[locale]/layout.tsx` com `generateStaticParams` e `setRequestLocale`
- [ ] Criar pagina root `app/page.tsx` com deteccao de idioma client-side
- [ ] Configurar fontes Manrope + Inter via `next/font`
- [ ] Criar arquivos de traducao base (`messages/pt-BR.json` e `messages/en.json`)
- [ ] Configurar ESLint 9 (flat config `eslint.config.mjs`) + Prettier
- [ ] Criar `public/CNAME` (`linvo.one`) e `public/.nojekyll`
- [ ] Configurar GitHub Actions workflow completo (`deploy.yml`)
- [ ] Criar `public/robots.txt`
- [ ] Validar: `npm run build` gera `/out` com estrutura correta de pastas

### Fase 2 — Layout e Componentes Base

- [ ] Criar componentes UI: Button (4 variantes), Input (com validacao), Select, Card, Badge, Accordion, Section, Spinner
- [ ] Criar Navbar (desktop: logo + links + lang toggle + CTA)
- [ ] Criar MobileMenu (hamburger + drawer slide)
- [ ] Criar Footer (3 colunas + copyright)
- [ ] Criar `src/i18n/navigation.ts` com mapeamento completo de rotas entre idiomas
- [ ] Criar LanguageSwitcher (bandeira + localStorage + route mapping via `navigation.ts`)
- [ ] Criar SetHtmlLang client component (atualiza `<html lang>` por locale)
- [ ] Criar CookieConsent banner (LGPD)
- [ ] Implementar scroll suave com offset de navbar (`scroll-margin-top: 80px`)
- [ ] Implementar scroll spy para highlight de nav link ativo
- [ ] Testar responsividade em 4 breakpoints (sm, md, lg, xl)
- [ ] Validar: navegacao entre paginas PT e EN funciona, toggle de idioma persiste

### Fase 3 — Landing Page (secoes)

- [ ] Hero (headline, subtitulo, 2 CTAs, gradiente, visual placeholder)
- [ ] O Problema (grid 2x2 de dores com icones)
- [ ] A Solucao (texto + visual split)
- [ ] Features (grid 3x2 com 6 cards de valor narrativo)
- [ ] Como Funciona (3 passos com numeracao + nota visual)
- [ ] Prova Social (texto convite + fundador placeholder + selo piloto)
- [ ] FAQ (accordion single-open com 8 perguntas, respostas placeholder)
- [ ] CTA Final + Formulario Waitlist (2 etapas via @formspree/react)
  - [ ] Etapa 1: validacao inline, submit, estados (idle/loading/success/error)
  - [ ] Etapa 2: campos opcionais, email hidden, skip link, estado final
- [ ] Validar: landing page completa em ambos idiomas, formulario submete ao Formspree

### Fase 4 — Paginas Auxiliares

- [ ] Criar componentes de pagina compartilhados (AboutPageContent, ContactPageContent, PrivacyPageContent)
- [ ] Criar page files com generateStaticParams por locale (sobre→pt, about→en, etc.)
- [ ] Pagina Sobre (historia, missao, visao, fundador, valores)
- [ ] Pagina Contato (formulario Formspree + email + redes)
- [ ] Pagina Privacidade & Termos (LGPD, cookies, termos — navegacao por anchor)
- [ ] Pagina 404 (app/not-found.tsx → 404.html)
- [ ] Validar: todas as paginas acessiveis em ambos idiomas, links cruzados funcionam

### Fase 5 — SEO, Performance e Polimento

- [ ] Implementar `generateMetadata` com conteudo localizado em todas as paginas
- [ ] Gerar OG images (1200x630) para PT e EN
- [ ] Gerar favicon.ico + apple-touch-icon + icons PWA a partir de logo-icon.png
- [ ] Otimizar imagens: converter PNGs para WebP, aplicar lazy loading
- [ ] Criar/gerar sitemap.xml com hreflang `xhtml:link`
- [ ] Testar Lighthouse (meta: 90+ em Performance, Accessibility, Best Practices, SEO)
- [ ] Corrigir contraste: usar `accentDark` em botoes CTA (ratio 5.1:1 vs 3.9:1 do accent)
- [ ] Testar acessibilidade: keyboard nav, screen reader, focus visible, aria labels
- [ ] Testar i18n: deteccao automatica, toggle, hreflang no HTML, localStorage
- [ ] Testar formularios: submit em ambos idiomas, campos ocultos, estados de erro
- [ ] Revisao completa de textos PT-BR e EN
- [ ] Validar: build limpo sem warnings, output correto em /out

### Fase 6 — Go Live

- [ ] Deploy final via push para branch main
- [ ] Verificar HTTPS ativo e dominio customizado respondendo
- [ ] Verificar `.nojekyll` ativo (assets `_next/` carregando)
- [ ] Submeter sitemap ao Google Search Console
- [ ] Testar em dispositivos reais: iPhone, Android, desktop Chrome/Firefox/Safari
- [ ] Testar redirect root em device real (verificar flash minimo)
- [ ] Testar formulario Formspree em producao (dominio restrito a linvo.one)
- [ ] Monitorar primeiras submissoes da waitlist

---

## 14. Decisoes Tecnicas Pendentes

| Decisao                              | Status      | Bloqueante | Notas                                              |
|--------------------------------------|-------------|------------|-----------------------------------------------------|
| Form ID do Formspree (waitlist)       | A criar     | Fase 3     | Criar form no projeto LINVO via CLI                 |
| Form ID do Formspree (waitlist extra) | A criar     | Fase 3     | Segundo form para Etapa 2 (vinculo por email)       |
| Form ID do Formspree (contato)        | A criar     | Fase 4     | Terceiro form para pagina de contato                |
| Google Analytics 4 ID                 | A definir   | Nao        | Criar propriedade GA4 — condicionado ao cookie consent |
| Conteudo bio do fundador              | A fornecer  | Fase 3     | Texto + foto para secao de credibilidade            |
| Respostas do FAQ                      | A redigir   | Fase 3     | 8 respostas em PT-BR e EN (2-4 frases cada)        |
| Mockups/screenshots do app            | A definir   | Fase 3     | Para hero e secao de solucao (usar placeholder ate definir) |
| Redes sociais da Linvo                | A definir   | Nao        | Instagram, LinkedIn (esconder links ate existirem)  |
| Email de contato oficial              | A definir   | Fase 4     | contato@linvo.one ou hello@linvo.one                |

---

## 15. Plano de Tracking de Analytics (futuro)

Quando GA4 estiver configurado, rastrear:

| Evento                          | Trigger                              | Parametros                    |
|---------------------------------|--------------------------------------|-------------------------------|
| `page_view`                     | Navegacao entre paginas              | `locale`, `page_path`          |
| `waitlist_step1_submit`         | Sucesso da Etapa 1                   | `locale`, `profile`            |
| `waitlist_step2_submit`         | Sucesso da Etapa 2                   | `locale`, `units`              |
| `waitlist_step2_skip`           | Clique em "Pular esta etapa"         | `locale`                       |
| `contact_form_submit`           | Sucesso do formulario de contato     | `locale`, `subject`            |
| `language_switch`               | Clique no toggle de idioma           | `from`, `to`                   |
| `cta_click`                     | Clique em CTA do hero                | `locale`, `cta_type`           |
| `faq_expand`                    | Abertura de pergunta do FAQ          | `locale`, `question_index`     |
| `scroll_depth`                  | 25%, 50%, 75%, 100%                  | `locale`, `depth`              |

**Condicao**: Todos os eventos so disparam se `localStorage['linvo-cookies'] === 'accepted'`.

---

## 16. Estrutura dos Arquivos de Traducao

```jsonc
// messages/pt-BR.json (estrutura)
{
  "metadata": {
    "home": {
      "title": "Linvo — Transforme seu condominio em uma comunidade conectada",
      "description": "Plataforma moderna para gestao de condominios...",
      "keywords": "gestao de condominio, app para condominio, sindico...",
      "og_title": "Linvo — Comunidade conectada",
      "og_description": "A plataforma que transforma a gestao do seu condominio."
    },
    "about": { "title": "...", "description": "..." },
    "contact": { "title": "...", "description": "..." },
    "privacy": { "title": "...", "description": "..." }
  },
  "nav": {
    "features": "Funcionalidades",
    "how_it_works": "Como funciona",
    "faq": "FAQ",
    "about": "Sobre",
    "contact": "Contato",
    "waitlist_cta": "Entrar na lista"
  },
  "hero": {
    "headline": "Transforme seu condominio em uma comunidade conectada",
    "subtitle": "A plataforma que conecta sindicos, administradoras e moradores...",
    "cta_primary": "Entrar na lista de acesso antecipado",
    "cta_secondary": "Saiba mais"
  },
  "problem": {
    "title": "Gerenciar um condominio nao deveria ser tao dificil",
    "items": [
      { "title": "Comunicados perdidos", "description": "...em grupos de WhatsApp" },
      { "title": "Votacoes sem controle", "description": "...por papel ou e-mail" },
      { "title": "Reservas no caderninho", "description": "...na portaria" },
      { "title": "Moradores desinformados", "description": "...nao sabem o que acontece" }
    ]
  },
  "solution": { "title": "...", "description": "..." },
  "features": {
    "title": "...",
    "items": [
      { "title": "Comunicacao sem ruido", "description": "..." },
      "..."
    ]
  },
  "how_it_works": { "title": "...", "steps": ["..."], "note": "..." },
  "social_proof": { "invite_text": "...", "founder": { "name": "...", "role": "...", "bio": "..." }, "badge": "..." },
  "faq": {
    "title": "...",
    "items": [
      { "question": "O que e a Linvo?", "answer": "..." },
      "..."
    ]
  },
  "waitlist": {
    "title": "...", "subtitle": "...",
    "step1": { "name_placeholder": "...", "email_placeholder": "...", "profile_placeholder": "...", "submit": "...", "submitting": "..." },
    "step2": { "thank_you": "...", "phone_placeholder": "...", "building_placeholder": "...", "units_placeholder": "...", "submit": "...", "skip": "..." },
    "success": "...",
    "errors": { "required": "...", "email_invalid": "...", "name_too_short": "...", "submit_failed": "..." },
    "profiles": { "sindico_profissional": "...", "sindico_morador": "...", "administradora": "...", "outro": "..." },
    "units": { "ate_30": "...", "31_100": "...", "101_300": "...", "mais_300": "..." }
  },
  "footer": { "copyright": "...", "tagline": "..." },
  "cookie_consent": { "message": "...", "accept": "...", "decline": "..." },
  "not_found": { "title": "...", "message": "...", "cta": "..." }
}
```

---

## 17. Referencias

| Recurso                              | Localizacao                                        |
|---------------------------------------|----------------------------------------------------|
| Design tokens                        | `assets/tokens.json`                                |
| Logos e imagens da marca              | `assets/brand/`                                     |
| Implementacao i18n de referencia      | `D:\Projects\azebratech-website` (padrao de deteccao/redirect) |
| Projeto Formspree                     | Project ID: 2960331414546939869, dominio: linvo.one  |
| Projeto backend (referencia features) | `D:\Projects\backup_condohub`                       |
| next-intl static export docs          | https://next-intl.dev/docs/getting-started/app-router |
| GitHub Pages deploy                   | https://pages.github.com/                           |

---

## Apendice A — Registro de Decisoes

| #  | Decisao                                     | Alternativa descartada                 | Por que                                             |
|----|---------------------------------------------|----------------------------------------|-----------------------------------------------------|
| D1 | Subpath routing (/pt/, /en/) com redirect no root | PT no root sem prefixo              | `[locale]` do next-intl exige subpaths; root sem prefixo quebraria integracao e duplicaria logica |
| D2 | Client-side language detection (JS)         | Server-side middleware                  | `output: 'export'` desabilita middleware; GitHub Pages e 100% estatico |
| D3 | Slugs localizados (sobre/about)             | Slugs unicos em ingles                  | Melhor SEO em PT-BR, padrao consistente com azebratech, esforco minimo via generateStaticParams por pagina |
| D4 | Tailwind CSS 4 via @theme (CSS-first)       | tailwind.config.ts (v3 pattern)         | v4 depreca config JS; CSS-first e o padrao oficial |
| D5 | ESLint 9 flat config                        | .eslintrc.json (legacy)                 | Formato legacy deprecated no ESLint 9, sera removido no v10 |
| D6 | Formspree 2 forms (step1 + step2)           | Form unico com todos os campos          | Garante captura do lead na etapa 1; etapa 2 opcional nao bloqueia conversao |
| D7 | Sem contador numerico de waitlist            | Contador em tempo real                  | Formspree free nao tem API de contagem; numero baixo reduz credibilidade |
| D8 | accentDark nos botoes CTA                   | accent puro                             | accent (#2A9D8F) com texto branco = ratio 3.9:1 (WCAG fail); accentDark = 5.1:1 (pass) |
| D9 | Sitemap manual/script                       | next-sitemap package                    | next-sitemap requer adaptacao para static export + hreflang customizado |
| D10| INP como metrica (nao FID)                  | FID                                     | Google substituiu FID por INP em marco 2024 |
| D11| `@theme inline` para fonts + `@theme` para cores | Tudo em `@theme` unico               | next/font injeta CSS vars no runtime; `@theme inline` diz ao Tailwind que os valores vem do DOM, evitando conflito de resolucao |
| D12| `requestLocale` no getRequestConfig          | `locale` (API antiga)                   | next-intl 3.22+ usa `requestLocale` (Promise) para compatibilidade com Next.js 15 async params |
| D13| `await params` em pages/layouts              | Destructuring direto `{ locale }`        | Next.js 15 breaking change: params e searchParams sao Promises; acesso sincrono causa erro |
| D14| `SetHtmlLang` client component               | html lang no root layout somente         | Root layout nao tem acesso ao `[locale]` param; componente client atualiza lang no DOM apos hydration |
| D15| `NextIntlClientProvider` no locale layout     | Provider implicito                       | Static export requer provider explicito com `locale` e `messages` passados como props |
| D16| `generateMetadata` + `getAlternates` em cada page file | Metadata so no layout ou so na landing | Paginas auxiliares com slugs localizados precisam de hreflang corretos (sobre↔about); sem metadata proprio, herdam do layout e perdem SEO |
