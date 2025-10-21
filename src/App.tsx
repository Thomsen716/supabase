import { ReactNode, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Outlet,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router";
import { useAuth } from "./Supabase";
import { AuthProvider, Note } from "./Auth";
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import Toast from "./Toast";
import { FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

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

          <div className="flex justify-center">
            <Link
              to="/glemt-adgangskode"
              className="text-sm text-indigo-600 hover:text-indigo-500"
            >
              Glemt Adgangskode?
            </Link>
          </div>
          <div className="flex justify-center">
            <OAuthButtons></OAuthButtons>
          </div>
        </div>
      </form>
    </>
  );
}

function tjekAdgangskoderOgEmail(
  emailField: string,
  passwordField: string,
  confirmPasswordField: string
): boolean {
  if (passwordField !== confirmPasswordField) {
    return false;
  }

  if (passwordField.length < 6) {
    return false;
  }

  if (emailField.length === 0) {
    return false;
  }

  if (passwordField.length === 0) {
    return false;
  }

  if (confirmPasswordField.length === 0) {
    return false;
  }

  if (!emailField.includes("@")) {
    return false;
  }
  return true;
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

                const valid = tjekAdgangskoderOgEmail(
                  emailField,
                  passwordField,
                  confirmPasswordField
                );

                if (!valid) {
                  alert(
                    "Tjek venligst dine oplysninger. Adgangskoder skal matche og være mindst 6 tegn lange. Email skal være gyldig."
                  );
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
  let userDataToDisplay;

  if (user) {
    if (
      user.user_metadata &&
      (user.user_metadata.first_name || user.user_metadata.last_name)
    ) {
      userDataToDisplay = `${user.user_metadata.first_name || ""} ${
        user.user_metadata.last_name || ""
      }`.trim();
    } else {
      userDataToDisplay = user.email;
    }
  }

  return (
    <>
      <h1 className="text-3xl">Forside</h1>{" "}
      {user ? (
        <p className="mt-4">Hej {userDataToDisplay}. Du er logget ind.</p>
      ) : (
        <p className="mt-4">Du er ikke logget ind.</p>
      )}
    </>
  );
}

function TjekLogindMetoder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  let loggedInWithEmail = false;
  let loggedInWithOAuth = false;
  let emailAddress = "";
  const OAuthProviders = [];

  if (user?.identities) {
    for (const identity of user.identities) {
      if (identity.provider === "email") {
        loggedInWithEmail = true;
        emailAddress = identity.identity_data?.email || "";
      } else {
        loggedInWithOAuth = true;
        if (identity.provider == "google") OAuthProviders.push("Google");
        if (identity.provider == "facebook") OAuthProviders.push("Facebook");
        if (identity.provider == "github") OAuthProviders.push("GitHub");
      }
    }
  } else {
    navigate("/logind");
  }
  return (
    <>
      <h1 className="text-3xl">Indstilinger</h1>
      {loggedInWithEmail && loggedInWithOAuth && (
        <p className="mt-4">
          Du har både logget ind med email-adressen {emailAddress} og via{" "}
          {OAuthProviders.join(", ")}.
        </p>
      )}
      {loggedInWithEmail && <Indstillinger></Indstillinger>}
    </>
  );
}

function VælgeSprog() {
  const [sprog, setSprog] = useState("");
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    const gemtSprog = localStorage.getItem("sprog");
    if (gemtSprog) {
      setSprog(gemtSprog);
    }
  }, []);

  const håndterSprogSkift = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valgtSprog = e.target.value;
    setSprog(valgtSprog);
    localStorage.setItem("sprog", valgtSprog);
    setToastOpen(true);
  };

  return (
    <>
      <h1 className="text-3xl">Vælg sprog</h1>
      <form className="max-w-lg mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="sprog"
              className="block text-sm font-medium text-gray-700"
            >
              Vælg dit foretrukne sprog:
            </label>
            <select
              id="sprog"
              value={sprog}
              onChange={håndterSprogSkift}
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <option value="">Vælg sprog</option>
              <option value="da">Dansk</option>
              <option value="en">Engelsk</option>
            </select>
          </div>
        </div>
      </form>
      <Toast
        message="Sprog gemt!"
        isOpen={toastOpen}
        onClose={() => setToastOpen(false)}
      />
    </>
  );
}

