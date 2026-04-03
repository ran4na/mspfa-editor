<script lang="ts">
  import { onMount } from "svelte";
  import { insert_tags } from "../../bb/Editor_Utils";
  import EditorModal from "../EditorModal.svelte";
  import ToolButton from "../ToolButton.svelte";

  let {
    editor,
    dialog_active = $bindable(false),
  }: { editor: HTMLTextAreaElement | undefined; dialog_active: boolean } =
    $props();

  function insert_glow_tag(x: number, y: number, size: number, color: string) {
    insert_tags(
      editor,
      `<span style="text-shadow: ${x}px ${y}px ${size}px ${color}">`,
      "</span>",
    );
  }

  let showModal = $state(false);
  let x: number = $state(0);
  let y: number = $state(0);
  let size: number = $state(5);
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
  name="Glow"
  icon_file="glow.PNG"
  callback={() => {
    showModal = true;
  }}
></ToolButton>
<EditorModal title="Text Glow" bind:showModal>
  <div>
    <!-- Demo -->
    Some king of
    <span style={`text-shadow: ${x}px ${y}px ${size}px ${color}`}
      >Text shadow...</span
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
    <label for="x">X offset (px):</label>
    <input type="number" placeholder="#000000" id="x" bind:value={x} />
    <br />
    <label for="y">Y offset (px):</label>
    <input type="number" placeholder="#000000" id="y" bind:value={y} />
    <br />
    <label for="size">Size offset (px):</label>
    <input type="number" placeholder="#000000" id="size" bind:value={size} />
  </div>
  <button
    onclick={() => {
      insert_glow_tag(x, y, size, color);
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
