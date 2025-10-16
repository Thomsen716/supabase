import { useEffect, useState } from "react";
import { Routes, Route, Outlet, Link, useNavigate } from "react-router";
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
    <div className="w-full mx-auto flex justify-between items-center">
      <Link to="forside" className="text-white text-lg font-bold">
        Brand
      </Link>
    </div>
  );
}

function LogIndSide() {
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const navigate = useNavigate();

  const { signInSupabase } = useAuth();
  return (
    <>
      <h1 className="text-3xl">Log ind</h1>
      <form className="max-w-lg mx-auto mt-4">
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
                setEmailField("");
                setPasswordField("");
                navigate("/forside");
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
  const [fornavnField, setFornavnField] = useState("");
  const [efternavnField, setEfternavnField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");
  const signUpSupabase = useAuth().signUpSupabase;

  return (
    <>
      <h1 className="text-3xl">Opret bruger</h1>
      <form className="max-w-lg mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="Fornavn"
              className="block text-sm font-medium text-gray-700"
            >
              Fornavn (valgfrit)
            </label>
            <input
              type="text"
              id="Fornavn"
              value={fornavnField}
              onChange={(e) => setFornavnField(e.target.value)}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label
              htmlFor="Fornavn"
              className="block text-sm font-medium text-gray-700"
            >
              Efternavn (valgfrit)
            </label>
            <input
              type="text"
              id="Efternavn"
              value={efternavnField}
              onChange={(e) => setEfternavnField(e.target.value)}
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
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Bekræft adgangskode
            </label>
            <input
              type="password"
              id="password"
              value={confirmPasswordField}
              onChange={(e) => setConfirmPasswordField(e.target.value)}
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

                if (passwordField !== confirmPasswordField) {
                  alert("Adgangskoderne matcher ikke");
                  return;
                }

                if (passwordField.length < 6) {
                  alert("Adgangskoden skal være mindst 6 tegn lang");
                  return;
                }

                if (emailField.length === 0) {
                  alert("Email kan ikke være tom");
                  return;
                }

                if (passwordField.length === 0) {
                  alert("Adgangskode kan ikke være tom");
                  return;
                }

                if (confirmPasswordField.length === 0) {
                  alert("Bekræft adgangskode kan ikke være tom");
                  return;
                }

                if (!emailField.includes("@")) {
                  alert("Email skal være gyldig");
                  return;
                }

                const { data, error } = await signUpSupabase(
                  emailField,
                  passwordField,
                  fornavnField,
                  efternavnField
                );

                if (error) {
                  console.error(error);
                  return;
                }
                console.log("Bruger oprettet:", data);
                setEmailField("");
                setPasswordField("");
                setConfirmPasswordField("");
                setFornavnField("");
                setEfternavnField("");
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
  const navigate = useNavigate();
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
            <Link to="tilføjnote" className="text-gray-300 hover:text-white">
              Tilføj note
            </Link>
          </li>
          <li>
            <Link to="visnoter" className="text-gray-300 hover:text-white">
              Dine noter
            </Link>
          </li>
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
                } else {
                  console.log("User signed out successfully");
                  navigate("/loggetud");
                }
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
        <p className="mt-4">Hej {user.email}. Du er logget ind.</p>
      ) : (
        <p className="mt-4">Du er ikke logget ind.</p>
      )}
    </>
  );
}

function Indstillinger() {
  const { session, user, updateUserProfileSupabase, getUserProfileSupabase } =
    useAuth();
  console.log("Indstillinger", session, user);
  const [fornavn, setFornavn] = useState("");
  const [efternavn, setEfternavn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await getUserProfileSupabase(user.id);
        if (error) {
          console.error(error);
          return;
        }
        if (data) {
          setFornavn(data.first_name || "");
          setEfternavn(data.last_name || "");
          setEmail(user.email || "");
        }
      }
    };
    fetchUserProfile();
  }, [getUserProfileSupabase, user]);

  if (!session || !user) {
    // Hvis brugeren ikke er logget ind, vis en besked
    return (
      <>
        <h1 className="text-3xl">Indstillinger</h1>
        <p className="mt-4">Du skal være logget ind for at se denne side.</p>
      </>
    );
  }

  return (
    <>
      <h1 className="text-3xl">Indstilinger</h1>
      <p className="mt-4">
        Her kan du ændre dine brugeroplysninger og andre indstillinger.
      </p>
      <form className="max-w-lg mx-auto mt-4">
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

function TilføjNote() {
  return (
    <>
      <h1 className="text-3xl">Tilføj note</h1>
      <form className="max-w-lg mx-auto">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700"
            >
              Titel
            </label>
            <input
              type="text"
              id="title"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>

          <div>
            <label
              htmlFor="note"
              className="block text-sm font-medium text-gray-700"
            >
              Note
            </label>
            <textarea
              id="note"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
              rows={4}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                alert("Note tilføjet (funktionalitet ikke implementeret)");
              }}
            >
              Tilføj note
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

function VisNoter() {
  return (
    <>
      <h1 className="text-3xl">Dine noter</h1>
      <p>Her kan du se dine noter (funktionalitet ikke implementeret)</p>
    </>
  );
}

function DuErLoggetud() {
  return (
    <>
      <h1 className="text-3xl">Du er logget ud</h1>
      <p className="mt-4">Du er nu logget ud. Vi ses næste gang!</p>
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
          <Route path="tilføjnote" element={<TilføjNote />} />
          <Route path="visnoter" element={<VisNoter />} />
          <Route path="loggetud" element={<DuErLoggetud />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
