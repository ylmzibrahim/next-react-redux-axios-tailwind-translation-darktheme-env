import "../styles/globals.css";
import { Provider } from "react-redux";
import { useRouter } from "next/router";
import { Layout } from "../components";
import { store } from "../store";
import { appWithTranslation } from "next-i18next";
import { ThemeProvider } from "next-themes";

function MyApp({ Component, pageProps }) {
  const router = useRouter();
  console.log(router);

  return (
    <Provider store={store}>
      <ThemeProvider attribute="class">
        <Layout>
          <Component {...pageProps} />
        </Layout>
      </ThemeProvider>
    </Provider>
  );
}

export default appWithTranslation(MyApp);
