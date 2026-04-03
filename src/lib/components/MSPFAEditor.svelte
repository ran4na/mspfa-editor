<script lang="ts">
  import EditorPane from "./EditorPane.svelte";
  import PreviewPane from "./PreviewPane.svelte";

  import { default_adventure } from "../bb/Adventure";
  import { setEditorContext } from "../EditorContext";
  import { onMount } from "svelte";

  let current_page: number = $state(0);
  // Set default context on mount
  onMount(() => {});

  let editorContext = $state({
    adventure: structuredClone(default_adventure),
    current_page_index: 0,
    page_keys: default_adventure.p.map(() => crypto.randomUUID()),
  });
  setEditorContext(editorContext);
</script>

<div class="editor-main">
  <EditorPane></EditorPane>
  <PreviewPane></PreviewPane>
</div>

<style>
  .editor-main {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 650px) {
    .editor-main {
      flex-direction: column-reverse;
      height: 100svh;
      width: 100vw;
    }
  }
</style>
