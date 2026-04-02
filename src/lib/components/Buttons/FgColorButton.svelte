<script lang="ts">
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_fg_tag(color: string) {
    insert_tags(editor, `[color=${color}]`, "[/color]");
  }

  let showModal = $state(false);
  let color: string = $state("#000000");

  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Text Color"
  icon_file="color.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Select Foreground Color" bind:showModal>
  <div>
    <span style={`color: ${color}`}
      >Make sure your text is readable!<br />Unless you don't want it to be i
      guess</span
    >
  </div>
  <div>
    <label for="color-select">Color:</label><br />
    <input
      type="color"
      placeholder="Select color"
      id="color-select"
      bind:value={color}
    />
    <input
      type="text"
      placeholder="#000000"
      id="color-text"
      bind:value={color}
      onfocus={(e) => e.currentTarget.select()}
    />
    <br />
  </div>
  <button
    onclick={() => {
      insert_fg_tag(color);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
