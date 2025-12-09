# Portfolio React

Proyecto de portfolio de desarrollador web usando React + Vite y CSS puro.

## Requisitos

## Comandos
```powershell
# instalar dependencias
npm install

# modo desarrollo
npm run dev

# build de producción
npm run build

# previsualizar build
npm run preview
```
# Portfolio FZ

Deploy on Vercel (actualizado)

- Build: `npm run build`
- Output: `dist`
- Framework: Vite + React

Environment variables (Vercel Project Settings → Environment Variables):
- `RESEND_API_KEY`: your Resend API key
- `RESEND_TO_EMAIL`: destination email address

Contact API route: `/api/contact` (Vercel Serverless Function).

Local dev:
- `npm run dev` for SPA
- Use `vercel dev` to test the API route locally.
