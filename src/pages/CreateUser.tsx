import { useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Supabase";
import checkPasswordsAndEmail from "../utils/CheckPasswordsAndEmail";

function CreateUser() {
  const [fornavnField, setFornavnField] = useState("");
  const [efternavnField, setEfternavnField] = useState("");
  const [emailField, setEmailField] = useState("");
  const [passwordField, setPasswordField] = useState("");
  const [confirmPasswordField, setConfirmPasswordField] = useState("");
  const signUpSupabase = useAuth().signUpSupabase;
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-3xl">{t("create_account")}</h1>
      <form className="max-w-lg mx-auto mt-4">
        <div className="flex flex-col space-y-4">
          <div>
            <label
              htmlFor="Fornavn"
              className="block text-sm font-medium text-gray-700"
            >
              {t("first_name")}
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
              {t("last_name")}
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
              {t("email")}
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
              {t("password")}
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
              {t("confirm_password")}
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

                const valid = checkPasswordsAndEmail(
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
              {t("create_account")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default CreateUser;
