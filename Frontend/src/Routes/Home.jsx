import React from "react";
import { Link } from "react-router-dom";
import { Ticket, Users, Clock, Shield } from "lucide-react";

const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-8">
      {/* Header */}
      <div className="text-center mb-10">
        <div className="flex justify-center items-center space-x-2 mb-2">
          <Ticket className="w-8 h-8 text-black" />
          <h1 className="text-3xl font-bold text-gray-900">Sistema de Tickets</h1>
        </div>
        <p className="text-gray-600 text-lg">Plataforma integral de gestión</p>
        <p className="text-gray-500 mt-3 max-w-2xl mx-auto">
          Optimiza la gestión de soporte técnico con nuestro sistema completo de tickets.
          Desde la creación hasta la resolución, mantén control total sobre cada solicitud.
        </p>
      </div>

      {/* Features Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-4xl w-full mb-10">
        <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">
          <Ticket className="w-8 h-8 mb-3 text-black" />
          <h3 className="text-lg font-semibold text-gray-800">Gestión de Tickets</h3>
          <p className="text-gray-600 text-sm">
            Crea, asigna y da seguimiento a todos tus tickets de soporte.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">
          <Users className="w-8 h-8 mb-3 text-black" />
          <h3 className="text-lg font-semibold text-gray-800">Colaboración</h3>
          <p className="text-gray-600 text-sm">
            Trabaja en equipo con asignaciones y notificaciones automáticas.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">
          <Clock className="w-8 h-8 mb-3 text-black" />
          <h3 className="text-lg font-semibold text-gray-800">Seguimiento en Tiempo Real</h3>
          <p className="text-gray-600 text-sm">
            Monitorea el estado y progreso de todos los tickets.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-sm p-6 border hover:shadow-md transition">
          <Shield className="w-8 h-8 mb-3 text-black" />
          <h3 className="text-lg font-semibold text-gray-800">Seguro y Confiable</h3>
          <p className="text-gray-600 text-sm">
            Datos protegidos con los más altos estándares de seguridad.
          </p>
        </div>
      </div>

      {/* Buttons */}
      <div className="flex space-x-4">
        <Link
          to="/login"
          className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-800 transition"
        >
          Iniciar Sesión
        </Link>
        <Link
          to="/signup"
          className="px-6 py-3 border border-gray-800 text-gray-800 rounded-xl hover:bg-gray-100 transition"
        >
          Registrarse
        </Link>
      </div>
    </div>
  );
};

export default Home;
