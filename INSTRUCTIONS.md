# PartsHub - Guía de Uso Completa

## 🎯 Descripción General

PartsHub es una plataforma de e-commerce moderna para venta de repuestos de maquinaria pesada. Incluye sistema de autenticación completo, carrito de compras funcional y diseño moderno con dark mode.

## 🚀 Cómo Empezar

### Opción 1: Crear una Cuenta Nueva

1. **Accede a la página de Registro**
   - URL: `http://localhost:3000/sign-up` (desarrollo)
   - Rellena: Nombre, Email, Contraseña, Confirmar Contraseña
   - Click en "Crear Cuenta"

2. **Automáticamente te redirigirá a tu Dashboard**
   - Verás tu información de perfil
   - Podrás acceder al catálogo desde aquí

### Opción 2: Usar Credenciales de Demo

Para probar rápidamente sin crear cuenta:

```
Email: test@example.com
Password: password123
```

1. Ve a: `http://localhost:3000/sign-in`
2. Ingresa las credenciales
3. Click en "Iniciar Sesión"

## 📦 Flujo de Compra

### Paso 1: Explorar Catálogo
- Click en "Productos" en el header o "Ver Catálogo" en home
- Busca productos por nombre en el buscador
- Filtra por categoría (Motor, Transmisión, Hidráulica, Eléctrico, Chasis)

### Paso 2: Agregar al Carrito
- Click en "Agregar" en cualquier producto
- Verás un mensaje "Agregado" durante 2 segundos
- El contador en el header se actualiza automáticamente

### Paso 3: Revisar Carrito
- Click en el icono del carrito (arriba a la derecha)
- Verás todos tus items con:
  - Imagen del producto
  - Nombre y precio unitario
  - Cantidad (puedes aumentar/disminuir)
  - Opción para eliminar

### Paso 4: Ver Resumen
- Panel lateral muestra:
  - Desglose de cada item
  - Subtotal
  - Cálculo de envío y impuestos
  - Total final

### Paso 5: Checkout
- Click en "Ir al Checkout"
- (Próxima versión integrará Stripe para pagos)

## 🎨 Características del Diseño

### Tema Visual
- **Fondo**: Gradientes dark mode (navy/slate)
- **Acentos**: Naranja y rojo vibrantes
- **Efectos**: Backdrop blur, transiciones suaves
- **Responsive**: 100% adaptable a móvil, tablet y desktop

### Navegación
- **Header Dinámico**: Cambia según si está logueado
- **Carrito Visible**: Badge muestra cantidad de items
- **Menú Móvil**: Se activa en pantallas pequeñas
- **Usuario Logueado**: Muestra nombre y opción de logout

## 👤 Gestión de Perfil

### Dashboard del Usuario
- Accede desde el header cuando estés logueado
- O ve a: `/dashboard`

**Información disponible:**
- Órdenes totales (próximamente sincronizado)
- Favoritos (próximamente)
- Datos de email y nombre
- Enlace rápido al catálogo

### Cerrar Sesión
- Click en "Salir" en el header (desktop)
- O en el menú móvil si estás en phone
- Te redirigirá a la home

## 💾 Persistencia de Datos

Todos los datos se guardan en **localStorage** del navegador:

- **Carrito**: Se mantiene entre sesiones
- **Usuario**: Se mantiene entre sesiones
- **Contraseñas**: Se guardan en localStorage (para demo, en producción usar base de datos)

**Nota**: Si limpias el localStorage o cambias de navegador, los datos se pierden.

## 📱 Responsive Design

La plataforma funciona perfectamente en:

- ✅ **Móvil** (320px - 640px)
  - Menú hamburguesa
  - Stack vertical de productos
  - Botones adaptados
  
- ✅ **Tablet** (641px - 1024px)
  - Dos columnas de productos
  - Header completo
  
- ✅ **Desktop** (1025px+)
  - Tres columnas de productos
  - Sidebar con filtros
  - Navegación completa

## 🔒 Seguridad en Desarrollo

**Importante**: Este es un sistema de DEMO. Para producción se necesita:

1. Base de datos real (PostgreSQL, MongoDB, etc.)
2. Hashing de contraseñas (bcrypt, argon2)
3. JWT o sesiones seguras
4. HTTPS/SSL
5. Rate limiting para login

## 🛠 Estructura del Proyecto

```
├── app/
│   ├── page.tsx              # Home
│   ├── products/             # Catálogo
│   ├── cart/                 # Carrito
│   ├── dashboard/            # Perfil del usuario
│   ├── sign-up/              # Registro
│   ├── sign-in/              # Login
│   └── contact/              # Contacto
├── context/
│   ├── auth-context.tsx      # Contexto de autenticación
│   └── cart-context.tsx      # Contexto del carrito
├── components/
│   └── header.tsx            # Navegación principal
└── globals.css               # Estilos globales
```

## 📊 Datos de Ejemplo

### Productos Disponibles (8 productos)
1. Filtro de Aire Premium - $125.50
2. Cilindro Hidráulico 50mm - $850.00
3. Banda de Transmisión - $245.75
4. Batería Industrial 12V - $1,200.00
5. Válvula Solenoide 24V - $320.00
6. Rueda Dentada 48T - $450.00
7. Manguera Hidráulica 3/4" - $85.00
8. Alternador 80A - $650.00

### Categorías
- Motor
- Transmisión
- Hidráulica
- Eléctrico
- Chasis
- Accesorios

## 🚀 Deployment en Vercel

### Opción 1: Desde v0
1. Click en "Publish" (esquina superior derecha)
2. Select "Deploy to Vercel"
3. ¡Listo en 2 minutos!

### Opción 2: Manual desde Vercel
1. Ve a vercel.com
2. Click "New Project"
3. Conecta tu repositorio GitHub
4. Deploy

### URL después de Vercel
```
https://heavy-machinery-parts.vercel.app
```

## ⚙️ Variables de Entorno

Actualmente no se necesitan variables de entorno para desarrollo. En producción agregarías:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
DATABASE_URL=postgresql://...
STRIPE_SECRET_KEY=sk_...
```

## 🐛 Troubleshooting

### "Página no se carga"
- Asegúrate que el servidor dev está corriendo: `pnpm dev`
- Limpia cache: `Ctrl+Shift+R` (Windows) o `Cmd+Shift+R` (Mac)

### "No puedo iniciar sesión"
- Verifica que ingresaste el email y contraseña correctamente
- Prueba con credenciales demo: test@example.com / password123
- Limpia localStorage si hay problemas

### "El carrito no persiste"
- Verifica que localStorage no está bloqueado
- En navegación privada no se guardará datos

### "Estilos no se aplican"
- Limpia el build: `rm -rf .next`
- Reinicia el servidor dev: `pnpm dev`

## 📞 Soporte

Para problemas técnicos:
- Email: support@partshub.com
- Phone: +1 (555) 123-4567
- Horario: Lunes a Viernes 9-17 (Zona Horaria Central)

## 🎓 Próximas Mejoras

- Integración con Stripe para pagos reales
- Base de datos Neon PostgreSQL
- Sistema de favoritos
- Historial de órdenes
- Descuentos y cupones
- Sistema de reviews
- Chat en vivo
- Notificaciones por email

---

**Versión**: 1.0.0
**Última actualización**: 26 de Junio, 2026
**Estado**: Producción
