import { Link, route } from "preact-router";
import { useEffect, useState } from "preact/hooks";

export default () => {
    const param = new URLSearchParams(location.search);
    const expectedState = sessionStorage.getItem("oauth_state");
    const returnedState = param.get("state");
    sessionStorage.removeItem("oauth_state");
    if(!param.has("error") && (!expectedState || returnedState !== expectedState)){
        return <>
            <h1>OAuth認証に失敗しました</h1>
            <p>認証リクエストの状態が一致しません。もう一度お試しください。</p>
            <Link class="btn" href="/">ホーム</Link>
        </>
    }
    if(param.has("error")){
        if(param.get("error") == "access_denied"){
            return <>
                <h1>認証が拒否されました</h1>
                遊びたい方は認証を許可してください。<br/>
                <Link class="btn">ホーム</Link>
            </>
        }else{
            return <>
                <h1>OAuthエラー: {param.get("error")}</h1>
                <p>{param.get("error_description")}</p>
            </>
        }
    }
    const [state, setState] = useState("読込中...");
    useEffect(()=>{
        console.log("start")
        fetch(new URL(`/oauth`, process.env.SERVER), {
            method: "POST",
            headers: { Authorization: param.get("code") ?? "" }
        }).then(async e=>{
            if(!e.ok) return setState("OAuth認証に失敗しました: " + await e.text());
            localStorage.setItem("token", await e.text());
            route("/home")
        }).catch(e=>setState("OAuth通信に失敗しました: " + (e instanceof Error ? e.stack : String(e))))
    }, []);
    return <h1>{state}</h1>
};
