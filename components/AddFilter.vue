<template>
    <div class="add-filter">
        <select class="select-box base-input" v-model="curFilter">
            <option>Выберите фильтр</option>
            <option   v-for="(filter, i) in filtersAll" :value="filter">{{ filter.name }}</option>
        </select>
        <label>Введите один или более пунктов фильтрации, через "," / "Enter"</label>
        <Chips v-model="options" separator="," placeholder="Пункты фильтрации"/>
        <div class="add-button">
            <ButtonBox @update="sendBoxData()" :design="['button','red','large','right']" :title="'Добавить фильтр'"/>
        </div>
    </div>
</template>

<script>
import Chips from 'primevue/chips'
import {mapGetters} from "vuex";

import('primevue/resources/themes/lara-light-blue/theme.css')
import('primevue/resources/primevue.min.css')
import('primeicons/primeicons.css')
export default {
    name: "AddFilter",
    components: {
        Chips,
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    data() {
        return {
            filterData: {},
            options: [],
            curFilter: 'Выберите фильтр'
        }
    },
    computed: {
        ...mapGetters(['filtersAll'])
    },
    methods: {
        setField(inputData) {
            this.$set(this.filterData, inputData.field, inputData.inputData.trim())
        },
        sendBoxData() {
            let field = {
                field: 'options',
                inputData: this.options
            }
            this.$set(this.filterData, 'name', this.curFilter.name)
            this.$set(this.filterData, 'slug', this.curFilter.slug)
            this.$set(this.filterData, field.field, field.inputData)
            this.$set(this.filterData, 'hidden', false)
            this.$emit('add', this.filterData)
        }
    }
}
</script>

<style scoped>
.add-filter {
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

.p-chips {
    display: grid;
    width: 100%;
    min-height: 60px;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--black);
    position: relative;
    z-index: 3;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 0;
}



.p-chips-input-token {
    background: var(--gray-1);
}

.select-box {
    width: 100%;
}
</style>
