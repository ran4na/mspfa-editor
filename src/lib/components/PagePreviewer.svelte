<script lang="ts">
  import type { PageData } from "../bb/Adventure";
  import { bb_tree, build_bbcode_tree } from "../bb/BBparser";
  import { HTML_Parser } from "../bb/HTML_Parser";
  import default_styles from "../../assets/defaultCSS.css?inline";
  import { getEditorContext } from "../EditorContext";

  let ctx = getEditorContext();

  let page_data: PageData = $derived(ctx.adventure.p[ctx.current_page_index]);
  let adventure_css: string = $derived(ctx.adventure.y);
  // parsed page content
  let page_bb_tree: bb_tree | undefined = $derived(
    page_data ? build_bbcode_tree(page_data.b) : undefined,
  );

  let renderer = new HTML_Parser();
  let parsed_css = $derived(`
    <style>${default_styles}</style><style>${adventure_css}</style>
  `);

  interface pageRange {
    start: number;
    end: number;
  }

  let page_ranges: pageRange[] = $derived(getPageRanges(ctx.adventure.y));
  let applicable_ranges: string = $derived(
    getApplicablePageRanges(ctx.current_page_index, page_ranges),
  );

  function getPageRanges(css: string): pageRange[] {
    let ranges: pageRange[] = [];
    let tokens = css.matchAll(/.p([0-9]+)-([0-9]+)/gm);
    for (const range of tokens) {
      ranges.push({ start: parseInt(range[1]), end: parseInt(range[2]) });
    }
    return ranges;
  }

  function getApplicablePageRanges(index: number, ranges: pageRange[]) {
    let applicable_ranges = ranges.filter((range) => {
      return index + 1 >= range.start && index + 1 <= range.end;
    });

    console.log(applicable_ranges);

    return applicable_ranges
      .map((range) => `p${range.start}-${range.end}`)
      .join(" ");
  }

  let parsed_content = $derived(
    `
      ${renderer.parse_tree(page_bb_tree)}`,
  );
</script>

<div class="page-preview p{ctx.current_page_index + 1} {applicable_ranges}">
  {@html parsed_css}
  <div id="main">
    <div id="container">
      <div id="slide">
        <!-- Render adventure data here -->
        <div id="command">
          <h1>
            {page_data ? page_data.c : ""}
          </h1>
        </div>
        <div id="comic-content">
          <div>
            {@html parsed_content}
          </div>
        </div>
        <div id="comic-next">
          {#if page_data}
            {#each page_data.n as next, index (index)}
              {@const next_page_data = ctx.adventure.p[next - 1]}
              {#if next_page_data != undefined}
                <div class="next-link">
                  <a href="#top" onclick={(e) => e.preventDefault()}>
                    {next_page_data.c}
                  </a>
                </div>
              {/if}
            {/each}
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

  .next-link {
    display: block;
  }
</style>
