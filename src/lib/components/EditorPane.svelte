<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";
  import type { ComicData, PageData } from "../bb/Adventure";
  import InfoEditor from "./InfoEditor.svelte";
  import PageEditor from "./PageEditor.svelte";
  import { flip } from "svelte/animate";
  import { slide } from "svelte/transition";
  import { backIn, backInOut, backOut, bounceInOut } from "svelte/easing";

  let {
    adventure = $bindable(),
    page_to_preview = $bindable(0),
  }: {
    adventure: ComicData;
    page_to_preview: number;
  } = $props();

  let file_input: HTMLInputElement;

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

  // Grant I dont think using params longer than a single character for MSPFA jsons would affect
  // The performance that much...
  async function load_adventure() {
    if (file_input.files) {
      let j = JSON.parse(await file_input.files[0].text());
      adventure = j as ComicData;
    }
  }

  // Swap pages in place... updates their next values too
  function swap_page(index: number, target_index: number) {
    if (
      index >= 0 &&
      index < adventure.p.length &&
      target_index >= 0 &&
      target_index < adventure.p.length
    ) {
      let page = adventure.p[index];
      let to_swap = adventure.p[target_index];

      // Swap next vals
      let next = page.n;
      page.n = to_swap.n;
      to_swap.n = next;
      // Swap positions
      let temp = to_swap;
      adventure.p[target_index] = page;
      adventure.p[index] = temp;

      // Swap the keys too
      let temp_key = page_keys[target_index];
      let p_key = page_keys[index];
      page_keys[target_index] = p_key;
      page_keys[index] = temp_key;
    } else {
      console.log("Couldn't swap pages!");
    }
  }

  function push_page() {
    // Add a target to the previous page
    if (adventure.p[adventure.p.length - 1].n.length == 0) {
      adventure.p[adventure.p.length - 1].n = [adventure.p.length + 1];
    }
    adventure.p.push({ d: 0, c: "", b: "", n: [] as number[] });
    // Add a new unique key
    page_keys.push(crypto.randomUUID());
  }

  function delete_page(index: number) {
    adventure.p.splice(index, 1) as [PageData];
    page_keys.splice(index, 1) as [string];

    // deleting a page reduces the length of the adventure
    // after the deleted index, subtract from all page [n] values unless they're less than the index
    adventure.p.slice(index).forEach((page, i) => {
      if (page.n[0] > index) {
        page.n[0] -= 1;
      }
    });
  }

  // stupid MSPFA format doesn't maintain consistent page IDs. AAAA
  // So I generate a new list of keys
  // By the way yeah I have to generate new keys when creating pages too. see push_page()
  let page_keys = $state(adventure.p.map((page) => crypto.randomUUID()));

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
      <button class="add-page-btn" onclick={() => push_page()}>Add Page</button>
    </div>
    {#each pages_reversed as page, index (page_keys[pages_reversed.length - index - 1])}
      {@const idx = pages_reversed.length - index - 1}
      <div
        class="page-editor-container"
        animate:flip={{ duration: 100, easing: backOut }}
      >
        <PageEditor
          index={idx}
          bind:page={adventure.p[idx]}
          bind:page_to_preview
          delete_cb={() => {
            delete_page(idx);
          }}
          move_up_cb={() => {
            swap_page(idx, idx + 1);
          }}
          move_down_cb={() => {
            swap_page(idx, idx - 1);
          }}
        ></PageEditor>
      </div>
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
    overflow-anchor: none;
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
    z-index: 9000;

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
    color: rgb(120, 120, 120);
    padding: 0.2em 0.7em !important;
    border: 2px solid rgb(194, 194, 194);
    font-size: larger;
    border-radius: 0.5em;
    font-family: Verdana, sans-serif !important;
    font-weight: bold !important;
    box-shadow: 0px 3px 10px rgba(0, 0, 0, 0.303);
  }

  .add-page-btn:hover {
    background: rgb(241, 241, 241);
    border: 2px solid rgb(20, 172, 60);
    color: black;
  }

  .add-page-btn:active {
    background: rgb(117, 117, 117);
    transform: none;
  }

  @media (max-width: 650px) {
    .editor-pane {
      min-height: 50vh;
      height: 50%;
      width: 100vw !important;
      margin: 0 auto;
      resize: none;
      box-sizing: border-box;
    }
  }
</style>
