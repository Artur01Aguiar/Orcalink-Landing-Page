# SEO — OrcaLink

## O que foi configurado

### 1. Meta tags otimizadas (`index.html`)
- **Title:** "OrcaLink — Calculadora de Orçamento Online | Cliente Calcula, Você Fecha"
  - Inclui keyword principal ("calculadora de orçamento")
  - 65 caracteres (limite Google: 60-70)
- **Description:** 159 caracteres com call-to-action e nichos
- **Keywords:** 12 termos relevantes (Google não usa muito, Bing/DuckDuckGo usam)
- **Canonical:** previne conteúdo duplicado entre orcalink.com.br e variações
- **Robots:** `index, follow, max-image-preview:large` (ativa thumbnails ricos no Discover)

### 2. Open Graph / Twitter Card
- Título e descrição específicos pra compartilhamento social
- `og:image` 1200×630 (padrão WhatsApp/LinkedIn/Facebook)
- `og:locale: pt_BR` força localização

### 3. Schema.org (JSON-LD)
Três schemas no `<head>`:
- **SoftwareApplication** — preço, categoria, sistema operacional. Ativa rich snippets de preço no Google.
- **Organization** — info da empresa, contato, redes sociais. Ajuda Knowledge Panel.
- **FAQPage** — 6 perguntas/respostas. Pode aparecer expandido na busca (pega muito espaço).

### 4. Sitemap.xml + robots.txt
- `public/sitemap.xml` — 5 URLs com prioridade (home = 1.0, preços = 0.9)
- `public/robots.txt` — permite tudo, aponta pro sitemap

---

## O que VOCÊ precisa fazer manualmente (15 minutos)

### Passo 1 — Subir mudanças (eu já comito e dou push)
Após o push, esperar o deploy da Vercel automático rodar. Conferir:
- https://orcalink.com.br/robots.txt → deve abrir
- https://orcalink.com.br/sitemap.xml → deve abrir

### Passo 2 — Confirmar domínio nas tags
Se o domínio principal **não** for `orcalink.com.br` (ex: `orcalinkapp.com`), faça find/replace nesses arquivos:
- `index.html`
- `public/robots.txt`
- `public/sitemap.xml`

### Passo 3 — Criar a `og-image.png`
Imagem que aparece no compartilhamento (WhatsApp, Twitter, LinkedIn).
- **Tamanho:** 1200×630 pixels
- **Conteúdo sugerido:** logo OrcaLink + headline "Cliente calcula. Você fecha." + screenshot do produto
- **Onde colocar:** `public/og-image.png`
- **Como gerar rápido:** print da landing + Figma/Canva/Photoshop

Sem isso, o link compartilhado fica feio.

### Passo 4 — Google Search Console (5 min)
1. Entrar em https://search.google.com/search-console
2. Adicionar propriedade: `https://orcalink.com.br/`
3. Verificar via DNS (Vercel) ou meta tag (eu adiciono se você quiser)
4. Submeter sitemap: `https://orcalink.com.br/sitemap.xml`
5. Clicar em "Solicitar indexação" pra home

### Passo 5 — Bing Webmaster Tools (5 min, opcional)
1. https://www.bing.com/webmasters
2. Importar do Google Search Console (1 clique)

### Passo 6 — Conferir indexação após 48h
- Buscar `site:orcalink.com.br` no Google
- Se aparecer, tá indexado

---

## O que NÃO vale fazer agora

- **Daily AI agent otimizando SEO** — vai gerar ruído e penalização
- **Comprar backlinks** — penalização garantida
- **Keyword stuffing** — repetir keyword 100 vezes te tira da busca
- **SEO local sem cliente local** — você não tem escritório
- **Blog post toda semana** — sem distribuição, ninguém lê

---

## Quando voltar a pensar em SEO

- Após **5+ clientes pagantes**: criar páginas long-tail (`/calculadora-fotografo`, `/calculadora-tatuador`)
- Após **R$1.000 MRR**: pensar em blog com 3-5 posts ranqueando long-tail ("como cobrar ensaio", "tabela preço logo")
- Após **R$5.000 MRR**: contratar SEO especialista freelance ou estudar a fundo

Antes disso: **DM, conteúdo, ads.** SEO é canal de longo prazo, não vai mover MRR no Q2 2026.

---

## Métricas pra acompanhar (semanal)

No Search Console:
- **Impressões** — quantas vezes apareceu
- **Cliques** — quantas vezes clicaram
- **CTR** — cliques ÷ impressões
- **Posição média** — onde aparece (alvo: top 10 = primeira página)

Sem cliente pagante, nenhuma dessas importa muito. Foco em conversão da landing.
