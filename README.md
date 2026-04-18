# OMC Leads

Aplicacion frontend estilo SaaS para una prueba tecnica de gestion de leads. Esta construida con `Next.js App Router`, `TypeScript`, `Tailwind CSS`, `shadcn/ui`, `TanStack Query`, `React Hook Form`, `Zod`, `Recharts` y persistencia en `localStorage`.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui patterns + Radix UI
- TanStack Query
- React Hook Form + Zod
- Recharts
- Lucide Icons
- Vitest + Testing Library

## Que incluye

- CRUD completo de leads
- filtros por busqueda, fuente y rango de fecha
- paginacion y orden por fecha mas reciente
- loading, error y empty states
- dashboard enriquecido con metricas, graficos y comparativas
- AI Summary local con estados de carga y error
- dark mode
- persistencia en `localStorage`
- toasts y confirm dialog
- arquitectura por features
- tests utiles listos para correr

## Instalacion

```bash
npm install
```

## Desarrollo

```bash
npm run dev
```

La app quedara disponible en `http://localhost:3000`.

## Scripts

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run typecheck
npm run test
```

## Decisiones tecnicas

- `feature-based architecture`: separa UI, servicios, hooks, schemas y utilidades por dominio.
- `TanStack Query`: maneja lectura y mutaciones del mock service para mantener una capa de cache y estados consistente.
- `localStorage` versionado: se persiste una estructura `{ version, items }` para poder migrarla facilmente si la prueba creciera.
- `mock service layer`: toda la logica CRUD vive fuera de las paginas para que luego sea facil cambiar a una API real.
- `dashboard product-minded`: no se limita a KPI basicos; agrega comparativas, insights, oportunidades y actividad reciente.
- `AI Summary local`: simula una experiencia ejecutiva util sin depender de un LLM real.

## Como funcionan los mocks

- El seed inicial vive en [src/data/leads.ts](/Users/sebas/Desktop/projects/One-Million-prueba/src/data/leads.ts).
- Al abrir la app por primera vez, ese seed se guarda en `localStorage` bajo la llave `omc-leads-db:v1`.
- Las operaciones de crear, editar y eliminar actualizan el almacenamiento local y luego invalidan queries para refrescar la UI.
- El servicio agrega una latencia artificial corta para que los estados de carga se vean y se evalue la UX.

## Testing

Se incluyen pruebas para:

- validaciones del schema de lead
- filtrado y orden de leads
- utilidades de metricas del dashboard
- generacion del resumen ejecutivo
- feedback del formulario frente a errores de validacion

Ejecuta:

```bash
npm run test
```

## Variables de entorno

Existe un archivo `.env.example` con variables opcionales:

- `NEXT_PUBLIC_APP_NAME`
- `NEXT_PUBLIC_ENABLE_QUERY_DEVTOOLS`

La app funciona sin configuracion adicional.

## Que mejoraria con mas tiempo

- sincronizacion con backend real y autenticacion
- tests de integracion mas profundos para flujos completos
- filtros guardados por usuario
- exportacion CSV
- telemetria y tracking de conversion por fuente
- animaciones mas avanzadas para onboarding y empty states
