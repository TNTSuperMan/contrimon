import "./style/main.css";
import { render } from "preact";
import Router, { Route } from "preact-router";

import index from "./pages/index";
import oauth from "./pages/oauth";

const main = () => 
    render(<Router>
        <Route path="/" component={index}/>
        <Route path="/oauth" component={oauth}/>
    </Router>, document.body);

document.readyState == "loading" ?
    window.addEventListener("DOMContentLoaded", main) :
    main();
