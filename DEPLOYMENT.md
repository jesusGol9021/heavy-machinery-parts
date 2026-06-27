# Guía de Deployment - PartsHub

## ⚠️ IMPORTANTE: No usar GitHub Pages

**GitHub Pages NO funciona con Next.js.** GitHub Pages solo sirve contenido estático y no puede ejecutar una aplicación Next.js completa como la nuestra.

Lo que ves en `https://jesusgol9021.github.io/heavy-machinery-parts/` es solo el README markdown convertido a HTML estático. **NO es la aplicación**.

## ✅ Solución Correcta: Vercel

Vercel es la plataforma oficial para desplegar Next.js y es lo que necesitas.

### Opción 1: Desde v0 (MÁS FÁCIL)

1. En el chat de v0, haz clic en el botón **"Publish"** (esquina superior derecha)
2. Selecciona **"Deploy to Vercel"**
3. Autoriza tu cuenta de GitHub
4. ¡Listo! Tu app estará en línea en segundos

### Opción 2: Manual desde CLI

```bash
# Instalar Vercel CLI
npm i -g vercel

# Hacer login
vercel login

# Desplegar
vercel
```

Sigue las instrucciones interactivas y tu proyecto se desplegará automáticamente.

### Opción 3: Desde el Dashboard de Vercel

1. Ve a https://vercel.com
2. Haz clic en "New Project"
3. Selecciona tu repositorio `heavy-machinery-parts`
4. Configura las variables de entorno (ver abajo)
5. Haz clic en "Deploy"

## 🔐 Variables de Entorno Necesarias

Antes de desplegar, necesitas configurar estas variables en Vercel:

```
DATABASE_URL=postgres://...        # De Neon
BETTER_AUTH_SECRET=...             # String aleatorio de 32+ caracteres
BETTER_AUTH_URL=https://tuapp.vercel.app  # Tu dominio en Vercel
STRIPE_SECRET_KEY=sk_...           # De Stripe
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_... # De Stripe
```

### Cómo configurar las variables:

1. Ve a tu proyecto en Vercel
2. Settings → Environment Variables
3. Agrega cada variable con su valor
4. Redeploy

## 📊 Estado Actual

Tu repositorio está en: https://github.com/jesusGol9021/heavy-machinery-parts

Rama activa: `main`

### Archivos importantes:
- `app/` - Rutas y páginas
- `lib/auth.ts` - Configuración de autenticación
- `lib/db/` - Base de datos y schema
- `components/` - Componentes React
- `package.json` - Dependencias

## 🚀 Después del Deployment

Una vez desplegado en Vercel:

1. Tu sitio estará en: `https://tuapp.vercel.app`
2. Los usuarios podrán registrarse y acceder
3. La base de datos se conectará automáticamente
4. Los pagos con Stripe funcionarán
5. Las cotizaciones se guardarán correctamente

## ❌ Problemas Comunes

### "Build fails"
- Verifica que todas las variables de entorno estén configuradas
- Ejecuta `pnpm build` localmente para debuggear

### "Database connection error"
- Asegúrate que `DATABASE_URL` está correctamente copiada de Neon
- Verifica que el schema de la BD fue creado (ejecuta los SQL statements)

### "Auth no funciona"
- Verifica que `BETTER_AUTH_SECRET` está configurada
- Comprueba que `BETTER_AUTH_URL` coincide con tu dominio de Vercel

## 📝 Próximos Pasos

1. Haz clic en **"Publish"** en v0
2. Espera a que se despliegue en Vercel
3. Comparte el link de tu sitio con usuarios
4. ¡Tu plataforma de repuestos está lista!
