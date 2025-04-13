import { useEffect, useState } from "preact/hooks";
import { SERVER } from "../../env";
import { route } from "preact-router";

export default ()=>{
    const [info, setInfo] = useState<Error|{
        avatar_url: string,
        name: string,
        html_url: string
    }>();
    useEffect(()=>{
        const jwt = localStorage.getItem("token");
        if(!jwt) route("/");
        fetch(new URL("/user/info", SERVER), {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(async(e)=>{
            if(e.ok){
                setInfo(await e.json());
            }else{
                setInfo(new Error());
            }
        }).catch(e=>e instanceof Error ? setInfo(e) : setInfo(new Error(`${e}`, { cause: e })))
    }, []);
    if(!info) return <h1>読込中...</h1>;
    if(info instanceof Error){
        console.error(info);
        return <>
            <h1>エラー: {info.name}</h1>
            {info.stack ?? info.message}
        </>;
    }
    return <div class="home">
        <div className="bar">
            <a href={info.html_url} target="_blank">
                <img src={info.avatar_url} alt={info.name} />
            </a>
            ようこそ {info.name}さん
        </div>
    </div>
}