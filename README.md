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

---
## Rodando no EC2
1. Crie uma instância EC2 (Ubuntu 22.04 LTS) abrindo o acesso http para qualquer usuário e IP.
2.  Acesse a instância via SSH e instale o Node.js (versão 20.x). Utilize os comandos na página de instalação do Node ([Link](https://nodejs.org/en/download))
3. Clone o repositório do projeto na instância EC2:
    ```bash
    git clone https://github.com/AWS-SBG-UnB/to-do-semuni-2026.git/
    ```
4. Acesse o diretório do projeto:
    ```bash
    cd to-do-semuni-2026
    ```
5. Instale as dependências do projeto:
    ```bash
    npm install
    ```
6. Crie o arquivo `.env` com as variáveis de ambiente necessárias, copiando do `.env.example`:
    ```bash
    cp .env.example .env
    ```
7. Edite o arquivo `.env` para definir as variáveis de ambiente conforme necessário:
    ```bash
    nano .env
    ```
8. Crie um domínio no site DuckDNS (https://www.duckdns.org/) e configure o domínio para apontar para o IP público da sua instância EC2.
9. Rode o build do projeto:
    ```bash
    npm run build
    ```
10. Inicie a aplicação com sudo passando as variáveis de ambiente para o usuário root:
    ```bash
    sudo env "PATH=$PATH" npm start -- -p 80
    ```
11. Acesse o site pelo domínio configurado no DuckDNS

