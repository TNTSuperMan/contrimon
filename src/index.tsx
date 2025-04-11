import { render } from "preact";
import Router from "preact-router";

const main = () => 
    render(<Router>
        
    </Router>, document.body);

document.readyState == "loading" ?
    window.addEventListener("DOMContentLoaded", main) :
    main();
