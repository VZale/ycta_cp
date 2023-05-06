<template>
    <div class="edit-filter">
        <InputBox :value="editingFilter.name" @update="setField" :title="'Название фильтра'" :field="'name'"/>
        <label>Введите один или более пунктов фильтрации</label>
        <textarea v-model="options" :placeholder="'Пункты фильтрации'"></textarea>
        <div class="add-button">
            <ButtonBox @update="sendBoxData()" :design="['button','red','large','right']" :title="'Добавить фильтр'"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "EditFilter",
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    mounted() {
        this.options += this.editingFilter.options.join(' ')
    },
    data() {
        return {
            filterData: {},
            options: '',
        }
    },
    computed: {
        ...mapGetters(['editingFilter'])
    },
    methods: {
        setField(inputData) {
            this.$set(this.filterData, inputData.field, inputData.inputData.trim())
        },
        sendBoxData() {
            let field = {
                field: 'options',
                inputData: this.options.split(' ')
            }

            this.$set(this.filterData, field.field, field.inputData)
            this.$set(this.filterData, 'hidden', false)
            this.$set(this.filterData, '_id', this.editingFilter._id)

            this.$emit('add', this.filterData)
        }
    }
}
</script>

<style scoped>
.edit-filter {
    margin-top: 28px;
}

.add-button {
    margin-top: 16px;
    padding: 15px 0;
}

textarea {
    resize: none;
    outline: none;
    display: block;
    margin-top: 12px;
    border-radius: 8px;
    background-color: var(--gray-1);
    width: 100%;
    color: var(--black);
    font-size: 18px;
    position: relative;
    z-index: 3;
    font-weight: 400;
    height: 60px;
    padding: 14px;
}

textarea::placeholder {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    vertical-align: center;
}
</style>
