# MFE2023 - Cambios en Pantallas

## Pantallas Afectadas

Las siguientes pantallas son afectadas por los cambios de MFE2023:

- **AP303000** 
- **AP303010** 
- **AR301000** 
- **AR302000**
- **AR303000** 
- **CA202000** 
- **CA204000** 
- **CO200001** 
- **CO200002** 
- **CO200003**
- **CO200004**
- **CO200005**
- **CO200006**
- **CO301000**
- **CP102000**
- **CP301000**
- **CS102000**
- **CS203100**
- **EP203000** 
- **FE200001**
- **FE200002**
- **FE200003**
- **FE200006** 
- **FE200008** 
- **FE200009** 
- **FE200013** 
- **FE200014** 
- **FE200019**
- **FE200020**
- **FE200021**
- **FE200022**
- **FT101001**
- **FT101002**
- **FT101003**
- **FT101004**
- **FT101005**
- **FT101006**
- **FT301000**
- **IN202000**
- **IN202500**
- **IN301000**
- **PO301000**
- **PO302000**
- **SO301000**
- **SO303000**

## Detalle de Cambios por Pantalla

### Pantalla Proveedores (AP303000)

#### GENERAL
**Información de cuenta**
- **Alias**: Poder buscar por alias en la búsqueda general de proveedores y en pestaña ubicaciones campo Cliente/Sucursal por alias en carta porte

**Dirección Principal**
- **No. Exterior**: [Campo número exterior]
- **No. Interior**: [Campo número interior]

**Información adicional de la cuenta**
- **Lada**: [Campo código de área]
- **Extensión**: [Campo extensión telefónica]

**Facturación**
- **Uso de CDFI**: [Campo uso de CFDI]
- **Método de Pago**: [Campo método de pago]
- **Régimen Fiscal**: [Campo régimen fiscal]

#### UBICACIONES CARTA PORTE
- **+** (Agregar): [Funcionalidad agregar ubicaciones]
- **Activo**: [Estado de la ubicación]
- **No. Ubicación**: [Identificador de ubicación]
- **Calle**: [Campo dirección]
- **Código Postal**: [Campo CP]
- **Num. Exterior**: [Número exterior]
- **Num. Interior**: [Número interior]
- **Nombre de Colonia**: [Campo colonia]
- **Nombre estado**: [Campo estado]
- **Nombre País**: [Campo país]

### Pantalla Ubicaciones del Proveedor (AP303010)

#### GENERAL
**Dirección de Localización**
- **No. Exterior**: [Campo número exterior]
- **No. Interior**: [Campo número interior]

### Pantalla Facturas y Notas (AR301000)

#### CFDI
**Características**
- **Fecha de cancelación SAT**: [Fecha de cancelación]
- **Uso de CFDI**: [Campo uso de CFDI]
- **Forma de Pago**: [Campo forma de pago]
- **Método de Pago**: [Campo método de pago]
- **Sello**: [Campo sello digital]
- **No. Certificado CFDI**: [Número de certificado]
- **Monto en Letras**: [Campo monto en letras]

**Timbrado**
- **Fecha Timbrado**: [Fecha de timbrado]
- **UUID**: [Identificador único]
- **Versión CFDI**: [Versión del CFDI]

#### DOC. RELACIONADOS
- **+** (Agregar): [Funcionalidad agregar documentos]
- **Tipo de relación**: [Tipo de relación entre documentos]
- **Documento**: [Documento relacionado]
- **Tipo doc. Relacionado**: [Tipo de documento]
- **UUID**: [Identificador único del documento]

### Pantalla Pagos y Aplicaciones (AR302000)

- **Edo. Timbrado**: [Estado de timbrado]
- **No Timbrar**: [Opción no timbrar]
- **UUID**: [Identificador único]