function Indstillinger() {
  const { user, updateUserProfileSupabase, getUserProfileSupabase } = useAuth();

  const [fornavn, setFornavn] = useState("");
  const [efternavn, setEfternavn] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      if (user) {
        const { data, error } = await getUserProfileSupabase();
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

  return (
    <>
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
      <VælgeSprog></VælgeSprog>
    </>
  );
}

function TilføjNote() {
  const [title, setTitle] = useState("");
  const [note, setNote] = useState("");
  const { addNote, showNote } = useAuth();
  const { noteId } = useParams<{ noteId: string }>();
  const [toastOpen, setToastOpen] = useState(false);

  useEffect(() => {
    if (noteId) {
      const fetchNote = async () => {
        const { data, error } = await showNote(noteId);
        if (error) {
          console.error("Fejl ved hentning af note:", error);
          return;
        }
        if (data) {
          setTitle(data.title);
          setNote(data.content);
        }
      };
      fetchNote();
    } else {
      setTitle("");
      setNote("");
    }
  }, [noteId, showNote]);

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
              value={title}
              onChange={(e) => setTitle(e.target.value)}
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
              value={note}
              onChange={(e) => setNote(e.target.value)}
            ></textarea>
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                console.log("Tilføj note:", title, note);
                const { data, error } = await addNote(title, note);
                if (error) {
                  console.error("Fejl ved tilføjelse af note:", error);
                  alert("Fejl ved tilføjelse af note.");
                  return;
                } else {
                  console.log("Note tilføjet:", data);
                  setToastOpen(true);
                  setTitle("");
                  setNote("");
                }
              }}
            >
              {noteId ? "Opdater note" : "Tilføj note"}
            </button>
            <Toast
              message="Note gemt!"
              isOpen={toastOpen}
              onClose={() => setToastOpen(false)}
            />
          </div>
        </div>
      </form>
    </>
  );
}

function RedigerNote({ noteId }: { noteId: number }) {
  const navigate = useNavigate();
  return (
    <button
      className="text-red-600 hover:text-red-800"
      onClick={async () => {
        navigate("/tilføjnote/" + noteId); // Placeholder navigation
      }}
    >
      Rediger
    </button>
  );
}

function SletNote({
  noteId,
  setNotes,
}: {
  noteId: number;
  setNotes: React.Dispatch<React.SetStateAction<Note[]>>;
}) {
  const { deleteNote, listNotes } = useAuth();
  return (
    <button
      className="text-red-600 hover:text-red-800"
      onClick={async () => {
        const { data, error } = await deleteNote(noteId);
        if (error) {
          console.error("Fejl ved sletning af note:", error);
          alert("Fejl ved sletning af note.");
          return;
        } else {
          console.log("Note slettet:", data);
          alert("Note slettet.");
          const { data: updatedNotes, error: listError } = await listNotes();
          if (listError) {
            console.error("Fejl ved opdatering af noter:", listError);
            return;
          }
          if (updatedNotes) {
            setNotes(updatedNotes);
          }
        }
      }}
    >
      Slet
    </button>
  );
}

