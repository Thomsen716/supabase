import { useTranslation } from "react-i18next";
import { SiGoogle, SiFacebook, SiGithub } from "react-icons/si";
import { useAuth } from "../Supabase";

function OAuthButtons() {
  const { signInWithOAuthSupabase } = useAuth();
  const { t } = useTranslation();
  return (
    <div className="flex flex-col items-center space-y-4">
      <h2 className="text-gray-500 uppercase font-medium text-sm">
        {t("or_continue_with")}
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

export default OAuthButtons;
