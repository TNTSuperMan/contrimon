import { z } from "zod";

const SavedataSchema = z.object({
    consecutive: z.number(),
    last_consecutive: z.string().date("UTC"),
    days: z.number(),
    last_update: z.string().date("UTC"),
});

const raw_savedata = ((): z.infer<typeof SavedataSchema>=>{
    try{
        return SavedataSchema.parse(JSON.parse(localStorage.getItem("save") ?? ""));
    }catch{
        const now = new Date().toISOString().split("T")[0] as string;
        return {
            consecutive: 1,
            last_consecutive: now,
            days: 1,
            last_update: now
        };
    }
})();

export const savedata = new Proxy(raw_savedata, {
    set(...args){
        const result = Reflect.set(...args);
        localStorage.setItem("save", JSON.stringify(result));
        return result;
    }
});
