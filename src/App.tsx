//import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";

const NavBar = () => (
  <nav className="fixed top-0 left-0 w-full bg-blue-600 text-white shadow-md">
    <Brand></Brand>
    <SignedOutButtons></SignedOutButtons>
  </nav>
);

const Brand = () => (
  <div className="container mx-auto flex justify-between items-center p-4">
    <a href="#" className="text-white text-lg font-bold">
      Brand
    </a>
  </div>
);
const SignedOutButtons = () => (
  <ul className="flex flex-row space-x-4">
    <li>
      <Link to="/forside" className="text-gray-300 hover:text-white">
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
      <Link to="/forside" className="text-gray-300 hover:text-white">
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
        Om
      </Link>
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
        <Route index path="forside" element={<Forside />} />{" "}
        {/* Standardvisning */}
        <Route path="om" element={<Om />} />
        <Route path="indstillinger" element={<Indstillinger />} />
      </Route>
    </Routes>
  );
}

export default App;
