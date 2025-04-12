import { CLIENT_ID } from "../../env";

export default () => <>
    <h1>contrimon</h1>
    <span>より貢献したくなる。</span>
    <button onClick={()=>location.href =
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}`
    }>始める</button>
</>;
