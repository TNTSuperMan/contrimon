export default () => <>
    <h1>contrimon</h1>
    <span>より貢献したくなる。</span>
    <button class="btn" onClick={()=>location.href =
        `https://github.com/login/oauth/authorize?client_id=${process.env.CLIENT_ID}&redirect_uri=${
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
    <h2>Credit</h2>
    <div class="credits">
        <a target="_blank" href="https://www.typescriptlang.org/">TypeScript</a>
        <a target="_blank" href="https://bun.sh/docs/project/licensing">Bun</a>
        <a target="_blank" href="https://hono.dev">Hono</a>
        <a target="_blank" href="https://zod.dev/">Zod</a>
        <a target="_blank" href="https://preactjs.com/">Preact</a>
        <a target="_blank" href="https://github.com/preactjs/preact-router">preact-router</a>
        <a target="_blank" href="https://github.com/ricmoo/aes-js">aes-js</a>
    </div>
</>;
