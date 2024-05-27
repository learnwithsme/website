import * as React from "react";
import { useLocation } from '@reach/router';

export function FormContact({
    id,
    onSubmit
}) {



    return <form id={id} action="https://docs.google.com/forms/u/1/d/e/1FAIpQLSc_0Pvca7SBptGGOPC7HGWY2_OAZ-DoMT0ga640_2RuwrjPyw/formResponse" method="POST" target="_blank" onSubmit={onSubmit}>
        {/* USERNAME */}
        <input type="hidden" name="entry.1885116794" value={
            typeof window !== 'undefined'
                ? window.atob(window.sessionStorage.getItem("id"))
                : null
        } />

        {/* URL */}
        <input type="hidden" name="entry.2083018028" value={useLocation().pathname} />


        <div className="flex flex-wrap flex-row justify-center gap-5 my-5">

            <div className="max-w-xs">
                <label className="label cursor-pointer">
                    <span className="label-text">Feedback</span>
                    <input type="radio" name="entry.119354647" className="radio" value="Feedback" required />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Suggestion</span>
                    <input type="radio" name="entry.119354647" className="radio" value="Suggestion" required />
                </label>
                <label className="label cursor-pointer">
                    <span className="label-text">Request</span>
                    <input type="radio" name="entry.119354647" className="radio" value="Request" required />
                </label>
            </div>

            <textarea className="textarea textarea-bordered grow " placeholder="Type here" name="entry.1247762361" required></textarea>

        </div>

        <div className="flex flex-col justify-items-center">

            <div className="text-center">
                <input type="submit" className="btn" value="Submit ↗" />
            </div>

            <div className="flex flex-row justify-center pt-6 text-xs opacity-55">
                Powered by&nbsp;
                <img src="https://www.gstatic.com/images/branding/googlelogo/svg/googlelogo_light_clr_74x24px.svg" alt="Google" height="16px" width="49px" className=" text-white" />&nbsp;
                <span className="">Forms</span>
            </div>

        </div>

    </form>;


}