<template>
    <div class="add-slide">
        <InputBox v-if="slider === 'main'" :readonly="true" :value="position" @update="setField"
                  :title="'Посиция Слайда'" :field="'position'"/>
        <InputBox v-if="slider === 'main'" @update="setField" :title="'Заголовок Слайда'" :field="'title'"/>
        <InputBox v-if="slider === 'main'" @update="setField" :title="'Короткое Описание'" :field="'description'"/>
        <ImageBox
            @updateImages="setField"
            :field="'file'"
            :label="`Загрузите фотографи${slider === 'main' ? 'ю' : 'и'}, котор${slider === 'main' ? 'ая' : 'ые'} будут отображаться в слайдере`"
            :btn-text="'Добавить фото(jpeg, png)'"/>
        <div class="add-button">
            <ButtonBox @update="sendBoxData()" :design="['button','red','large','right']" :title="'Добавить Слайд'"/>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "AddSlide",
    props: ['slider'],
    mounted() {
        if (this.slider === 'main') {
            this.slideData.position = this.position
        }
    },
    components: {
        InputBox: () => import('~/components/Forms/InputBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        ImageBox: () => import('@/components/Forms/ImageBox')
    },
    data() {
        return {
            slideData: {},
        }
    },
    methods: {
        setField(inputData) {
            this.$set(this.slideData, inputData.field, inputData.inputData)
        },
        sendBoxData() {
            this.$emit('add', this.slideData)
        }
    },
    computed: {
        ...mapGetters(['mainSlider']),
        position() {
            let maxPosition = Number.NEGATIVE_INFINITY
            for (const key in this.mainSlider) {
                if (this.mainSlider.hasOwnProperty(key) && this.mainSlider[key].hasOwnProperty('position')) {
                    const currentPosition = this.mainSlider[key].position
                    if (currentPosition > maxPosition) {
                        maxPosition = currentPosition
                    }
                }
            }
            return (maxPosition + 1).toString()
        }
    }
}
</script>

<style scoped>
.add-slide {
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
    min-height: 60px;
    padding: 14px;
}

textarea::placeholder {
    font-family: 'Inter', sans-serif;
    font-size: 18px;
    font-weight: 400;
    vertical-align: center;
}
</style>
