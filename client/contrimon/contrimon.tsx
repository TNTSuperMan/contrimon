import { useEffect, useState } from "preact/hooks"
import type { ContributesState } from "../pages/home";

export const Contrimon = ({contributes}: {contributes: Error | ContributesState | void}) => {
    const [face, setFace] = useState("-_-");
    const [msg, setMsg] = useState("...");

    useEffect(()=>{
        if(contributes instanceof Error){
            setFace("XoX");
            setMsg(`contributesの取得でエラー発生。${contributes.name}: ${contributes.message}`);
            console.error(contributes);
        }
    }, [contributes]);

    return <div class="contrimon">
        <p>{msg}</p>
        <span>{face}</span>
    </div>
}
