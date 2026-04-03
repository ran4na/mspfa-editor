<script lang="ts">
  import { getEditorContext } from "../EditorContext";
  let ctx = getEditorContext();
</script>

<div class="info-editor">
  <h2>Adventure Name:</h2>
  <input id="adventure-name" bind:value={ctx.adventure.n} />
  <h2>Description:</h2>
  <textarea id="adventure-css" bind:value={ctx.adventure.r}></textarea>
  <h2>Logo URL:</h2>
  <input id="adventure-name" bind:value={ctx.adventure.o} />
  {#if ctx.adventure.o}
    <img
      src={ctx.adventure.o}
      width="150px"
      height="150px"
      alt="Icon preview"
    />
  {/if}
  <h2>Banner URL:</h2>
  <input id="adventure-name" bind:value={ctx.adventure.x} />
  {#if ctx.adventure.x}
    <img
      src={ctx.adventure.x}
      width="940px"
      height="90px"
      alt="Banner preview"
    />
  {/if}
  <h2>CSS:</h2>
  <textarea id="adventure-css" bind:value={ctx.adventure.y}></textarea>

  <h2>JS:</h2>
  <textarea id="adventure-js" bind:value={ctx.adventure.j}></textarea>
</div>

<style>
  .info-editor {
    margin: 1em;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
  }
  img {
    max-width: 100%;
    display: block;
    margin: 0 auto;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.406);
  }
  input {
    width: calc(100% - 1em);
    margin: 1em;
    box-sizing: border-box;
    border-radius: 0.5em;
    border-style: solid;
  }
  textarea {
    width: 100%;
    min-height: 30em;
    resize: vertical;
    border-radius: 0.5em;
    border-style: solid;
  }
</style>
