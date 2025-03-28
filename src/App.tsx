import { useState } from "react";
import { Routes, Route, Outlet, Link } from "react-router";
import { useAuth } from "./Supabase";
import { AuthProvider } from "./Auth";

function NavBar() {
  return (
    <nav className="bg-gray-800 p-4 w-full">
      <Brand></Brand>
      <NavBarKnapper></NavBarKnapper>
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

function LogIndSide() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");

  const { signInSupabase } = useAuth();
  return (
    <>
      <h1 className="text-3xl">Log ind</h1>
      <form className="max-w-lg mx-auto">
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

function OpretBrugerSide() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const signUpSupabase = useAuth().signUpSupabase;

  return (
    <>
      <h1 className="text-3xl">Opret bruger</h1>
      <form className="max-w-lg mx-auto">
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm
            "
              required
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                const { data, error } = await signUpSupabase(
                  emailField,
                  passwordField
                );

                if (error) {
                  console.error(error);
                  return;
                }
                if (data) {
                  console.log("User created successfully");
                }
                setEmailField("");
                setPasswordField("");
                alert(
                  "Bruger oprettet. Tjek din email for at bekræfte din konto."
                );
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

function NavBarKnapper() {
  const { user, signOutSupabase } = useAuth();
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
      {user ? (
        <>
          <li>
            <Link to="indstillinger" className="text-gray-300 hover:text-white">
              Indstillinger
            </Link>
          </li>
          <li>
            <Link
              to="forside"
              onClick={async () => {
                const { error } = await signOutSupabase();
                if (error) {
                  console.error(error);
                  return;
                }
                console.log("User logged out successfully");
                alert("Du er logget ud");
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

function Design() {
  return (
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
}

function Om() {
  return (
    <>
      <h1 className="text-3xl">Om</h1>
    </>
  );
}

function Forside() {
  const { user } = useAuth();
  return (
    <>
      <h1 className="text-3xl">Forside</h1>{" "}
      {user ? (
        <p>Hej {user.email}. Du er logget ind.</p>
      ) : (
        <p>Du er ikke logget ind</p>
      )}
    </>
  );
}

function Indstillinger() {
  const { user, updateUserProfileSupabase } = useAuth();
  const [fornavn, setFornavn] = useState("");
  const [efternavn, setEfternavn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  return (
    <>
      <h1 className="text-3xl">Indstilinger</h1>
      <p>Her kan du ændre dine brugeroplysninger og andre indstillinger.</p>
      <form className="max-w-lg mx-auto">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="fornavn"
              className="block text-sm font-medium text-gray-700"
            >
              Fornavn
            </label>
            <input
              type="text"
              id="fornavn"
              value={fornavn}
              onChange={(e) => setFornavn(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="efternavn"
              className="block text-sm font-medium text-gray-700"
            >
              Efternavn
            </label>
            <input
              type="text"
              id="efternavn"
              value={efternavn}
              onChange={(e) => setEfternavn(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
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
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            />
          </div>
          <div>
            <label
              htmlFor="passwordConfirm"
              className="block text-sm font-medium text-gray-700"
            >
              Bekræft adgangskode
            </label>
            <input
              type="password"
              id="passwordconfirm"
              value={passwordConfirm}
              onChange={(e) => setPasswordConfirm(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              required
            ></input>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                //await signInSupabase(emailField, passwordField);
                /*                 if (password !== passwordConfirm) {
                  alert("Adgangskoderne stemmer ikke overens.");
                  return;
                }
                if (password.length < 8) {
                  alert("Adgangskoden skal være mindst 8 tegn lang.");
                  return;
                }
                if (user) {
                  console.log("Bruger opdateret:", user.email);
                  alert("Brugeroplysninger opdateret.");
                } */
                // Opdater brugeroplysninger i Supabase

                if (!user) {
                  alert(
                    "Du skal være logget ind for at opdatere brugeroplysninger."
                  );
                  return;
                }
                const { data, error } = await updateUserProfileSupabase(
                  user.id,
                  fornavn,
                  efternavn
                );
                if (error) {
                  console.error(error);
                  alert("Fejl ved opdatering af brugeroplysninger.");
                  return;
                }
                console.log("Brugeroplysninger opdateret:", data);
                setFornavn("");
                setEfternavn("");
                setEmail("");
                setPassword("");
                setPasswordConfirm("");
                alert("Brugeroplysninger opdateret.");
              }}
            >
              Gem ændringer
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function App() {
  return (
    <AuthProvider>
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
    </AuthProvider>
  );
}

export default App;
