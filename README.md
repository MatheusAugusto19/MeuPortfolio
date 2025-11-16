# MeuPortfolio

Este repositório contém seu portfólio estático, migrado para usar Vite como dev server e builder.

---

## Descrição

- Projeto: site de portfólio pessoal (estático)
- Build e dev via Vite
- Deploy automático via GitHub Actions -> `gh-pages`

## Estrutura principal

- `index.html` — markup principal
- `CSS/Style.css` — estilos
- `src/main.js` — entrada ES module (i18n, interações e comportamento)
- `send_email.php` — backend simples para o formulário de contato
- `package.json` & `vite.config.js` — configuração do Vite
- `.github/workflows/deploy.yml` — workflow para build + deploy para `gh-pages`

## Quick start (desenvolvimento)

No PowerShell (Windows), a partir da raiz do projeto:

```powershell
npm install
npm run dev
```

- O Vite dev server ficará disponível em `http://localhost:5173` (porta pode variar).

## Build e preview (produção)

```powershell
npm run build
npm run preview
```

- `npm run build` gera a pasta `dist/` com o site estático pronto.
- `npm run preview` serve o build localmente para testes.

## Sobre o formulário de contato (PHP)

O formulário envia para `send_email.php`. Para testar o envio localmente, você precisa de um servidor PHP. Um comando simples para testes locais:

```powershell
# Inicia um servidor PHP embutido na porta 8000
php -S localhost:8000 -t .
```

Depois abra `http://localhost:8000` no navegador para testar o formulário. Envio de e-mail depende da configuração do PHP/servidor (sendmail/SMTP).

## Internacionalização (i18n)

- O site usa atributos `data-en` / `data-pt` para popular textos.
- A linguagem selecionada é salva em `localStorage` com a chave `lang`.

## CI / Deploy

Existe um workflow em `.github/workflows/deploy.yml` que faz build e publica `dist/` para a branch `gh-pages` em pushes para `main`.

Se quiser deploys manuais, altere o gatilho do workflow para `workflow_dispatch`.

## Notas para desenvolvedores

- Se precisar que o menu móvel impeça scroll do body, adicione/remova a classe `.no-scroll` em `document.body` ao abrir/fechar o menu em `src/main.js`.
- Otimize imagens antes de enviar para reduzir o tamanho do `dist/`.

## Licença

MIT

---

Se quiser, eu posso também:

- tornar o workflow de deploy manual (`workflow_dispatch`);
- adicionar um `CONTRIBUTING.md` com regras de PR;
- adicionar instruções rápidas de testes (axe/lighthouse) e um pequeno script de verificação.

Diga qual desses você prefere e eu implemento em seguida.
# MeuPortfolio - Vite setup

Este repositório contém seu portfólio estático. Eu converti a aplicação para usar Vite como dev server e builder.

Como usar (Windows PowerShell):

1. Instale dependências:

```powershell
npm install
```

2. Rodar em desenvolvimento (abre servidor dev do Vite):

```powershell
npm run dev
```

3. Build para produção:

```powershell
npm run build
```

Notas:
- O código cliente continua a enviar o formulário para `send_email.php`. Se quiser testar envio local, você precisa rodar um servidor PHP que sirva `send_email.php` (por exemplo, usando XAMPP ou o servidor embutido do PHP). Durante desenvolvimento com Vite você pode apontar o formulário para o endpoint PHP no servidor onde o PHP está rodando (ex: `http://localhost:8000/send_email.php`).
- Mantive AOS carregado via CDN no `index.html` para simplicidade.
