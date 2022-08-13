import { serverSideTranslations } from "next-i18next/serverSideTranslations";

const Register = () => {
  return <div>Register...</div>;
};

export default Register;

export const getStaticProps = async ({ locale }) => ({
  props: { ...(await serverSideTranslations(locale, ["common", "footer"])) },
});
