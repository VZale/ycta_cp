<template>
    <div class="add-box">
        <div class="add-box-container">
            <ScrollPanel style="width: 100%; height: 650px">

                <div class="box-item">
                    <template>
                        <label> Введите название товара <span class="require">*</span></label>
                        <InputBox @update="setField" :title="'Название товара'" :field="'name'"/>
                    </template>
                    <template>
                        <label> Введите стоимость товара <span class="require">*</span></label>
                        <InputBox @update="setField" :title="'Стоимость товара'" :field="'price'"/>
                    </template>
                    <template>
                        <label> Выберите категорию <span class="require">*</span></label>
                        <SelectBox :placeholder="'Выберите категорию'" :field="'category_id'" :options="categories"
                                   @choosing="setCategory"/>
                    </template>
                    <template>
                        <label> Подкатегория товара <span class="require">*</span></label>
                        <SelectBox :placeholder="'Выберите подкатегорию'" :field="'sub_category_id'"
                                   :options="subcategories"
                                   @choosing="setSubcategory"/>
                    </template>
                </div>
                <div class="box-item">
                    <ImageBox
                        @updateImages="setField"
                        :field="'file'"
                        :label="'Загрузите фотографии, которые будут отображаться в карточке товара'"
                        :btn-text="'Добавить фото(jpeg, png)'"/>
                </div>
                <div class="box-item" v-if="filtersAll.length">
                    <template v-for="(filter, i) in filtersAll">
                        <Chips @focus="setFocus(filter)" v-model="filterData[filter.slug]" separator=","
                               :placeholder="filter.name"/>
                    </template>
                </div>
                <div class="box-item">
                    <label>Описание <span class="require">*</span></label>
                    <Editor v-model="description" editorStyle="height: 320px"/>
                </div>
                <div class="box-item">
                    <template v-for="(label, i) in fields.productFields.labels">
                        <CheckBox :field="i" :title="label.title" @update="setLabels"/>
                    </template>
                </div>
                <div class="box-item">
                    <ImageBox
                        @updateImages="setField"
                        :label="'Выберите сопутствующие товары'"
                        :field="'relatedProducts'" :btn-text="'Добавить товары'" :checkbox="false"/>
                </div>
            </ScrollPanel>
        </div>
        <div class="box-item button-content">
            <ButtonBox :design="['button','red','large','right']" @update="sendBoxData()" :title="btnTitle"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Chips from "primevue/chips"
import Editor from 'primevue/editor'
import ScrollPanel from "primevue/scrollpanel"
import AutoComplete from 'primevue/autocomplete';

import('primevue/resources/themes/saga-blue/theme.css')
import('primevue/resources/primevue.min.css')
import('primeicons/primeicons.css')

export default {
    name: "AddProduct",
    props: {
        btnTitle: {
            type: String
        },
    },
    mounted() {
        this.$store.dispatch('getAllFilter')
        this.$store.commit('clearReletedProducts')
    },
    components: {
        Chips,
        Editor,
        ScrollPanel,
        AutoComplete,
        InputBox: () => import('~/components/Forms/InputBox'),
        ImageBox: () => import('@/components/Forms/ImageBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        CheckBox: () => import('@/components/Forms/CheckBox'),
        SelectBox: () => import('@/components/Forms/SelectBox'),
        ModalBox: () => import('@/components/Forms/ModalBox'),
    },
    data() {
        return {
            boxData: {},
            description: '',
            filterData: [],
        }
    },
    computed: {
        ...mapGetters([
            'fields',
            'categories',
            'subcategories',
            'filtersAll',
            'filtersList'
        ])
    },
    methods: {
        setFocus(focused) {
            this.focused = focused
        },
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },
        setCategory(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },
        setSubcategory(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },
        setFilters(inputData) {
            if (!this.boxData.characteristics) {
                this.$set(this.boxData, 'characteristics', {})
            }

            this.boxData.characteristics[inputData.field] = inputData.inputData.toLowerCase().trim().split(' ')
        },
        setLabels(inputData) {
            if (!this.boxData.labels) {
                this.$set(this.boxData, 'labels', [])
            }
            this.boxData.labels.push(inputData.field)
        },
        sendBoxData() {
            this.$set(this.boxData, 'description', this.description)
            this.$set(this.boxData, 'hidden', false)
            if (!this.boxData.characteristics) {
                this.$set(this.boxData, 'characteristics', {})
            }

            this.boxData.characteristics = {
                ...this.filterData
            }

            this.$store.commit('setShowBox', false)
            this.$store.commit('setPage', 'default')
            this.$emit('add', this.boxData)
        },
    },
}
</script>

<style scoped>
.add-box {
    display: grid;
    grid-template-rows: 1fr max-content;
}

.add-box-container {
    margin-bottom: 12px;
    border: 12px;
}

.box-item {
    padding: 24px;
    border-radius: 12px;
    background-color: var(--white);
    margin-bottom: 12px;
    display: grid;
    grid-template-columns: 1fr;
}

.box-item:last-child {
    margin-bottom: 0;
}

.box-item.button-content {
    text-align: right;
}

label {
    margin-bottom: 12px;
}

textarea {
    width: 100%;
    height: 40vh;
    outline: none;
    resize: none;
    font-size: 40px;
    font-weight: 500;
}

textarea::placeholder {
    font-weight: 500;
    font-size: 40px;
    line-height: 110%;
    color: var(--gray-2);
}

.p-chips {
    display: grid;
    width: 100%;
    height: 60px;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--black);
    position: relative;
    z-index: 3;
    font-size: 18px;
    font-weight: 400;
    margin-bottom: 20px;
}

.p-chips-input-token {
    background: var(--gray-1);
}
</style>
