import { useTranslation } from "react-i18next";
import { Link } from "react-router";

function PageNotFound() {
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

export default PageNotFound;
