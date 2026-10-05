# Portafolio de Maximiliano González

Sitio estático construido con Next.js (App Router), TypeScript y Tailwind CSS v4, con estética cybercore "Terminal / Hacker" (verde fósforo y ámbar) y modo oscuro/claro.

## Ejecutar en local

Requiere Node 20.9 o superior; el repositorio fija Node 22 en `.nvmrc`.

```bash
nvm use        # lee .nvmrc (Node 22)
npm i
npm run dev    # http://localhost:3000
```

Otros comandos:

| Comando | Qué hace |
| --- | --- |
| `npm test` | Ejecuta las pruebas (Vitest + Testing Library) |
| `npm run lint` | ESLint |
| `npm run typecheck` | Verificación de tipos |
| `npm run build` | Genera el sitio estático en `out/` |

## Dónde editar

### Contenido: `src/content/es.ts`

Todo el texto visible está en este archivo, tipado por `src/content/types.ts`. Los componentes no contienen texto de usuario.

- El nombre del empleador "Kronogram" se define una sola vez en la constante `KRONOGRAM_NAME`. Si cambia (por ejemplo a "Plhain (ex Kronogram)"), edita solo esa línea.
- Nunca incluyas un teléfono: hay una prueba que falla si aparece.

### Colores: `src/styles/theme.css`

Solo editas **cinco variables base por modo**, en el bloque `EDIT HERE`:

| Variable | Uso |
| --- | --- |
| `--c-bg` | Fondo de la página |
| `--c-fg` | Texto principal |
| `--c-accent` | Acento principal (verde fósforo) |
| `--c-accent-2` | Acento secundario (ámbar) |
| `--c-alert` | Alertas y estados críticos |

Superficies, bordes, texto atenuado, resplandores, degradados, rejilla, scanlines, selección y foco se derivan automáticamente con `color-mix(in oklch, ...)`. Están mapeados a Tailwind (`bg-surface`, `text-accent`, `border-line`, etc.), por lo que no hay colores sueltos en los componentes.

Recomendaciones:

- Mantén contraste AA (4.5:1) entre `--c-fg`/`--c-accent` y `--c-bg`. `npm test` lo verifica en ambos modos.
- `src/styles/palette.ts` repite los valores base para la imagen Open Graph, que no puede leer variables CSS. Actualízalo al cambiar la paleta (una prueba avisa si difieren).
- `src/app/icon.svg` también usa los colores del modo oscuro de forma literal.

### Agregar un proyecto personal

En `projects` de `src/content/es.ts` hay un ejemplo comentado. Descoméntalo y completa los datos:

```ts
{
  id: "mi-proyecto",
  kind: "personal",
  title: "Nombre del proyecto",
  summary: "Qué hace y qué problema resuelve.",
  tags: ["TypeScript", "Next.js"],
  links: { demo: "https://example.com", repo: "https://github.com/mgryal/mi-proyecto" },
}
```

Los enlaces `demo` y `repo` son opcionales y solo se muestran si existen. Los proyectos `work` son privados y no deben llevar enlaces.

### Agregar inglés más adelante

1. En `src/content/types.ts`, cambia `Locale` a `"es" | "en"`.
2. Crea `src/content/en.ts` con el mismo tipo `SiteContent`.
3. Regístralo en `src/content/index.ts` dentro de `catalog`.
4. Pasa el locale deseado a `getContent(...)` (hoy `app/layout.tsx` y `app/page.tsx` usan `"es"`). Si quieres rutas por idioma (`/en`), deberás agregar un segmento `[locale]`.

## Variables de entorno

| Variable | Descripción |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | URL pública final, usada en metadatos, Open Graph, `robots.txt` y `sitemap.xml`. **[COMPLETAR] URL final** (por defecto `https://example.com`). |
| `NEXT_PUBLIC_BASE_PATH` | Prefijo de ruta, vacío por defecto. Necesario en GitHub Pages cuando el sitio es de proyecto (`/nombre-repo`). |

## Despliegue

El resultado de `npm run build` es una carpeta estática `out/` (`output: 'export'`).

### Vercel

1. Importa el repositorio en Vercel (preset Next.js).
2. Define `NEXT_PUBLIC_SITE_URL` con tu dominio.
3. Despliega. No necesitas `NEXT_PUBLIC_BASE_PATH`.

### Netlify

- Build command: `npm run build`
- Publish directory: `out`
- Variable de entorno: `NEXT_PUBLIC_SITE_URL`. Netlify usa la versión de Node de `.nvmrc`.

### GitHub Pages

El workflow `.github/workflows/deploy.yml` construye y publica al hacer push a `main`.

1. En el repositorio: Settings, Pages, Source: **GitHub Actions**.
2. El workflow define `NEXT_PUBLIC_BASE_PATH=/<nombre-del-repo>`. Si el repositorio se llama `mgryal.github.io`, déjalo vacío (edita esa línea del workflow).
3. Ajusta `NEXT_PUBLIC_SITE_URL` en el workflow si usas dominio propio. **[COMPLETAR] URL final.**
4. El workflow agrega `out/.nojekyll` para que GitHub no procese la carpeta `_next`.

## Accesibilidad y rendimiento

- Enlace "Saltar al contenido", landmarks semánticos y foco visible.
- Modo oscuro/claro: respeta `prefers-color-scheme` en la primera visita y recuerda tu elección (`localStorage`). Un script en `<head>` evita el parpadeo.
- Todas las animaciones se desactivan con `prefers-reduced-motion`.
- Sin imágenes remotas ni dependencias de animación o íconos: la decoración usa CSS y SVG en línea.
