<template>
    <select class="select-box base-input">
        <option v-for="(option, i) in options" :key="i">{{option.value}}</option>
    </select>
</template>

<script>
export default {
    name: "SelectBox",
    props: {
       options: {
           type: Array
       }
    },
}
</script>

<style scoped>
    option {
        color: var(--black);
        padding: 10px;
        display: inline-block;
    }

    .select-box {
        margin-bottom: 12px;
    }

    .select-box:last-child {
        margin-bottom: 0;
    }
</style>
