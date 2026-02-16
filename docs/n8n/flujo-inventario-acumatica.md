---
sidebar_position: 1
---

# Flujo de Inventario HELUKABEL (Acumatica -> Excel -> Outlook)

Este flujo de trabajo automatiza la extracción de un inventario específico desde Acumatica, procesa los datos para generar listas de precios y envía el resultado por correo electrónico.

## Resumen del Flujo (Paso a Paso)

El flujo se compone de 5 nodos principales, ejecutándose de manera secuencial como se muestra en el diagrama:

1.  **When clicking 'Execute workflow'**:
    *   **Tipo**: Trigger Manual.
    *   **Función**: Inicia el proceso cuando el usuario hace clic en el botón de ejecución.

2.  **HTTP Request**:
    *   **Acción**: Realiza una petición `GET` a la URL OData de Acumatica.
    *   **Objetivo**: Obtener la lista completa de inventarios en formato JSON.

3.  **Code in JavaScript**:
    *   **Acción**: Ejecuta un script personalizado.
    *   **Objetivo**: Filtrar los productos de la marca "HELUKABEL" y reestructurar los datos para generar múltiples registros de precios por artículo.

4.  **Convert to File**:
    *   **Acción**: Convert to XLSX (Spreadsheet File).
    *   **Objetivo**: Transforma el JSON procesado en un archivo binario de Excel (.xlsx) listo para ser adjuntado.

5.  **Send a message (Outlook)**:
    *   **Acción**: Envío de correo electrónico.
    *   **Objetivo**: Utiliza la conexión con Microsoft Outlook para enviar el archivo Excel generado a los destinatarios configurados.

## Detalle de la Lógica (Code Node)

El corazón de este flujo es el nodo **"Code in JavaScript"** que transforma la lista cruda de Acumatica. 

### Lógica de Negocio
*   **Filtro de Marca**: Solo se procesan los artículos cuya propiedad `Marca` comienza con "HELUKABEL" (sin distinguir mayúsculas/minúsculas).
*   **Desglose de Precios**: Por cada artículo encontrado, se generan 6 filas correspondientes a los siguientes códigos de precio: `["FI", "IN", "CO", "UF", "DI", "CF"]`.
*   **Mapeo de Campos**: Se reestructuran los datos para cumplir con el formato de carga de precios (Tipo de precio, Código, No. de Inventario, U.M., etc.).

### Código Implementado

```javascript
// Obtener los datos del nodo anterior (Acumatica OData)
const items = $input.all()[0]?.json;

if (items && Array.isArray(items.value)) {
  const filteredList = [];
  // Lista de códigos de precio a generar por cada artículo
  const priceCodes = ["FI", "IN", "CO", "UF", "DI", "CF"];

  for (const row of items.value) {
    const subBrand = row.Marca;
    // Validar que la marca sea HELUKABEL
    const successBrand = subBrand && typeof subBrand === 'string' && subBrand.trim().toUpperCase().startsWith('HELUKABEL');
    
    if (successBrand) {
      // Por cada código de precio, crear una entrada
      for (const code of priceCodes) {
        filteredList.push({
          json: {
            "Tipo del precio": "Clase de precio del Cliente",
            "Codigo del Precio": code,
            "ID Alternativo":"",
            "No. de Inventario": row.NodeInventario,
            "U.M.": row.UnidadBase,
            "Almacén":"",
            "Cantidad de quiebre":"1.000000",
            "Precio Origen":"",
            "Precio Pendiente":"",
            "Moneda":"",
            "Marca":row.Marca
          }
        });
      }
    }
  }

  // Ordenar la lista resultante basándose en el orden de priceCodes
  filteredList.sort((a, b) => {
    return priceCodes.indexOf(a.json["Codigo del Precio"]) - priceCodes.indexOf(b.json["Codigo del Precio"]);
  });

  return filteredList;
}

return [];
```
