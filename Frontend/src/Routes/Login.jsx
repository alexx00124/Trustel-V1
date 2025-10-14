import { useState } from "react";
import DefaultLayout from "../Layout/DefaultLayout";
import { useAuth } from "../Auth/AuthProvider";
import { Navigate } from "react-router-dom";


export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errorResponse, setErrorResponse] = useState("");

  const auth = useAuth();

  function handleChange(e) {
    const { name, value } = e.target;
    if (name === "username") setUsername(value);
    if (name === "password") setPassword(value);
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setErrorResponse(""); 

    try {
      const response = await fetch("http://localhost:3000/api/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        const json = await response.json();
        console.log(json);

        if (json.body?.accessToken && json.body?.refreshToken) {
          auth.saveUser(json);
        } else {
          setErrorResponse("Tokens no recibidos en la respuesta.");
        }
      } else {
        const text = await response.text();
        try {
          const json = JSON.parse(text);
          setErrorResponse(json.body?.error || "Error al iniciar sesión.");
        } catch {
          setErrorResponse("Error inesperado en la respuesta del servidor.");
        }
      }
    } catch (error) {
      console.error("Error en la solicitud:", error);
      setErrorResponse("No se pudo conectar con el servidor.");
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
        <h1>Login</h1>
        {errorResponse && <div className="errorMessage">{errorResponse}</div>}

        <label>Username</label>
        <input
          name="username"
          type="text"
          onChange={handleChange}
          value={username}
        />

        <label>Password</label>
        <input
          name="password"
          type="password"
          onChange={handleChange}
          value={password}
        />

        <button type="submit">Login</button>
      </form>
    </DefaultLayout>
  );
}
