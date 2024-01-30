<template>
    <div class="add-box">
        <div class="add-box-container">
            <ScrollPanel style="width: 100%; height: 650px">
                <div class="box-item">
                    <template>
                        <label> Введите название товара <span class="require">*</span></label>
                        <InputBox :value="data?.name" @update="setField" :title="'Название товара'" :field="'name'"/>
                    </template>
                    <template>
                        <label> Введите стоимость товара <span class="require">*</span></label>
                        <InputBox :value="data?.price?.toString()" @update="setField" :title="'Стоимость товара'"
                                  :field="'price'"/>
                    </template>
                    <template>
                        <label> Выберите категорию <span class="require">*</span></label>
                        <SelectBox :choosingId="data?.category_id" :placeholder="'Выберите категорию'"
                                   :field="'category_id'"
                                   :options="categories"
                                   @choosing="setCategory"/>
                    </template>
                    <template>
                        <label> Подкатегория товара <span class="require">*</span></label>
                        <SelectBox :choosingId="data?.sub_category_id" :placeholder="'Выберите подкатегорию'"
                                   :field="'sub_category_id'"
                                   :options="subcategories"
                                   @choosing="setSubcategory"/>
                    </template>
                </div>
                <div class="box-item">
                    <ImageBox
                        @updateImages="setField"
                        :image="data['images'] ? data['images'] : []"
                        :field="'file'"
                        :from="'product'"
                        :label="'Загрузите фотографии, которые будут отображаться в карточке товара'"
                        :btn-text="'Добавить фото(jpeg, png)'"/>
                </div>
                <div class="box-item filters" v-if="filtersAll.length">
                    <template v-for="(filter, i) in filtersAll" v-if="filtersAll.length">
                        <Chips @focused="setFocus" :index="i" @add="setFilters"
                               :focused="filter?.name" :slug="filter.slug"
                               :chips="data?.characteristics?.[filter?.slug]"/>
                    </template>
                </div>
                <div class="box-item">
                    <label>Описание <span class="require">*</span></label>
                    <Editor v-model="description" editorStyle="height: 320px"/>
                </div>
                <div class="box-item">
                    <CheckBox :state="data?.labels?.indexOf('hot') >= 0" :field="'hot'" :title="'Хит продажи'"
                              @update="setLabels"/>
                    <CheckBox :state="data?.labels?.indexOf('discount') >= 0" :field="'discount'"
                              :title="'Скидка на товар'"
                              @update="setLabels"/>
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
            <ButtonBox :design="['button','red','large','right']" @update="sendBoxData()" :title="btnText"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from 'vuex'
import Editor from "primevue/editor"
import ScrollPanel from "primevue/scrollpanel"

export default {
    name: "EditProducts",
    props: {
        btnText: {
            type: String
        },
        data: {
            type: Object
        },
        type: {
            type: String
        },
    },
    mounted() {
        if (this.data?.same_products_id) {
            this.$store.dispatch('getSameProducts', this.data?.same_products_id)
        }

        this.description += this.data?.description
        this.labels = this.data?.labels
        for (const item in this.data?.characteristics) {
            if (!this.options[item]) {
                this.$set(this.options, item, [])
            }

            this.options[item] = this.data?.characteristics[item]
        }
    },
    components: {
        Editor,
        ScrollPanel,
        Chips: () => import('@/components/Forms/Chips'),
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
            selectedCategory: {},
            selectedSubcategory: {},

            category: '',
            subCategory: '',
            labels: [],
            options: {}
        }
    },
    computed: {
        ...mapGetters([
            'fields',
            'categories',
            'subcategories',
            'filtersAll',
            'reletedProducts'
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
            this.options[this.focused] = inputData
        },
        setLabels(inputData) {
            if (!this.boxData.labels) {
                this.$set(this.boxData, 'labels', [])
            }

            if (!inputData.inputData) {
                const updatedArray = this.labels.filter(item => item !== inputData.field);
                this.labels = updatedArray
                this.boxData.labels = this.labels
            } else {
                this.boxData.labels.push(inputData.field)
            }
        },
        sendBoxData() {
            this.$set(this.boxData, 'description', this.description)
            this.$set(this.boxData, 'hidden', false)
            this.$set(this.boxData, '_id', this.data?._id)
            this.$set(this.boxData, 'characteristics', this.options)
            let sameProducts = []

            if (this.boxData.same_products_id) {
                for (const item in this.reletedProducts.ids) {
                    sameProducts.push(this.reletedProducts.ids[item]);
                }

                sameProducts = sameProducts.concat(this.boxData['same_products_id']);

                this.$set(this.boxData, 'same_products_id', sameProducts);
            }

            if (!this.boxData.file) {
                this.boxData.file = this.data?.images
            }

            this.$store.commit('setEditBox', false)
            this.$store.commit('setPage', 'default')
            this.$emit('save-changes', this.boxData)
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

.box-item.filters {
    gap: 15px;
}
</style>
