<template>
    <div class="add-filter">
        <InputBox @update="setField" :title="'Название фильтра'" :field="'title'"/>
        <label>Введите один или более пунктов фильтрации</label>
        <textarea :placeholder="'Пункты фильтрации      '"></textarea>
        <div class="add-button">
            <ButtonBox :design="['button','red','large','right']" :title="'Добавить фильтр'"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "AddFilter",
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    data() {
        return {
            filterData: {}
        }
    },
    methods: {
        setField(inputData) {
            this.$set(this.filterData, inputData.field, inputData.inputData)
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
</style>
