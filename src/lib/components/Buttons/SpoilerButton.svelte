<script lang="ts">
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_spoiler(
    open: string | null = null,
    close: string | null = null,
  ) {
    let open_string = open ? ` open="${open}"` : "";
    let close_string = close ? ` close="${close}"` : "";
    insert_tags(editor, `[spoiler${open_string}${close_string}]`, "[/spoiler]");
  }

  let showModal = $state(false);
  let open: string | null = $state(null);
  let close: string | null = $state(null);

  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Spoiler"
  icon_file="spoiler.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert Spoiler" bind:showModal>
  <div>
    <label for="sp-open">Show text:</label>
    <input type="text" placeholder="Show..." id="sp-open" bind:value={open} />
    <br />
    <label for="sp-close">Hide text:</label>
    <input type="text" placeholder="Hide..." id="sp-close" bind:value={close} />
    <br />
  </div>
  <button
    onclick={() => {
      insert_spoiler(open, close);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
