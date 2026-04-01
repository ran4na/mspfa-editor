<script lang="ts">
  import type { ComicData, PageData } from "../bb/Adventure";
  import { bb_tree, bb_param, build_bbcode_tree } from "../bb/BBparser";
  import { HTML_Parser } from "../bb/HTML_Parser";
  import { default_adventure } from "../bb/Adventure";
  import default_styles from "../../assets/defaultCSS.css?inline";
  const {
    page_index = 0,
    adventure_data = default_adventure,
  }: { page_index: number; adventure_data: ComicData } = $props();

  let page_data: PageData = $derived(adventure_data.p[page_index]);
  let next_page_data: PageData | undefined = $derived(
    adventure_data.p[page_data.n[0] - 1],
  );
  let adventure_css: string = $derived(adventure_data.y);
  // parsed page content
  let page_bb_tree: bb_tree | undefined = $derived(
    build_bbcode_tree(page_data.b),
  );

  let renderer = new HTML_Parser();
  let parsed_css = $derived(`
    <style>${default_styles}</style><style>${adventure_css}</style>
  `);

  let parsed_content = $derived(
    `
      ${renderer.parse_tree(page_bb_tree)}`,
  );
</script>

<div class="page-preview">
  {@html parsed_css}
  <div id="main">
    <div id="container">
      <div id="slide">
        <!-- Render adventure data here -->
        <div id="command">
          <h1>
            {page_data.c}
          </h1>
        </div>
        <div id="comic-content">
          <span>
            {@html parsed_content}
          </span>
        </div>
        <div id="comic-next">
          {#if next_page_data}
            <span class="next-link"><a href=".">{next_page_data.c}</a></span>
          {/if}
        </div>
      </div>
    </div>
  </div>
</div>

<style>
  .page-preview {
    margin: 0 auto;
    height: 100vh;
    overflow: scroll;
    overflow-x: hidden;
    background-color: transparent;
    max-width: 100%;
  }

  @media (max-width: 650px) {
    .page-preview {
      height: fit-content;
    }
  }
</style>
