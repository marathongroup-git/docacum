---
sidebar_position: 4
---

# Funcionalidades Técnicas

Esta sección profundiza en la implementación del código, detallando cómo se resuelven los desafíos técnicos clave del proyecto, así como la documentación de los componentes principales.

## 1. Componentes Principales

A continuación se describen los componentes core de la aplicación.

### `PhotoSection`

Se utiliza para mostrar fotos o videos de perfil de manera condicional.

**Props:**

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `src` | `string` | URL de la imagen o video. |
| `alt` | `string` | Texto alternativo para accesibilidad. |
| `isVideo` | `boolean` | Indica si el recurso debe renderizarse como video (`<video>`) o imagen (`<img>`). |

**Ejemplo de Uso:**
```tsx
<PhotoSection 
  video={contact.video} 
  photo={contact.photo} 
  fallbackImage={`${process.env.PUBLIC_URL}/fallback-image.jpg`}
/>
```

---

### `QRSection`

Componente encargado de renderizar visualmente el código QR personalizado.

**Props:**

| Prop | Tipo | Descripción |
| :--- | :--- | :--- |
| `qrValue` | `string` | Valor (URL o texto) que se codificará. |
| `logo` | `string` | URL del logotipo a incrustar en el centro. |
| `color` | `string` | Color hexadecimal de los puntos del QR. |

**Ejemplo de Uso:**
```tsx
<QRSection 
  qrValue={`https://wa.me/${contact.phone}`} 
  logo={LOGO_QR} 
  color={COLORS.marathonRed}
/>
```

---

### `VCardGenerator` (Página Principal)

Sirve como el contenedor inteligente (**Smart Component**) de la aplicación. No recibe propiedades (`props`), ya que obtiene su contexto directamente de la URL.

**Responsabilidades:**
1.  **Lectura de URL**: Utiliza `useSearchParams` para detectar parámetros como `id`, `email` o `phone`.
2.  **Búsqueda de Datos**: Cruza los parámetros de la URL con el archivo `data/employees.ts` para encontrar la información del colaborador.
3.  **Visualización**: Renderiza la tarjeta digital completa.
4.  **Generación VCF**: Ejecuta la lógica para crear y descargar el archivo de contacto `.vcf`.

---

## 2. Enrutamiento (HashRouter vs BrowserRouter)

Dado que la aplicación está alojada en **GitHub Pages**, el servidor no soporta el enrutamiento del lado del cliente tradicional (History API) porque cualquier ruta distinta a `/` retornaría un error 404.

Para solucionar esto, utilizamos **HashRouter**. Esto significa que todas las rutas se manejan después del símbolo `#` en la URL.

*   **Ruta VCard**: `...github.io/vcard/#/?id=chernandez`
*   **Ruta Generador**: `...github.io/vcard/#/generator`

**Implementación en `App.tsx`:**

```tsx
import { HashRouter, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <div className="App">
      <HashRouter> {/* <--- Clave para GitHub Pages */}
        <Routes>
          <Route path="/" element={<VCardGenerator />} />
          <Route path="/generator" element={<LinkGenerator />} />
        </Routes>
      </HashRouter>
    </div>
  );
}
```

---

## 3. Estrategias de Implementación

### Sistema de Resolución de Identidad (Reciclaje)

El componente `VCardGenerator` implementa una estrategia de "búsqueda en cascada" para garantizar que siempre se muestre información, incluso si el enlace es antiguo o si se reutilizan tarjetas NFC.

**Lógica de Búsqueda:**

```typescript
useEffect(() => {
    const employeeId = getParam('id'); // 1. Intenta obtener ID explícito

    if (employeeId) {
      // A. Búsqueda Directa por ID
      const foundEmployee = employees.find(emp => emp.id === employeeId);
      if (foundEmployee) setContact(foundEmployee);
      
    } else {
      // B. Búsqueda por coincidencia de datos (Reciclaje)
      const urlEmail = getParam('email');
      const urlPhone = getParam('phone');

      if (urlEmail || urlPhone) {
        // Busca en la base de datos alguien que tenga ese correo O teléfono
        const matchedEmployee = employees.find(emp => {
          return (emp.email === urlEmail) || (emp.phone === urlPhone);
        });
        
        if (matchedEmployee) setContact(matchedEmployee);
      }
      
      // C. Fallback a datos en URL (Modo Legacy)
      // Si no encuentra nada en la BD, usa los datos crudos de la URL
      else {
         const firstName = getParam('firstName');
         // ... construye objeto temporal con params
      }
    }
}, [searchParams]);
```

### Generación y Optimización de VCard

La creación del archivo `.vcf` implica un desafío importante: los límites de tamaño para las fotos de perfil en dispositivos móviles (especialmente iOS).

**Procesamiento de Imagen con Canvas:**

Antes de incrustar la foto, la procesamos dinámicamente:
1.  Obtenemos la imagen original.
2.  La dibujamos en un Canvas HTML5.
3.  La redimensionamos a un máximo de **300x300px**.
4.  Exportamos a Base64 con compresión JPEG (0.7).

```typescript
// Fragmento de lógica de optimización
if (contact.photo) {
    const img = new Image();
    // ... carga la imagen ...

    // Redimensionamiento inteligente
    const maxWidth = 300;
    if (img.width > maxWidth) {
        // ... calcula nuevo alto manteniendo aspecto
    }

    // Renderizado en Canvas
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    ctx?.drawImage(img, 0, 0, width, height);

    // Conversión a Base64 optimizado
    const base64 = canvas.toDataURL('image/jpeg', 0.7).split(',')[1];
    
    vcard.addPhoto(base64, 'JPEG');
}
```

### Renderizado de Códigos QR

Para los códigos QR visuales se utiliza `qr-code-styling`, permitiendo incrustar logos sin afectar la legibilidad.

```typescript
const qrCode = new QRCodeStyling({
    width: 350,
    height: 350,
    data: qrValue,
    dotsOptions: {
        color: COLORS.marathonRed, // Consistencia de marca
        type: 'dots', // Estilo redondeado
    },
    image: LOGO_URL, 
    imageOptions: {
        hideBackgroundDots: true, // Limpia el área detrás del logo
        imageSize: 0.4,
    },
});
```
