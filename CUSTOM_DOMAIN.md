# Configurar Dominio Personalizado en Vercel

## ¿Por qué usar un dominio personalizado?

En lugar de que tu app se vea en `https://heavy-machinery-parts.vercel.app`, puedes configurarla en tu propio dominio personalizado como:
- `https://www.partshub.com`
- `https://repuestos.tuempresa.com`
- Cualquier dominio que desees

## Opciones de Dominios

### 1. **Comprar Dominio Nuevo** (Recomendado)
Compra un dominio completamente nuevo en registradores populares:

#### Registradores Recomendados:
- **Namecheap** (namecheap.com) - Económico
- **GoDaddy** (godaddy.com) - Popular
- **Google Domains** (domains.google.com) - Simple
- **Bluehost** (bluehost.com) - Todo en uno
- **1&1** (1and1.com) - Buena relación precio-calidad

**Precio promedio:** $8-15 USD/año

#### Pasos para Comprar:
1. Elige registrador → Busca dominio disponible
2. Haz check-out y paga
3. Recibirás credenciales de acceso
4. Ve a la sección "DNS Management" o "Name Servers"

### 2. **Si Ya Tienes Dominio**
Si tienes un dominio registrado en otro lado, simplemente modifica los name servers.

---

## Paso 1: Desplegar en Vercel

Primero, asegúrate que tu app está desplegada en Vercel:

1. Ve a https://vercel.com
2. Haz login
3. Selecciona tu proyecto `heavy-machinery-parts`
4. Debería estar en vivo en: `https://heavy-machinery-parts.vercel.app`

---

## Paso 2: Agregar Dominio en Vercel

### En el Dashboard de Vercel:

1. **Ve a Settings del Proyecto**
   - Abre tu proyecto en Vercel
   - Click en "Settings" (arriba a la derecha)

2. **Busca "Domains"**
   - Click en "Domains" en la barra lateral izquierda

3. **Agrega tu Dominio**
   - Click en "Add"
   - Escribe tu dominio (ej: `partshub.com` o `www.partshub.com`)
   - Click "Add Domain"

4. **Vercel Genera los Name Servers**
   Vercel te mostrará algo como:
   ```
   Name Server 1: ns1.vercel-dns.com
   Name Server 2: ns2.vercel-dns.com
   Name Server 3: ns3.vercel-dns.com
   Name Server 4: ns4.vercel-dns.com
   ```
   **COPIA ESTOS DATOS** - Los necesitarás en el paso 3

---

## Paso 3: Configurar DNS en tu Registrador

### Ejemplo: Namecheap

1. **Login en Namecheap** (namecheap.com)

2. **Ve a "Domain List"**
   - Click en "Dashboard"
   - Busca tu dominio
   - Click en "Manage"

3. **Cambia los Nameservers**
   - Tab: "Nameservers"
   - Opción: "Custom DNS"
   - Reemplaza los nameservers existentes con los de Vercel:
     ```
     ns1.vercel-dns.com
     ns2.vercel-dns.com
     ns3.vercel-dns.com
     ns4.vercel-dns.com
     ```
   - Click "Save"

4. **Espera 24-48 horas**
   Los cambios DNS pueden tardar hasta 48 horas en propagarse

### Ejemplo: Google Domains

1. **Login en Google Domains** (domains.google.com)

2. **Selecciona tu dominio**
   - Click en el dominio en la lista

3. **DNS → Custom Name Servers**
   - Click en "DNS" (barra lateral)
   - Busca "Custom Name Servers"
   - Ingresa los 4 nameservers de Vercel
   - Guarda

### Ejemplo: GoDaddy

1. **Login en GoDaddy** (godaddy.com)

2. **Dashboard → Mis Productos**
   - Busca tu dominio
   - Click en "Configurar"

3. **Name Servers**
   - Busca "Nameservers"
   - Click "Cambiar Nameservers"
   - Selecciona "Usar nameservers personalizados"
   - Ingresa los 4 de Vercel
   - Guarda

---

## Paso 4: Verificación

### En Vercel:
Una vez que esperes 24-48 horas:

