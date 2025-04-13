import { useState } from "preact/hooks"

export const Contrimon = () => {
    const [face, setFace] = useState("-_-");
    const [msg, setMsg] = useState("...");
    return <div class="contrimon">
        <p>{msg}</p>
        <div><span>{face}</span></div>
    </div>
}
