<script lang="ts">
    import { defaultKeymap } from "@codemirror/commands";
    import {EditorState} from "@codemirror/state";
    import { Decoration, EditorView, keymap, MatchDecorator, ViewPlugin, ViewUpdate, type DecorationSet } from "@codemirror/view";
    import { minimalSetup } from "codemirror";
    import { untrack } from "svelte";

    let { text = $bindable(""), view = $bindable() }: { text?: string, view?: EditorView } = $props();

    let editor_element: HTMLDivElement | undefined = $state();
    const tagMatcher = new MatchDecorator({
        regexp: /\[\/?[^\]]+\]/gm,
        decoration: Decoration.mark({class: "cm-tag"})
    });

    const tagHighlighter = ViewPlugin.fromClass(class {
        decorations: DecorationSet;
        constructor(view: EditorView) {
            this.decorations = tagMatcher.createDeco(view);
        }
        update(u: ViewUpdate) {
            this.decorations = tagMatcher.updateDeco(u, this.decorations);
        }
    }, { decorations: v => v.decorations})
    
    $effect(() => {
        view = new EditorView({
            parent: editor_element,
            state: EditorState.create({
                doc: untrack(() => text),
                extensions: [
                    keymap.of(defaultKeymap),
                    minimalSetup,
                    tagHighlighter,
                    EditorView.lineWrapping,
                    EditorView.theme({
                        ".cm-tag": {color: "green"},
                        ".cm-editor": {
                        }
                    }, {dark: false}),
                    EditorView.updateListener.of(u => {
                        if(u.docChanged) text = u.state.doc.toString();
                    })
                ]
            })
        });
        return () => view?.destroy();
    });

    // External changes to `text` -> editor
    $effect(() => {
        const t = text;
        if (view && t !== view.state.doc.toString()) {
            view.dispatch({ changes: { from: 0, to: view.state.doc.length, insert: t } });
        }
    });

</script>

<div class="editor" 
     bind:this={editor_element}>
</div>
<style>
    .editor {
        border: 2px solid darkgrey;
        background: white;
        overflow: auto;
        min-height: 5em;
        height: 20em;
        resize: vertical;
        border-bottom-left-radius: 0.5em;
        border-bottom-right-radius: 0.5em;
    }
</style>