#### COMPLEMENTOS
- **+** (Agregar): [Funcionalidad agregar complementos]
- **No. Complemento**: [Número de complemento]
- **Referencia de pago**: [Referencia del pago]
- **Moneda del Pago**: [Moneda utilizada]
- **Tipo de Cambio del Pago**: [Tipo de cambio]
- **Monto del Pago**: [Monto del pago]

### Pantalla Clientes (AR303000)

#### GENERAL
**Información de la cuenta**
- **Alias**: Poder buscar por alias en la búsqueda general de proveedores y en pestaña ubicaciones campo Cliente/Sucursal por alias en carta porte

**Dirección principal**
- **No. Exterior**: [Campo número exterior]
- **No. Interior**: [Campo número interior]

**Información adicional de la cuenta**
- **Lada**: [Campo código de área]
- **Extensión**: [Campo extensión telefónica]

**Envío facturas/complementos**
- **Correo facturación**: [Email para facturación]
- **Correo complemento**: [Email para complementos]
- **Correo interno**: [Email interno]
- **Cliente portal**: [Campo cliente portal]
- **Copia a vendedor**: [Opción copia a vendedor]

#### FACTURACIÓN
- **Uso de CFDI**: [Campo uso de CFDI]
- **Método de Pago**: [Campo método de pago]
- **Régimen Fiscal**: [Campo régimen fiscal]

#### UBICACIONES CARTA PORTE
- **+** (Agregar): [Funcionalidad agregar ubicaciones]
- **Activo**: [Estado de la ubicación]
- **No. Ubicación**: [Identificador de ubicación]
- **Calle**: [Campo dirección]
- **Código Postal**: [Campo CP]
- **Num. Exterior**: [Número exterior]
- **Num. Interior**: [Número interior]
- **Nombre de Colonia**: [Campo colonia]
- **Nombre estado**: [Campo estado]
- **Nombre País**: [Campo país]

### Pantalla Ubicaciones de Clientes (AR303020)

#### GENERAL
- **No. Exterior**: [Campo número exterior]
- **No. Interior**: [Campo número interior]

### Pantalla Cuentas de Efectivo (CA202000)

#### Info. Bancaria
- **RFC Banco**: [RFC del banco]

### Pantalla Métodos de Pago (CA204000)

#### Forma de pago SAT
- **Forma de Pago**: [Campo forma de pago]

### Pantalla Motivo traslado SAT (CO200001)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **MotivoTrasladoCD**: [Código motivo traslado]
- **Descripción**: [Descripción del motivo]
- **Activo**: [Estado activo/inactivo]

### Pantalla Tipo de Operación SAT (CO200002)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **TipoOperacionCD**: [Código tipo operación]
- **Descripcion**: [Descripción del tipo]
- **Activo**: [Estado activo/inactivo]

### Pantalla Clave de Pedimentos SAT (CO200003)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **ClavePedimentoCD**: [Código clave pedimento]
- **Descripcion**: [Descripción de la clave]
- **Activo**: [Estado activo/inactivo]

### Pantalla Incoterm SAT (CO200004)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **IncotermCD**: [Código Incoterm]
- **Descripcion**: [Descripción del Incoterm]
- **Activo**: [Estado activo/inactivo]

### Pantalla Fracción Arancelaria SAT (CO200005)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **FracciónArancelariaCD**: [Código fracción arancelaria]
- **Descripcion**: [Descripción de la fracción]
- **UnidadAduanaCD**: [Código unidad aduana]
- **Activo**: [Estado activo/inactivo]

### Pantalla Países SAT (CO200006)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **PaisCD**: [Código país]
- **Descripción**: [Descripción del país]
- **Activo**: [Estado activo/inactivo]

### Pantalla Comercio exterior (CO301000)