1. Vuelve a Vercel Settings → Domains
2. Tu dominio debería mostrar "✓ Valid Configuration"
3. Si no aparece, click en el dominio y verifica los nameservers

### En Tu Navegador:
1. Abre `https://www.tudominio.com`
2. ¡Debería mostrar tu app de PartsHub!

---

## SSL/HTTPS Automático

**¡Vercel configura HTTPS automáticamente!**

Tu sitio estará protegido con certificado SSL válido (verde en navegador):
- ✅ `https://www.partshub.com` (Seguro)
- ❌ `http://www.partshub.com` (No seguro)

---

## Opciones Adicionales

### 1. Redirigir `www` a raíz (o viceversa)

En Vercel puedes hacer que ambas URLs funcionen:
- `www.partshub.com` → `partshub.com`
- O al revés

Vercel maneja esto automáticamente cuando agregas el dominio.

### 2. Subdominio Específico

Puedes usar un subdominio:
- `ecommerce.tuempresa.com`
- `tienda.miempresa.com`
- `api.partshub.com`

En Vercel simplemente agrega ese subdominio en "Add Domain".

### 3. Multiple Dominios

Vercel permite agregar múltiples dominios al mismo proyecto:
- Ejemplo: `partshub.com`, `www.partshub.com`, `shop.partshub.com`

---

## Troubleshooting

### ❌ "Domain Verification Failed"

**Posible causa:** Los nameservers aún no se propagaron

**Solución:**
1. Espera 24-48 horas más
2. Verifica que escribiste bien los nameservers en tu registrador
3. Usa https://dnschecker.org para verificar propagación

### ❌ "No Connection" en el dominio

**Posible causa:** DNS aún está en proceso

**Solución:**
1. Limpia caché del navegador (Ctrl+Shift+Delete)
2. Espera más tiempo (hasta 48 horas)
3. Usa otro navegador o incógnito

### ❌ "Certificate Error"

**Posible causa:** SSL no se ha generado aún

**Solución:**
1. Espera 24 horas después de agregar dominio en Vercel
2. Limpia caché del navegador

### ✅ "Domain Already Claimed"

Si ves este error, alguien ya agregó el dominio en Vercel.

**Soluciones:**
1. Si es tu dominio: Contacta a Vercel support
2. Si lo compraste nuevo: Prueba el dominio de nuevo
3. Espera 24 horas y reintenta

---

## Costos

| Concepto | Costo | Nota |
|----------|-------|------|
| Dominio | $8-15/año | De una vez, se renueva anualmente |
| Vercel Pro | $20/mes | Opcional, para más funciones |
| HTTPS | GRATIS | Vercel incluye |
| Bandwdith | GRATIS | Vercel incluye (hasta cierto límite) |

---

## Resumen Rápido

```
1. Compra dominio en Namecheap ($8-15)
2. En Vercel Settings → Domains → Add tu dominio
3. Copia nameservers de Vercel
4. En Namecheap → Manage → Nameservers → Pega los de Vercel
5. Espera 24-48 horas
6. ¡Listo! Tu app está en www.tudominio.com
```

---

## Preguntas Frecuentes

**P: ¿Mi app seguirá funcionando en vercel.app?**
R: Sí, ambas URLs funcionarán. Vercel redirige automáticamente.

**P: ¿Qué pasa si cambio de registrador?**
R: Solo cambias los nameservers en el nuevo registrador. Vercel sigue igual.

**P: ¿Puedo usar subdominio sin raíz?**
R: Sí, agrega `tienda.tudominio.com` directamente en Vercel.

**P: ¿Se cobra mensualmente el dominio?**
R: No, es anual. Se renueva automáticamente.

**P: ¿Perderé mis datos si cambio de registrador?**
R: No, los nameservers solo apuntan a Vercel. Tus datos están en Vercel.

---

## Soporte

Si tienes problemas:

1. **Vercel Support**: https://vercel.com/support
2. **Tu Registrador**: Contacta su soporte
3. **Documentación Vercel**: https://vercel.com/docs/concepts/projects/domains

---

**¡Felicidades! Ahora tu app PartsHub estará accesible desde tu propio dominio personalizado!** 🎉
