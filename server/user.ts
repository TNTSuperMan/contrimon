import { HTTPException } from "hono/http-exception";
import app from "./app";
import { getToken } from "./utils/token";

app.post("/user/infos", async c=>{
    const token = getToken(c);
    const infores = await fetch(
        "https://api.github.com/user", {
        headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": c.req.header("User-Agent") ?? ""
        }
    });
    if(!infores.ok) throw new HTTPException(400, { message: "Failed to get user: " + await infores.text() });
    const info = await infores.json();

    const now = new Date();
    const todayBegin = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate());

    const res = await fetch(
        "https://api.github.com/graphql", {
        method: "POST",
        headers: {
            Authorization: `Bearer ${token}`,
            "User-Agent": c.req.header("User-Agent") ?? ""
        },
        body: JSON.stringify({query:`
            query {
                user(login: "${info.name}") {
                    avatarUrl
                    name
                    url
                    contributionsCollection(from: "${todayBegin.toISOString()}") {
                        totalCommitContributions
                        totalIssueContributions
                        totalPullRequestContributions
                        totalPullRequestReviewContributions
                        totalRepositoryContributions
                        contributionCalendar {
                            totalContributions
                        }
                    }
                }
            }
        `})
    })
    if(!res.ok){
        console.log(res.status, res.statusText);
        res.text().then(console.log);
        throw new HTTPException(400, { message: "Failed to get contributionCalendar" });
    }
    return c.json(await res.json());
})
