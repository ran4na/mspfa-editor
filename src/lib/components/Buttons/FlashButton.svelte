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

  function insert_flash(swf: string = "", width: number, height: number) {
    insert_tags(
      editor,
      `[flash=${swf} ${width ? `width=${width}` : ""} ${height ? `height=${height}` : ""}]`,
      "[/flash]",
    );
  }

  let showModal = $state(false);
  let swf: string = $state("");
  let width: number = $state(0);
  let height: number = $state(0);
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Flash"
  icon_file="flash.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert Flash" bind:showModal>
  <div>
    <label for="swf">SWF url:</label>
    <input type="swf" placeholder="touys.swf" id="swf" bind:value={swf} />
    <br />
    <label for="title">Width:</label>
    <input
      type="number"
      placeholder="Flash width (px)"
      id="width"
      bind:value={width}
    />
    <br />
    <label for="title">Height:</label>
    <input
      type="number"
      placeholder="Flash height (px)"
      id="height"
      bind:value={height}
    />
    <br />
  </div>
  <button
    onclick={() => {
      insert_flash(swf, width, height);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
