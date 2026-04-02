<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { PageData } from "../bb/Adventure";
  import EditorBar from "./EditorBar.svelte";

  import UpIcon from "../../assets/resources/icons/up.png";
  import DownIcon from "../../assets/resources/icons/down.png";
  import XIcon from "../../assets/resources/icons/X.png";

  let {
    index,
    page = $bindable(),
    page_to_preview = $bindable(0),
    delete_cb = () => {},
    move_up_cb = () => {},
    move_down_cb = () => {},
  }: {
    index: number;
    page: PageData;
    page_to_preview: number;
    delete_cb: MouseEventHandler<HTMLElement>;
    move_up_cb: MouseEventHandler<HTMLElement>;
    move_down_cb: MouseEventHandler<HTMLElement>;
  } = $props();

  let content_editor: HTMLTextAreaElement | undefined = $state(undefined);
</script>

<div
  class="page-editor"
  onmouseenter={() => (page_to_preview = index)}
  role="group"
>
  <div class="top">
    <span class="page-num">
      Page {index + 1}
    </span>
    <span class="page-next">
      <label for="next">Next:</label>
      <input
        type="text"
        style="max-width: 80%"
        id="next"
        bind:value={page.n[0]}
      />
    </span>
  </div>
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

  <div class="button-strip">
    <button class="move-btn" onclick={move_up_cb} id="move-up-btn">
      <img src={UpIcon} alt="Move Up" />
    </button>
    <button class="move-btn" onclick={move_down_cb} id="move-down-btn">
      <img src={DownIcon} alt="Move Down" />
    </button>
    <button class="move-btn delete-btn" onclick={delete_cb}>
      <img src={XIcon} alt="Delete" />
    </button>
  </div>
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

  .page-editor:hover {
    background: linear-gradient(white, rgb(227, 255, 220));
    border-color: rgb(62, 227, 62);
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

  .top {
    border-bottom: 1px solid black;
    margin-bottom: 0.5em;
    font-family: Verdana, Geneva, Tahoma, sans-serif;
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
  }
  .page-num {
    flex-grow: 1;
  }

  .page-next {
    input {
      margin: 0.2em;
      width: 4em;
    }
  }

  button {
    background: linear-gradient(white, rgb(208, 208, 208)) !important;
    color: black !important;
    margin: 0.2em;
  }

  button img {
    width: 20px;
    image-rendering: optimizeSpeed;
  }

  button:hover {
    background: rgb(255, 255, 255) !important;
    color: black !important;
  }

  .move-btn {
    border-radius: 0.5em;
    padding: 10px;
    border: 2px solid grey !important;
  }

  .move-btn:hover {
    border-radius: 0.5em;
    padding: 10px;
    border: 2px solid grey !important;
  }

  .move-btn:active {
    border-radius: 0.5em;
    background: linear-gradient(white, rgb(149, 255, 114)) !important;
    padding: 10px;
    border: 2px solid rgb(38, 170, 31) !important;
  }

  .button-strip {
    display: flex;
  }

  .delete-btn:hover {
    background: linear-gradient(
      rgb(255, 247, 247),
      rgb(255, 180, 180)
    ) !important;
  }

  .delete-btn:active {
    background: linear-gradient(
      rgb(255, 247, 247),
      rgb(255, 94, 94)
    ) !important;
    border-color: red !important;
  }
</style>
