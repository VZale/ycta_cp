<template>
    <select class="select-box base-input" @change="choosingSelect(choosingOption)" v-model="choosingOption">
        <option>{{placeholder}}</option>
        <option v-for="(option, i) in options" :key="i" :value="i">{{option.name}}</option>
    </select>
</template>

<script>
export default {
    name: "SelectBox",
    props: ['options','placeholder','field','id'],
    data() {
        return {
            choosingOption: this.placeholder,
        }
    },
    methods: {
        choosingSelect(option){
            let field = {
                field: this.field,
                inputData: option
            }

            this.$emit('choosing', field)
        }
    }
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
