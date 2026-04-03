<script lang="ts">
  import { insert_tags } from "../bb/Editor_Utils";
  import ImageButton from "./Buttons/ImageButton.svelte";
  import SpoilerButton from "./Buttons/SpoilerButton.svelte";
  import ToolButton from "./ToolButton.svelte";
  import FgColorButton from "./Buttons/FgColorButton.svelte";
  import BgColorButton from "./Buttons/BgColorButton.svelte";
  import LinkButton from "./Buttons/LinkButton.svelte";
  import GlowButton from "./Buttons/GlowButton.svelte";
  import AltButton from "./Buttons/AltButton.svelte";
  import FlashButton from "./Buttons/FlashButton.svelte";
  import UserButton from "./Buttons/UserButton.svelte";
  import FontButton from "./Buttons/FontButton.svelte";
  import SizeButton from "./Buttons/SizeButton.svelte";

  interface editorButton {
    n: string;
    o: string;
    c: string;
    i: string;
  }

  const basic_buttons: editorButton[] = [
    { n: "b", o: "[b]", c: "[/b]", i: "bold.PNG" },
    { n: "i", o: "[i]", c: "[/i]", i: "italic.PNG" },
    { n: "u", o: "[u]", c: "[/u]", i: "underline.PNG" },
    { n: "s", o: "[s]", c: "[/s]", i: "strikethrough.PNG" },
    {
      n: "nsp",
      o: `<div class="spoiler"><div class="spoiler-content">`,
      c: `</div></div>`,
      i: "nospoiler.PNG",
    },
    { n: "Align Left", o: "[left]", c: "[/left]", i: "left.PNG" },
    { n: "Align Center", o: "[center]", c: "[/center]", i: "center.PNG" },
    { n: "Align Right", o: "[right]", c: "[/right]", i: "right.PNG" },
    { n: "Ordered List", o: "[ol][li]", c: "[/li][/ol]", i: "numbers.PNG" },
    { n: "Unordered List", o: "[ul][li]", c: "[/li][/ul]", i: "bullet.PNG" },
    { n: "Header 1", o: "<h1>", c: "</h1>", i: "h1.PNG" },
    { n: "Header 2", o: "<h2>", c: "</h2>", i: "h2.PNG" },
    { n: "Header 3", o: "<h3>", c: "</h3>", i: "h3.PNG" },
    { n: "Marquee", o: "<marquee>", c: "</marquee>", i: "marquee.PNG" },
    { n: "Blink", o: "<blink>", c: "</blink>", i: "blink.PNG" },
  ];

  let {
    content = $bindable(""),
    editor,
    show_buttons = true,
  }: {
    content: string;
    editor: HTMLTextAreaElement | undefined;
    show_buttons: boolean;
  } = $props();

  let dialog_active = $state(false);
</script>

<div class="editor-bar">
  {#if show_buttons || dialog_active}
    {#each basic_buttons as button}
      <ToolButton
        name={button.n}
        icon_file={button.i}
        callback={() => insert_tags(editor, button.o, button.c)}
      ></ToolButton>
    {/each}
    <!-- Special buttons! -->
    <ImageButton {editor} bind:dialog_active></ImageButton>
    <SpoilerButton {editor} bind:dialog_active></SpoilerButton>
    <FgColorButton {editor} bind:dialog_active></FgColorButton>
    <BgColorButton {editor} bind:dialog_active></BgColorButton>
    <LinkButton {editor} bind:dialog_active></LinkButton>
    <GlowButton {editor} bind:dialog_active></GlowButton>
    <AltButton {editor} bind:dialog_active></AltButton>
    <FlashButton {editor} bind:dialog_active></FlashButton>
    <UserButton {editor} bind:dialog_active></UserButton>
    <FontButton {editor} bind:dialog_active></FontButton>
    <SizeButton {editor} bind:dialog_active></SizeButton>
  {/if}
</div>

<style>
  .editor-bar {
    display: flex;
    width: 100%;
    box-sizing: border-box;
    padding: 0;
    margin-top: 1em;
    flex-wrap: wrap;
    justify-content: left;
    background: linear-gradient(rgb(112, 111, 111), rgb(197, 197, 197));
    border-top-left-radius: 0.5em;
    border-top-right-radius: 0.5em;
    border-top: 2px solid gray;
    border-left: 2px solid gray;
    border-right: 2px solid gray;
    overflow: hidden;
  }

  .editor-bar:empty {
    height: 26px;
  }

  :global(blink) {
    animation: blink 1s step-end infinite;
  }

  @keyframes blink {
    0% {
      opacity: 0%;
    }
    50% {
      opacity: 100%;
    }
    100% {
      opacity: 100%;
    }
  }
</style>
