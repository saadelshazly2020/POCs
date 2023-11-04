import React from "react";
import Products from "./Products";
// import Navbar from "./nav-bar";
import ResponsiveCards from "./reponsive-cards.js";

function Home() {
    return (
        <div >
            {/* <Navbar></Navbar> */}

            <h1 className="text-center underline">hello to my first react app</h1>
            <ResponsiveCards></ResponsiveCards>

            {/* <Products hello={'this is hello message from parent'}></Products> */}
        </div>

    );
}

export default Home;