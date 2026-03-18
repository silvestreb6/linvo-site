# Plano de Upgrade Visual — linvo.one

> Data: 2026-03-18
> Objetivo: Elevar a qualidade visual de "MVP funcional" para "plataforma confiavel e moderna para gestao condominial"

---

## 0. Analise de Concorrentes — Insights

### TownSq
- **Tom**: Profissional mas acessivel. Nao tech demais.
- **Pontos fortes**: Gradientes diagonais como identidade visual, mockup do app no hero, numeros animados (20 mil condominios, 4 paises), logos de midia (Veja, Yahoo, AWS).
- **Insight para Linvo**: Hero com mockup do app + numeros de prova social criam credibilidade imediata sem parecer excessivamente tecnico.

### Superlogica
- **Tom**: Corporativo B2B, mais serio e orientado a negocios.
- **Pontos fortes**: Sistema de design robusto, animacoes sutis, CTAs com efeito ripple, secao "Por que escolher" com imagem lado a lado.
- **Insight para Linvo**: Evitar esse tom excessivamente corporativo. Superlogica e para gestoras grandes; Linvo deve parecer mais proximo e amigavel.

### uCondo
- **Tom**: Pratico, direto, acessivel. O mais proximo do que a Linvo deveria ser.
- **Pontos fortes**: Headline "O sistema que trabalha por voce" (foco no beneficio, nao na tecnologia), depoimentos com foto+nome+empresa, CTAs por persona (sindico, administradora, morador), 700 mil clientes como prova social imediata.
- **Insight para Linvo**: Linguagem de beneficio (nao de feature), depoimentos humanizados, segmentacao por persona no CTA.

### Sintese — Tom Visual para Linvo

| Nao queremos          | Queremos                                      |
|-----------------------|-----------------------------------------------|
| Tech startup frio     | Plataforma acolhedora para comunidades        |
| Dashboard complexo    | Experiencia simples e visual                  |
| Jargao tecnico        | Linguagem de beneficio ("funciona por voce")  |
| Abstracoes geometricas| Pessoas, predios, comunidade                  |
| Cores neon/tech       | Azul confianca + teal caloroso (ja temos)     |

**Direcao**: Visual entre uCondo (pratico/acessivel) e TownSq (moderno/confiavel), sem o peso corporativo da Superlogica.

---

## 1. Diagnostico do Estado Atual

### O que esta bom
- Estrutura HTML semantica e acessivel
- Paleta de cores consistente (design tokens)
- Tipografia definida (Manrope + Inter)
- Layout responsivo funcional (mobile/desktop)
- i18n bilingue funcionando

### O que esta fraco
- **Navbar**: Texto "Linvo" sem logo real, sem efeitos de scroll refinados
- **Hero**: Bloco de texto solto sem visual de apoio (mockup, ilustracao, formas decorativas)
- **Secoes**: Todas sao texto + texto, sem elementos visuais que quebrem a monotonia
- **Cards de Features**: Borda simples, sem profundidade ou diferenciacao visual
- **Icones SVG**: Inline e genericos, sem personalidade
- **Problema**: Lista seca sem impacto visual
- **Social Proof**: Placeholder circular sem foto real, layout sem peso visual
- **FAQ**: Accordion funcional mas visualmente plano
- **Waitlist CTA**: Formulario sobre fundo gradiente, sem decoracao
- **Footer**: Minimalista demais, sem presenca de marca
- **Ausencia total**: Formas decorativas, texturas, espacamento generoso, micro-interacoes

---

## 2. Principios do Upgrade

