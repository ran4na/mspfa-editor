<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { PageData } from "../bb/Adventure";
  import EditorBar from "./EditorBar.svelte";

  import UpIcon from "../../assets/resources/icons/up.png";
  import DownIcon from "../../assets/resources/icons/down.png";
  import XIcon from "../../assets/resources/icons/X.png";
  import UpInsertIcon from "../../assets/resources/icons/upinsert.PNG"
  import { getEditorContext } from "../EditorContext";
  import NiceTextEditor from "./NiceTextEditor.svelte";
  import type { EditorView } from "codemirror";

  /**
   * TODO: Syntax highlighting? textarea doesn't support styling but I saw a guide online
   *        https://css-tricks.com/creating-an-editable-textarea-that-supports-syntax-highlighted-code/
   *        Which creates an invisible textarea and renders the result on top
   *      I want to highlight [bbcode] tags, parameter names and values, and <html> tags
   *
   *  Also, if ctx.current_page is updated externally, i want to scroll this into view.
   */

  let {
    index,
    page = $bindable(),
    delete_cb = () => {},
    move_up_cb = () => {},
    move_down_cb = () => {},
    insert_cb = () => {},
  }: {
    index: number;
    page: PageData;
    delete_cb: MouseEventHandler<HTMLElement>;
    move_up_cb: MouseEventHandler<HTMLElement>;
    move_down_cb: MouseEventHandler<HTMLElement>;
    insert_cb: MouseEventHandler<HTMLElement>;
  } = $props();

  let ctx = getEditorContext();

  let content_editor: HTMLTextAreaElement | undefined = $state(undefined);
  let content_view: EditorView | undefined = $state.raw(undefined);

  let show_buttons = $derived(ctx.current_page_index == index);

  function parse_next_pages(e: Event) {
    let i = e.currentTarget as HTMLInputElement;
    if (i) {
      let n = i.value.replaceAll(/\s/g, "");
      let tokens = n.split(",").map((s) => parseInt(s));
      if (tokens.filter((e, i) => isNaN(e)).length == 0) {
        page.n = tokens;
      }
    }
  }
</script>

<div
  class="page-editor"
  onmouseenter={() => {
    ctx.current_page_index = index;
  }}
  role="group"
>
  <div class="top">
    <span class="page-num" title="Page number">
      #{index + 1}
    </span>
    <span class="page-next">
      <label for="next">==&gt;</label>
      <input
        type="text"
        style="max-width: 80%"
        id="next"
        value={page.n.join(",")}
        title="Next Page (Multiple pages can be separated by commas)"
        oninput={(e) => parse_next_pages(e)}
      />
    </span>
  </div>
  <input
    type="text"
    class="command-input"
    placeholder="Title"
    bind:value={page.c}
    title="Page title"
  />
  <EditorBar bind:content={page.b} editor={content_view} {show_buttons}
  ></EditorBar>
  <NiceTextEditor bind:text={page.b} bind:view={content_view}>

  </NiceTextEditor>

  <div class="button-strip">
    <span class="move">
      <button
        class="move-btn"
        onclick={move_up_cb}
        id="move-up-btn"
        title="Move page up"
      >
        <img src={UpIcon} alt="Move Up" />
      </button>
      <button
        class="move-btn"
        onclick={move_down_cb}
        id="move-down-btn"
        title="Move page down"
      >
        <img src={DownIcon} alt="Move Down" />
      </button>
      <button
        class="move-btn"
        onclick={insert_cb}
        id="insert-btn"
        title="Insert page after"
      >
        <img src={UpInsertIcon} alt="Insert above" />
      </button>
    </span>
    <span class="delete">
      <button
        class="move-btn delete-btn"
        onclick={delete_cb}
        title="Delete page (Can't be undone!)"
      >
        <img src={XIcon} alt="Delete" />
      </button>
    </span>
  </div>
</div>

<style>
  @property --bg-1 {
    syntax: "<color>";
    initial-value: rgb(255, 255, 255);
    inherits: false;
  }
  @property --bg-2 {
    syntax: "<color>";
    initial-value: rgb(230, 230, 230);
    inherits: false;
  }

  @property --shadow-color {
    syntax: "<color>";
    initial-value: rgb(5, 5, 5, 0.372);
    inherits: false;
  }

  .page-editor {
    background: linear-gradient(var(--bg-1), var(--bg-2));
    padding: 0.5em;
    box-sizing: border-box;
    font-family: "Courier New", Courier, monospace;
    margin: 0 auto;
    margin-bottom: 1em;
    border-radius: 0.5em;
    border: 2px solid rgb(137, 137, 137);
    box-shadow: 0px 3px 8px var(--shadow-color);
    max-width: 950px;
    transition:
      --bg-1 0.2s,
      --bg-2 0.2s,
      border-color 0.2s,
      --shadow-color 0.2s;
  }

  .page-editor:hover {
    --bg-2: rgb(210, 255, 198);
    --shadow-color: rgba(72, 255, 72, 0.681);
    border-color: rgb(35, 168, 35);
  }

  .command-input {
    font-size: large;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
    width: 100%;
    box-sizing: border-box;
    border-radius: 0.5em;
    padding-left: 0.5em;

    border: 2px solid gray;
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
    font-size: larger;
  }

  .page-next {
    input {
      margin: 0.2em;
      width: 8em;
      border: 2px solid grey;
      border-radius: 0.5em;
      padding-left: 0.5em;
      font-family: "Courier New", Courier, monospace;
      font-weight: bold;
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
    padding: 4px !important;
    border: 2px solid grey !important;
  }

  .move-btn:hover {
    border-radius: 0.5em;
    border: 2px solid grey !important;
  }

  .move-btn:active {
    border-radius: 0.5em;
    background: linear-gradient(white, rgb(149, 255, 114)) !important;
    border: 2px solid rgb(38, 170, 31) !important;
  }

  .button-strip {
    display: flex;
    padding-top: 0.5em;
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
      rgb(255, 144, 144)
    ) !important;
    border-color: red !important;
  }

  .move {
    flex-grow: 1;
  }
</style>
