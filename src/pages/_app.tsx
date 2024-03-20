import { type AppType } from "next/app";
import { Inter } from "next/font/google";

import { api } from "~/utils/api";

import "~/styles/globals.css";
import Topbar from "~/components/Topbar/index";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-sans",
});
const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <>

      <main className={`${inter.variable} inter`}>
        <Topbar banner={"ECOMMERCE"} />
        <Component {...pageProps} />
      </main>
    </>
  );
};

export default api.withTRPC(MyApp);
