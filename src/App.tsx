import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";

function App() {
  const [signedIn, setSignedIn] = useState(true);

  const NavBar = () => (
    <nav className="bg-gray-800 p-4 w-full">
      <Brand></Brand>
      {signedIn ? <SignedInButtons /> : <SignedOutButtons />}
    </nav>
  );

  const Brand = () => (
    <div className="container mx-auto flex justify-between items-center p-4">
      <Link to="forside" className="text-white text-lg font-bold">
        Brand
      </Link>
    </div>
  );
  const SignedOutButtons = () => (
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
    </ul>
  );

  const SignedInButtons = () => (
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
      <li>
        <Link to="indstillinger" className="text-gray-300 hover:text-white">
          Indstillinger
        </Link>
      </li>
      <li>
        <button onClick={LogUd} className="text-gray-300 hover:text-white">
          Log ud
        </button>
      </li>
    </ul>
  );

  const Design = () => (
    <>
      <div className="flex flex-col h-screen">
        <nav className="bg-gray-800 p-4">
          Navbar:
          <NavBar></NavBar>
        </nav>
        <div className="flex-grow p-4 v-screen">
          Indhold:
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
  const Om = () => <h1>Om os</h1>;
  const Forside = () => <h1>Forside</h1>;
  const Indstillinger = () => <h1>Indstilinger</h1>;
  const LogUd = () => {
    setSignedIn(false); // Skift tilstand til ikke-logget ind
  };

  return (
    <Routes>
      <Route path="/" element={<Design />}>
        <Route path="" index element={<Forside />} />
        <Route path="forside" element={<Forside />} />
        {/* Standardvisning */}
        <Route path="om" element={<Om />} />
        <Route path="indstillinger" element={<Indstillinger />} />
      </Route>
    </Routes>
  );
}

export default App;
