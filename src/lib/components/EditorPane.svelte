<script lang="ts">
  import { empty_adventure, type PageData } from "../bb/Adventure";
  import InfoEditor from "./InfoEditor.svelte";
  import PageEditor from "./PageEditor.svelte";
  import { flip } from "svelte/animate";
  import { backOut } from "svelte/easing";
  import EditorNav from "./EditorNav.svelte";
  import { getEditorContext } from "../EditorContext";
  import { untrack } from "svelte";
  let ctx = getEditorContext();

  // Swap pages in place... updates their next values too
  function swap_page(index: number, target_index: number) {
    let length = ctx.adventure.p.length;
    if (
      index >= 0 &&
      index < length &&
      target_index >= 0 &&
      target_index < length
    ) {
      let page = ctx.adventure.p[index];
      let to_swap = ctx.adventure.p[target_index];

      // Swap next vals
      let next = page.n;
      page.n = to_swap.n;
      to_swap.n = next;
      // Swap positions
      let temp = to_swap;
      ctx.adventure.p[target_index] = page;
      ctx.adventure.p[index] = temp;

      // Swap the keys too
      let temp_key = ctx.page_keys[target_index];
      let p_key = ctx.page_keys[index];
      ctx.page_keys[target_index] = p_key;
      ctx.page_keys[index] = temp_key;
    } else {
      console.log("Couldn't swap pages!");
    }
  }

  function push_page() {
    // Add a target to the previous page
    if (ctx.adventure.p.length > 0) {
      if (ctx.adventure.p[ctx.adventure.p.length - 1].n.length == 0) {
        ctx.adventure.p[ctx.adventure.p.length - 1].n = [
          ctx.adventure.p.length + 1,
        ];
      }
    }
    ctx.adventure.p.push({ d: 0, c: "", b: "", n: [] as number[] });
    // Add a new unique key
    ctx.page_keys.push(crypto.randomUUID());
  }

  // Insert page after index (of previous page)
  function insert_page(index: number) {
    if(index > ctx.adventure.p.length) {
      alert("Page index out of bounds!");
      return;
    }
    
    // If this is after a tail end page, with no set next page,
    // set the index to the newly created page.
    if (ctx.adventure.p.length > 0) {
      if (ctx.adventure.p[index].n.length == 0) {
        ctx.adventure.p[index].n = [
          index + 2,
        ];
      }
      // If there are pages after this, increment the next page count for those.
      add_to_npages_after_index(index + 1, 1);
    }
    
    let n: number[] = [];
    // get next page, if this isn't the last
    if(index < ctx.adventure.p.length - 1) {
      n = [index + 3];
    }

    // Insert the page
    ctx.adventure.p.splice(index + 1, 0, { d: 0, c: "", b: "", n: n });
    ctx.page_keys.splice(index + 1, 0, crypto.randomUUID());
  }


  function delete_page(index: number) {
    ctx.adventure.p.splice(index, 1) as [PageData];
    ctx.page_keys.splice(index, 1) as [string];

    // deleting a page reduces the length of the adventure
    // after the deleted index, subtract from all page [n] values unless they're less than the index
    add_to_npages_after_index(index, -1);
  }

  // Increment next-page indices by xcrement haha poo
  function add_to_npages_after_index(index: number, xcrement: number) {
    for(const [idx, page] of ctx.adventure.p.slice(index).entries()) {
      for(const [i, next_page] of page.n.entries()) {
        if (next_page > idx) {
          page.n[i] += xcrement;
        }
      }
    }
  }

  // By the way yeah I have to generate new keys when creating pages too. see push_page()

  let pages_reversed = $derived(ctx.adventure.p.toReversed());
  let show_info = $state(false);
</script>

<div class="editor-pane">
  <EditorNav bind:show_info></EditorNav>
  {#if !show_info}
    <div class="pages-editor">
      <div class={`pages`}>
        <div class="add-page">
          <button class="add-page-btn" onclick={() => push_page()}
            >Add Page</button
          >
        </div>
        {#each pages_reversed as page, index (ctx.page_keys[pages_reversed.length - index - 1])}
          {@const idx = pages_reversed.length - index - 1}
          <div
            class="page-editor-container"
            animate:flip={{ duration: 150, easing: backOut }}
          >
            <PageEditor
              index={idx}
              bind:page={ctx.adventure.p[idx]}
              delete_cb={() => {
                delete_page(idx);
              }}
              move_up_cb={() => {
                swap_page(idx, idx + 1);
              }}
              move_down_cb={() => {
                swap_page(idx, idx - 1);
              }}
              insert_cb={() => insert_page(idx)}
            ></PageEditor>
          </div>
        {/each}
      </div>
    </div>
  {/if}
  {#if show_info}
    <div class="info-editor">
      <InfoEditor></InfoEditor>
    </div>
  {/if}
</div>

<style>
  .editor-pane {
    border-right: 3px solid black;
    display: flex;
    flex-direction: column;
    overflow: auto;
    resize: horizontal;
    width: 50%;
    background: linear-gradient(rgb(228, 228, 228), rgb(141, 133, 133));
    color: black;
    position: relative;
    max-width: 100vw;
    min-width: 341px;
    overflow-anchor: none;
  }

  .pages {
    margin: 1em;
  }

  .hidden {
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
      border-right: none;
      border-top: 3px solid black;
    }
  }
</style>
