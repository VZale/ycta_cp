<template>
    <select class="select-box base-input" @change="choosingSelect(choosingOptionId ? choosingOptionId : choosingOption)" v-model="choosingOptionId ? choosingOptionId : choosingOption">
        <option>{{ placeholder }}</option>
        <option v-for="(option, i) in options" v-if="option" :key="i" :value="option._id">{{ option.name }}</option>
    </select>
</template>

<script>
export default {
    name: "SelectBox",
    props: ['options', 'placeholder', 'field', 'id', 'choosingId'],
    mounted() {
      this.choosingOptionId = this.choosingId
    },
    data() {
        return {
            choosingOption: this.placeholder,
            choosingOptionId: ''
        }
    },
    methods: {
        choosingSelect(option) {
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