- **No. de factura**: [Número de factura]
- **Motivo Traslado**: [Motivo del traslado]
- **Tipo Operación**: [Tipo de operación]
- **Clave de pedimento**: [Clave del pedimento]
- **Certificado de origen**: [Certificado de origen]
- **No. Certificado O**: [Número certificado origen]
- **No. Exportador C**: [Número exportador confiable]
- **Iconterm**: [Campo Incoterm]
- **Subdivision**: [Campo subdivisión]
- **Observaciones**: [Campo observaciones]
- **Tipo CambioUSD**: [Tipo de cambio USD]
- **TotalUSD**: [Total en USD]
- **No. Registro Fisc**: [Número registro fiscal]
- **Residencia Fisc**: [Residencia fiscal]

**Datos receptor**
- **Calle**: [Dirección calle]
- **Colonia**: [Campo colonia]
- **Municipio**: [Campo municipio]
- **No. Interior**: [Número interior]
- **Numero Exterior**: [Número exterior]
- **Estado**: [Campo estado]
- **País**: [Campo país]
- **Codigo Postal**: [Código postal]

**Detalle mercancías**
- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **No. de inventario**: [Número de inventario]
- **FracciónArancelaria**: [Fracción arancelaria]
- **UnidadAduana**: [Unidad de aduana]
- **CantidadAdu**: [Cantidad aduanera]
- **ValorUnitarioAduan**: [Valor unitario aduanero]
- **ValorDolares**: [Valor en dólares]

### Pantalla Bancos SAT (CP102000)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Excel**: [Exportar a Excel]
- **Icono Subida**: [Importar desde Excel]
- **Banco**: [Código banco]
- **Nombre**: [Nombre del banco]
- **RFC Banco**: [RFC del banco]
- **Descripción**: [Descripción del banco]
- **Activo**: [Estado activo/inactivo]

### Pantalla Complemento de Pagos (CP301000)

**Controles principales**
- **CALCULAR TC**: [Calcular tipo de cambio]
- **REDONDEAR**: [Función redondear]
- **IMPRIMIR REPORTE**: [Imprimir reporte]

**Información del complemento**
- **No. Complemento**: [Número de complemento]
- **Fecha de Pago**: [Fecha del pago]
- **Forma de Pago**: [Forma de pago]
- **Referencia de Pago**: [Referencia del pago]
- **Moneda del Pago**: [Moneda utilizada]
- **Tipo de Cambio del**: [Tipo de cambio]
- **Monto del Pago**: [Monto del pago]
- **No. Operación**: [Número de operación]
- **Nombre de Banco**: [Nombre del banco]
- **RFC emisor cuenta**: [RFC emisor de cuenta]
- **Cuenta Ordenante**: [Cuenta ordenante]
- **Cuenta Beneficiaria**: [Cuenta beneficiaria]
- **TipoCadPago**: [Tipo cadena pago]
- **TotalControlMont**: [Total control monto]
- **UUID**: [Identificador único]
- **UUID Relacionado**: [UUID relacionado]

**Totales en (MXN)**
- **TotalTrasladoBaseIVA16**: [Total traslado base IVA 16%]
- **TotalTrasladosImpuestoIVA16**: [Total traslados impuesto IVA 16%]

**Totales moneda origen**
- **Total BaseIVA16 Moneda Origen**: [Total base IVA 16% moneda origen]
- **Total IVA16 Moneda Origen**: [Total IVA 16% moneda origen]

**Detalle**
- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Bajar Excel**: [Exportar a Excel]
- **Id Documento**: [Identificador documento]
- **Moneda**: [Tipo de moneda]
- **T.C**: [Tipo de cambio]
- **Metodo de Pago**: [Método de pago]
- **No. Parcialidad**: [Número de parcialidad]
- **Importe Saldo Anterior**: [Saldo anterior]
- **Importe Pagado**: [Importe pagado]
- **Importe Saldo Insoluto**: [Saldo insoluto]
- **Base DR**: [Base documento relacionado]
- **Importe DR**: [Importe documento relacionado]

### Pantalla Sucursales (CS102000)

#### DETALLES DE SUCURSAL
**Dirección Principal**
- **No. Exterior**: [Campo número exterior]
- **No. Interior**: [Campo número interior]

### Pantalla Unidades de Medida (CS203100)

