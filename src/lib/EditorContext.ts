import { createContext } from "svelte";
import type { ComicData } from "./bb/Adventure";

interface EditorContext {
    adventure: ComicData,
    current_page_index: number,
    page_keys: string[]
}

export const [ getEditorContext, setEditorContext ] = createContext<EditorContext>();