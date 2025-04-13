import { Link, route } from "preact-router";
import { SERVER } from "../../env";
import { useEffect, useState } from "preact/hooks";

export default () => {
    const param = new URLSearchParams(location.search);
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
        fetch(new URL(`/oauth/${param.get("code")}`, SERVER))
            .then(async e=>{
                if(!e.ok) return setState("OAuth認証に失敗しました: " + await e.text());
                localStorage.setItem("token", await e.text());
                route("/home")
            })
    }, []);
    return <h1>{state}</h1>
};
