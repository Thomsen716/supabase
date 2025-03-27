import { User } from "@supabase/supabase-js";
import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";
import { useAuth } from "./Supabase";

function NavBar(props: {
  signedIn: boolean;
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>;
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
}) {
  const { signedIn, setSignedIn, setUser } = props;
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <Brand></Brand>
      <NavBarKnapper
        signedIn={signedIn}
        setSignedIn={setSignedIn}
        setUser={setUser}
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
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
}) {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const { setSignedIn, setUser } = props;
  const { user, signInSupabase } = useAuth();
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
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                await signInSupabase(emailField, passwordField);
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

  const signUp = async (email: string, password: string) => {
    const { data, error } = await signUpSupabase(email, password);
    if (error) {
      console.error(error);
      return;
    }
    if (!data) {
      console.error("No data returned from signUpSupabase");
      return;
    }
    const { user, session } = data;
    console.log(user, session);
  };

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
                signUp(email, password);
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
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
}) {
  const { signedIn, setSignedIn, setUser } = props;
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
                LogUd(setSignedIn, setUser);
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
  user: null | User;
  setUser: React.Dispatch<React.SetStateAction<null | User>>;
}) {
  const { signedIn, setSignedIn, user, setUser } = props;
  return (
    <>
      <div className="flex flex-col h-screen">
        <nav className="bg-gray-800 p-4">
          <NavBar
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            user={user}
            setUser={setUser}
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

async function LogUd(
  setSignedIn: React.Dispatch<React.SetStateAction<boolean>>,
  setUser: React.Dispatch<React.SetStateAction<null | User>>
) {
  const { error } = await signOutSupabase();
  if (error) {
    console.error(error);
    return;
  } else {
    console.log("Signed out successfully");
    setSignedIn(false);
    setUser(null);
  }
}

function App() {
  const [signedIn, setSignedIn] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState<null | User>(null);

  return (
    <Routes>
      <Route
        path="/"
        element={
          <Design
            signedIn={signedIn}
            setSignedIn={setSignedIn}
            user={user}
            setUser={setUser}
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
          element={<LogIndSide setSignedIn={setSignedIn} setUser={setUser} />}
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
