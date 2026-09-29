<script lang="ts">
    let {
        label = "",
        v = $bindable(),
    }: {
        label: string;
        v: string;
    } = $props();
</script>
<div class="field-editor-ta">
    <div class="fe-label">{label}</div>
    <textarea bind:value={v} class="fe-value"></textarea>
</div>
<style>
    .field-editor-ta {
        display: flex;
        flex-direction: column;
        width: calc(100% - 1em);
        margin-left: 1em;
        margin-right: 1em;
        border: 1px solid black;
        font-family: 'Courier New', Courier, monospace;
        height: fit-content;
        margin-bottom: 0.2em;
    }

    .fe-label {
        min-width: fit-content;
        background: linear-gradient(rgb(1, 106, 1), rgb(49, 148, 19));
        color: white;
        padding-left: 0.5em;
        padding-right: 0.5em;
        flex-grow: 1;
        height: 100%;
        font: inherit;
        box-sizing: border-box;
    }
    
    .fe-value, textarea {
        display: block;
        border: none;
        width: 100%;
        padding-left: 0.5em;
        margin: 0;
        box-sizing: border-box;
        height: fit-content;
        font: inherit;
        resize: vertical;
        min-height: 10em;
    }
</style>