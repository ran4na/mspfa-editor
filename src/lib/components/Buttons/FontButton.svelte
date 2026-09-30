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

  function insert_font(alt: string = "") {
    insert_tags(editor, `[font=${alt}]`, "[/font]");
  }

  let showModal = $state(false);
  let font: string = $state("");
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Font"
  icon_file="font.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Set Font" bind:showModal>
  <div>
    <p>
      <span style="font-family: {font};">
        The font you entered will make text look like this
      </span>
    </p>
    <hr />
    <p>
      Make sure your font is web-safe,
      <br />
      or that you've defined it in your CSS!
    </p>
    <hr />
    <label for="font">Font family:</label>
    <input type="text" placeholder="Courier New" id="font" bind:value={font} />
    <br />
  </div>
  <button
    onclick={() => {
      insert_font(font);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
