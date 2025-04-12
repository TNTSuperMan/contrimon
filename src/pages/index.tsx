import { CLIENT_ID } from "../../env";

export default () => <>
    <h1>contrimon</h1>
    <span>より貢献したくなる。</span>
    <button class="btn" onClick={()=>location.href =
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${
        encodeURIComponent(new URL("/oauth", location.origin).toString())}`
    }>始める</button>
</>;
