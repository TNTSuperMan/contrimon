import { useState } from "preact/hooks"
import type { ContributesState } from "../pages/home";

export const Contrimon = ({contributes}: {contributes: Error | ContributesState | void}) => {
    const [face, setFace] = useState("-_-");
    const [msg, setMsg] = useState("...");
    return <div class="contrimon">
        <p>{msg}</p>
        <div><span>{face}</span></div>
    </div>
}
