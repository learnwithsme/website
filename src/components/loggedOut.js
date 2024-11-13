import * as React from "react"
import logoWords from "/src/images/logo-words.png"
import { LogoSmall } from "./logo";
import { AnimatedBackground } from 'animated-backgrounds';

import { Footer } from "./navbar";

export default function ({
    ids,
    setSubmittedId
}) {


    return <>

        <div className="hero min-h-screen"
        //style={{ backgroundImage: 'url(https://unsplash.com/photos/W8WIwErOPlI/download?w=640)', }}
        >

            <AnimatedBackground animationName="particleNetwork" />
            <div className=" bg-gradient-to-b from-transparent to-base-100"></div>
            <div className="hero-content text-center text-neutral-content">
                <div className="max-w-md">


                    <LogoSmall
                        className="block m-auto"
                        width="200"
                        height="200"
                    />

                    <h1 className="mb-5 text-6xl font-bold font-['Futura_Std',sans-serif] text-base-content">Learn With <span className="text-[#d6d869]">SME</span></h1>
                    <p className="mb-5 text-base-content ">Enter your username to access Learn With SME!</p>


                    <form id="formId" action="https://docs.google.com/forms/d/e/1FAIpQLScEHz7mib-hTKiJv5SGyxoIzDq1Zm6YFNMeUUsqGfYr8FYtIQ/formResponse" method="post" target="_blank" onSubmit={(e) => {
                        e.preventDefault();

                        let idInput = document.getElementById("formIdInput");

                        if (!ids.includes(window.btoa(idInput.value))) {
                            return false;
                        }

                        document.getElementById("formId").submit();

                        setSubmittedId(window.btoa(idInput.value));

                        return true;


                    }} className="flex flex-col gap-y-2">
                        {/*                             
                            <input id="formIdEmail" type="email" placeholder="Input your email address" className="input input-bordered grow" name="emailAddress" /> 
                            */}

                        <input id="formIdInput" type="text" placeholder="Input your username" className="input input-bordered grow text-base-content" name="entry.1269739242" />

                        <input type="submit" className="btn grow-0" value="Submit" />
                    </form>



                    <div className="flex flex-row justify-center pt-6 text-xs opacity-55 text-base-content">
                        Powered by&nbsp;
                        <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" height="16px" width="49px" className=" text-white" />&nbsp;
                        <span className="">Forms</span>
                    </div>


                </div>
            </div>
        </div>
        {/* use the standard footer */}
        <Footer></Footer>
    </>

}