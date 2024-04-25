import * as React from "react"
import logoWords from "/src/images/logo-words.png"

import { Link, useStaticQuery, graphql } from 'gatsby'

const Navbar = ({
    children,
    leading,
    trailing,
    enableDivider = true,
    className,
    enableNavbar = true,
}) => {
    return <div className={`drawer ${className}`}>





        <input id="main-drawer" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content">
            {/* Page content here */}

            {enableNavbar ?
                <nav className="navbar bg-base-300 drop-shadow-xl sticky top-0 z-[1] ">
                    <div className="flex-none">


                        {/* Show this on mobile (drawer opener)
                    <label htmlFor="main-drawer" className="btn  btn-square btn-ghost  md:hidden"><span class="material-symbols-outlined ">
                        menu
                    </span></label>
                    */}
                    </div>
                    <div className="flex-1">
                        <Link className="btn btn-ghost text-xl hidden md:flex font-[Poppins]" to="/">SME Academic Hub</Link>


                        {enableDivider ? <div className="divider divider-horizontal mx-0 hidden  md:flex" /> : <></>}

                        {leading}

                        <Link className="btn btn-ghost   grow md:hidden text-xl sm:justify-self-start" to="/">SME Academic Hub</Link>
                    </div>
                    <div className="flex-none">
                        {trailing}
                    </div>

                    {/* LIGHT MODE / DARK MODE SWITCHER
                <div className="tooltip tooltip-left" data-tip="Change theme">
                    <label className="btn btn-ghost swap swap-rotate">
                        <input type="checkbox" className="theme-controller" value="emerald" />

                        <span class="swap-on fill-current material-symbols-outlined">
                            light_mode
                        </span>
                        <span class="swap-off fill-current material-symbols-outlined">
                            dark_mode
                        </span>


                    </label>
                </div>
                */}
                </nav>
                : <></>}


            <main className="min-h-screen">

                {children}{/*
            <label htmlFor="main-drawer" className="btn btn-primary drawer-button">Open drawer</label>*/}
            </main>


            {/* FOOTER */}

            <footer className="bg-gradient-to-b from-base-100 via-slate-700 via-30% to-slate-700 mt-10 pt-[12rem] px-10 pb-10 xl:p-20 text-slate-50 flex flex-wrap flex-row">
                <div className="grow">
                    <div>
                        <img src={logoWords} width="80" className="inline" /> <span className="align-middle">Society of Manufacturing Engineers</span>
                    </div>
                    <div className="text-4xl font-bold ">
                        Making the future. <br /><span className="text-[#d8d952]">Together.</span>
                    </div>
                </div >
                <div className="flex flex-wrap flex-row text-md">
                    {/* FACEBOOK */}
                    <div className="m-2">
                        <svg className="inline" fill="#ffffff" width="40px" height="40px" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M12.001 2.002c-5.522 0-9.999 4.477-9.999 9.999 0 4.99 3.656 9.126 8.437 9.879v-6.988h-2.54v-2.891h2.54V9.798c0-2.508 1.493-3.891 3.776-3.891 1.094 0 2.24.195 2.24.195v2.459h-1.264c-1.24 0-1.628.772-1.628 1.563v1.875h2.771l-.443 2.891h-2.328v6.988C18.344 21.129 22 16.992 22 12.001c0-5.522-4.477-9.999-9.999-9.999z" /></svg> <a className="align-middle link link-hover" href="https://www.facebook.com/SmeDlsuChapter" target="_blank">Society of Manufacturing Engineers</a>
                    </div>
                    {/* INSTAGRAM */}
                    <div className="m-2">
                        <svg className="inline" width="40px" height="40px" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M12 18C15.3137 18 18 15.3137 18 12C18 8.68629 15.3137 6 12 6C8.68629 6 6 8.68629 6 12C6 15.3137 8.68629 18 12 18ZM12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" fill="#ffffff" />
                            <path d="M18 5C17.4477 5 17 5.44772 17 6C17 6.55228 17.4477 7 18 7C18.5523 7 19 6.55228 19 6C19 5.44772 18.5523 5 18 5Z" fill="#ffffff" />
                            <path fill-rule="evenodd" clip-rule="evenodd" d="M1.65396 4.27606C1 5.55953 1 7.23969 1 10.6V13.4C1 16.7603 1 18.4405 1.65396 19.7239C2.2292 20.8529 3.14708 21.7708 4.27606 22.346C5.55953 23 7.23969 23 10.6 23H13.4C16.7603 23 18.4405 23 19.7239 22.346C20.8529 21.7708 21.7708 20.8529 22.346 19.7239C23 18.4405 23 16.7603 23 13.4V10.6C23 7.23969 23 5.55953 22.346 4.27606C21.7708 3.14708 20.8529 2.2292 19.7239 1.65396C18.4405 1 16.7603 1 13.4 1H10.6C7.23969 1 5.55953 1 4.27606 1.65396C3.14708 2.2292 2.2292 3.14708 1.65396 4.27606ZM13.4 3H10.6C8.88684 3 7.72225 3.00156 6.82208 3.0751C5.94524 3.14674 5.49684 3.27659 5.18404 3.43597C4.43139 3.81947 3.81947 4.43139 3.43597 5.18404C3.27659 5.49684 3.14674 5.94524 3.0751 6.82208C3.00156 7.72225 3 8.88684 3 10.6V13.4C3 15.1132 3.00156 16.2777 3.0751 17.1779C3.14674 18.0548 3.27659 18.5032 3.43597 18.816C3.81947 19.5686 4.43139 20.1805 5.18404 20.564C5.49684 20.7234 5.94524 20.8533 6.82208 20.9249C7.72225 20.9984 8.88684 21 10.6 21H13.4C15.1132 21 16.2777 20.9984 17.1779 20.9249C18.0548 20.8533 18.5032 20.7234 18.816 20.564C19.5686 20.1805 20.1805 19.5686 20.564 18.816C20.7234 18.5032 20.8533 18.0548 20.9249 17.1779C20.9984 16.2777 21 15.1132 21 13.4V10.6C21 8.88684 20.9984 7.72225 20.9249 6.82208C20.8533 5.94524 20.7234 5.49684 20.564 5.18404C20.1805 4.43139 19.5686 3.81947 18.816 3.43597C18.5032 3.27659 18.0548 3.14674 17.1779 3.0751C16.2777 3.00156 15.1132 3 13.4 3Z" fill="#ffffff" />
                        </svg> <a className="align-middle link link-hover" href="https://www.instagram.com/smedlsu" target="_blank">@smedlsu</a>
                    </div>
                    {/* LINKEDIN */}
                    <div className="m-2">
                        <svg className="inline" fill="#ffffff" width="40px" height="40px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg">
                            <path d="M28.778 1.004h-25.56c-0.008-0-0.017-0-0.027-0-1.199 0-2.172 0.964-2.186 2.159v25.672c0.014 1.196 0.987 2.161 2.186 2.161 0.010 0 0.019-0 0.029-0h25.555c0.008 0 0.018 0 0.028 0 1.2 0 2.175-0.963 2.194-2.159l0-0.002v-25.67c-0.019-1.197-0.994-2.161-2.195-2.161-0.010 0-0.019 0-0.029 0h0.001zM9.9 26.562h-4.454v-14.311h4.454zM7.674 10.293c-1.425 0-2.579-1.155-2.579-2.579s1.155-2.579 2.579-2.579c1.424 0 2.579 1.154 2.579 2.578v0c0 0.001 0 0.002 0 0.004 0 1.423-1.154 2.577-2.577 2.577-0.001 0-0.002 0-0.003 0h0zM26.556 26.562h-4.441v-6.959c0-1.66-0.034-3.795-2.314-3.795-2.316 0-2.669 1.806-2.669 3.673v7.082h-4.441v-14.311h4.266v1.951h0.058c0.828-1.395 2.326-2.315 4.039-2.315 0.061 0 0.121 0.001 0.181 0.003l-0.009-0c4.5 0 5.332 2.962 5.332 6.817v7.855z"></path>
                        </svg> <a className="align-middle link link-hover" href="https://www.linkedin.com/company/sme-dlsu" target="_blank">Society of Manufacturing Engineers - DLSU Student Chapter</a>
                    </div>
                    {/* EMAIL */}
                    <div className="m-2">
                        <svg className="inline" fill="#ffffff" width="40px" height="40px" viewBox="0 0 1920 1920" xmlns="http://www.w3.org/2000/svg">
                            <path d="M1920 428.266v1189.54l-464.16-580.146-88.203 70.585 468.679 585.904H83.684l468.679-585.904-88.202-70.585L0 1617.805V428.265l959.944 832.441L1920 428.266ZM1919.932 226v52.627l-959.943 832.44L.045 278.628V226h1919.887Z" fill-rule="evenodd" />
                        </svg> <a className="align-middle link link-hover" href="mailto:sme@dlsu.edu.ph" target="_blank">sme@dlsu.edu.ph</a>
                    </div>
                </div>


            </footer>



        </div>

        <div className="drawer-side z-[2]">
            <label htmlFor="main-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
            <ul className="menu p-4 w-80 min-h-full bg-base-200 text-base-content">
                {/* Sidebar content here 
                <li><a>Sidebar Item 1</a></li>
                <li><a>Sidebar Item 2</a></li>
                */}
            </ul>
        </div>

    </div>

}

export default Navbar
