<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { ComicData, PageData } from "../bb/Adventure";
  import InfoEditor from "./InfoEditor.svelte";
  import PageEditor from "./PageEditor.svelte";

  let {
    adventure = $bindable(),
    page_to_preview = $bindable(0),
  }: {
    adventure: ComicData;
    page_to_preview: number;
  } = $props();

  let file_input: HTMLInputElement;

  async function save_adventure() {
    let j = JSON.stringify(adventure);
    let file = new Blob([j], { type: "application/json" });
    let link = window.URL.createObjectURL(file);
    const a = document.createElement("a");
    a.href = link;
    a.download = `${adventure.n}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  }

  async function load_adventure() {
    if (file_input.files) {
      let j = JSON.parse(await file_input.files[0].text());
      adventure = j as ComicData;
    }
  }
  let pages_reversed = $derived(adventure.p.toReversed());

  let show_info = $state(false);
</script>

<div class="editor-pane">
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
  </div>
  <input
    type="file"
    id="import"
    bind:this={file_input}
    onchange={() => load_adventure()}
    placeholder="Load"
  />
  <div class={`pages ${show_info ? "hidden" : ""}`}>
    <div class="add-page">
      <button
        class="add-page-btn"
        onclick={() => adventure.p.push({ d: 0, c: "", b: "", n: [] })}
        >Add Page</button
      >
    </div>
    {#each pages_reversed as page, index}
      <PageEditor
        index={pages_reversed.length - index - 1}
        bind:page={pages_reversed[index]}
        bind:page_to_preview
        delete_callback={(e) => {
          let idx = pages_reversed.length - index - 1;
          console.log(idx);
          adventure.p.splice(idx, 1) as [PageData];
        }}
      ></PageEditor>
    {/each}
  </div>

  {#if show_info}
    <InfoEditor bind:adventure></InfoEditor>
  {/if}
</div>

<style>
  .editor-pane {
    border-right: 3px solid black;
    display: flex;
    flex-direction: column;
    overflow: auto;
    resize: horizontal;
    width: 40%;
    background: linear-gradient(rgb(228, 228, 228), rgb(141, 133, 133));
    color: black;
    position: relative;
    max-width: 100vw;
    min-width: 292px;
  }

  .pages {
    margin: 1em;
  }

  .hidden {
    display: none;
  }

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

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.849);

    .nav-btn:first-child {
      padding-left: 1.4em;
    }

    .nav-btn:last-child {
      border-bottom-right-radius: 1.4em;
      padding-right: 1.4em;
    }
  }

  .nav-btn {
    background: linear-gradient(rgb(77, 77, 77), rgb(173, 173, 173));
    color: rgb(35, 34, 34);
    border: none;
    font-size: 14px;
    padding: 0.2em 0.4em 0.2em 0.4em;
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
    background: linear-gradient(rgb(35, 216, 35), rgb(49, 207, 25)) !important;
    color: rgb(255, 255, 255);
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
  }

  #import {
    display: none;
  }

  .add-page {
    text-align: center;

    margin-bottom: 1em;
  }

  .add-page-btn {
    background: white;
    color: black;
    padding: 0.2em 0.7em !important;
    border: 2px solid gray;
    font-size: larger;
    border-radius: 0.5em;
    font-family: Verdana, sans-serif !important;
    font-weight: normal !important;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.303);
  }

  .add-page-btn:hover {
    background: rgb(229, 229, 229);
    border: 2px solid gray;
    color: black;
  }

  .add-page-btn:active {
    background: rgb(117, 117, 117);
    transform: none;
  }

  @media (max-width: 650px) {
    .editor-pane {
      height: 50vh;
      width: 100vw !important;
      margin: 0 auto;
      resize: none;
      box-sizing: border-box;
    }
  }
</style>
