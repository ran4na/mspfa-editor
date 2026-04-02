<script lang="ts">
  import type { MouseEventHandler } from "svelte/elements";

  const images = import.meta.glob("../../assets/resources/icons/*.PNG", {
    eager: true,
    query: "?url",
    import: "default",
  });

  let {
    icon_file = "bold.PNG",
    callback = () => {},
    name = "Button",
  }: {
    icon_file: string;
    callback: MouseEventHandler<HTMLElement>;
    name: string;
  } = $props();
</script>

<button class="tool-button" onclick={callback} title={name}>
  <img
    src={images[`../../assets/resources/icons/${icon_file}`] as string}
    alt={name}
    draggable="false"
  />
</button>

<style>
  .tool-button {
    background: linear-gradient(rgb(255, 255, 255), rgb(207, 207, 207));
    border: none !important;
    border-right: 1px solid rgb(156, 156, 156) !important;
    max-height: 24px;
    padding: 0.1em 0em !important;
    flex-grow: 1;
    box-sizing: border-box;
  }

  .tool-button:last-of-type {
    border-right: none !important;
  }

  .tool-button:hover {
    background: linear-gradient(rgb(155, 155, 155), rgb(202, 202, 202));
  }

  .tool-button:active {
    background: linear-gradient(rgb(147, 147, 147), rgb(67, 67, 67));
  }

  .tool-button img {
    max-height: 100%;
  }
</style>
