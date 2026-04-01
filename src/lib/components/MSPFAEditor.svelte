<script lang="ts">
  import EditorPane from "./EditorPane.svelte";
  import PreviewPane from "./PreviewPane.svelte";

  import { default_adventure, type ComicData } from "../bb/Adventure";

  let current_adventure: ComicData = $state(default_adventure);
  let current_page: number = $state(0);
</script>

<div class="editor-main">
  <EditorPane
    bind:adventure={current_adventure}
    bind:page_to_preview={current_page}
  ></EditorPane>
  <PreviewPane adventure={current_adventure} page_index={current_page}
  ></PreviewPane>
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
      height: 100vh;
      width: 100vw;
    }
  }
</style>
