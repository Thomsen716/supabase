import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";

function NavBar(props: {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signedIn, setSignedIn, setEmail, setPassword } = props;
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <Brand></Brand>
      <NavBarKnapper
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        setEmail={setEmail}
        setPassword={setPassword}
      ></NavBarKnapper>
    </nav>
  );
}

function Brand() {
  return (
    <div className="container mx-auto flex justify-between items-center">
      <Link to="forside" className="text-white text-lg font-bold">
        Brand
      </Link>
    </div>
  );
}

function LogIndSide(props: {
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const { setSignedIn, email, setEmail, password, setPassword } = props;
  return (
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
              value={emailField}
              onChange={(e) => setEmailField(e.target.value)}
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
              value={passwordField}
              onChange={(e) => setPasswordField(e.target.value)}
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
                if (emailField === email && passwordField === password) {
                  setEmail(emailField);
                  setPassword(passwordField);
                  setSignedIn(true);
                }
              }}
            >
              Log ind
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function OpretBrugerSide(props: {
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { email, setEmail, password, setPassword } = props;
  return (
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
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              value={password}
              onChange={(e) => setPassword(e.target.value)}
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
                //setSignedIn(true);
              }}
            >
              Opret bruger
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function NavBarKnapper(props: {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signedIn } = props;
  return (
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
              onClick={() => {
                LogUd(props.setSignedIn, props.setEmail, props.setPassword);
              }}
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
}

function Design(props: {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
}) {
  const { signedIn, setSignedIn, setEmail, setPassword } = props;
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="bg-gray-800 p-4">
          <NavBar
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            setEmail={setEmail}
            setPassword={setPassword}
          ></NavBar>
        </nav>
        <div className="flex-grow p-4 v-screen">
          <Outlet></Outlet>
        </div>
      </div>
    </>
  );
}

function Om() {
  return (
    <>
      <h1 className="text-3xl">Om</h1>
    </>
  );
}

function Forside(props: {
  signedIn: boolean;
  email: string;
  password: string;
}) {
  const { signedIn, email, password } = props;
  return (
    <>
      <h1 className="text-3xl">Forside</h1>{" "}
      {signedIn ? (
        <p>
          Hej {email}. Du er logget ind. Dit password er {password}.
        </p>
      ) : (
        <p>Du er ikke logget ind</p>
      )}
    </>
  );
}

function Indstillinger() {
  return (
    <>
      <h1 className="text-3xl">Indstilinger</h1>
    </>
  );
}

function LogUd(
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setEmail: React.Dispatch<React.SetStateAction<string>>,
  setPassword: React.Dispatch<React.SetStateAction<string>>
) {
  setEmail("");
  setPassword("");
  setSignedIn(false);
}

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Design
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            setPassword={setPassword}
            setEmail={setEmail}
          />
        }
      >
        <Route
          path=""
          index
          element={
            <Forside signedIn={signedIn} email={email} password={password} />
          }
        />
        <Route
          path="forside"
          element={
            <Forside signedIn={signedIn} email={email} password={password} />
          }
        />
        <Route
          path="logind"
          element={
            <LogIndSide
              setSignedIn={setSignedIn}
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route
          path="opretbruger"
          element={
            <OpretBrugerSide
              email={email}
              setEmail={setEmail}
              password={password}
              setPassword={setPassword}
            />
          }
        />
        <Route path="om" element={<Om />} />
        <Route path="indstillinger" element={<Indstillinger />} />
      </Route>
    </Routes>
  );
}

export default App;
