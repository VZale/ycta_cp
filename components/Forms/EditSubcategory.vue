<template>
    <div class="add-box">
        <div class="add-box-container">
            <div class="box-item">
                <template>
                    <label> Введите название категории <span class="require">*</span></label>
                    <InputBox :value="data.name" @update="setField" :title="'Название подкатегории'" :field="'name'"/>
                </template>
                <template>
                    <label> Выберите в какой категории будет находиться эта подкатегория <span class="require">*</span></label>
                    <SelectBox :choosing-id="data.category_id" :placeholder="'Выберите категорию'"
                               :field="'category_id'"
                               :options="categories"
                               @choosing="setField"/>
                </template>
            </div>
            <div class="box-item">
                <label>Описание <span class="require">*</span></label>
                <textarea :placeholder="'Заголовок'" v-model="description"></textarea>
            </div>
        </div>
        <div class="box-item button-content">
            <ButtonBox @click="sendBoxData" :design="['button','red','large','right']" @update="sendBoxData()"
                       :title="btnText"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "EditSubcategory",
    mounted() {
        this.$store.dispatch('getAllFilter')
        this.$store.dispatch('getCategories')
        this.$store.dispatch('getSubcategories')
        this.description += this.data['description']
    },
    props: {
        data: {
            type: Object
        },
        type: {
            type: String
        },
        btnText: {
            type: String
        }
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
        ]),
    },
    methods: {
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
            this.$set(this.boxData, 'newData', true)
        },
        sendBoxData() {
            this.$set(this.boxData, 'description', this.description)
            this.$set(this.boxData, '_id', this.data._id)
            this.$set(this.boxData, 'hidden', false)

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
