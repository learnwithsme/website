import * as React from "react"
import { navigate } from "gatsby"

import Navbar from "../components/navbar"

const NotFoundPage = () => {
  return (
    <Navbar>
      <div className="hero min-h-screen" style={{ backgroundImage: 'url(https://unsplash.com/photos/TnEe6BdBC2M/download?w=640)', }}>
        <div className="hero-overlay bg-gradient-to-b from-transparent via-transparent via-30% to-base-100"></div>
        <div className="hero-content text-center text-neutral-content flex-col">

          <h1 className="mb-5 text-2xl font-bold font-[Poppins] text-base-content">Sorry, this page isn't available.</h1>

          <button className="btn" onClick={() => navigate(-1)}>Go back</button>



        </div>

      </div>
    </Navbar>
  )
}

export default NotFoundPage

export const Head = () => <title>Page not found</title>
