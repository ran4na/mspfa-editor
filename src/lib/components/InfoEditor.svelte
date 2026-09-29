<script lang="ts">
  import { getEditorContext } from "../EditorContext";
  import FieldEditor from "./InfoEditor/FieldEditor.svelte";
  import FieldEditorTextArea from "./InfoEditor/FieldEditorTextArea.svelte";

  let ctx = getEditorContext();

</script>

<div class="info-editor">
  <FieldEditor label="Adventure name" bind:v={ctx.adventure.n}></FieldEditor>
  <FieldEditorTextArea label="Description" bind:v={ctx.adventure.r}></FieldEditorTextArea>
  <FieldEditor label="Logo URL" bind:v={ctx.adventure.o}></FieldEditor>
  <FieldEditor label="Banner URL" bind:v={ctx.adventure.x}></FieldEditor>
  
  <FieldEditorTextArea label="CSS" bind:v={ctx.adventure.y}></FieldEditorTextArea>
  <FieldEditorTextArea label="JS" bind:v={ctx.adventure.j}></FieldEditorTextArea>

  
  {#if ctx.adventure.o}
    <img
      src={ctx.adventure.o}
      width="150px"
      height="150px"
      alt="Icon preview"
      class="previmg"
    />
  {/if}
  {#if ctx.adventure.x}
    <img
      src={ctx.adventure.x}
      width="940px"
      height="90px"
      alt="Banner preview"
      class="previmg"
    />
  {/if}
</div>

<style>
  .info-editor {
    margin: 1em;
    font-family: "Courier New", Courier, monospace;
    font-weight: bold;
  }
  .previmg {
    max-width: 100%;
    display: block;
    margin: 0.5em auto;
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
