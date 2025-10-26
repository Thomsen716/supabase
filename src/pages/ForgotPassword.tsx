import { useTranslation } from "react-i18next";

function ForgotPassword() {
  const { t } = useTranslation();

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
              {t("reset_password_text")}
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
              {t("reset_password")}
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default ForgotPassword;
