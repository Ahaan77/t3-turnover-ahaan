import { useContext, useEffect, useState } from "react";
import { AppContext } from "~/context/index";
import { nav, top_nav } from "~/static/index";
import { useRouter } from "next/router"

const Topbar = ({ banner }: { banner: string }) => {

    const navClass = "hover:scale-[1.1] hover:transition duration-200 text-black cursor-pointer hover:text-gray-600";
    const [displayName, setDisplayName] = useState("")
    const { loggedIn }: any = useContext(AppContext);
    const router = useRouter()

    useEffect(() => {
        const handleStorageChange = () => {
            // Update displayName whenever localStorage changes
            setDisplayName(localStorage.getItem("username") ?? "");
        };

        // Subscribe to the storage event
        window.addEventListener("storage", handleStorageChange);

        // Call handleStorageChange once immediately to sync with the current state of localStorage
        handleStorageChange();

        // Cleanup function to remove the event listener when the component unmounts
        return () => {
            window.removeEventListener("storage", handleStorageChange);
        };
    }, []);

    const logout = async () => {
        try {
            localStorage?.removeItem("email")
            localStorage?.removeItem("username")
            localStorage?.removeItem("loggedIn")
            await router.push("/")

        } catch (err) {
            console.log(err)
        }
    }

    return (
        <>
            <div className="h-[100px] bg-white w-full">
                <div className="h-[35px] w-full flex justify-end">
                    <div className="mr-10 flex gap-4 items-center text-[12px] mt-2 font-light">
                        {top_nav?.map((item: string, index: number) => (
                            <p className={navClass} key={index}>{item}</p>
                        ))}
                        {loggedIn && <p className={navClass}>Hi, {displayName}</p>}
                        {loggedIn && <p onClick={() => logout()} className={`underline ${navClass}`}>Logout</p>}
                    </div>
                </div>
                <div className="flex justify-between mx-10 h-[65px] items-center">
                    <div className="text-[32px] font-bold">{banner}</div>
                    <div className="flex items-center gap-8 -ml-16 font-semibold text-[16px]">
                        {nav?.map((item: string, index: number) => (
                            <p key={index} className={navClass}>{item}</p>
                        ))}
                    </div>
                    <div className="flex items-center gap-9">
                        <img className={navClass} src="/assets/search.svg" alt="search" />
                        <img className={navClass} src="/assets/cart.svg" alt="cart" />
                    </div>
                </div>
            </div>
            <div className="h-[36px] bg-[#F4F4F4] w-full flex justify-center items-center text-[14px]">
                <div className="flex gap-4 items-center">
                    <img className="cursor-pointer" src="/assets/arrow.svg" alt="arrow" />
                    <p>Get 10% off on business sign up</p>
                    <img className="rotate-[180deg] cursor-pointer" src="/assets/arrow.svg" alt="arrow" />
                </div>
            </div>
        </>
    );
};

export default Topbar;
