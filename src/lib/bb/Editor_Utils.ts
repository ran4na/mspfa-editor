// From when this was using a textarea
/*
export function insert_tags(
    ed: HTMLTextAreaElement | undefined, opening: string, closing: string) 
{
    if (!ed) return;
    const start = ed.selectionStart;
    const end = ed.selectionEnd;
    // insert start tag
    let v = ed.value;
    v =
        v.slice(0, start) +
        opening +
        v.slice(start, end) +
        closing +
        v.slice(end);
    ed.value = v;
    ed.focus();
    let cursor_pos = start + opening.length;
    ed.selectionStart = cursor_pos;
    ed.selectionEnd = cursor_pos;
    ed.dispatchEvent(new Event("input"));
}
*/

import { EditorSelection } from "@codemirror/state";
import type { EditorView } from "codemirror";

export function insert_tags(view: EditorView | undefined, opening: string, closing: string) {
    if(!view) return;

    view.dispatch(
        view.state.changeByRange((range) => ({
            changes: [
                {from: range.from, insert: opening},
                {from: range.to, insert: closing},        
            ],
            range: EditorSelection.cursor(range.from + opening.length),
        })),
    );
    view.focus();
}