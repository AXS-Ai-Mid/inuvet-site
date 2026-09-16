# Inuvet — Clínica Veterinária 24h

Site institucional e ferramenta de aquisição de clientes da Inuvet, com unidades em Maringá e Sarandi — PR.

## Recursos

- Next.js com App Router e TypeScript
- Design responsivo para desktop e celular
- Pré-agendamento com encaminhamento para WhatsApp
- Triagem veterinária interativa
- Calculadora de vacinas
- Painel de contatos e agendamentos
- PostgreSQL com Drizzle ORM
- SEO local, Schema.org e GEO para mecanismos generativos
- `llms.txt`, `llms-full.txt` e API de contexto para IA
- Configuração pronta para Netlify
- Validação automática com GitHub Actions

## Arquitetura de hospedagem

O **GitHub armazena e versiona o código**. O **Netlify executa o site em produção**, incluindo rotas dinâmicas e APIs serverless. O banco PostgreSQL deve ser hospedado em um serviço como Neon ou Supabase.

> GitHub Pages não é usado porque páginas estáticas não executam as APIs, o painel administrativo e as operações do PostgreSQL deste projeto.

## 1. Criar o repositório no GitHub

1. Entre em https://github.com/new
2. Nome do repositório: `inuvet-site`
3. Selecione `Private` para manter o código restrito, ou `Public` se desejar código aberto.
4. Não marque as opções para criar README, `.gitignore` ou licença — o projeto já contém esses arquivos.
5. Clique em **Create repository**.

## 2. Enviar o projeto pelo terminal

Na pasta raiz do projeto, execute:

```bash
git init
git add .
git commit -m "Site Inuvet pronto para produção"
git branch -M main
git remote add origin https://github.com/SEU_USUARIO/inuvet-site.git
git push -u origin main
```

Troque `SEU_USUARIO` pelo usuário ou organização proprietária do repositório.

Se o GitHub solicitar autenticação, use o login pelo navegador do GitHub Desktop ou um Personal Access Token; senhas comuns não são aceitas no terminal.

## 3. Publicar automaticamente pelo Netlify

1. Entre em https://app.netlify.com
2. Clique em **Add new site** → **Import an existing project**.
3. Selecione **GitHub** e autorize o acesso.
4. Escolha o repositório `inuvet-site`.
5. O arquivo `netlify.toml` preencherá automaticamente:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Node.js: versão 20
6. Clique em **Deploy site**.

Depois disso, todo `git push` para a branch `main` gerará automaticamente uma nova versão no Netlify.

## 4. Configurar o banco PostgreSQL

### Opção recomendada: Neon

1. Crie um projeto em https://neon.tech
2. Copie a string de conexão PostgreSQL.
3. No Netlify, acesse **Site configuration** → **Environment variables**.
4. Crie a variável `DATABASE_URL` e cole a string completa.
5. No SQL Editor do Neon, execute o arquivo `scripts/setup-database.sql` deste repositório.
6. No Netlify, abra **Deploys** → **Trigger deploy** → **Deploy site**.

Também é possível aplicar a estrutura pelo terminal:

```bash
DATABASE_URL="SUA_URL_POSTGRESQL" npx drizzle-kit push
```

Nunca salve a URL real do banco em arquivos enviados ao GitHub. O `.env` já está protegido pelo `.gitignore`.

## 5. Configurar o domínio inuvet.com.br

No Netlify:

1. Acesse **Domain management**.
2. Clique em **Add a domain**.
3. Informe `inuvet.com.br`.
4. Siga as instruções de DNS exibidas pelo próprio Netlify.
5. Adicione também `www.inuvet.com.br` e escolha o domínio principal.

O certificado HTTPS será criado automaticamente.

## Atualizar o site futuramente

Após editar arquivos:

```bash
git add .
git commit -m "Descreva a alteração realizada"
git push
```

O GitHub Actions verificará TypeScript e build. O Netlify publicará a atualização automaticamente se a validação e o deploy forem concluídos.

## Desenvolvimento local

```bash
npm install
npm run dev
```

Acesse http://localhost:3000.

## Validação de produção

```bash
npx next typegen
npm exec tsc -- --noEmit --pretty false
npm run build
```

## Variáveis de ambiente

Consulte `.env.example`. Variável necessária para persistência:

- `DATABASE_URL`: conexão PostgreSQL com SSL

Variável opcional:

- `NEXT_PUBLIC_SITE_URL`: URL pública canônica

## Documentação adicional

- `NETLIFY_DEPLOY.md`: implantação detalhada no Netlify
- `scripts/setup-database.sql`: criação das tabelas de produção
- `public/llms.txt`: informações resumidas para mecanismos generativos
- `public/llms-full.txt`: base de conhecimento extensa para IA
