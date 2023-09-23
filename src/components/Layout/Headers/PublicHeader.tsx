import Link from 'next/link';
import { Button } from '@/components/Button'
import { useState } from 'react';
import Logo from '@/assets/logo.png'
import Image from 'next/image';
import { useRouter } from "next/router";

export function PublicHeader() {
    const [navbar, setNavbar] = useState(false);
    const { pathname } = useRouter();

    return (
        <div className={`flex flex-col align-middle justify-content-center w-full ${pathname === "/" ? "absolute bg-transparent" : "w-screen bg-black"} z-50 `}>
            <nav className="flex flex-col md:flex-row justify-between flex-wrap p-6 w-full">
                <div className='flex flex-1 flex-row items-center'>
                    <div className='flex flex-1 flex-col md:flex-row-reverse gap-5 '>
                        <div className={`flex flex-row items-center  flex-shrink-0 text-gray-900`}>
                            <a className='absolute left-0' href="#">
                                <Image src={Logo} className='hover:scale-105 duration-200 p-2' alt='A' width={125} />
                            </a>
                            <div className='flex flex-1 justify-end'>
                                <div className='flex gap-5'>
                                    <Button variant='primary' onClick={() => window.location.href = "/login"}>Login</Button>
                                    <button className="md:hidden pl-2 text-white rounded-md outline-none hover:text-primary hover:border-opacity-50" onClick={() => setNavbar(!navbar)}>
                                        {navbar ? (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6 " viewBox="0 0 20 20" fill="currentColor">
                                                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                                            </svg>
                                        ) : (
                                            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                            </svg>
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        <div className={`flex w-full flex-1 self-center md:block md:pb-0 md:mt-0 ${navbar ? 'block' : 'hidden'}`}>
                            <ul className="flex w-full justify-end font-medium flex-col p-4 md:p-0 mt-4 border backdrop-brightness-90 backdrop-blur-sm border-gray-800 rounded-lg md:flex-row md:space-x-8 md:mt-0 md:border-0 text-white md:backdrop-blur-none md:backdrop-brightness-[none]">
                                <li className="block py-2 pl-3 pr-4 rounde md:hover:bg-transparent md:border-0 md:p-0 hover:text-primary">
                                    <Link className="flex" href="/">
                                        Início
                                    </Link>
                                </li>
                                <li className="block py-2 pl-3 pr-4 rounde md:hover:bg-transparent md:border-0 md:p-0 hover:text-primary">
                                    <Link className="flex" href="/cardapio">
                                        Cardápio
                                    </Link>
                                </li>
                                <li className="block py-2 pl-3 pr-4 rounde md:hover:bg-transparent md:border-0 md:p-0 hover:text-primary">
                                    <Link className="flex" href="/reservar">
                                        Reservar
                                    </Link>
                                </li>
                                <li className="block py-2 pl-3 pr-4 rounde md:hover:bg-transparent md:border-0 md:p-0 hover:text-primary">
                                    <Link className="flex" href="/contato">
                                        Contato
                                    </Link>
                                </li>
                                <li className="block py-2 pl-3 pr-4 rounde md:hover:bg-transparent md:border-0 md:p-0 hover:text-primary">
                                    <Link className="flex" href="/sobre">
                                        Sobre
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>

            </nav>
        </div>
    )

}