- **Descripción**: [Descripción de la unidad]

### Pantalla Empleados (EP203000)

#### INFORMACION GENERAL
**Configuración de empleado**
- **Licencia**: [Campo licencia]

### Pantalla Uso de CFDI SAT (FE200001)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Uso de CFDI**: [Código uso CFDI]
- **Descripción**: [Descripción del uso]
- **Activo**: [Estado activo/inactivo]

### Pantalla productos y servicios SAT (FE200002)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Código**: [Código del producto/servicio]
- **Descripción**: [Descripción del producto/servicio]
- **SimilarWords**: [Palabras similares]
- **StartDate**: [Fecha de inicio]
- **Material Peligroso**: [Indicador material peligroso]
- **Activo**: [Estado activo/inactivo]

### Pantalla Unidades de Medida SAT (FE200003)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Unidades de Medida**: [Código unidad]
- **Nombre**: [Nombre de la unidad]
- **Descripción**: [Descripción de la unidad]

### Pantalla Aduanas SAT (FE200006)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Código Aduana**: [Código de la aduana]
- **Descripción**: [Descripción de la aduana]
- **Activo**: [Estado activo/inactivo]

### Pantalla Estados y Códigos postales (FE200008)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Código Postal**: [Código postal]
- **Estado**: [Campo estado]
- **Municipio**: [Campo municipio]
- **Localidad**: [Campo localidad]
- **Activo**: [Estado activo/inactivo]

### Pantalla Ubicaciones carta porte (FE200009)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Cuenta**: [Campo cuenta]
- **No. Ubicación**: [Número de ubicación]
- **Nombre de la ubicación**: [Nombre de ubicación]
- **Activo**: [Estado activo/inactivo]
- **Calle**: [Campo calle]
- **Codigo Postal**: [Código postal]
- **Colonia**: [Campo colonia]
- **Num, Interior**: [Número interior]
- **Num. Exterior**: [Número exterior]
- **Estado**: [Campo estado]
- **País**: [Campo país]

### Pantalla Método de pago SAT (FE200013)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Método de Pago**: [Código método de pago]
- **Descripción**: [Descripción del método]
- **Activo**: [Estado activo/inactivo]

### Pantalla Tipos de relación entre CFDI SAT (FE200014)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Tipo de relación**: [Código tipo relación]
- **Descripción**: [Descripción del tipo de relación]

### Pantalla de Formas de Pago SAT (FE200019)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Forma de pago**: [Código forma de pago]
- **Descripción**: [Descripción de la forma]
- **Activo**: [Estado activo/inactivo]

### Pantalla Régimen fiscal (FE200020)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **RégimenCD**: [Código régimen fiscal]
- **Descripción**: [Descripción del régimen]
- **Activo**: [Estado activo/inactivo]

### Pantalla Periodicidad facturas público en general (FE200021)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Periodicidad**: [Código periodicidad]
- **Descripción**: [Descripción de la periodicidad]
- **Fecha de inicio de vigencia**: [Fecha inicio vigencia]
- **Fecha final de vigencia**: [Fecha fin vigencia]
- **Activo**: [Estado activo/inactivo]

### Pantalla meses facturas público en general (FE200022)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Meses**: [Código mes]
- **Descripción**: [Descripción del mes]
- **Fecha de inicio de vigencia**: [Fecha inicio vigencia]
- **Fecha final de vigencia**: [Fecha fin vigencia]
- **Activo**: [Estado activo/inactivo]

### Pantalla tipos de permiso (FT101001)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **TipopermisoCD**: [Código tipo permiso]
- **TipopermisoDes**: [Descripción tipo permiso]
- **ClaveTransporte**: [Clave transporte]
- **Activo**: [Estado activo/inactivo]

### Pantalla tipo de configuración vehicular (FT101002)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **FEConfigVehicularCD**: [Código configuración vehicular]
- **FEConfigVehicularDES**: [Descripción configuración vehicular]
- **NumeEjes**: [Número de ejes]
- **Numllantas**: [Número de llantas]
- **Activo**: [Estado activo/inactivo]

