import { useEffect, useState } from "react";
import { useAuth } from "../auth/AuthProvider";
import { API_URL } from "../auth/authConstants";
import PortalLayout from "../layout/PortalLayout";
import { UserCog, Trash2 } from "lucide-react";

export default function AdminPanel() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const auth = useAuth();

  useEffect(() => {
    async function fetchUsers() {
      try {
        const res = await fetch(`${API_URL}/users`, {
          headers: {
            Authorization: `Bearer ${auth.getAccessToken()}`,
          },
        });

        const data = await res.json();
        setUsers(data.body || []);
      } catch (error) {
        console.error("Error al cargar usuarios:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchUsers();
  }, []);

  async function handleDelete(userId) {
    if (!window.confirm("¿Eliminar este usuario?")) return;

    try {
      const res = await fetch(`${API_URL}/users/${userId}`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
      });

      if (res.ok) {
        setUsers(users.filter((u) => u.id !== userId));
      } else {
        alert("No se pudo eliminar el usuario.");
      }
    } catch (error) {
      console.error("Error al eliminar usuario:", error);
    }
  }

  async function handleRoleChange(userId, newRole) {
    try {
      const res = await fetch(`${API_URL}/users/${userId}/role`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${auth.getAccessToken()}`,
        },
        body: JSON.stringify({ rol: newRole }),
      });

      if (res.ok) {
        setUsers((prev) =>
          prev.map((u) => (u.id === userId ? { ...u, rol: newRole } : u))
        );
      } else {
        alert("No se pudo actualizar el rol.");
      }
    } catch (err) {
      console.error("Error al cambiar rol:", err);
    }
  }

  return (
    <PortalLayout>
      <div className="p-6 space-y-6">
        {/* Encabezado */}
        <div>
          <h1 className="text-2xl font-bold text-gray-900">
            Gestión de Usuarios
          </h1>
          <p className="text-gray-600">
            Administra usuarios y asigna roles en el sistema
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white border rounded-2xl p-4 shadow-sm">
          <div className="flex flex-col md:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Buscar por nombre, email o empresa..."
              className="w-full md:w-1/2 border rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-gray-200"
            />
            <div className="flex gap-2">
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Todos los roles</option>
                <option>Admin</option>
                <option>Usuario</option>
              </select>
              <select className="border rounded-lg px-3 py-2 text-sm">
                <option>Todos los estados</option>
                <option>Activo</option>
                <option>Pendiente</option>
              </select>
            </div>
          </div>
        </div>

        {/* Tabla de usuarios */}
        <div className="bg-white border rounded-2xl shadow-sm p-4">
          <div className="flex justify-between items-center mb-4">
            <h2 className="font-semibold text-lg">Usuarios ({users.length})</h2>
            <button className="bg-black text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-800 transition">
              + Invitar Usuario
            </button>
          </div>

          {loading ? (
            <p className="text-gray-500 text-sm">Cargando usuarios...</p>
          ) : users.length === 0 ? (
            <p className="text-gray-500 text-sm">No hay usuarios registrados.</p>
          ) : (
            <table className="w-full border-collapse text-sm">
              <thead>
                <tr className="bg-gray-100 text-left text-gray-700">
                  <th className="p-3">Usuario</th>
                  <th className="p-3">Email</th>
                  <th className="p-3">Rol</th>
                  <th className="p-3">Estado</th>
                  <th className="p-3 text-center">Acciones</th>
                </tr>
              </thead>
              <tbody>
                {users.map((u) => (
                  <tr
                    key={u.id}
                    className="border-t hover:bg-gray-50 transition"
                  >
                    <td className="p-3 font-medium text-gray-800 flex items-center gap-2">
                      <div className="bg-gray-200 w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold text-gray-700">
                        {u.username?.charAt(0).toUpperCase() || "U"}
                      </div>
                      {u.username}
                    </td>
                    <td className="p-3 text-gray-600">{u.email}</td>
                    <td className="p-3">
                      <select
                        value={u.rol}
                        onChange={(e) =>
                          handleRoleChange(u.id, e.target.value)
                        }
                        className="border rounded-lg px-2 py-1 text-sm"
                      >
                        <option value="usuario">Usuario</option>
                        <option value="admin">Admin</option>
                      </select>
                    </td>
                    <td className="p-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${
                          u.estado === "Activo"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {u.estado || "Pendiente"}
                      </span>
                    </td>
                    <td className="p-3 text-center">
                      <button
                        onClick={() => handleDelete(u.id)}
                        className="text-red-500 hover:text-red-700 transition"
                      >
                        <Trash2 className="w-4 h-4 inline" />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
