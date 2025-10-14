import { Link, useLocation } from "react-router-dom";

export default function DefaultLayout({ children }) {
  const location = useLocation();
  const hideNav = ["/", "/login", "/signup"].includes(location.pathname);

  return (
    <>
      {!hideNav && (
        <header className="bg-gray-900 text-white p-4">
          <nav className="max-w-6xl mx-auto flex justify-between items-center">
            <h1 className="text-lg font-semibold">Project Z64</h1>
            <ul className="flex space-x-4">
              <li>
                <Link to="/login" className="hover:text-gray-300">Login</Link>
              </li>
              <li>
                <Link to="/signup" className="hover:text-gray-300">Signup</Link>
              </li>
            </ul>
          </nav>
        </header>
      )}

      <main className="min-h-screen">{children}</main>
    </>
  );
}