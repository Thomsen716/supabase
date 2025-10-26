import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "../Supabase";

function News() {
  const { getUserProfileSupabase, user } = useAuth();
  const { t } = useTranslation();

  const [userDataToDisplay, setUserDataToDisplay] = useState<string>("");

  useEffect(() => {
    const fetchUserProfile = async () => {
      const { data, error } = await getUserProfileSupabase();
      if (error) {
        console.error(error);
        return;
      }
      setUserDataToDisplay(
        `${data?.first_name || ""} ${data?.last_name || ""}`.trim()
      );
    };
    if (user) fetchUserProfile();
  }, [getUserProfileSupabase, user]);

  return (
    <>
      <h1 className="text-3xl">{t("news")}</h1>{" "}
      {user ? (
        <p className="mt-4">
          {t("hi")} {userDataToDisplay}. {t("you_are_logged_in")}.
        </p>
      ) : (
        <p className="mt-4">{t("you_are_not_logged_in")}</p>
      )}
    </>
  );
}
export default News;
