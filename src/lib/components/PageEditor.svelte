<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { PageData } from "../bb/Adventure";
  import EditorBar from "./EditorBar.svelte";

  let {
    index,
    page = $bindable(),
    page_to_preview = $bindable(0),
    delete_callback = () => {},
  }: {
    index: number;
    page: PageData;
    page_to_preview: number;
    delete_callback: MouseEventHandler<HTMLElement>;
  } = $props();

  let content_editor: HTMLTextAreaElement;
</script>

<div
  class="page-editor"
  onmouseenter={() => (page_to_preview = index)}
  role="group"
>
  <div class="page-num">Page {index + 1}</div>
  <input
    type="text"
    class="command-input"
    placeholder="Title"
    bind:value={page.c}
  />
  <EditorBar bind:content={page.b} editor={content_editor}></EditorBar>
  <textarea
    id="editor-text"
    placeholder="Page text"
    bind:value={page.b}
    bind:this={content_editor}
  ></textarea>
  <label for="next">Next:</label>
  <input type="text" style="max-width: 80%" id="next" bind:value={page.n[0]} />
  <button>Up</button>
  <button>Down</button>
  <button onclick={delete_callback}>Delete</button>
</div>

<style>
  .page-editor {
    background-color: rgb(230, 230, 230);
    padding: 0.5em;
    box-sizing: border-box;
    font-family: "Courier New", Courier, monospace;
    margin-bottom: 1em;
    border-radius: 0.5em;
    border: 2px solid rgb(137, 137, 137);
    box-shadow: 0px 3px 8px rgba(5, 5, 5, 0.372);
  }

  .command-input {
    font-size: large;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
  }

  #editor-text {
    font-family: "Courier New", Courier, monospace;
    min-width: 100%;
    max-width: 100%;
    width: 100%;
    box-sizing: border-box;
    min-height: 20em;
    resize: vertical;
    font-weight: bold;
  }

  .page-num {
    font-size: larger;
    border-bottom: 1px solid black;
    margin-bottom: 0.5em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
  }

  button {
    background: white !important;
    color: black !important;
    border: none !important;
  }

  button:hover {
    background: rgb(165, 165, 165) !important;
    color: black !important;
    border: none !important;
  }
</style>
