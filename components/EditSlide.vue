<template>
    <div class="edit-slide">
        <InputBox @update="setField" :value="data.position" :title="'Позиция Слайдера'" :field="'position'"/>
        <InputBox @update="setField" :value="data.title" :title="'Заголовок Слайда'" :field="'title'"/>
        <InputBox @update="setField" :value="data.description" :title="'Короткое Описание'" :field="'description'"/>
        <ImageBox
            @updateImages="setField"
            :image="data['image']"
            :field="'file'"
            :label="`Загрузите фотографи${slider === 'main' ? 'ю' : 'и'}, котор${slider === 'main' ? 'ая' : 'ые'} будут отображаться в слайдере`"
            :btn-text="'Добавить фото(jpeg, png)'"/>
        <div class="edit-button">
            <ButtonBox @update="sendBoxData()" :design="['button','red','large','right']" :title="'Сохранить'"/>
        </div>
    </div>
</template>

<script>
export default {
    name: "EditSlide",
    props: ['slider','data'],
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        ImageBox: () => import('@/components/Forms/ImageBox')
    },
    mounted() {
        this.description += this.data.description
        this.title += this.data.title
    },
    data() {
        return {
            boxData: {},
            description: '',
            title: ''
        }
    },
    methods: {
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },
        sendBoxData() {
            this.$set(this.boxData, '_id', this.data._id)

            this.$emit('editMainSlide', this.boxData)
        }
    }
}
</script>

<style scoped>
.edit-slide {
    margin-top: 28px;
}

.edit-button {
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
