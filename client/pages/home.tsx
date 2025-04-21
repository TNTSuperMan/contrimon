import { useEffect, useState } from "preact/hooks";
import { route } from "preact-router";
import { Contrimon } from "../contrimon/contrimon";

export type UserInfo = {
    avatarUrl: string,
    name: string,
    url: string,
    contributionsCollection: {
        totalCommitContributions: number,
        totalIssueContributions: number,
        totalPullRequestContributions: number,
        totalRepositoryContributions: number,
        totalPullRequestReviewContributions: number,
        contributionCalendar: { totalContributions: number }
}};

export default ()=>{
    const [infos, setInfos] = useState<Error|UserInfo>();
    useEffect(()=>{
        const jwt = localStorage.getItem("token");
        if(!jwt) route("/");
        fetch(new URL("/user/infos", process.env.SERVER), {
            method: "POST",
            headers: {
                Authorization: `Bearer ${jwt}`
            }
        }).then(async(e)=>{
            if(e.ok){
                setInfos((await e.json()).data.user);
            }else{
                setInfos(new Error());
            }
        }).catch(e=>e instanceof Error ? setInfos(e) : setInfos(new Error(`${e}`, { cause: e })));
    }, []);
    if(!infos) return <h1>読込中...</h1>;
    if(infos instanceof Error){
        console.error(infos);
        return <>
            <h1>エラー: {infos.name}</h1>
            {infos.stack ?? infos.message}
        </>;
    }
    return <div class="home">
        <div className="bar">
            <a href={infos.url} target="_blank">
                <img src={infos.avatarUrl} alt={infos.name} />
            </a>
            ようこそ {infos.name}さん
            <div class="contributes">
                <span title="UTC時間">今日</span>のcontributions<br/>
                <div class="all" title="すべて">
                        {infos.contributionsCollection.contributionCalendar.totalContributions}
                    </div>
                    <div class="commit" title="コミット">
                        {infos.contributionsCollection.totalCommitContributions}
                    </div>
                    <div class="pull" title="PullRequest">
                        {infos.contributionsCollection.totalPullRequestContributions}
                    </div>
                    <div class="issue" title="Issue">
                        {infos.contributionsCollection.totalIssueContributions}
                    </div>
                    <div class="review" title="コードレビュー">
                        {infos.contributionsCollection.totalPullRequestReviewContributions}
                    </div>
                    <div class="repo" title="新規リポジトリ">
                        {infos.contributionsCollection.totalRepositoryContributions}
                    </div>
            </div>
        </div>
        <Contrimon contributes={infos}/>
    </div>
}