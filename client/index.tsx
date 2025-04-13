import "./style/main.css";
import { render } from "preact";
import Router, { Route } from "preact-router";

import index from "./pages/index";
import oauth from "./pages/oauth";
import home from "./pages/home";

const main = () => 
    render(<Router>
        <Route path="/" component={index}/>
        <Route path="/oauth" component={oauth}/>
        <Route path="/home" component={home}/>
    </Router>, document.body);

document.readyState == "loading" ?
    window.addEventListener("DOMContentLoaded", main) :
    main();
