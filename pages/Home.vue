<template>
    <div class="filters" v-if="userAuth">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'home'" :cur-page="'Главный Слайдер'" :hide-page="'Слайдер о Компании'"/>
                <div class="box">
                    <div class="add-slide-container">
                        <div class="items" v-if="currentPage === 'default'">
                            <Card
                                v-if="Object.keys(mainSlider).length"
                                v-for="(mainSlide, n) in mainSlider" :key="n"
                                :type="'slide'"
                                :hide="false"
                                :description="mainSlide.description"
                                :title="mainSlide.title"
                                :image="mainSlide.image ? mainSlide.image : ''"
                                @remove="removeSlide(mainSlide._id, n)"
                                @edit="editSlide('main', mainSlide)"
                            />
                            <ImageBox
                                @updateImages="setField"
                                @add-slide="showSlideBox('main')"
                                @edit="editMainSlide"
                                :field="'slide'"
                                :btn-text="'Добавить слайд'"/>
                        </div>
                        <div class="items" v-if="currentPage === 'hide'">
                            <Card
                                v-if="Object.keys(aboutSlider).length"
                                v-for="(aboutSlide, n) in aboutSlider" :key="n"
                                :type="'slide'"
                                :hide="false"
                                @remove="removeSlide('about')"

                            />
                            <ImageBox
                                @add-slide="showSlideBox('about')"
                                @updateImages="setField"
                                :field="'slide'"
                                :btn-text="'Добавить слайд'"/>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <ModalBox v-if="sliderBox" :title="'Новый слайд'" @close="sliderBox = false">
            <template #modalContent>
                <AddSlide @add="addSlide" :slider="activeSlider"/>
            </template>
        </ModalBox>
        <ModalBox v-if="sliderBox" :title="'Новый слайд'" @close="sliderBox = false">
            <template #modalContent>
                <EditSlide @editMainSlide="editMainSlide" :slider="activeSlider" :data="currentSlide"/>
            </template>
        </ModalBox>
        <Toast/>
    </div>
    <PageNotFound v-else/>
</template>

<script>
import Toast from "primevue/toast"
import {mapGetters} from "vuex"

export default {
    name: "Home",
    components: {
        Toast,
        AddSlide: () => import('@/components/AddSlide'),
        EditSlide: () => import('@/components/EditSlide'),
        PageNotFound: () => import('@/pages/pageNotFound'),
        AddFilter: () => import('@/components/AddFilter'),
        ModalBox: () => import('@/components/Forms/ModalBox'),
        SideBar: () => import('@/components/SideBar'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import('@/components/Actions'),
        InputBox: () => import('~/components/Forms/InputBox'),
        ImageBox: () => import('@/components/Forms/ImageBox'),
        ButtonBox: () => import('@/components/Forms/ButtonBox')
    },
    data() {
        return {
            mainSliderBox: false,
            aboutSliderBox: false,
            boxData: {},
            sliderBox: false,
            activeSlider: '',
            currentSlide: {}
        }
    },
    computed: {
        ...mapGetters(['mainSlider', 'aboutSlider', 'init', 'userAuth', 'showAddBox', 'currentPage', 'firstSliderData', 'errorMessage'])
    },
    methods: {
        setField(inputData) {
            this.$set(this.boxData, inputData.field, inputData.inputData)
        },
        addSlide(data) {
            if (this.activeSlider === 'main') {
                this.$store.dispatch('addMainSlider', data)
            } else {
                this.$store.dispatch('addAboutSlider', data)
            }
        },
        removeSlide(id, item) {
            this.$store.dispatch('removeMainSlider', {
                _id: id,
                item: item
            })
        },
        editSlide(type, slide) {
            this.activeSlider = type
            this.$set(this, 'sliderBox', !this.sliderBox)
            this.currentSlide = slide

        },
        showSlideBox(type) {
            this.activeSlider = type
            this.$set(this, 'sliderBox', !this.sliderBox)
        },
        editMainSlide(data) {
            this.$store.dispatch('editMainSlider', data)
            this.$set(this, 'sliderBox', !this.sliderBox)
        }
    },
}
</script>

<style scoped>
.add-slide-container .items {
    display: flex;
    flex-direction: column;
    gap: 10px;
    object-fit: contain;
}

.add-slide-container .card {
    height: 250px;
    min-height: 250px;
    padding: 0;
}
</style>
