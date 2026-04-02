<script lang="ts">
  import PagePreviewer from "./PagePreviewer.svelte";
</script>

<div class="preview-pane">
  <div>
    <PagePreviewer></PagePreviewer>
  </div>
</div>

<style>
  .preview-pane {
    max-width: 100%;
    min-width: 650px;
    width: 950px;
    margin: 0 auto;
  }

  @media (max-width: calc(650px + 292px)) {
    .preview-pane {
      flex-grow: 1;
      overflow-y: scroll;
      width: 100%;
      flex-shrink: 1;
      min-width: 0%;
    }
  }

  @media (max-width: 650px) {
    .preview-pane {
      overflow-y: scroll;
    }
  }
</style>
