//import { useState } from "react";
import { Routes, Route, Outlet } from "react-router";

const NavBar = () => (
  <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md">
    <Brand></Brand>
    <KnapperSignedIn></KnapperSignedIn>
  </nav>
);

const Brand = () => (
  <div className="container mx-auto flex justify-between items-center p-4">
    <a href="#" className="text-white text-lg font-bold">
      Brand
    </a>
  </div>
);
const KnapperSignedIn = () => (
  <ul className="flex flex-row space-x-4">
    <li>
      <a href="/forside" className="text-gray-300 hover:text-white">
        Forside
      </a>
    </li>
    <li>
      <a href="om" className="text-gray-300 hover:text-white">
        Om
      </a>
    </li>
  </ul>
);

const KnapperSignedOut = () => (
  <ul className="flex flex-row space-x-4">
    <li>
      <a href="/forside" className="text-gray-300 hover:text-white">
        Forside
      </a>
    </li>
    <li>
      <a href="om" className="text-gray-300 hover:text-white">
        Om
      </a>
    </li>
    <li>
      <a href="indstillinger" className="text-gray-300 hover:text-white">
        Om
      </a>
    </li>
  </ul>
);

const Hjem = () => (
  <>
    <NavBar></NavBar>
    <Outlet></Outlet>
  </>
);
const Om = () => <h1>Om os</h1>;
const Forside = () => <h1>Forside</h1>;
const Indstillinger = () => <h1>Indstilinger</h1>;

function App() {
  // const [signedIn, setSignedIn] = useState(false);

  return (
    <Routes>
      <Route path="/" element={<Hjem />}>
        <Route index element={<Forside />} /> {/* Standardvisning */}
        <Route path="om" element={<Om />} />
        <Route path="indstillinger" element={<Indstillinger></Indstillinger>} />
      </Route>
    </Routes>
  );
}

export default App;
