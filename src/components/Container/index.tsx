import Link from 'next/link';
import { useContext, useState } from 'react';
import { Authenticate, Verify } from '~/utils/index';
import { useRouter } from 'next/router';
import {
    headlines,
    subHeadlines,
    descriptions,
    buttonTexts,
    footers,
    footerButtons,
} from '../../static/index';
import OtpInput from 'react-otp-input';
import Interests from '../Interests/index';
import { AppContext } from '~/context/index';

type ContainerType = 'Signup' | 'login' | 'verify' | 'protected';

const Container = ({ type, data }: { type: ContainerType; data: string[] }) => {


    const [show, setShow] = useState(false);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const router = useRouter();
    const { setLoggedIn }: any = useContext(AppContext)
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 6;

    const handlePagination = (pageNumber: number) => {
        setCurrentPage(pageNumber);
    };

    // Calculate the indexes for pagination
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const inputClass = 'border border-[#C1C1C1] px-3 py-3 rounded-[6px] w-full focus:outline-none flex justify-between items-center';

    const clickButton = async () => {
        if (type === 'Signup') {
            const res = await Authenticate(name, email);
            if (res === true) {
                await router.push('/verify');
            }
        } else if (type === 'verify') {
            const res = await Verify(otp);
            if (res === true) {
                setLoggedIn(true)
                await router.push('/protected');
            }
        } else if (type === 'login') {
            const res = await Authenticate(name, email);
            if (res) {
                localStorage?.setItem("loggedIn", "true")
                await router.push("/protected")
            }
        }
    };

    const totalPages = Math.ceil(data.length / itemsPerPage);

    const renderPageNumbers = () => {
        const visiblePages = 7; // Number of visible pages
        const halfVisiblePages = Math.floor(visiblePages / 2);
        let startPage = Math.max(currentPage - halfVisiblePages, 1);
        const endPage = Math.min(startPage + visiblePages - 1, totalPages);

        if (endPage - startPage + 1 < visiblePages) {
            startPage = Math.max(endPage - visiblePages + 1, 1);
        }

        const pages = [];
        for (let i = startPage; i <= endPage; i++) {
            pages.push(
                <span
                    key={i}
                    onClick={() => handlePagination(i)}
                    className={`mr-2 cursor-pointer ${currentPage === i ? 'text-black font-semibold' : 'text-[#ACACAC]'
                        }`}
                >
                    {i}
                </span>
            );
        }
        return pages;
    };

    const prevPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const nextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    return (
        <div className="flex justify-center">
            <div className="mt-10 w-[576px] border border-[#C1C1C1] rounded-[20px]">
                <p className="text-3xl font-semibold mt-8 flex justify-center">{headlines[type]}</p>
                {type !== 'Signup' && (
                    <div>
                        <p className="text-2xl mt-8 flex justify-center">{subHeadlines[type]}</p>
                        <p className="text-lg mt-3 flex justify-center">{descriptions[type]}</p>
                    </div>
                )}
                <div className="mx-16 mt-8">
                    {type === 'Signup' || type === 'login' ? (
                        <div>
                            {type === 'Signup' && (
                                <div>
                                    <p className="mb-1">Name</p>
                                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} className={inputClass} placeholder="Enter" />
                                </div>
                            )}
                            <p className="mb-1 mt-6">Email</p>
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className={inputClass} placeholder="Enter" />
                            <p className="mb-1 mt-6">Password</p>
                            <div className={inputClass}>
                                <input type={show ? 'text' : 'password'} className="focus:outline-none w-[60%]" placeholder="Enter" />
                                <p onClick={() => setShow(!show)} className="underline tracking-wide cursor-pointer">{show ? <span> Hide</span> : <span>Show</span>}</p>
                            </div>
                        </div>
                    ) : type === 'verify' ? (
                        <div className="mb-8">
                            <p className="mb-2">Code</p>
                            <OtpInput
                                value={otp}
                                onChange={setOtp}
                                numInputs={8}
                                renderSeparator={<span></span>}
                                renderInput={(props) => <input {...props} />}
                                inputStyle="inputStyle"
                            />
                        </div>
                    ) : (
                        <>
                            <div>
                                <p className="text-lg font-medium">My saved interests!</p>
                                <div className="mt-3">
                                    {currentItems.map((item, index) => (
                                        <Interests key={index} item={item} />
                                    ))}
                                </div>
                            </div>
                            <div className="text-center mt-4 mb-6 flex justify-start">
                                <span className='cursor-pointer' onClick={prevPage}>&lt; &nbsp;</span>
                                {renderPageNumbers()}
                                <span onClick={nextPage} className="cursor-pointer">
                                    &gt;
                                </span>
                            </div>
                        </>

                    )}
                    {type !== 'protected' && (
                        <button onClick={() => clickButton()} className="mt-6 rounded-[6px] bg-black text-white w-full px-4 py-4 mb-10 hover:bg-gray-700 hover:transition duration-400 uppercase ">
                            {buttonTexts[type]}
                        </button>
                    )}
                    <p className="w-full flex justify-center mb-10 text-[#333333] text-[16px]">
                        {footers[type]}
                        <Link href={type === 'Signup' ? '/login' : '/'}>
                            <span className="font-semibold text-black tracking-widest cursor-pointer hover:text-gray-600 hover:transition duration-200">&nbsp;{footerButtons[type]}</span>
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Container;
