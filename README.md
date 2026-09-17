# To-Do Semuni

Site simples de lista de tarefas (Next.js), feito para demonstrar um deploy básico
para apresentação da Semana Universitária. Sem Vercel, sem plataforma nenhuma:
só build + start, do jeito que roda em qualquer servidor.

## Configuração

As informações do site ficam no arquivo `.env` (copie de `.env.example` se não existir):

```
SITE_NAME="To-Do Semana Universitária"
SITE_DOMAIN="meusite.com.br"
OWNER_NAME="Seu Nome Aqui"
```

Mude esses valores e reinicie o servidor — não precisa rebuildar o projeto.

## Rodando localmente (dev)

```bash
npm install
npm run dev
```

## Deploy básico (o que importa pra apresentação)

```bash
npm install
npm run build   
npm start       
```

Por padrão sobe em `http://localhost:3000`. Para mudar a porta:

```bash
npm start -- -p 8080
```

É basicamente isso: instalar dependências, buildar, e rodar `next start`.
Sem CI/CD, sem plataforma de deploy, sem mágica — só o binário do Next
servindo a aplicação.

## Rodando com Docker

O `Dockerfile` faz o mesmo fluxo de cima (`npm ci` → `npm run build` → `npm start`)
dentro do container, sem output "standalone" nem otimizações extras.

```bash
docker compose up -d --build
```

Sobe em `http://localhost:3000`, lendo as variáveis do `.env` (via `env_file`
no `docker-compose.yml`). Pra aplicar uma mudança no `.env`, não precisa
rebuildar a imagem — só recriar o container (`docker compose restart` **não**
funciona aqui, porque as env vars ficam presas no container desde a criação):

```bash
docker compose up -d
```

Se mudar código, aí sim precisa rebuildar:

```bash
docker compose up -d --build
```
