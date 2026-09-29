<script lang="ts">
  import EditorPane from "./EditorPane.svelte";
  import PreviewPane from "./PreviewPane.svelte";

  import { default_adventure } from "../bb/Adventure";
  import { setEditorContext } from "../EditorContext";
  import { onMount } from "svelte";

  /**
   * TODOS:
   *     - Load saved colors on mount
   *     - Add a feature to "jump" to pages with a little widget that would update cpi
   *        - This would ideally cause the corresponding editor to scroll into view and highlight
   *     - Retain page index when switching between info/editor view
   *     - Minimap view w/ thumbnails? This would probably be pretty resource intensive and hard to program
   *        I'd need an efficient way to generate thumbnails, and also cache them so I dont have to constantly rerender
   *        What about pages with like, 3000x3000 images? Some of those exist and itd suck to keep them loaded in always
   *     - PAGE INSERTION!!! I can probably do this easily. maybe
   *     - Like, a welcome screen that shows how and why to use the program? I think consolidating it to the welcome page would
   *        be good enough. I could just add a little tutorial to the adventure. Would be clever!
   *     - Make this a PWA? Would be fully possible i think
   *     - Make a way to plug this into MSPFA? God
   */

  let current_page: number = $state(0);
  // Set default context on mount
  onMount(() => {});

  let editorContext = $state({
    adventure: structuredClone(default_adventure),
    current_page_index: 0,
    page_keys: default_adventure.p.map(() => crypto.randomUUID()),
  });
  setEditorContext(editorContext);
</script>

<div class="editor-main">
  <EditorPane></EditorPane>
  <PreviewPane></PreviewPane>
</div>

<style>
  .editor-main {
    display: flex;
    flex-direction: row;
    height: 100vh;
    width: 100vw;
    box-sizing: border-box;
    margin: 0;
    padding: 0;
  }

  @media (max-width: 650px) {
    .editor-main {
      flex-direction: column-reverse;
      height: 100svh;
      width: 100vw;
    }
  }
</style>
