<script lang="ts">
  import type { Snippet } from "svelte";

  let {
    showModal = $bindable(),
    title = "Modal Title",
    children,
  }: { showModal: Boolean; title: String; children: Snippet } = $props();

  let dialog: HTMLDialogElement | undefined = $state();

  $effect(() => {
    if (showModal) {
      dialog?.showModal();
    } else {
      dialog?.close();
    }
  });
</script>

<dialog
  class="editor-modal"
  bind:this={dialog}
  onclose={() => {
    showModal = false;
  }}
  onclick={(e) => {
    if (e.target === dialog) dialog.close();
  }}
>
  <div class="modal-inner">
    <div class="title-bar">{title}</div>
    <div class="content">
      {@render children?.()}
      <button onclick={() => dialog?.close()}>Close</button>
    </div>
  </div>
</dialog>

<style>
  dialog {
    padding: 0;
    width: fit-content;
    box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.408);
  }

  .content {
    padding: 0.2em 1em;
  }

  .editor-modal {
    background: linear-gradient(white, rgb(203, 203, 203));
    border: 2px solid rgb(117, 115, 115);
    border-radius: 0.5em;
    font-weight: bold;
    box-sizing: border-box;

    .title-bar {
      width: 100%;
      background-color: black;
      color: white;
      padding-left: 0.5em;
      box-sizing: border-box;
    }
  }

  :global(.editor-modal button) {
    border-radius: 0.5em;
    background: rgb(229, 229, 229) !important;
    color: black !important;
    border-color: gray !important;
    border-width: 2px !important;
  }

  :global(.editor-modal button:hover) {
    background: rgb(255, 255, 255) !important;
    border-color: rgb(19, 181, 19) !important;
  }
</style>
