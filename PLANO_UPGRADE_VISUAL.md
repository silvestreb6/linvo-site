# Plano de Upgrade Visual — linvo.one (v2)

> Data: 2026-03-18
> Reescrito do zero com base em analise detalhada de concorrentes.

---

## 1. Analise Competitiva Detalhada

### TownSq — "O maior aplicativo para condominio do mundo"
- **Hero**: Split 50/50 (texto esquerda + mockup app direita). Gradiente diagonal verde→branco. Headline em uppercase bold 2.8em. Dois CTAs (verde primario + cinza escuro secundario).
- **Prova social**: Numeros animados (20 mil condominios, 4 paises), carousel de depoimentos com fotos, grid de logos de midia (Veja, Yahoo, AWS).
- **Features**: Grid de 3 colunas com icones de 80px centrados + descricoes. Secoes alternadas com gradientes e imagens lado a lado.
- **Espacamento**: Muito generoso (50-100px entre secoes). Visual "airy/luxury".
- **Ponto forte**: Gradientes diagonais como assinatura visual. Profundidade com sombras longas.
- **Fraqueza**: Headline uppercase pode parecer agressivo. Verde neon pode cansar.

### Superlogica — Plataforma financeira para condominios
- **Tom**: Corporativo B2B serio. Azul (#1034F2) + amarelo destaque.
- **CTAs**: 3 estilos (azul solido, amarelo, transparente com borda). Efeito ripple ao clique.
- **Layout**: Grid responsivo em 5+ breakpoints. Secao "Por que escolher" com imagem lado a lado.
- **Ponto forte**: Sistema de design robusto, animacoes sofisticadas.
- **Fraqueza**: Muito corporativo e distante. Fala para gestoras grandes, nao para sindicos individuais.

### uCondo — "O sistema que trabalha por voce"
- **Hero**: Split com foto real de pessoa usando a plataforma + "700 mil clientes" como subtexto. Dois CTAs: "Conheca o sistema" + "Demonstracao".
- **Segmentacao por persona**: 3 cards dedicados — Sindico, Administradora, Morador — cada um com beneficios especificos e CTAs contextualizados.
- **Prova social**: 3 depoimentos com foto real + nome + empresa + cidade. Metrica de 700 mil usuarios.
- **Features**: 7 secoes horizontais com headline + paragrafo + bullets + "Explore a solucao →".
- **Conversao**: WhatsApp flutuante, botoes App Store/Google Play, formulario no footer, 10+ CTAs na pagina.
- **Ponto forte**: Tom pratico, linguagem de beneficio, multiplos pontos de conversao.
- **Fraqueza**: Sem screenshots do produto. Design funcional mas nao memoravel.

---

## 2. Posicionamento Visual da Linvo

### O que aprender de cada um

| Concorrente   | Copiar                                          | Evitar                              |
|---------------|------------------------------------------------|-------------------------------------|
| **TownSq**    | Mockup do app no hero, espacamento generoso, numeros de prova social | Uppercase agressivo, verde neon     |
| **Superlogica**| Profissionalismo no design system, animacoes sutis | Tom corporativo frio, complexidade  |
| **uCondo**    | Linguagem de beneficio, persona cards, foto real nos depoimentos, WhatsApp | Ausencia de screenshots, design generico |

### Tom Visual da Linvo

```
Confiavel + Acolhedor + Moderno (sem ser tech)

Escala de posicionamento:
Superlogica ←— [corporativo frio] ——— Linvo ——— [pratico/humano] —→ uCondo
                                         ↑
                                    TownSq [moderno]
```

**Linvo ocupa o centro**: mais moderna que uCondo, mais humana que Superlogica, com a sofisticacao visual do TownSq mas sem o peso.

### Principios visuais

1. **Confianca sem frieza** — azul inspira seguranca; teal adiciona calor humano
2. **Beneficio acima de feature** — cada secao comunica o que resolve, nao o que faz
3. **Mockup do produto** — mostrar o app (mesmo que simulado) como TownSq faz
4. **Pessoas reais quando possivel** — foto do fundador, futuros depoimentos com foto
5. **Espacamento generoso** — 60-100px entre secoes, cards com padding amplo
6. **Multiplos pontos de conversao** — CTA no hero, no meio, no final (como uCondo)
7. **Segmentacao por persona** — falar separadamente com sindico e administradora

---

## 3. Mudancas Detalhadas por Componente

### 3.1 Navbar

**Estado atual**: Texto "Linvo" em bold, fundo branco solido, CTA retangular.

**Upgrade**:
- Substituir texto por logo real (`logo-linvo.webp`, altura ~32px)
- Scroll: `bg-surface` → ao scrollar, adicionar `shadow-sm backdrop-blur-sm bg-surface/95`
- CTA do navbar: `rounded-full` (pill shape) como uCondo e TownSq
- Mobile: manter hamburger, melhorar drawer com logo no topo

### 3.2 Hero

**Estado atual**: Texto alinhado esquerda sem visual, gradiente simples, padding moderado.

**Upgrade** (inspirado em TownSq + uCondo):
- **Layout**: `grid md:grid-cols-2 gap-12 items-center` — texto esquerda, visual direita
- **Visual direita**: componente `PhoneMockup` simulando tela do app com cards de comunicados, votacoes, reservas (mostra o que o produto faz sem ser abstrato)
- **Badge acima do headline**: "Programa Piloto Aberto" em `bg-white/15 rounded-full px-4 py-1.5 text-sm text-white/90` — cria senso de exclusividade (como uCondo com "700 mil clientes")
- **CTA primario**: adicionar seta `→` apos o texto, `rounded-full` em vez de `rounded-lg`
- **Padding**: aumentar para `py-24 md:py-36` — mais espaco como TownSq
- **Decoracao**: 1-2 circulos semitransparentes (`bg-white/5`) nos cantos para quebrar o flat

### 3.3 Secao Problema

**Estado atual**: Grid 2x2 com icones SVG vermelhos + texto.

**Upgrade**:
- Cada dor dentro de card: `bg-surface rounded-xl p-6 border border-border/50 shadow-sm`
- Icone em circulo: `w-12 h-12 rounded-full bg-urgent-bg flex items-center justify-center`
- Titulo: `text-lg font-bold` (hierarquia mais clara)
- Grid: manter `sm:grid-cols-2` mas com `gap-6` em vez de `gap-8`

### 3.4 Secao Solucao

**Estado atual**: Texto centralizado simples, sem visual.

**Upgrade**:
- **Layout split**: `grid md:grid-cols-2 gap-12 items-center` (como secoes de feature da TownSq)
- **Lado esquerdo**: titulo + descricao + CTA sutil "Entrar na lista →"
- **Lado direito**: logo do app (`logo-app-icon.webp`) em tamanho grande com shadow decorativo
- **Underline decorativo**: `<span className="border-b-4 border-accent/50">` na palavra-chave do titulo

### 3.5 Features

**Estado atual**: Grid 3x2 com borda fina, icone SVG solto, hover shadow basico.

**Upgrade** (inspirado no grid de icones da TownSq):
- Card: `bg-surface rounded-2xl p-8 border border-border/30 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- **Icone em wrapper**: `w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5` — fundo leve atras do icone
- **Barra decorativa**: `<div className="h-1 w-12 bg-accent rounded-full mb-6" />` no topo de cada card
- Titulo: aumentar para `text-xl`
- Descricao: `text-sm leading-relaxed text-text-secondary`

### 3.6 Como Funciona

**Estado atual**: 3 numeros em circulo, grid simples, nota em italico.

**Upgrade**:
- Numeros maiores: `w-16 h-16 text-2xl` com `shadow-lg`
- **Linha conectora**: linha pontilhada horizontal entre os 3 passos (desktop only) — como um "journey path"
- Nota: dentro de `bg-primary-bg rounded-xl p-5 flex items-start gap-3` com icone de info SVG
- Background da secao: manter branco

### 3.7 Prova Social

**Estado atual**: Grid 3 colunas (texto convite + placeholder fundador + badge).

**Upgrade**:
- **Layout vertical centrado** (stack em vez de grid) — mais impacto
- Texto convite: `text-2xl md:text-3xl font-bold` com gradiente de texto (`text-gradient`) — chama atencao
- Fundador: dentro de card `bg-surface rounded-2xl p-8 shadow-md border border-border/30` — destaca visualmente
- Badge: `bg-accent/10 border border-accent/30 rounded-full px-6 py-3 text-accent font-semibold` — mais proeminente
- **Futuro**: quando houver depoimentos reais, adicionar carousel como TownSq (foto + nome + empresa)

### 3.8 FAQ

**Estado atual**: Accordion com divide-y (linhas separadoras).

**Upgrade**:
- Cada pergunta em card individual: `bg-surface rounded-xl border border-border/30 mb-3 overflow-hidden`
- Bullet decorativo: `w-2 h-2 rounded-full bg-accent shrink-0 mt-2.5` antes da pergunta
- Manter comportamento single-open
- Padding interno: `px-6 py-5`

### 3.9 CTA Waitlist

**Estado atual**: Gradiente + card branco simples com formulario.

**Upgrade**:
- **Decoracao**: mesmas formas do hero (circulos `bg-white/5`) para coerencia visual
- Card: `rounded-2xl shadow-2xl p-8 md:p-10` — mais padding e sombra forte
- Botoes submit: `rounded-full` (consistencia com CTAs do hero)
- **Icone de confianca**: pequeno icone de cadeado + texto "Seus dados estao seguros" abaixo do botao de submit

### 3.10 Footer

**Estado atual**: 3 colunas minimalistas, texto "Linvo", sem icones sociais.

**Upgrade** (inspirado no footer da uCondo):
- Logo real: `logo-linvo.webp` com filtro `brightness(0) invert(1)` para versao branca
- Coluna 1: logo + tagline
- Coluna 2: links (Sobre, Contato, Privacidade)
- Coluna 3: language switcher
- Linha inferior: copyright + "Feito no Brasil" (sem emoji, tom profissional)

### 3.11 Pagina 404

**Estado atual**: Quadrado azul pulsante, texto hardcoded.

**Upgrade**:
- Logo real centralizado
- Ilustracao SVG simples (lupa ou mapa)
- CTA estilizado com `rounded-full`

---

## 4. Componentes Visuais Novos

### 4.1 PhoneMockup

Componente que simula uma tela de celular com conteudo representativo do app:

```
┌──────────────────┐
│  9:41    Linvo ●●●│  ← Status bar
├──────────────────┤
│ ┌──────────────┐ │
│ │ 📢 Comunicado │ │  ← Card azul claro
│ │ Reuniao amanha│ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ ✓ Votacao     │ │  ← Card verde claro
│ │ 23 de 45 votos│ │
│ └──────────────┘ │
│ ┌──────────────┐ │
│ │ 📅 Reserva    │ │  ← Card cinza claro
│ │ Churrasqueira │ │
│ └──────────────┘ │
└──────────────────┘
```

Visual: fundo branco, bordas arredondadas, sombra forte. Cards internos com cores dos tokens (primary-bg, success-bg, background). Texto representativo (nao lorem ipsum) em portugues/ingles conforme locale.

### 4.2 DecoCircle

Circulos decorativos semitransparentes para hero e CTA:
```tsx
<div className="absolute rounded-full bg-white/5 w-80 h-80 -top-16 -right-16 pointer-events-none" aria-hidden="true" />
```

### 4.3 CSS Utilitarios

```css
/* Gradiente de texto para titulos de impacto */
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

---

## 5. Assets Necessarios

| Fonte                            | Destino                           | Acao                     |
|----------------------------------|------------------------------------|--------------------------|
| `assets/brand/logo-linvo.png`    | `public/images/logo-linvo.webp`   | Converter PNG→WebP       |
| `assets/brand/logo-icon.png`     | `public/images/logo-icon.webp`    | Converter PNG→WebP       |
| `assets/brand/logo-app-icon.png` | `public/images/logo-app-icon.webp`| Converter PNG→WebP       |

---

## 6. Ordem de Implementacao

### Etapa 1 — Fundacao (assets + CSS + componentes base)
- [ ] Converter logos PNG → WebP e copiar para `public/images/`
- [ ] Adicionar CSS `.text-gradient` ao globals.css
- [ ] Criar componente `PhoneMockup` (i18n-aware)
- [ ] Criar componente `DecoCircle`

### Etapa 2 — Navbar + Footer (identidade de marca)
- [ ] Navbar: logo real, scroll effect com blur, CTA pill
- [ ] Footer: logo real (invertida), layout melhorado, "Feito no Brasil"

### Etapa 3 — Hero (primeira impressao)
- [ ] Split layout com PhoneMockup
- [ ] Badge "Programa Piloto Aberto"
- [ ] DecoCircles decorativos
- [ ] CTAs pill com seta
- [ ] Padding generoso

### Etapa 4 — Secoes de conteudo
- [ ] Problem: cards individuais com icones em circulo
- [ ] Solution: split com logo-app-icon + CTA
- [ ] Features: cards elevados com barra accent + icone wrapper + hover lift
- [ ] HowItWorks: numeros grandes + nota em card info
- [ ] SocialProof: layout vertical + texto gradiente + card fundador + badge
- [ ] FAQ: cards individuais com bullet accent

### Etapa 5 — CTA Waitlist + 404
- [ ] WaitlistCTA: decoracao + card forte + botoes pill + texto de confianca
- [ ] 404: logo real + CTA pill

### Etapa 6 — Validacao final
- [ ] Build limpo sem erros
- [ ] Responsividade mobile (320px a 1440px)
- [ ] Contraste WCAG AA
- [ ] Performance (WebP, lazy loading)
- [ ] Testar em Chrome, Firefox, Safari
- [ ] Commit e push

---

## 7. Criterios de Aceite

- [ ] Navbar exibe logo real
- [ ] Hero tem split layout com PhoneMockup + badge + decoracao
- [ ] Cards de features tem profundidade (shadow, hover lift, barra accent)
- [ ] Prova social tem texto gradiente e card do fundador
- [ ] Botoes CTA sao pill-shaped (rounded-full) consistentemente
- [ ] Footer tem logo real (invertida) e layout profissional
- [ ] Espacamento entre secoes e generoso (60-100px)
- [ ] Mobile funciona sem overflow horizontal
- [ ] Build compila sem erros
- [ ] Site transmite confianca e acolhimento — nao parece tech startup fria

---

## 8. O que NAO fazer (aprendizado dos concorrentes)

| Evitar                                | Por que                                              |
|---------------------------------------|------------------------------------------------------|
| Headlines em uppercase agressivo      | TownSq usa, mas intimida sindicos mais tradicionais  |
| Verde neon ou amarelo forte           | Superlogica usa amarelo, TownSq usa verde neon — cansa |
| Ausencia de visual do produto         | uCondo nao mostra screenshots — perde oportunidade   |
| Formulario de contato no footer       | uCondo faz — polui o footer, melhor ter pagina dedicada |
| Carousel de logos sem ter logos        | Ter secao vazia e pior que nao ter                   |
| Efeitos de animacao pesados           | Superlogica tem ripple effects — bonito mas pesado para GitHub Pages estatico |
| Multiplos tons de CTA                 | Superlogica tem 3 cores de botao — confuso. Linvo: accent-dark (primario) + outline (secundario) |
