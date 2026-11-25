# COTIZADOR-HAFTEN

Cotizador comercial de **HAFTEN** para equipos HVAC/R, BMS, medición y ahorro de energía.
Basado en el sistema del Cotizador PARTUM, con la identidad, logotipo y catálogo de productos de haften.com.mx.

## Funciones

- Catálogo Haften integrado (humidificadores Neptronic, deshumidificadores Bry-Air, calefactores,
  termostatos, válvulas, medidores, sensores y servicios) con búsqueda y filtros por categoría.
- Vista previa de la cotización en tiempo real, con foto, marca y modelo de cada producto.
- Conceptos editables, duplicables y reordenables.
- Cálculo automático de subtotal, descuento, IVA y total (MXN / USD).
- Datos del asesor, contacto del emisor y datos bancarios opcionales.
- Guardado local del borrador y exportación A4 mediante la vista de impresión.
- NORA: generación asistida de conceptos con Gemini y dictado por voz.

## Desarrollo

```bash
npm install
cp .env.example .env.local
npm run dev
```

Configura en `.env.local` (y en Vercel → Settings → Environment Variables):

```env
GEMINI_API_KEY=tu_clave_privada
```

La clave se usa únicamente en `/api/nora` y nunca se incluye en el código del navegador.

## Catálogo

Los productos viven en `src/catalog.js` y las imágenes en `public/productos/`.
Los precios se capturan en cada cotización.

## Producción

```bash
npm run build
npm run preview
```
