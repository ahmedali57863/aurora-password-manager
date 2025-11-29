# Vercel Deployment Guide

This project builds with Vite. Use the steps below to make sure Vercel builds succeed and your secrets stay safe.

## Build command
Use the default build command:

npm run build

## Important environment variables
- VITE_APP_SECRET_KEY — optional app secret used by the client at build time (Vite prefix VITE_ means variables are included in client bundles)
  - NOTE: Any VITE_* secret is visible in built client bundles. Do not put high-value secrets in VITE_ variables.
- APP_SECRET_KEY — if you run any server-side code or functions that rely on a secret, add `APP_SECRET_KEY` as a server-only environment variable.

Set these variables in the Vercel Dashboard → Project Settings → Environment Variables (for Production / Preview as needed).

## Avoid committing secrets
- Add `.env` to `.gitignore` and only commit `.env.example` with placeholders.
- Use Vercel environment variables (UI or CLI) for production secrets instead of committing `.env`.

## Common pitfalls and fixes
- Dependency peer conflicts: If Vercel fails with an `eresolve` peer dependency error, either:
  - Remove unused packages that cause conflicts (we removed `framer-motion-3d`) or
  - Use `.npmrc` with `legacy-peer-deps=true` (not recommended as a long-term fix)

- Build errors caused by esbuild/Vite incompatibilities: ensure your source files use ES-compatible syntax and avoid non-standard `typeof import` checks. I fixed `src/utils/encryption.js` to be Vite-friendly.

## Redeploy
After pushing the changes that fix conflicts and build errors:
1. Clear the Vercel project cache (optional) — sometimes required when changing lockfile or package resolution.
2. Trigger a redeploy from the Vercel UI or push a new commit.

If you want, I can add a Vercel `project.json` or `vercel.json` to pin settings, or add a GitHub Action that triggers a Vercel redeploy. Let me know which you'd prefer.
