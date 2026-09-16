# Guia de Hospedagem no Netlify - Inuvet

O projeto já está **100% configurado e pronto para deploy no Netlify** com suporte completo a Serverless Functions, App Router do Next.js, cabeçalhos de segurança e otimização para Inteligência Artificial (GEO).

---

## 🚀 Método 1: Deploy Rápido via GitHub (Recomendado)

1. **Suba o projeto para seu repositório no GitHub** (ou GitLab / Bitbucket):
   ```bash
   git init
   git add .
   git commit -m "Site completo Inuvet"
   git branch -M main
   git remote add origin https://github.com/SEU_USUARIO/inuvet.git
   git push -u origin main
   ```

2. **Acesse o Netlify**:
   - Entre em [https://app.netlify.com](https://app.netlify.com).
   - Clique no botão **"Add new site"** > **"Import an existing project"**.
   - Conecte sua conta do GitHub e selecione o repositório `inuvet`.

3. **Configurações de Build (Já pré-configuradas no `netlify.toml`)**:
   - **Base directory**: Deixe em branco (raiz)
   - **Build command**: `npm run build`
   - **Publish directory**: `.next`
   - O plugin `@netlify/plugin-nextjs` já está incluído nas dependências e no `netlify.toml`.

4. **Configuração da Variável de Ambiente (`DATABASE_URL`)**:
   - No painel do seu site no Netlify, vá em **Site configuration** > **Environment variables**.
   - Adicione a variável:
     - **Key**: `DATABASE_URL`
     - **Value**: A URL de conexão do seu banco PostgreSQL (veja abaixo como criar um banco gratuito).

5. **Clique em "Deploy site"**.
   - Em cerca de 1 a 2 minutos o site estará online com HTTPS gratuito e CDN global!

---

## ⚡ Método 2: Deploy Direto via Netlify CLI (Sem Git)

Se preferir fazer o deploy diretamente do terminal do seu computador:

1. Instale a CLI do Netlify globalmente:
   ```bash
   npm install -g netlify-cli
   ```

2. Faça login na sua conta Netlify:
   ```bash
   netlify login
   ```

3. Vincule e faça o deploy em produção:
   ```bash
   netlify init
   netlify deploy --build --prod
   ```

---

## 🗄️ Como Criar o Banco PostgreSQL Gratuito (Neon ou Supabase)

O site usa PostgreSQL com Drizzle ORM para salvar os pré-agendamentos, triagens de urgência e contatos.

### Opção A: Neon Database (Recomendado - 100% Serverless e Rápido)
1. Crie uma conta gratuita em [https://neon.tech](https://neon.tech).
2. Crie um novo projeto (ex: `inuvet`).
3. Copie a string de conexão fornecida (ex: `postgresql://neondb_owner:senha@ep-xyz.us-east-1.aws.neon.tech/neondb?sslmode=require`).
4. Cole essa string como a variável `DATABASE_URL` no Netlify.

### Opção B: Supabase
1. Crie uma conta em [https://supabase.com](https://supabase.com).
2. Crie um projeto novo e vá em **Project Settings** > **Database** > **Connection string** (URI).
3. Adicione no Netlify como `DATABASE_URL`.

### Como criar as tabelas no seu banco novo:
Basta rodar no seu terminal local com a variável do seu banco:
```bash
DATABASE_URL="sua-url-do-neon-ou-supabase" npx drizzle-kit push
```
*(Ou execute o script SQL das tabelas que está em `src/db/schema.ts`).*

> **Nota de Resiliência:** Mesmo antes de você configurar o banco de dados, o site **não quebra** no Netlify e o formulário de agendamento sempre direciona o tutor diretamente para o **WhatsApp da clínica com todos os dados preenchidos**, garantindo que nenhum cliente seja perdido!

---

## 🌐 Como Apontar o Domínio Próprio (`inuvet.com.br`)

1. No painel do seu site no Netlify, vá em **Domain management** > **Add a domain**.
2. Digite `inuvet.com.br`.
3. No painel onde seu domínio foi registrado (Registro.br, GoDaddy, Hostinger, etc.), configure as entradas DNS:
   - **Registro A**: Aponte `@` para o IP do Netlify `75.2.60.5`
   - **Registro CNAME**: Aponte `www` para o seu subdomínio no Netlify (ex: `inuvet.netlify.app`)
4. O Netlify emitirá automaticamente o certificado SSL Let's Encrypt gratuito para o domínio.

---

## 🤖 Arquivos Otimizados para IA e SEO já Inclusos

- `netlify.toml`: Cabeçalhos HTTP com CORS aberto para LLMs e regras de cache.
- `/public/llms.txt`: Resumo semântico oficial para robôs generativos.
- `/public/llms-full.txt`: Protocolos médicos completos para IA.
- `/public/robots.txt`: Regras de rastreamento com permissão para GPTBot, PerplexityBot e ClaudeBot.
- `/public/sitemap.xml`: Mapa completo de páginas indexáveis gerado dinamicamente.
- `/api/ai-context`: Endpoint RESTful que fornece os dados da clínica em JSON para assistentes de IA.