### Pantalla Automóviles (FT101003)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **Nombre**: [Nombre del vehículo]
- **PermSCT**: [Permiso SCT]
- **PlacaVM**: [Placa del vehículo motor]
- **AnioModeloVM**: [Año modelo vehículo motor]
- **PesoBrutoVehicular**: [Peso bruto vehicular]
- **AseguraCarga**: [Aseguradora de carga]
- **AseguraRespCivil**: [Aseguradora responsabilidad civil]
- **PolizaCarga**: [Póliza de carga]
- **PolizaMedAmbiente**: [Póliza medio ambiente]
- **AseguraMedAmbiente**: [Aseguradora medio ambiente]
- **PolizaRespCivil**: [Póliza responsabilidad civil]
- **PrimaSeguro**: [Prima del seguro]

### Pantalla Unidad de peso (FT101004)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **FEClaveUnidadPesoCD**: [Código clave unidad peso]
- **Nombre**: [Nombre unidad peso]
- **FEClaveUnidadPesoDes**: [Descripción clave unidad peso]
- **Activo**: [Estado activo/inactivo]

### Pantalla Colonias SAT (FT101005)

- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **Icono Subir Excel**: [Importar desde Excel]
- **Icono Guardar**: [Guardar cambios]
- **ColoniesCD**: [Código colonia]
- **ZipCodeCD**: [Código postal]
- **Nombre colonia**: [Nombre de la colonia]

### Pantalla dirección envió carta porte (FT101006)

- **Icono Guardar**: [Guardar cambios]
- **Cuenta**: [Campo cuenta]
- **No. Ubicación**: [Número de ubicación]
- **Nombre de la ubicación**: [Nombre de ubicación]
- **Activo**: [Estado activo/inactivo]
- **Calle**: [Campo calle]
- **Código postal**: [Código postal]
- **Num. Interior**: [Número interior]
- **Num. Exterior**: [Número exterior]
- **Colonia**: [Campo colonia]
- **Estado**: [Campo estado]
- **País**: [Campo país]

### Pantalla Factura Traslado (FT301000)

**Controles principales**
- **Icono Guardar**: [Guardar cambios]
- **Icono Borrar**: [Borrar registro]
- **Acciones**: [Menú de acciones]
  - **Liberar traslado**: [Liberar el traslado]
  - **Timbrar traslado**: [Timbrar el traslado]
  - **Reabrir traslado**: [Reabrir el traslado]
  - **Imprimir Reporte**: [Imprimir reporte]

**Información general**
- **No. Referencia**: [Número de referencia]
- **DocType**: [Tipo de documento]
- **Factura Material**: [Factura material]
- **Liberado**: [Estado liberado]
- **Fecha**: [Fecha del traslado]
- **UsoCFDI**: [Uso del CFDI]
- **TranspInternac**: [Transporte internacional]
- **EntradaSalidaMerc**: [Entrada/salida mercancía]
- **ViaEntradaSalida**: [Vía entrada/salida]
- **TotalDistRec**: [Total distancia recorrida]
- **PesoBrutoTotal**: [Peso bruto total]
- **UnidadPeso**: [Unidad de peso]
- **Modulo**: [Módulo]
- **Cliente/Proveedor**: [Cliente o proveedor]
- **Observaciones**: [Campo observaciones]
- **TotalMercancias**: [Total mercancías]
- **Solicitado**: [Campo solicitado]
- **Generar Carta Porte**: [Generar carta porte]
- **UUID**: [Identificador único]
- **IdCCP**: [ID carta porte]
- **Edo.Timbrado**: [Estado timbrado]

