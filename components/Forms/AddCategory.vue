<template>
    <div class="add-box">
        <div class="add-box-container">
            <ScrollPanel style="width: 100%; height: 650px">

                <div class="box-item">
                    <template v-if="field" v-for="(field, i) in fields.categoryFields.baseFields">
                        <label>{{ field.label }} <span class="require">*</span></label>
                        <InputBox v-if="!field.isSelect" @update="setField" :title="field.placeholder" :field="i"/>
                    </template>
                </div>
                <div class="box-item">
                    <ImageBox
                        @updateImages="setField"
                        :field="'file'"
                        :label="'Загрузите фотографии, которые будут отображаться в карточке товара'"
                        :btn-text="'Добавить фото(jpeg, png)'"/>
                </div>
                <div class="box-item">
                    <label>Описание <span class="require">*</span></label>
                    <Editor v-model="description" editorStyle="height: 320px"/>
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
import Editor from 'primevue/editor';
import ScrollPanel from "primevue/scrollpanel";

export default {
    name: "AddCategory",
    props: {
        btnTitle: {
            type: String
        }
    },
    components: {
        Editor,
        ScrollPanel,
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
            'initPages',
        ])
    },
    methods: {
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
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
