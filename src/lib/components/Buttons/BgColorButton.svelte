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
    insert_tags(editor, `[background=${color}]`, "[/background]");
  }

  let showModal = $state(false);
  let color: string = $state("#000000");

  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Background Color"
  icon_file="bg.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Select Background Color" bind:showModal>
  <div>
    <span style={`background-color: ${color}`}>
      Ever heard of contrast ratios?
    </span>
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