#### UBICACIONES
- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **TipoUbicacion**: [Tipo de ubicación]
- **IDUbicacion**: [ID ubicación]
- **Cliente/Sucursal**: [Cliente o sucursal]
- **DistanciaR**: [Distancia recorrida]
- **RFCRemitenteDestino**: [RFC remitente/destinatario]
- **NombreRemitenteDestinatorio**: [Nombre remitente/destinatario]
- **Fecha Salida/Llegada**: [Fecha salida/llegada]
- **Hora Salida/Llegada**: [Hora salida/llegada]
- **Ubicación**: [Campo ubicación]
- **Calle**: [Campo calle]
- **Codigo Postal**: [Código postal]
- **No. Exterior**: [Número exterior]
- **No. Interior**: [Número interior]
- **Colonia**: [Campo colonia]
- **Estado**: [Campo estado]
- **País**: [Campo país]

#### MERCANCIAS
- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **BienesTransp**: [Bienes transportados]
- **No. Identificación**: [Número identificación]
- **Drescripcion**: [Descripción]
- **Cantidad**: [Cantidad]
- **ClaveUnidad**: [Clave unidad]
- **Pesoenkg**: [Peso en kg]
- **NumPiezas**: [Número de piezas]
- **MaterialPeligroso**: [Material peligroso]

#### AUTOTRANSPORTE
**Información de automóvil**
- **Vehículos**: [Campo vehículos]
- **PermSCT**: [Permiso SCT]
- **NumPermisoSCT**: [Número permiso SCT]
- **ConfigVehicular**: [Configuración vehicular]
- **PlacaVM**: [Placa vehículo motor]
- **AnioModeloVM**: [Año modelo vehículo motor]
- **PesoBrutoVehicu**: [Peso bruto vehicular]

**Información de remolques**
- **SubTipoRem**: [Subtipo remolque]
- **PlacaR**: [Placa remolque]
- **AnioModeloVMR**: [Año modelo vehículo motor remolque]

**Información de seguros**
- **AseguraRespCivil**: [Aseguradora responsabilidad civil]
- **PolizaRespCivil**: [Póliza responsabilidad civil]
- **AseguraCarga**: [Aseguradora carga]
- **PolizaCarga**: [Póliza carga]
- **PolizaMedAmbiente**: [Póliza medio ambiente]
- **AseguraMedAmb**: [Aseguradora medio ambiente]
- **PrimaSeguro**: [Prima seguro]

#### OPERADOR
- **+** (Agregar), **X** (Eliminar): [Funciones básicas]
- **Icono Bajar Excel**: [Exportar a Excel]
- **TipoFigura**: [Tipo de figura]
- **Operador**: [Campo operador]
- **RFCFigura**: [RFC figura]
- **NombreFigura**: [Nombre figura]
- **NumLicencia**: [Número licencia]

### Pantalla artículos no Almacenados (IN202000)

#### GENERAL
- **Producto SAT**: [Producto SAT]

### Pantalla Artículos Almacenados (IN202500)

#### GENERAL
**Valores de omisión artículos**
- **Productos SAT**: [Productos SAT]

### Pantalla Recepciones (IN301000)

#### PEDIMENTO
- **Aduana**: [Campo aduana]
- **Fecha de Import**: [Fecha de importación]
- **Nro. Pedimento**: [Número de pedimento]

### Pantalla Órdenes de Compra (PO301000)

#### TRASLADO
- **+** (Agregar): [Funcionalidad agregar]
- **Icono Bajar Excel**: [Exportar a Excel]
- **No. Referencia**: [Número de referencia]
- **Factura Material**: [Factura material]
- **Nombre de la Cuenta**: [Nombre de la cuenta]
- **UUID**: [Identificador único]
- **FechaTimbrado**: [Fecha timbrado]
- **Edo.Timbrado**: [Estado timbrado]

### Pantalla Recepciones de Compras (PO302000)

#### PEDIMENTO
- **Aduana**: [Campo aduana]
- **Fecha de Import**: [Fecha de importación]
- **Nro.Pedimento**: [Número de pedimento]

### Pantalla Ordenes de venta - TR (SO301000)

