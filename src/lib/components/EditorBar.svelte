<script lang="ts">
  interface editorButton {
    n: string;
    o: string;
    c: string;
    i: string;
  }

  const images = import.meta.glob("../../assets/resources/icons/*.PNG", {
    eager: true,
    query: "?url",
    import: "default",
  });

  const basic_buttons = [
    { n: "b", o: "[b]", c: "[/b]", i: "bold.PNG" },
    { n: "i", o: "[i]", c: "[/i]", i: "italic.PNG" },
    { n: "u", o: "[u]", c: "[/u]", i: "underline.PNG" },
    { n: "s", o: "[s]", c: "[/s]", i: "strikethrough.PNG" },
    {
      n: "nsp",
      o: `<div class="spoiler"><div class="spoiler-content">`,
      c: `</div></div>`,
      i: "spoiler.PNG",
    },
    { n: "left", o: "[left]", c: "[/left]", i: "left.PNG" },
    { n: "center", o: "[center]", c: "[/center]", i: "center.PNG" },
    { n: "right", o: "[right]", c: "[/right]", i: "right.PNG" },
    { n: "ol", o: "[ol][li]", c: "[/li][/ol]", i: "numbers.PNG" },
    { n: "ul", o: "[ul][li]", c: "[/li][/ul]", i: "bullet.PNG" },
    { n: "h1", o: "<h1>", c: "</h1>", i: "h1.PNG" },
    { n: "h2", o: "<h2>", c: "</h2>", i: "h2.PNG" },
    { n: "h3", o: "<h3>", c: "</h3>", i: "h3.PNG" },
    { n: "marquee", o: "<marquee>", c: "</marquee>", i: "marquee.PNG" },
    { n: "blink", o: "<blink>", c: "</blink>", i: "blink.PNG" },
  ];

  let {
    content = $bindable(""),
    editor,
  }: { content: string; editor: HTMLTextAreaElement } = $props();

  function insert_tags(opening: string, closing: string) {
    const start = editor.selectionStart;
    const end = editor.selectionEnd;

    // insert start tag
    let v = editor.value;

    v =
      v.slice(0, start) +
      opening +
      v.slice(start, end) +
      closing +
      v.slice(end);

    editor.value = v;
    editor.selectionStart += opening.length + (start - end);
    editor.dispatchEvent(new Event("input"));
  }
</script>

<div class="editor-bar">
  {#each basic_buttons as button}
    <button
      class="editor-bar-button"
      onclick={() => insert_tags(button.o, button.c)}
    >
      <img
        src={images[`../../assets/resources/icons/${button.i}`] as string}
        alt={button.n}
      />
    </button>
  {/each}
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
    .editor-bar-button {
      background: linear-gradient(rgb(255, 255, 255), rgb(207, 207, 207));
      border: none;
      border-right: 2px solid rgb(156, 156, 156);
      height: 24px;
      img {
        height: 100%;
      }
    }

    .editor-bar-button:hover {
      background: linear-gradient(rgb(155, 155, 155), rgb(202, 202, 202));
    }

    .editor-bar-button:active {
      background: linear-gradient(rgb(147, 147, 147), rgb(67, 67, 67));
    }
  }
</style>
