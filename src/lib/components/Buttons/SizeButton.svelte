<script lang="ts">
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_size(size: number = 14) {
    insert_tags(editor, `[size=${size}]`, "[/size]");
  }

  let showModal = $state(false);
  let size: number = $state(14);
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Size"
  icon_file="size.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Set Font Size" bind:showModal>
  <div>
    <p>
      <span style="font-size: {size}px;">
        Here's what text looks like at this font size
      </span>
    </p>
    <hr />
    <label for="size">Font size (px):</label>
    <input type="number" placeholder="size (px)" id="size" bind:value={size} />
    <br />
  </div>
  <button
    onclick={() => {
      insert_size(size);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
