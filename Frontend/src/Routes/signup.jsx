import { useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate, useNavigate } from "react-router-dom";

export default function Signup() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorResponse, setErrorResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const auth = useAuth();
  const goTo = useNavigate();

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorResponse(""); 
    setLoading(true);

    try {
      const response = await fetch("http://localhost:3000/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password, name }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log("Usuario registrado:", json);
        setUsername("");
        setPassword("");
        setName("");
        goTo("/");
      } else {
        const errorJson = await response.json();
        setErrorResponse(errorJson.error || "Error al crear cuenta.");
      }
    } catch (error) {
      console.error("Error de red:", error);
      setErrorResponse("No se pudo conectar con el servidor.");
    } finally {
      setLoading(false);
    }
  }

  if (auth.isAuthenticated) {
    return <Navigate to="/dashboard" />;
  }

    <div className="navbar">
  <div className="title">Bienvenido a project Z64</div>
  <div className="nav-links">
    <a href="/login">Iniciar sesión</a>
    <a href="/signup">Registrarse</a>
  </div>
</div>


  return (
    <DefaultLayout>
      <form onSubmit={handleSubmit} className="form">
        <h1>Crear cuenta</h1>

        {!!errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label>Nombre</label>
        <input
          type="text"
          name="name"
          onChange={(e) => setName(e.target.value)}
          value={name}
          required
        />

        <label>Usuario</label>
        <input
          type="text"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
          value={username}
          required
        />

        <label>Contraseña</label>
        <input
          type="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
          value={password}
          required
        />

        <button type="submit" disabled={loading}>
          {loading ? "Creando..." : "Crear cuenta"}
        </button>
      </form>
    </DefaultLayout>
  );
}