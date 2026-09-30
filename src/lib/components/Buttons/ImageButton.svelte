<script lang="ts">
  import type { EditorView } from "codemirror";
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: EditorView | undefined; dialog_active: boolean } =
    $props();

  function insert_image(
    image_url: string = "",
    width: number | null = null,
    height: number | null = null,
  ) {
    let width_string = width ? ` width=${width}` : "";
    let height_string = height ? ` height=${height}` : "";
    insert_tags(
      editor,
      `[img${width_string}${height_string}]${image_url}[/img]`,
      "",
    );
  }

  let showModal = $state(false);
  let url: string = $state("");
  let width: number | null = $state(null);
  let height: number | null = $state(null);

  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Image"
  icon_file="image.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert Image" bind:showModal>
  <div>
    {#if url.length > 0}
      <p>The image you pasted in (not to scale):</p>
      <img src={url} alt="Preview" width="320px" />
    {/if}
  </div>
  <div>
    <label for="img-link">Image URL:</label>
    <input
      type="url"
      placeholder="Image link"
      id="img-link"
      bind:value={url}
    /><br />
    <label for="img-w">Width (optional):</label>
    <input
      type="number"
      placeholder="Width (px)"
      id="img-w"
      bind:value={width}
    /><br />
    <label for="img-h">Height (optional):</label>
    <input
      type="number"
      placeholder="Height (px)"
      id="img-h"
      bind:value={height}
    />
  </div>
  <button
    onclick={() => {
      insert_image(url, width, height);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
