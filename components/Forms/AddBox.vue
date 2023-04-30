<template>
    <div class="add-box">
        <div class="add-box-container">
            <div class="box-item">
                <template v-for="(field, i) in fields[this.page + 'Fields'].baseFields">
                    <label>{{ field.label }} <span class="require">*</span></label>
                    <InputBox v-if="!field.isSelect" @update="setField" :title="field.placeholder" :field="i"/>
                    <template v-if="field.isSelect">
                        <SelectBox :placeholder="field.label" :field="i" :options="pageData[i]" @choosing="setField"/>
                    </template>
                </template>
            </div>
            <div class="box-item" v-if="avaliableImageBox">
                <ImageBox
                    @updateImages="setField"
                    :field="'file'"
                    :label="'Загрузите фотографии, которые будут отображаться в карточке товара'"
                    :btn-text="'Добавить фото(jpeg, png)'"/>
            </div>
            <div class="box-item" v-if="fields[this.page + 'Fields'].filterList && Object.keys(fields[this.page + 'Fields'].filterList).length">
                <template v-for="(filter, i) in fields[this.page + 'Fields']?.filterList">
                    <InputBox @update="setField" :title="filter" :field="i"/>
                </template>
            </div>
            <div class="box-item">
                <label>Описание <span class="require">*</span></label>
                <textarea :placeholder="'Заголовок'" v-model="description"></textarea>
            </div>
            <div class="box-item" v-if="fields[this.page + 'Fields'].labels">
                <template v-for="(label, i) in fields[this.page + 'Fields']?.labels">
                    <CheckBox :field="i" :title="label.title" @update="setField"/>
                </template>
            </div>
            <div class="box-item" v-if="fields[this.page + 'Fields'].relatedProducts">
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
    name: "AddBox",
    mounted() {
        if (!this.initPages['categories']) {
            this.$store.dispatch('getCategories')
        }

        if (!this.initPages['subcategories']) {
            this.$store.dispatch('getSubcategories')
        }
    },
    props: {
        avaliableImageBox: {
            type: Boolean,
            default: true
        },
        btnTitle: {
            type: String
        },
        page: {
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
            'pageData',
            'initPages'
        ])
    },
    methods: {
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },

        sendBoxData() {
            this.$set(this.boxData, 'description', this.description)
            this.$set(this.boxData, '_id', Date.now())
            this.$set(this.boxData, 'hidden', false)

            this.$store.commit('setShowBox', false)
            this.$store.commit('setPage', 'default')

            console.log('box', this.boxData)

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
