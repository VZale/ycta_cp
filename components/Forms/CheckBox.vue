<template>
    <div class="checkbox" @click="setCheckboxState()">
        <span :class="{checked:isChecked}"></span>
        <p> {{ title }}</p>
    </div>
</template>

<script>
export default {
    name: "CheckBox",
    props: {
        title: {
            type: String
        },
        field: {
            type: String
        }
    },
    data() {
        return {
            isChecked: false
        }
    },
    methods: {
        setCheckboxState() {
            this.isChecked = !this.isChecked
            let field = {
                field: this.field,
                inputData: this.isChecked
            }

            this.$emit('update', field)
        }
    }
}
</script>

<style scoped>
.checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.checkbox p {
    padding-left: 10px;
    white-space: nowrap;
}

.checkbox span {
    display: inline-block;
    border: 2px solid var(--gray-2);
    border-radius: 3px;
    width: 16px;
    height: 16px;
    position: relative;
}

.checkbox span::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    background-color: var(--red-1);
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in-out;
}

.checkbox span.checked::after {
    opacity: 1;
    visibility: visible;
}
</style>
