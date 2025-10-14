import { useEffect, useState } from "react";
import PortalLayout from "../Layout/PortalLayout"
import { useAuth } from "../Auth/AuthProvider";
import { API_URL } from "../Auth/AuthConstants";

export default function Dashboard() {
  const auth = useAuth();
  const [tickets, setTickets] = useState([]);
  const [search, setSearch] = useState("");

  async function getTickets() {
    const token = auth.getAccessToken();
    try {
      const res = await fetch(`${API_URL}/tickets`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.ok) {
        const data = await res.json();
        setTickets(data);
      }
    } catch (err) {
      console.error(err);
    }
  }

  useEffect(() => {
    getTickets();
  }, []);

  return (
    <PortalLayout>
      <div className="p-6 bg-gray-50 min-h-screen">
        {/* Header */}
        <header className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-3">
            <div className="bg-gray-900 text-white p-2 rounded-lg">
              🎫
            </div>
            <div>
              <h2 className="text-xl font-semibold text-gray-900">
                Sistema de Tickets
              </h2>
              <p className="text-gray-500 text-sm">
                Gestiona y da seguimiento a todos los tickets de soporte
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <button className="bg-gray-900 text-white px-4 py-2 rounded-lg hover:bg-gray-800 transition">
              + Nuevo Ticket
            </button>

            <div className="flex items-center gap-2">
              <div className="w-9 h-9 flex justify-center items-center rounded-full bg-gray-300 text-gray-800 font-semibold">
                {auth.getUser()?.name?.[0]?.toUpperCase() ?? "U"}
              </div>
              <div>
                <p className="text-sm font-medium">
                  {auth.getUser()?.name ?? "Usuario"}
                </p>
                <p className="text-xs text-gray-500">consultor</p>
              </div>
            </div>
          </div>
        </header>

        {/* Bienvenida */}
        <section className="bg-white border border-gray-200 rounded-xl p-4 flex items-center gap-3 mb-5">
          <div className="w-10 h-10 bg-gray-800 text-white rounded-full flex items-center justify-center">
            {auth.getUser()?.name?.[0]?.toUpperCase() ?? "U"}
          </div>
          <div>
            <h3 className="text-base font-medium">
              Bienvenido, {auth.getUser()?.name ?? "Usuario"}!
            </h3>
            <p className="text-sm text-gray-500">
              {auth.getUser()?.email ?? "correo@ejemplo.com"} • consultor
            </p>
          </div>
        </section>

        {/* Buscador */}
        <div className="flex items-center mb-4">
          <input
            type="text"
            placeholder="Buscar tickets por título..."
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Filtros */}
        <div className="flex gap-3 mb-6">
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Todas las etapas</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Todas las prioridades</option>
          </select>
          <select className="px-3 py-2 border border-gray-300 rounded-lg text-sm">
            <option>Todas las categorías</option>
          </select>
        </div>

        {/* Lista de tickets */}
        <div className="space-y-4">
          {tickets.length === 0 ? (
            <p className="text-gray-500 text-center">
              No hay tickets registrados.
            </p>
          ) : (
            tickets
              .filter((t) =>
                t.title.toLowerCase().includes(search.toLowerCase())
              )
              .map((t) => (
                <div
                  key={t.id}
                  className="bg-white border border-gray-200 rounded-xl p-4 shadow-sm hover:shadow transition"
                >
                  <h3 className="text-base font-semibold text-gray-900 mb-1">
                    {t.title}
                  </h3>
                  <p className="text-sm text-gray-600 mb-3">
                    {t.description}
                  </p>

                  <div className="flex items-center justify-between text-sm text-gray-500">
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-2 py-1 rounded-md text-xs font-medium ${
                          t.status === "Abierto"
                            ? "bg-blue-100 text-blue-800"
                            : t.status === "En progreso"
                            ? "bg-yellow-100 text-yellow-700"
                            : "bg-green-100 text-green-800"
                        }`}
                      >
                        {t.status}
                      </span>
                      <span>#{t.id}</span>
                      <span>{t.type}</span>
                      <span>Solicitante: {t.requester}</span>
                    </div>
                    <div className="text-xs">
                      <span>{t.date}</span> •{" "}
                      <span className="font-medium text-gray-700">
                        Asignado a: {t.assignedTo}
                      </span>
                    </div>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    </PortalLayout>
  );
}
