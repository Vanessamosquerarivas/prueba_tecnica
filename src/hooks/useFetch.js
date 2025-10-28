import { useState, useEffect } from "react";

export default function useFetch(fetcher, deps = []) {
  const [datos, setDatos] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    let cancelado = false;
    (async () => {
      setCargando(true);
      try {
        const resultado = await fetcher();
        if (!cancelado) {
          setDatos(resultado);
          setError(null);
        }
      } catch (err) {
        if (!cancelado) setError(err);
      } finally {
        if (!cancelado) setCargando(false);
      }
    })();
    return () => (cancelado = true);
  }, deps);

  return { datos, cargando, error, setDatos };
}
