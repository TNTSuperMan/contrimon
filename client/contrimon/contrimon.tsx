import { useEffect, useState } from "preact/hooks"
import type { ContributesState } from "../pages/home";
import { data } from "./data";

export const Contrimon = ({contributes}: {contributes: Error | ContributesState | void}) => {
    const [face, setFace] = useState("-_-");
    const [msg, setMsg] = useState("...");

    useEffect(()=>{
        if(contributes instanceof Error){
            setFace("XoX");
            setMsg(`contributesの取得でエラー発生。${contributes.name}: ${contributes.message}`);
            console.error(contributes);
        }else if(contributes){
            const {data:{user:{contributionsCollection:{
                contributionCalendar:{ totalContributions: total },
                totalCommitContributions: commit,
                totalIssueContributions: issue,
                totalPullRequestContributions: pull,
                totalPullRequestReviewContributions: review,
                totalRepositoryContributions: repo,
            }}}} = contributes;
            data.forEach(([t,c,i,p,r,f,m])=>{
                if(t<=total && c<=commit && i<=issue && p<=pull && r<=review){
                    setFace(f);
                    setMsg(m);
                }
            })
        }
    }, [contributes]);

    return <div class="contrimon">{ !contributes ? <></> : <>
        <p>{msg}</p>
        <span>{face}</span>
    </>}</div>
}
