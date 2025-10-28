
# Gestor de Activos Corporativos - Proyecto React

¡Hola! 👋 Este es mi proyecto de prueba técnica para la posición de Desarrollador/a React.

Es básicamente una **aplicación para gestionar los activos de una empresa**: laptops, monitores, sillas, etc.  
Se puede registrar, iniciar sesión, ver un panel de control, gestionar activos y ver la lista de empleados.  
Toda la info se maneja con una **API falsa usando json-server**.

---

## 1. Tecnologías usadas

- React (SPA)
- React Router v6
- Context API + Hooks (useState, useEffect)
- Axios (para las llamadas a la API)
- json-server (API falsa)
- CSS personalizado (responsive)
- Componentes reutilizables (Spinner, Layout, Formularios, etc.)

---

## 2. Instalación y ejecución

1. Clonar el repositorio:
```bash
git clone https://github.com/Vanessamosquerarivas/prueba_tecnica.git
cd prueba_tecnica
```

2. Instalar dependencias:
```bash
npm install
```

3. Iniciar json-server (API falsa):
```bash
json-server --watch db.json --port 3001
```

4. Iniciar la app:
```bash
npm run dev
```

> La app corre en: http://localhost:3000  
> La API falsa corre en: http://localhost:3001

---

## 3. Estructura de carpetas

```
/src
├── /api          -> Configuración de Axios y funciones de llamadas a la API
├── /components   -> Componentes reutilizables (Botones, Inputs, Spinner, etc.)
├── /context      -> Contexto de autenticación (AuthContext)
├── /hooks        -> Custom Hooks (useAuth, useFetchData, etc.)
├── /layout       -> Layout principal de rutas privadas (Navbar, Sidebar)
├── /pages        -> Páginas completas (Login, Dashboard, AssetsList, AssetForm, Employees)
├── /routes       -> Configuración del Router y Rutas Privadas
└── /utils        -> Funciones de ayuda (validaciones, formateo, etc.)
```

---

## 4. Funcionalidades

### Autenticación
- Registro (/register) con nombre, email y contraseña
- Inicio de sesión (/login)
- Cierre de sesión (limpia localStorage y redirige a /login)
- Rutas privadas protegidas (no se puede entrar si no estás logueado)

### Dashboard (/dashboard)
- Resumen de activos (totales, asignados, disponibles)
- Acceso solo para usuarios logueados

### Gestión de Activos (/assets)
- Listado de todos los activos
- Crear nuevo activo (/assets/new)
- Editar activo (/assets/edit/:id), asignar a empleado
- Eliminar activo con confirmación

### Empleados (/employees)
- Listado de todos los usuarios registrados
- Solo lectura

---

## 5. Notas de desarrollo

- Usé **Context API** para manejar el usuario logueado y el estado de carga.
- Todas las llamadas a la API manejan `loading` y errores con feedback al usuario.
- Rutas privadas protegidas con `ProtegerRutas.jsx`.
- El layout privado (`PrivateLayout.jsx`) mantiene el navbar y sidebar visibles en todas las vistas privadas.
- El login redirige automáticamente al dashboard después de iniciar sesión.
- Se usaron componentes reutilizables como `Spinner`, formularios y botones.
- Si intentas entrar a /dashboard sin iniciar sesión, te redirige automáticamente a /login.

---

## 6. Cosas que podrían mejorar / Bonus
- Filtro o búsqueda de activos
- Validación más robusta de formularios
- Librería UI (Tailwind, Material UI, Chakra) para diseño más rápido
- Página 404 personalizada
- Deploy en Vercel o Netlify
- Screenshots de la app para mejor documentación visual

---

¡Y eso es todo! 🙌  
Cualquier duda sobre cómo correrlo o cómo funciona, se puede revisar directamente en el código.  
<<<<<<< HEAD
La idea era que sea **simple, funcional y entendible**, listo para una prueba técnica de React.
=======
La idea era que sea **simple, funcional y entendible**, listo para una prueba técnica de React.
>>>>>>> 531ab4cb6110964b5f316f24b5c0240b55c23ff7
