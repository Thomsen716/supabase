import { ReactNode, useEffect, useState } from "react";
import {
  Routes,
  Route,
  Link,
  useNavigate,
  useParams,
  Navigate,
} from "react-router";
import { useAuth } from "./Supabase";

import Toast from "./components/Toast";
import { FaPen } from "react-icons/fa";
import { useTranslation } from "react-i18next";

import Design from "./pages/Design";
import Welcome from "./pages/Welcome";
import News from "./pages/News";
import ForgotPassword from "./pages/ForgotPassword";
import CreateUser from "./pages/CreateUser";
import SignIn from "./pages/SignIn";
import { Note } from "./types/NoteInterface";
import { AuthProvider } from "./Auth";

function Om() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-3xl">{t("about")}</h1>
    </>
  );
}

function TjekLogindMetoder() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const { t } = useTranslation();
  let loggedInWithEmail = false;
  let loggedInWithOAuth = false;
  const providers = [];

  if (user?.identities) {
    for (const identity of user.identities) {
      if (identity.provider === "email") {
        loggedInWithEmail = true;
        providers.push(identity.identity_data?.email || "");
      } else {
        loggedInWithOAuth = true;
        if (identity.provider == "google") providers.push("Google");
        if (identity.provider == "facebook") providers.push("Facebook");
        if (identity.provider == "github") providers.push("GitHub");
      }
    }
  } else {
    navigate("/logind");
  }
  return (
    <>
      <h1 className="text-3xl">{t("settings")}</h1>
      <p className="mt-4">{t("settings_text")}</p>
      {loggedInWithEmail && loggedInWithOAuth && (
        <>
          <p className="mt-4">
            {t("multiple_methods_warning")}{" "}
            {t("multiple_methods_providers", {
              providers: providers.join(", "),
            })}
            .
          </p>
        </>
      )}
      {loggedInWithEmail && <Indstillinger></Indstillinger>}
    </>
  );
}

function VælgeSprog() {
  const { i18n } = useTranslation();
  const [sprog, setSprog] = useState(i18n.language); // browser default
  const [toastOpen, setToastOpen] = useState(false);

  const håndterSprogSkift = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const valgtSprog = e.target.value;
    setSprog(valgtSprog);
    i18n.changeLanguage(valgtSprog); // skifter sproget globalt
    setToastOpen(true);
  };

  return (
    <>
      <h1 className="text-3xl mb-4">{i18n.t("choose_language")}</h1>
      <div className="max-w-lg mx-auto">
        <label
          htmlFor="sprog"
          className="block text-sm font-medium text-gray-700 mb-1"
        >
          {i18n.t("preferred_language")}
        </label>
        <select
          id="sprog"
          value={sprog}
          onChange={håndterSprogSkift}
          className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
        >
          <option value="da">Dansk</option>
          <option value="en">Engelsk</option>
        </select>
      </div>
      <Toast
        message={i18n.t("language_saved")}
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
  const { t } = useTranslation();

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
      <form className="max-w-lg mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="fornavn"
              className="block text-sm font-medium text-gray-700"
            >
              {t("first_name")}
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
              {t("last_name")}
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
              {t("email")}
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
              {t("password")}
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
              {t("confirm_password")}
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
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-3xl">{t("logged_out")}</h1>
      <p className="mt-4">
        {t("you_are_now_signed_out")}. {t("see_you_next_time")}
      </p>
    </>
  );
}

function SideIkkeFundet() {
  const { t } = useTranslation();
  return (
    <>
      <h1 className="text-3xl">{t("page_not_found")}</h1>
      <p className="mt-4">
        {t("go_back_home")}{" "}
        <Link to="/news" className="text-indigo-600 hover:text-indigo-500">
          {t("home")}
        </Link>
        .
      </p>
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
          <Route path="" index element={<Welcome />} />
          <Route path="welcome" element={<Welcome />} />
          <Route path="news" element={<News />} />
          <Route path="logind" element={<SignIn />} />
          <Route path="glemt-adgangskode" element={<ForgotPassword />} />
          <Route path="opretbruger" element={<CreateUser />} />
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
