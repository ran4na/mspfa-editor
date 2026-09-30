<script lang="ts">
  import { onMount } from "svelte";
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";
  import type { EditorView } from "codemirror";

  /**
   * TODO:
   *  When saving a color in one button, it doesn't transfer to other buttons
   *  Idea: Move to comic state and/or load when the editor is mounted
   *        (Multiple buttons refer to this anyways so it'd be better and have less duplication)
   */

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: EditorView | undefined; dialog_active: boolean } =
    $props();

  function insert_fg_tag(color: string) {
    insert_tags(editor, `[color=${color}]`, "[/color]");
  }

  let showModal = $state(false);
  let color: string = $state("#000000");

  $effect(() => {
    dialog_active = showModal;
  });

  let saved_colors: string[] = $state([]);

  // saved colors
  function getSavedColors() {
    cookieStore.get("saved_fg").then((c) => {
      let s = c ? c.value : "";
      if (!s) return;
      saved_colors = s.split("|");
    });
  }

  async function setSavedColors(color_list: string[]) {
    // You might be wondering why I'm using pipes
    // This is because the user MIGHT input an rgb() color.. which i think works with the parser?
    await cookieStore.set("saved_fg", color_list.join("|"));
  }

  onMount(() => {
    getSavedColors();
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
    <p>Saved colors:</p>
    {#each saved_colors as col}
      <button
        class="color-button"
        style="background-color: {col} !important"
        aria-label="Color button"
        onclick={() => {
          color = col;
        }}
      >
      </button>
    {/each}
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
    <button
      onclick={() => {
        if (!saved_colors.includes(color)) {
          saved_colors.push(color);
          setSavedColors(saved_colors);
        }
      }}>Save Color</button
    >
    <br />
  </div>
  <hr />
  <button
    onclick={() => {
      insert_fg_tag(color);
      showModal = false;
    }}>Insert</button
  >
</EditorModal>

<style>
  .color-button {
    display: inline-block;
    width: 32px;
    height: 32px;
    border: 1px solid black;
    border-radius: 0;
  }
</style>
