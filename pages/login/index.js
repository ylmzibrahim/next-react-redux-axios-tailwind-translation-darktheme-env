import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Login = () => {
  return <div>Login...</div>;
};

export default Login;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