#### TRASLADO
- **+** (Agregar): [Funcionalidad agregar]
- **Icono bajar Excel**: [Exportar a Excel]
- **No.Referencia**: [Número de referencia]
- **Factura Material**: [Factura material]
- **Nombre de la Cuenta**: [Nombre de la cuenta]
- **FechaTimbrado**: [Fecha timbrado]
- **UUID**: [Identificador único]
- **Edo. Timbrado**: [Estado timbrado]

### Pantalla Facturas (SO303000)

**Controles principales**
- **No timbrar**: [Opción no timbrar]
- **Edo. Timbrado**: [Estado timbrado]

#### INFO ADICIONAL
- **Tipo de factura**: [Tipo de factura]
- **Tipo de venta**: [Tipo de venta]
- **Precio incluye flete**: [Precio incluye flete]
- **Monto del flete m**: [Monto del flete]

#### INFO PRODUCTOS
- **División producto**: [División del producto]

#### INFO REFACTURACION
- **Es refactura**: [Indicador es refactura]
- **Factura anterior**: [Factura anterior]

#### COMPLEMENTO COMERCIO EXTERIOR
- **Comercio exterior**: [Campo comercio exterior]

#### CFDI
**Características**
- **Fecha cancelación SAT**: [Fecha cancelación SAT]
- **Uso de CDFI**: [Uso de CFDI]
- **Forma de pago**: [Forma de pago]
- **Método de pago**: [Método de pago]
- **Sello**: [Campo sello]
- **No.Certificado CDFI**: [Número certificado CFDI]
- **Monto en Letras**: [Monto en letras]

**Info. Timbrado**
- **FechaTimbrado**: [Fecha timbrado]
- **UUID**: [Identificador único]
- **Versión CFDI**: [Versión CFDI]

**Factura público en general**
- **Periodicidad**: [Campo periodicidad]
- **Meses**: [Campo meses]

#### DOC. RELACIONADOS
- **Tipo de relación**: [Tipo de relación]
- **Documento**: [Documento relacionado]
- **Tipo doc. Relacionado**: [Tipo documento relacionado]
- **UUID**: [Identificador único]

#### TRASLADO
- **No. Referencia**: [Número de referencia]
- **Factura Material**: [Factura material]
- **Nombre de la Cuenta**: [Nombre de la cuenta]
- **UUID**: [Identificador único]
- **FechaTimbrado**: [Fecha timbrado]
- **Edo.Timbrado**: [Estado timbrado]

#### WEATHERFORD
- **Comprador**: [Campo comprador]
- **ProductLine**: [Línea de producto]
- **SoldtoRazonSocial**: [Sold to razón social]
- **SoldtoColonia**: [Sold to colonia]
- **SoldtoCiudad**: [Sold to ciudad]
- **SoldtoCodEstado**: [Sold to código estado]
- **SoldtoPais**: [Sold to país]
- **ShiptoRazonSocial**: [Ship to razón social]
- **ShiptoCiudad**: [Ship to ciudad]
- **ShiptoCodEstado**: [Ship to código estado]
- **ShiptoColonia**: [Ship to colonia]
- **ShiptoPais**: [Ship to país]
- **BilltoRazonSocial**: [Bill to razón social]
- **BilltoCiudad**: [Bill to ciudad]
- **BillCodE**: [Bill código estado]
- **BillColonia**: [Bill colonia]
- **BilltoPais**: [Bill to país]

**Acción final**
- **Timbrar**: [Función timbrar]

---

> **Nota de Observación**: Estos cambios corresponden a la actualización MFE2023 y representan una implementación masiva de funcionalidades relacionadas con facturación electrónica, cumplimiento SAT, carta porte, comercio exterior y timbrado fiscal. La actualización abarca más de 40 pantallas diferentes e incluye controles de importación/exportación Excel, validaciones fiscales, campos de trazabilidad y funciones de timbrado automático para cumplir con las regulaciones mexicanas vigentes.