import { type AppType } from "next/app";
import { Inter } from "next/font/google";
import { useState, useEffect } from "react";
import { useRouter } from 'next/router';
import { api } from "~/utils/api";

import "~/styles/globals.css";
import Topbar from "~/components/Topbar/index";
import { AppContext } from "~/context/index";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});

const MyApp: AppType = ({ Component, pageProps }) => {

  const [loggedIn, setLoggedIn] = useState(false)

  const router = useRouter();

  useEffect(() => {
    const loginStatus = localStorage.getItem('loggedIn');
    if (loginStatus === "true") {
      setLoggedIn(true);
      if (router.pathname !== '/protected') {
        router.push('/protected');
      }
    } else {
      setLoggedIn(false);
    }
  }, [router.pathname]);


  const providerObj = {
    loggedIn,
    setLoggedIn
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