1. **Confiavel e acolhedor** — transmitir seguranca sem ser frio. Sindicos precisam confiar, nao se impressionar com tech.
2. **Linguagem de beneficio** — "funciona por voce" em vez de "plataforma modular". Foco em resultado, nao em feature.
3. **Espacamento generoso** — breathing room entre secoes. Site precisa "respirar".
4. **Depth sutil** — sombras suaves nos cards, hierarquia visual clara sem exagero.
5. **Logo real** — usar logo-linvo.png na navbar e footer. Presenca de marca forte.
6. **Mockup do app** — mostrar visualmente o que o produto faz (como TownSq e uCondo fazem).
7. **Prova social cedo** — numeros, badges, depoimentos o mais rapido possivel na pagina.
8. **Cores quentes sobre base fria** — azul (#1F4E79) como confianca + teal (#2A9D8F) como calor humano. Equilibrio que os concorrentes nao tem.

---

## 3. Mudancas por Componente

### 3.1 Navbar

| Antes | Depois |
|-------|--------|
| Texto "Linvo" em font-bold | Logo real `logo-linvo.png` (WebP, ~32px altura) |
| Background solido branco | Background transparente no topo, branco com blur ao scroll |
| Sem borda inferior | Borda sutil `border-b border-border/50` ao scroll |
| CTA simples | CTA com pill shape mais arredondado + shadow sutil |

**Detalhes**:
- Logo: converter `logo-linvo.png` para WebP, servir de `/images/logo-linvo.webp`
- Altura navbar: manter 64px
- Transicao scroll: `bg-transparent` → `bg-surface/90 backdrop-blur-md border-b border-border/30`
- CTA navbar: `rounded-full px-5 py-2 shadow-sm`

### 3.2 Hero

| Antes | Depois |
|-------|--------|
| Texto alinhado a esquerda sem visual | Split layout: texto esquerda + visual direita |
| Gradiente simples | Gradiente + formas decorativas (circulos, grid dots) |
| Sem badge/tag | Badge "Pre-lancamento" acima do headline |
| Dois CTAs em linha | CTAs com icones (seta, foguete) |

**Detalhes**:
- Layout: `grid md:grid-cols-2 gap-12 items-center`
- Visual direita: mockup estilizado do app simulando tela de celular com cards representando comunicados, votacoes, reservas — mostra visualmente o que o app faz sem ser abstrato
- Formas decorativas: circulo grande semitransparente sutil (`bg-white/5 rounded-full`) — apenas 1-2 formas, nao poluir
- Badge: `<span>` com icone Rocket + texto "Programa Piloto Aberto" / "Open Pilot Program" em `bg-white/10 text-white/90 rounded-full px-4 py-1.5 text-sm`
- CTA primario: adicionar icone seta → `→` dentro do botao
- Padding vertical: aumentar para `py-24 md:py-40`

### 3.3 Secao "O Problema"

| Antes | Depois |
|-------|--------|
| Grid 2x2 com icone + texto | Cards individuais com background, borda e numero |
| Icones vermelhos simples | Icones em circulo com background `urgent-bg` |
| Sem numeracao | Numero grande decorativo em cada card |

**Detalhes**:
- Cada dor em card: `bg-surface rounded-xl p-6 border border-border shadow-sm`
- Icone dentro de circulo: `w-12 h-12 rounded-full bg-urgent-bg flex items-center justify-center`
- Titulo em `text-lg font-bold`
- Background da secao: manter `#F7F8FA` mas adicionar sutil pattern SVG (grid dots)

### 3.4 Secao "A Solucao"

| Antes | Depois |
|-------|--------|
| Texto centralizado simples | Split: texto esquerda + imagem/ilustracao direita |
| Sem destaque visual | Headline com accent underline decorativo |
| Sem CTA | Adicionar CTA secundario para waitlist |

**Detalhes**:
- Layout: `grid md:grid-cols-2 gap-12 items-center`
- Lado direito: logo-app-icon.png em contexto (simular tela de celular)
- Accent underline: `<span>` com `border-b-4 border-accent pb-1` na palavra-chave
- CTA: link sutil "Entrar na lista →" em cor accent

### 3.5 Cards de Features

| Antes | Depois |
|-------|--------|
| Borda fina + hover shadow | Gradiente sutil no topo + icone com background |
| Icone SVG solto | Icone dentro de quadrado arredondado com cor de fundo |
| Sem hierarquia | Barra colorida no topo do card (4px accent) |

**Detalhes**:
- Card: `bg-surface rounded-2xl p-8 border border-border/50 shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300`
- Icone wrapper: `w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-5`
- Barra topo: `<div className="h-1 w-12 bg-accent rounded-full mb-6" />`
- Titulo: `text-xl` em vez de `text-lg`

### 3.6 Secao "Como Funciona"

| Antes | Depois |
|-------|--------|
| Numeros em circulo simples | Numeros em circulo grande com sombra + linha conectora |
| Grid sem conexao visual | Linha horizontal pontilhada conectando os passos |
| Nota em italico simples | Nota em card sutil com icone de info |

**Detalhes**:
- Numeros: `w-16 h-16 rounded-full bg-primary text-white text-2xl font-bold shadow-lg`
- Linha conectora (desktop): `<div className="hidden md:block absolute top-8 left-[calc(50%-1px)] w-full h-0.5 border-t-2 border-dashed border-primary/20" />`  entre passos
- Cada passo: position relative para a linha conectar
- Nota: dentro de `bg-primary-bg rounded-xl p-4 mt-8 flex items-start gap-3` com icone Info

### 3.7 Prova Social / Credibilidade

| Antes | Depois |
|-------|--------|
| Grid 3 colunas com placeholder | Layout vertical centrado com mais impacto |
| Circulo com letra inicial | Placeholder mais elaborado (silhueta ou moldura) |
| Badge pequeno | Badge maior, mais proeminente com glow sutil |

**Detalhes**:
- Layout: stack vertical centrado `max-w-2xl mx-auto text-center`
- Invite text: `text-2xl md:text-3xl font-bold` com gradiente de texto (`bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent`)
- Fundador: card com `bg-surface rounded-2xl p-8 shadow-md mt-8` contendo foto + bio
- Badge: `mt-8` com `bg-accent/10 border border-accent/30 rounded-full px-6 py-3 text-accent font-semibold`

### 3.8 FAQ

| Antes | Depois |
|-------|--------|
| Divide-y simples | Cards individuais com spacing |
| Sem icone de destaque | Icone accent no lado esquerdo de cada pergunta |
| Fundo branco liso | Fundo com sutil gradiente ou pattern |

**Detalhes**:
- Cada item: `bg-surface rounded-xl border border-border/50 mb-3 px-6` em vez de divide-y
- Pergunta: adicionar bullet decorativo `w-2 h-2 rounded-full bg-accent shrink-0 mt-2` antes do texto
- Secao background: manter surface mas adicionar detalhe visual no titulo (icone MessageCircleQuestion)

### 3.9 CTA Final / Waitlist

| Antes | Depois |
|-------|--------|
| Gradiente simples | Gradiente + formas decorativas (circulos como no hero) |
| Formulario em card branco | Card branco com shadow mais forte + rounded-2xl |
| Sem elementos visuais | Adicionar icone/ilustracao acima do titulo |

**Detalhes**:
- Formas decorativas: mesmas do hero (circulos semitransparentes) para coerencia visual
- Card: `rounded-2xl shadow-2xl p-8 md:p-10`
- Icone acima do titulo: emoji ou SVG de envelope/foguete em `text-4xl mb-4`
- Botao submit: `rounded-full` para consistencia com CTA do hero
- Estado de sucesso: adicionar confetti visual simples (circulos coloridos animados)

### 3.10 Footer

| Antes | Depois |
|-------|--------|
| 3 colunas simples | 3 colunas + linha de marca forte + links sociais |
| Texto "Linvo" | Logo real `logo-linvo.png` em branco/invertido |
| Sem icones sociais | Placeholders para LinkedIn e Instagram (quando disponiveis) |
| Borda branca fina | Borda com gradiente sutil `border-t border-white/10` |

**Detalhes**:
- Logo: versao branca ou com filtro `brightness(0) invert(1)` sobre logo-linvo.webp
- Coluna 1: logo + tagline + futuros icones de redes sociais
- Coluna 2: links de navegacao (Sobre, Contato, Privacidade)
- Coluna 3: language switcher + "Feito com ❤️ no Brasil"
- Copyright: `text-xs opacity-40`

### 3.11 Pagina 404

| Antes | Depois |
|-------|--------|
| Quadrado azul pulsante | Logo real + ilustracao simples (SVG de mapa/busca) |
| Sem personalidade | Mensagem com tom amigavel e CTA claro |

---

## 4. Elementos Visuais Globais

### 4.1 Formas Decorativas (Background Shapes)

Circulos e formas geometricas sutis usados como decoracao em secoes de destaque:

```tsx
// Componente reutilizavel
function DecoCircle({ className }: { className: string }) {
  return <div className={`absolute rounded-full pointer-events-none ${className}`} aria-hidden="true" />;
}

// Uso no Hero e WaitlistCTA:
<DecoCircle className="w-96 h-96 bg-white/5 -top-20 -right-20" />
<DecoCircle className="w-64 h-64 bg-white/3 bottom-10 -left-10" />
```

### 4.2 Grid Dots Pattern

SVG pattern sutil para backgrounds de secoes:

```css
.bg-dots {
  background-image: radial-gradient(circle, var(--color-border) 1px, transparent 1px);
  background-size: 24px 24px;
}
```

### 4.3 Gradiente de Texto

Para titulos de destaque:

```css
.text-gradient {
  background: linear-gradient(135deg, var(--color-primary), var(--color-accent));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}
```

### 4.4 Glow Effect

Para badges e elementos de destaque:

```css
.glow-accent {
  box-shadow: 0 0 20px color-mix(in oklab, var(--color-accent) 20%, transparent);
}
```

---

## 5. Imagens e Assets Necessarios

### 5.1 Converter PNGs para WebP

| Fonte                            | Destino                         | Uso |
|----------------------------------|---------------------------------|-----|
| `assets/brand/logo-linvo.png`    | `public/images/logo-linvo.webp` | Navbar, footer |
| `assets/brand/logo-icon.png`     | `public/images/logo-icon.webp`  | Redirect page, 404 |
| `assets/brand/logo-app-icon.png` | `public/images/logo-app-icon.webp` | Secao solucao, hero |

### 5.2 Mockup do App (Ilustrativo)

Para o Hero, criar um componente `PhoneMockup` que simula uma tela de celular com conteudo representativo:

```tsx
function PhoneMockup() {
  return (
    <div className="relative mx-auto w-64 md:w-80">
      {/* Phone frame */}
      <div className="rounded-3xl border-4 border-white/20 bg-white/10 p-3 shadow-2xl backdrop-blur-sm">
        {/* Screen */}
        <div className="rounded-2xl bg-surface p-4 space-y-3">
          {/* Status bar */}
          <div className="flex justify-between text-xs text-text-muted">
            <span>9:41</span>
            <span>Linvo</span>
            <span>●●●</span>
          </div>
          {/* Content cards */}
          <div className="rounded-xl bg-primary-bg p-3">
            <div className="h-2 w-20 rounded bg-primary/30" />
            <div className="mt-2 h-2 w-32 rounded bg-primary/20" />
          </div>
          <div className="rounded-xl bg-success-bg p-3">
            <div className="h-2 w-24 rounded bg-success/30" />
            <div className="mt-2 h-2 w-28 rounded bg-success/20" />
          </div>
          <div className="rounded-xl bg-background p-3">
            <div className="h-2 w-16 rounded bg-text-muted/30" />
            <div className="mt-2 h-2 w-36 rounded bg-text-muted/20" />
          </div>
        </div>
      </div>
    </div>
  );
}
```

---

## 6. Ordem de Implementacao

### Etapa 1 — Assets e CSS globais
- [ ] Converter logos PNG → WebP e copiar para `public/images/`
- [ ] Adicionar CSS customizado ao globals.css (`.bg-dots`, `.text-gradient`, `.glow-accent`)
- [ ] Criar componente `DecoCircle` reutilizavel
- [ ] Criar componente `PhoneMockup`

### Etapa 2 — Navbar + Footer (marca forte)
- [ ] Navbar: substituir texto por logo WebP
- [ ] Navbar: scroll effect refinado (transparente → blur)
- [ ] Navbar: CTA pill shape
- [ ] Footer: logo real + layout melhorado + "Feito no Brasil"

### Etapa 3 — Hero (impacto maximo)
- [ ] Layout split grid com PhoneMockup
- [ ] Badge "Programa Piloto" acima do headline
- [ ] Formas decorativas (DecoCircle)
- [ ] CTAs com icones
- [ ] Padding aumentado

### Etapa 4 — Secoes de conteudo
- [ ] Problem: cards individuais com icones em circulo
- [ ] Solution: split layout com visual
- [ ] Features: cards elevados com barra accent + icone wrapper
- [ ] HowItWorks: numeros grandes + linha conectora + nota em card
- [ ] SocialProof: layout vertical + texto gradiente + card fundador + badge glow
- [ ] FAQ: cards individuais com bullet decorativo

### Etapa 5 — CTA Waitlist + 404
- [ ] WaitlistCTA: formas decorativas + card shadow forte + botoes pill
- [ ] 404: logo real + mensagem refinada

### Etapa 6 — Validacao
- [ ] Build limpo
- [ ] Verificar responsividade mobile (320px a 1440px)
- [ ] Verificar contraste WCAG AA
- [ ] Verificar performance (imagens WebP, lazy loading)
- [ ] Push final

---

## 7. Criterios de Aceite

- [ ] Navbar exibe logo real em vez de texto
- [ ] Hero tem split layout com visual (PhoneMockup) + formas decorativas
- [ ] Pelo menos 3 secoes tem elementos visuais alem de texto
- [ ] Cards de Features tem depth (sombra, hover elevation)
- [ ] CTA buttons sao pill-shaped (rounded-full) consistentemente
- [ ] Footer tem logo real e presenca de marca
- [ ] Smooth scroll funciona em todos os anchor links
- [ ] Mobile responsivo sem overflow horizontal
- [ ] Build passa sem erros
- [ ] Contraste WCAG AA mantido
