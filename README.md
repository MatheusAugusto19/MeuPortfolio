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
