import { useTranslation } from "react-i18next";

function About() {
  const { t } = useTranslation();

  return (
    <>
      <h1 className="text-3xl">{t("about")}</h1>
    </>
  );
}

export default About;
