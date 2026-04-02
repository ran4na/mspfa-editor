<script lang="ts">
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_link(url: string = "", display_text: string | null) {
    if (display_text) {
      insert_tags(editor, `[url=${url}]${display_text}[/url]`, "");
    } else {
      insert_tags(editor, `[url]${url}`, `[/url]`);
    }
  }

  let showModal = $state(false);
  let url: string = $state("");
  let display_text: string | null = $state(null);
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Link"
  icon_file="link.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert Link" bind:showModal>
  <div>
    <label for="link">URL:</label>
    <input
      type="url"
      placeholder="https://icetrixie.org"
      id="link"
      bind:value={url}
    />
    <br />
    <label for="link">Display Text (optional):</label><br />
    <input
      type="text"
      placeholder="Ice Trixie"
      id="text"
      bind:value={display_text}
    />
  </div>
  <button
    onclick={() => {
      insert_link(url, display_text);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
