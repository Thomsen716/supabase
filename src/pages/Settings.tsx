import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router";
import EmailAccountSettings from "../components/EmailAccountSettings";
import { useAuth } from "../Supabase";

function Settings() {
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
      {loggedInWithEmail && <EmailAccountSettings></EmailAccountSettings>}
    </>
  );
}

export default Settings;
