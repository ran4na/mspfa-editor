<script lang="ts">
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_title(alt: string = "") {
    insert_tags(editor, `[alt=${alt}]`, "[/alt]");
  }

  let showModal = $state(false);
  let alt: string = $state("");
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="Title"
  icon_file="alt.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert title" bind:showModal>
  <div>
    <p>
      I'm not sure why the tag is called "alt", it's a span with the *title*
      attribute.
    </p>
    <label for="title">Text:</label>
    <input
      type="text"
      placeholder="An image of a blue horse"
      id="title"
      bind:value={alt}
    />
    <br />
  </div>
  <button
    onclick={() => {
      insert_title(alt);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
