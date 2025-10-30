import { useTranslation } from "react-i18next";

function YouAreLoggedOut() {
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

export default YouAreLoggedOut;
