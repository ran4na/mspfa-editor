<script lang="ts">
  import { empty_adventure, type ComicData } from "../bb/Adventure";
  import { getEditorContext } from "../EditorContext";

  let { show_info = $bindable(false) } = $props();

  let ctx = getEditorContext();
  let adventure = $derived(ctx.adventure);
  // Man I dont feel like making another callback prop
  async function save_adventure() {
    let j = JSON.stringify(adventure);
    let file = new Blob([j], { type: "application/json" });
    let link = window.URL.createObjectURL(file);
    // Yes. This is apparently the canonical way to download a file with a button press?
    const a = document.createElement("a");
    a.href = link;
    a.download = `${adventure.n}.json`;
    // It creates a phantom link and clicks it
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function new_adventure() {
    let poop = confirm("Create a new adventure?");

    if (!poop) return;

    ctx.adventure = structuredClone(empty_adventure);
    ctx.page_keys = ctx.adventure.p.map(() => crypto.randomUUID());
    ctx.current_page_index = 0;
  }

  let file_input: HTMLInputElement;

  async function load_adventure() {
    if (file_input.files) {
      let j = JSON.parse(await file_input.files[0].text());
      ctx.adventure = j as ComicData;
      ctx.page_keys = ctx.adventure.p.map(() => crypto.randomUUID());
      ctx.current_page_index = ctx.adventure.p.length - 1;
    }
  }
</script>

<div id="editor-nav">
  <button
    class={`nav-btn ${!show_info ? "current-btn" : ""}`}
    onclick={() => (show_info = false)}>Pages</button
  >
  <button
    class={`nav-btn ${show_info ? "current-btn" : ""}`}
    onclick={() => (show_info = true)}>Info</button
  >
  <button class="nav-btn" onclick={() => save_adventure()}>Export</button>
  <label for="import" class="nav-btn import-btn">Import</label>
  <button class="nav-btn" onclick={() => new_adventure()}>New</button>
</div>
<input
  type="file"
  id="import"
  bind:this={file_input}
  onchange={() => load_adventure()}
  placeholder="Load"
/>

<style>
  #editor-nav {
    background: linear-gradient(rgb(77, 77, 77), rgb(32, 32, 32));
    width: 100%;
    box-sizing: border-box;
    position: sticky;
    top: 0;
    left: 0;
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    overflow: clip;
    border-bottom-left-radius: 1em;
    border-bottom-right-radius: 1em;
    z-index: 9000;

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.849);

    .nav-btn:first-child {
      padding-left: 1.4em !important;
    }

    .nav-btn:last-child {
      border-bottom-right-radius: 1.4em;
      padding-right: 1.4em !important;
    }
  }

  .nav-btn {
    background: linear-gradient(rgb(77, 77, 77), rgb(173, 173, 173));
    color: rgb(35, 34, 34);
    border: none;
    font-size: 14px;
    padding: 0.2em 0.4em 0.2em 0.4em !important;
    margin: 0;
    height: fit-content;
    font-family: Verdana, Geneva, Tahoma, sans-serif !important;
    font-weight: bold !important;
    text-transform: uppercase;
    border: none;
  }

  .current-btn {
    background: linear-gradient(rgb(0, 95, 0), rgb(49, 207, 25));
    color: rgb(255, 255, 255);
  }

  .current-btn:hover {
    background: linear-gradient(rgb(0, 95, 0), rgb(49, 207, 25)) !important;
    color: rgb(255, 255, 255) !important;
  }

  .nav-btn:hover {
    background: linear-gradient(rgb(188, 188, 188), rgb(202, 202, 202));
    color: black;
    border: none;
  }

  .nav-btn:active {
    background: linear-gradient(rgb(147, 147, 147), rgb(67, 67, 67));
    border: none;
    transform: none;
    color: black;
  }

  #import {
    display: none;
  }
</style>
