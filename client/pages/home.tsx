import { useEffect, useState } from "preact/hooks";
import { SERVER } from "../../env";
import { route } from "preact-router";
import { Contrimon } from "../contrimon/contrimon";

export type ContributesState = {
    data: { user: { contributionsCollection: {
        totalCommitContributions: number,
        totalIssueContributions: number,
        totalPullRequestContributions: number,
        totalRepositoryContributions: number,
        contributionCalendar: { totalContributions: number }
}}}};

export default ()=>{
    const [info, setInfo] = useState<Error|{
        avatar_url: string,
        name: string,
        html_url: string
    }>();
    const [contributes, setContributes] = useState<Error|ContributesState>();
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
        fetch(new URL("/user/contributes", SERVER), {
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(async(e)=>{
            if(e.ok){
                setContributes(await e.json());
            }else{
                setContributes(new Error());
            }
        }).catch(e=>e instanceof Error ? setContributes(e) : setContributes(new Error(`${e}`, { cause: e })));
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
            <div class="contributes">
                <span title="UTC時間">今日</span>のcontributions<br/>
                { contributes instanceof Error ? "エラー" :
                !contributes ? "読込中..." : <>
                    <div class="all" title="すべて">
                        {contributes.data.user.contributionsCollection.contributionCalendar.totalContributions}
                    </div>
                    <div class="commit" title="コミット">
                        {contributes.data.user.contributionsCollection.totalCommitContributions}
                    </div>
                    <div class="pull" title="PullRequest">
                        {contributes.data.user.contributionsCollection.totalPullRequestContributions}
                    </div>
                    <div class="issue" title="Issue">
                        {contributes.data.user.contributionsCollection.totalIssueContributions}
                    </div>
                    <div class="repo" title="新規リポジトリ">
                        {contributes.data.user.contributionsCollection.totalRepositoryContributions}
                    </div>
                </>}
            </div>
        </div>
        <Contrimon contributes={contributes}/>
    </div>
}