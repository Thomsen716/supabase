import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";
import { createClient } from "@supabase/supabase-js";

function App() {
  const [signedIn, setSignedIn] = useState(true);

  const PROJECT_URL = import.meta.env.VITE_PROJECT_URL;
  const ANON_KEY = import.meta.env.VITE_ANON_KEY;

  if (!PROJECT_URL || !ANON_KEY) {
    throw new Error("Missing environment variables!");
  }

  const supabase = createClient(PROJECT_URL, ANON_KEY);

  const NavBar = () => (
    <nav className="bg-gray-800 p-4 w-full">
      <Brand></Brand>
      <NavBarKnapper></NavBarKnapper>
    </nav>
  );

  const Brand = () => (
    <div className="container mx-auto flex justify-between items-center p-4">
      <Link to="forside" className="text-white text-lg font-bold">
        Brand
      </Link>
    </div>
  );

  const LogIndSide = () => (
    <>
      <h1 className="text-3xl">Log ind</h1>
      <form>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Adgangskode
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setSignedIn(true);
              }}
            >
              Log ind
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const OpretBrugerSide = () => (
    <>
      <h1 className="text-3xl">Opret bruger</h1>
      <form>
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Adgangskode
            </label>
            <input
              type="password"
              id="password"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
              "
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                setSignedIn(true);
              }}
            >
              Opret bruger
            </button>
          </div>
        </div>
      </form>
    </>
  );

  const NavBarKnapper = () => (
    <ul className="flex flex-row space-x-4">
      <li>
        <Link to="forside" className="text-gray-300 hover:text-white">
          Forside
        </Link>
      </li>
      <li>
        <Link to="om" className="text-gray-300 hover:text-white">
          Om
        </Link>
      </li>
      {signedIn ? (
        <>
          <li>
            <Link to="indstillinger" className="text-gray-300 hover:text-white">
              Indstillinger
            </Link>
          </li>
          <li>
            <Link
              to="forside"
              onClick={LogUd}
              className="text-gray-300 hover:text-white"
            >
              Log ud
            </Link>
          </li>
        </>
      ) : (
        <>
          <li>
            <Link to="logind" className="text-gray-300 hover:text-white">
              Log ind
            </Link>
          </li>
          <li>
            <Link to="opretbruger" className="text-gray-300 hover:text-white">
              Opret bruger
            </Link>
          </li>
        </>
      )}
    </ul>
  );

  const Design = () => (
    <>
      <div className="flex flex-col h-screen">
        <nav className="bg-gray-800 p-4">
          <NavBar></NavBar>
        </nav>
        <div className="flex-grow p-4 v-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );

  const Om = () => (
    <>
      <h1 className="text-3xl">Om</h1>
    </>
  );

  const Forside = () => (
    <>
      <h1 className="text-3xl">Forside</h1>{" "}
      {signedIn ? <p>Du er logget ind</p> : <p>Du er ikke logget ind</p>}
    </>
  );

  const Indstillinger = () => (
    <>
      <h1 className="text-3xl">Indstilinger</h1>
    </>
  );

  const LogUd = () => {
    setSignedIn(false); // Skift tilstand til ikke-logget ind
  };

  return (
    <Routes>
      <Route path="/" element={<Design />}>
        <Route path="" index element={<Forside />} />
        <Route path="forside" element={<Forside />} />
        <Route path="logind" element={<LogIndSide />} />
        <Route path="opretbruger" element={<OpretBrugerSide />} />
        <Route path="om" element={<Om />} />
        <Route path="indstillinger" element={<Indstillinger />} />
      </Route>
    </Routes>
  );
}

export default App;
