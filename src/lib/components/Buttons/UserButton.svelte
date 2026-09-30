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

  function insert_title(user: string = "") {
    insert_tags(editor, `[user]${user}[/user]`, "");
  }

  let showModal = $state(false);
  let user: string = $state("");
  $effect(() => {
    dialog_active = showModal;
  });
</script>

<ToolButton
  name="User tag"
  icon_file="user.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Insert user tag" bind:showModal>
  <div>
    <p>
      Just to be clear, this won't render the MSPFA user's name here. (But it
      should on MSPFA)
    </p>
    <label for="user">User ID:</label>
    <input
      type="number"
      placeholder="103240179274888463489"
      id="user"
      bind:value={user}
    />
    <br />
  </div>
  <button
    onclick={() => {
      insert_title(user as string);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>
