<template>
    <div class="form-item base-input" :class="{'is-focus': inputIsActive || value}">
        <p>{{ title }}</p>
        <input v-model="inputData" type="text"
               :disabled="readonly"
               @focus="inputIsActive = true, $store.commit('disableErrorClass')"
               @blur="removeFocus()">
    </div>
</template>

<script>
export default {
    props: {
        title: {
            type: String
        },
        field: {
            type: String
        },
        value: {
            type: [String, Array],
            default: null
        },
        readonly: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        this.inputData += this.value || ''
    },
    name: "InputBox",
    data() {
        return {
            inputIsActive: false,
            inputData: ""
        }
    },
    methods: {
        sendInputData() {
            let field = {
                field: this.field,
                inputData: this.inputData
            }
            this.$emit('update', field)
        },
        removeFocus() {
            this.sendInputData()
            if (!this.inputData) {
                this.inputIsActive = false
            }
        }
    }
}
</script>

<style scoped>
.form-item {
    margin-bottom: 12px;
}

.form-item:last-child {
    margin-bottom: 0;
}

.form-item:focus {
    background-color: black;
}

.form-item p {
    position: absolute;
    top: 50%;
    left: 14px;
    transform: translateY(-50%);
    color: var(--gray-4);
    z-index: 2;
    transition: all .3s ease-in-out;
}

.form-item.is-focus p {
    font-size: 12px;
    top: 15px;
}

input {
    height: 100%;
    width: 100%;
    outline: none;
    background-color: transparent;
    color: var(--black);
    position: relative;
    z-index: 3;
    font-size: 18px;
    font-weight: 400;
}
</style>
