import { Link } from "preact-router";
import { SERVER } from "../../env";

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
    location.href = `${SERVER}/oauth/${param.get("code")}`;
    return <h1>リダイレクト中...</h1>
};
