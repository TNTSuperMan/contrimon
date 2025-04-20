import { CLIENT_ID } from "../../env";

export default () => <>
    <h1>contrimon</h1>
    <span>より貢献したくなる。</span>
    <button class="btn" onClick={()=>location.href =
        `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${
        encodeURIComponent(new URL("/oauth", location.origin).toString())}`
    }>始める</button>
    <h2>Developer</h2>
    <div class="profile-card">
        <a href="https://github.com/TNTSuperMan" target="_blank">
            <img src="https://avatars.githubusercontent.com/u/111977067?v=4" />
        </a>
        <div className="profile">
            <h3>TNTSuperMan</h3>
            TypeScript programmer
        </div>
    </div>
</>;