function VisNoter() {
  const { listNotes, user } = useAuth();
  const navigate = useNavigate();
  const [notes, setNotes] = useState<Array<Note>>([]);
  const { t } = useTranslation();

  useEffect(() => {
    if (!user) {
      navigate("/logind");
    } else {
      const fetchNotes = async () => {
        const { data, error } = await listNotes();
        if (error) {
          console.error("Fejl ved hentning af noter:", error);
          return;
        }
        console.log("Noter hentet:", data);
        setNotes(data || []);
      };
      fetchNotes();
    }
  }, [listNotes, navigate, user]);

  if (!user) {
    return null;
  }

  return (
    <>
      <h1 className="text-3xl">Dine noter</h1>

      <p className="mt-4">Her kan du se dine noter.</p>

      <table className="min-w-full divide-y divide-gray-200 mt-4">
        <thead className="bg-gray-50">
          <tr>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Titel
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Note
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Oprettet
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            >
              Opdateret
            </th>
            <th
              scope="col"
              className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
            ></th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {notes.map((note) => (
            <tr key={note.id}>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.title}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {note.content}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(note.created_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                {new Date(note.updated_at).toLocaleString()}
              </td>
              <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                <RedigerNote noteId={note.id} />
                {" | "}
                <SletNote noteId={note.id} setNotes={setNotes} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <button
        className="fixed bottom-6 left-6 bg-gray-800 hover:bg-gray-700 text-gray-300 hover:text-white font-medium px-5 py-3 rounded-lg shadow-md flex items-center space-x-2 transition-colors"
        onClick={() => navigate("/tilføjnote")}
      >
        <FaPen className="text-white" />
        <span>{t("add_note")}</span>
      </button>
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

function SideIkkeFundet() {
  return (
    <>
      <h1 className="text-3xl">Side ikke fundet</h1>
      <p className="mt-4">
        Den side, du leder efter, findes ikke. Gå tilbage til{" "}
        <Link to="/forside" className="text-indigo-600 hover:text-indigo-500">
          forsiden
        </Link>
        .
      </p>
    </>
  );
}

function OAuthButtons() {
  const { signInWithOAuthSupabase } = useAuth();
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-gray-500 uppercase font-medium text-sm">
        Eller log ind med
      </h2>
      <div className="flex space-x-4">
        <button
          className="flex items-center justify-center w-8 h-8 border border-transparent rounded-md shadow-sm bg-red-500 hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-400"
          onClick={async () => {
            await signInWithOAuthSupabase("google");
          }}
        >
          <SiGoogle className="w-4 h-4 text-white" />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 border border-transparent rounded-md shadow-sm bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-400"
          onClick={async () => {
            await signInWithOAuthSupabase("facebook");
          }}
        >
          <SiFacebook className="w-4 h-4 text-white" />
        </button>

        <button
          className="flex items-center justify-center w-8 h-8 border border-transparent rounded-md shadow-sm bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
          onClick={async () => {
            await signInWithOAuthSupabase("github");
          }}
        >
          <SiGithub className="w-4 h-4 text-white" />
        </button>
      </div>
    </div>
  );
}

function GlemtAdgangskodeSide() {
  return (
    <>
      <h1 className="text-3xl">Glemt Adgangskode</h1>

      <form className="max-w-lg mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Indtast din email for at nulstille din adgangskode
            </label>
            <input
              type="email"
              id="email"
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <button
              type="submit"
              className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
              onClick={async (e: React.MouseEvent<HTMLButtonElement>) => {
                e.preventDefault();
                alert(
                  "Funktionalitet til nulstilling af adgangskode er ikke implementeret endnu."
                );
              }}
            >
              Nulstil Adgangskode
            </button>
          </div>
        </div>
      </form>
    </>
  );
}
type AuthGuardProps = {
  children: ReactNode;
};

function AuthGuard({ children }: AuthGuardProps) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <Navigate to="/logind" replace />;

  return <>{children}</>;
}

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route path="/" element={<Design />}>
          <Route path="" index element={<Forside />} />
          <Route path="forside" element={<Forside />} />
          <Route path="logind" element={<LogIndSide />} />
          <Route path="glemt-adgangskode" element={<GlemtAdgangskodeSide />} />
          <Route path="opretbruger" element={<OpretBrugerSide />} />
          <Route path="om" element={<Om />} />

          <Route
            path="indstillinger"
            element={
              <AuthGuard>
                <TjekLogindMetoder />
              </AuthGuard>
            }
          />

          <Route
            path="tilføjnote"
            element={
              <AuthGuard>
                <TilføjNote />
              </AuthGuard>
            }
          />
          <Route
            path="tilføjnote/:noteId"
            element={
              <AuthGuard>
                <TilføjNote />
              </AuthGuard>
            }
          />
          <Route
            path="visnoter"
            element={
              <AuthGuard>
                <VisNoter />
              </AuthGuard>
            }
          />
          <Route path="loggetud" element={<DuErLoggetud />} />
          <Route path="*" element={<SideIkkeFundet />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
