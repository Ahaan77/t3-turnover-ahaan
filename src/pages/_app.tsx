import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Topbar from "~/components/Topbar/index";
import { AppContext } from "~/context/index";
import Toast from "~/components/Toast/index";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {

  const [loggedIn, setLoggedIn] = useState(false)
  const [displayName, setDisplayName] = useState("")

  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem('loggedIn');
    const dName = localStorage.getItem('username');
    if (loginStatus === "true") {
      setLoggedIn(true);
      setDisplayName(dName ?? "");
      if (router.pathname !== '/protected') {
        router.push('/protected');
      }
    } else {
      setLoggedIn(false);
      setDisplayName(" ");
    }
  }, [router.pathname]);


  const providerObj = {
    loggedIn,
    setLoggedIn,
    displayName
  }

  return (
    <>
      <AppContext.Provider value={providerObj}>
        <main className={`${inter.variable} inter`}>
          <Topbar banner={"ECOMMERCE"} />
          <Component {...pageProps} />
        </main>
      </AppContext.Provider>
    </>
  );
};

export default api.withTRPC(MyApp);
