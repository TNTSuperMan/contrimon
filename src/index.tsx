import { render } from "preact";
import Router, { Route } from "preact-router";

import index from "./pages/index";

const main = () => 
    render(<Router>
        <Route path="/" component={index}/>
    </Router>, document.body);

document.readyState == "loading" ?
    window.addEventListener("DOMContentLoaded", main) :
    main();
