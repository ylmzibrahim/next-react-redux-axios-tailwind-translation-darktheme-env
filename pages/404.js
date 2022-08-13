import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const PageNotFound = () => {
  return <h1>PageNotFound</h1>;
};

export default PageNotFound;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
