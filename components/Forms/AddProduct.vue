<template>
    <div class="add-box">
        <div class="add-box-container">
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
            <div class="box-item" v-if="Object.keys(filtersAll).length">
                <template v-for="(filter, i) in filtersAll">
                    <InputBox @update="setFilters" :title="filter.name" :field="filter.name"/>
                </template>
            </div>
            <div class="box-item">
                <label>Описание <span class="require">*</span></label>
                <textarea :placeholder="'Заголовок'" v-model="description"></textarea>
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
        </div>
        <div class="box-item button-content">
            <ButtonBox :design="['button','red','large','right']" @update="sendBoxData()" :title="btnTitle"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'

export default {
    name: "AddProduct",
    props: {
        btnTitle: {
            type: String
        },
    },
    mounted() {
        this.$store.dispatch('getAllFilter')
        this.$store.dispatch('getCategories')
        this.$store.dispatch('getSubcategories')
        this.$store.commit('clearReletedProducts')
    },
    components: {
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
        }
    },
    computed: {
        ...mapGetters([
            'fields',
            'categories',
            'subcategories',
            'filtersAll'
        ])
    },
    methods: {
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

            this.$set(this.boxData.characteristics, inputData.field, inputData.inputData)
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
    overflow: auto;
    height: 645px;
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

.box-item {
    overflow-y: auto;
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
</style>
