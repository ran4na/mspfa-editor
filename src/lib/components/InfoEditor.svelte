<script lang="ts">
  import type { ComicData } from "../bb/Adventure";

  let { adventure = $bindable() }: { adventure: ComicData } = $props();
</script>

<div class="info-editor">
  <h2>CSS:</h2>
  <textarea id="adventure-css" bind:value={adventure.y}></textarea>

  <h2>JS:</h2>
  <textarea id="adventure-js" bind:value={adventure.j}></textarea>
</div>

<style>
  .info-editor {
    margin: 1em;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
  }

  textarea {
    width: 100%;
    min-height: 30em;
    resize: vertical;
  }
</style>
