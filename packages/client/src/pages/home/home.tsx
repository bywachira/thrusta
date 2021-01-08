import React from "react";
import withNav from "../../hoc/with-nav";

function Home() {
    return (
        <div>
            Home
        </div>
    )
}

export const HomePage = withNav(Home);