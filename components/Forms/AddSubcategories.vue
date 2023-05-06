<template>
    <div class="add-box">
        <div class="add-box-container">
            <div class="box-item">
                <template v-if="field" v-for="(field, i) in fields.subcategoryFields.baseFields">
                    <label>{{ field.label }} <span class="require">*</span></label>
                    <InputBox v-if="!field.isSelect" @update="setField" :title="field.placeholder" :field="i"/>
                    <template v-if="field.isSelect">
                        <SelectBox :placeholder="field.label" :field="i" :options="categories" @choosing="setField"/>
                    </template>
                </template>
            </div>
            <div class="box-item">
                <label>Описание <span class="require">*</span></label>
                <textarea :placeholder="'Заголовок'" v-model="description"></textarea>
            </div>
        </div>
        <div class="box-item button-content">
            <ButtonBox :design="['button','red','large','right']" @update="sendBoxData()" :title="btnTitle"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "AddSubcategories",
    mounted() {
        if (this.page === 'product') {
            this.$store.dispatch('getAllFilter')
        }

        if (!this.initPages['categories']) {
            this.$store.dispatch('getCategories')
        }

        if (!this.initPages['subcategories']) {
            this.$store.dispatch('getSubcategories')
        }
    },
    props: {
        btnTitle: {
            type: String
        },
    },
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        SelectBox: () => import('@/components/Forms/SelectBox'),
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
            'initPages',
            'filtersAll'
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
