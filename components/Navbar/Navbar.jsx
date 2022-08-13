import { useEffect } from "react";
import styles from "../../styles/Navbar.module.css";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { actions, selectors } from "../../store";
import { useTranslation } from "next-i18next";
import { useCookie } from "next-cookie";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";
import { useTheme } from "next-themes";
import { useRouter } from "next/router";
import Image from "next/image";

const Navbar = () => {
  const { t } = useTranslation();
  const { systemTheme, theme, setTheme } = useTheme();
  const currentTheme = theme === "system" ? systemTheme : theme;

  const dispatch = useDispatch();
  const user = useSelector(selectors.getUser);
  const isLoggedIn = useSelector(selectors.getIsLoggedIn);
  const language = useSelector(selectors.getLanguage);
  const themeState = useSelector(selectors.getTheme);

  const router = useRouter();
  const cookie = useCookie();

  // Maybe useLayoutEffect instead of useEffect
  useEffect(() => {
    dispatch(actions.setLanguage(router.locale));
    dispatch(actions.setTheme(currentTheme));

    if (
      !cookie.has("access_token") &&
      router.route !== "/login" &&
      router.route !== "/register" &&
      router.route !== "/404" &&
      router.route !== "/"
    ) {
      router.push("/login");
    } else if (!isLoggedIn && cookie.has("access_token")) {
      getUser()
        .then((response) => {
          dispatch(actions.setUser(response.data.user));
          dispatch(actions.setIsLoggedIn(true));
        })
        .catch((error) => {
          if (error.response.status === 401) {
            removeCookie("access_token", { path: "/" });
            router.push("/login");
          }
        });
    } else if (
      isLoggedIn &&
      (router.route === "/login" || router.route === "/register")
    ) {
      router.push("/");
    }
  }, [isLoggedIn, router]);

  useEffect(() => {
    if (isLoggedIn)
      console.log("User is logged in :", user, isLoggedIn, language);
    else console.log("User is not logged in yet!");
  }, [isLoggedIn]);

  const handleChangeLanguage = () => {
    if (language === "en-US") {
      router.replace(router.asPath, router.asPath, { locale: "tr-TR" });
      dispatch(actions.setLanguage("tr-TR"));
    } else {
      router.replace(router.asPath, router.asPath, { locale: "en-US" });
      dispatch(actions.setLanguage("en-US"));
    }
  };

  const handleChangeTheme = () => {
    if (themeState === "light") {
      setTheme("dark");
      dispatch(actions.setTheme("dark"));
    } else {
      setTheme("light");
      dispatch(actions.setTheme("light"));
    }
  };

  return (
    <div className={styles.navbar}>
      <div className={styles.links}>
        <Link href="/">{t("Home")}</Link>
        {user.username !== undefined && (
          <Link href={`/user/${user.username}`}>{user.username}</Link>
        )}
      </div>
      <div className="ml-auto mr-2 space-x-2 flex flex-row">
        <div className="flex items-center justify-center shadow-lg p-0.5">
          <button
            className="relative h-6 aspect-square"
            onClick={handleChangeTheme}
          >
            {themeState !== "dark" ? <MoonIcon /> : <SunIcon />}
          </button>
        </div>
        <div className="flex items-center justify-center shadow-lg p-0.5">
          <button
            className="relative h-6 aspect-video"
            onClick={handleChangeLanguage}
          >
            {language === "en-US" ? (
              <Image
                src="/images/flag-US.webp"
                layout="fill"
                alt="flag-united-states-america"
              />
            ) : (
              <Image
                src="/images/flag-TR.webp"
                layout="fill"
                alt="flag-turkey"
              />
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Navbar;