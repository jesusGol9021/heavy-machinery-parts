# PartsHub - Plataforma E-commerce de Repuestos para Maquinaria Pesada

Una plataforma completa de venta de repuestos para maquinaria pesada con múltiples roles de usuario, carrito de compras, integración de pagos con Stripe y sistema de cotizaciones.

## 🚀 Características

### Para Clientes
- ✅ Navegación de catálogo completo con filtrado por categorías
- ✅ Sistema de carrito de compras con actualización en tiempo real
- ✅ Checkout con múltiples opciones de pago (Stripe + Transferencia)
- ✅ Historial de órdenes completo
- ✅ Sistema de solicitud de cotizaciones personalizadas
- ✅ Dashboard personal con resumen de actividad

### Para Administradores
- ✅ Gestión completa de productos (CRUD)
- ✅ Gestión de categorías
- ✅ Visualización de órdenes y cotizaciones
- ✅ Reportes de ventas

### Para Vendedores
- ✅ Panel de ventas personalizadas
- ✅ Seguimiento de comisiones
- ✅ Gestión de inventario

### Características Técnicas
- ✅ Autenticación con Better Auth (Email + Password)
- ✅ Base de datos PostgreSQL con Neon
- ✅ ORM Drizzle para consultas type-safe
- ✅ Animaciones fluidas con Framer Motion
- ✅ Diseño responsive con Tailwind CSS
- ✅ Componentes UI con shadcn/ui
- ✅ Next.js 16 con App Router
- ✅ Server Actions para operaciones seguras del lado del servidor

## 📋 Stack Técnico

- **Frontend**: Next.js 16, React 19, TypeScript, Tailwind CSS
- **Backend**: Next.js Server Actions, API Routes
- **Database**: PostgreSQL (Neon), Drizzle ORM
- **Authentication**: Better Auth
- **Payments**: Stripe
- **UI Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React

## 🗄️ Estructura de Base de Datos

### Tablas Principales
- **user**: Usuarios del sistema (admin, seller, customer)
- **session**: Sesiones de autenticación
- **account**: Cuentas de proveedores
- **verification**: Códigos de verificación

### Tablas de Negocio
- **category**: Categorías de repuestos
- **product**: Productos/Repuestos con especificaciones completas
- **cart_item**: Items en carrito de compra
- **order**: Órdenes de compra
- **order_item**: Items dentro de órdenes
- **quotation**: Solicitudes de cotización

## 🔐 Sistema de Autenticación

El sistema utiliza Better Auth con email y contraseña:
- Registrarse en `/sign-up`
- Iniciar sesión en `/sign-in`
- Rol asignado: customer por defecto
- Sesiones seguras con tokens

## 📦 Instalación y Configuración

### 1. Instalar Dependencias
```bash
pnpm install
```

### 2. Variables de Entorno
```bash
# .env.local o variables de Vercel
DATABASE_URL=your-neon-database-url
BETTER_AUTH_SECRET=your-secret-key
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=your-stripe-key
STRIPE_SECRET_KEY=your-stripe-secret
```

### 3. Ejecutar Servidor de Desarrollo
```bash
pnpm dev
```

Abre [http://localhost:3000](http://localhost:3000) en tu navegador.

## 🛣️ Rutas Principales

### Públicas
- `/` - Página de inicio
- `/catalog` - Catálogo de productos
- `/sign-in` - Iniciar sesión
- `/sign-up` - Registrarse

### Autenticadas (Cliente)
- `/dashboard` - Panel personal
- `/cart` - Carrito de compras
- `/orders` - Historial de órdenes
- `/orders/[id]` - Detalles de orden
- `/quotations` - Mis cotizaciones
- `/quotations/new` - Nueva cotización

### Administrativas
- `/admin` - Panel de administración
- `/admin/products` - Gestión de productos
- `/admin/orders` - Gestión de órdenes
- `/admin/quotations` - Gestión de cotizaciones

## 💳 Integración con Stripe

El sistema soporta:
- **Pago con Tarjeta**: Integración embebida con Stripe Checkout
- **Transferencia Bancaria**: Datos enviados por email

Usa `pk_test_*` en desarrollo para pruebas.

## 🎨 Diseño y Animaciones

- Colores profesionales: Azul marino (#1e3a8a) + Naranja (#ff7a00)
- Animaciones suaves con Framer Motion
- Diseño responsive para mobile, tablet y desktop
- Modo claro y oscuro soportado

## 📊 Datos de Ejemplo

El sistema viene con:
- 6 categorías de repuestos
- 10 productos de ejemplo con especificaciones completas
- Imágenes placeholder personalizadas

## 🚀 Deployment

La aplicación está optimizada para Vercel:

```bash
# Desplegar a Vercel
vercel deploy
```

## 📝 Notas Importantes

1. **Seguridad**: Las contraseñas se hashean automáticamente con Better Auth
2. **Sesiones**: Válidas por 30 días por defecto
3. **Carrito**: Se almacena en base de datos, no en localStorage
4. **Órdenes**: Tienen múltiples estados (pending, completed, cancelled, etc.)
5. **Cotizaciones**: Requieren validación manual del administrador

## 🐛 Troubleshooting

### Error de conexión a BD
- Verifica que `DATABASE_URL` sea correcto
- Asegúrate que la base de datos está creada en Neon

### Error de autenticación
- Verifica que `BETTER_AUTH_SECRET` está configurada
- Genera una nueva clave si es necesario: `openssl rand -base64 32`

### Problemas con Stripe
- Usa claves de prueba en desarrollo
- Verifica que `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` es accesible desde el cliente

## 📚 Documentación Adicional

- [Neon Documentation](https://neon.tech/docs)
- [Better Auth](https://www.better-auth.com)
- [Drizzle ORM](https://orm.drizzle.team)
- [Next.js 16](https://nextjs.org)
- [Stripe Documentation](https://stripe.com/docs)

## 📄 Licencia

Este proyecto está disponible bajo licencia MIT.

## ✨ Características Futuras

- [ ] Sistema de reseñas y calificaciones
- [ ] Wishlist de productos
- [ ] Notificaciones por email
- [ ] Seguimiento de envíos en tiempo real
- [ ] Programa de fidelización
- [ ] Integración con API de proveedores
- [ ] Sistema de devoluciones
- [ ] Analytics y reportes avanzados
