<template>
    <div class="filters" v-if="userAuth">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'home'" :cur-page="'Главный Слайдер'" :hide-page="'Слайдер о Компании'"/>
                <div class="box">
                    <div class="add-slide-container">
                        <div class="items" v-if="currentPage === 'default'">
                            <draggable v-model="localMainSlider" @change="setPosition">
                                <Card
                                    v-if="Object.keys(localMainSlider).length"
                                    v-for="(mainSlide, n) in localMainSlider" :key="n"
                                    :type="'slide'"
                                    :hide="false"
                                    :description="mainSlide.description"
                                    :title="mainSlide.title"
                                    :image="mainSlide.image ? mainSlide.image : ''"
                                    @remove="removeSlide(mainSlide._id, n)"
                                    @edit="editSlide('main', mainSlide)"
                                >
                                    <div class="drag-handle">Drag Handle</div>
                                </Card>
                            </draggable>
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
                                @remove="removeAboutSlider(aboutSlide._id, n)"
                                @edit="editSlide('about', aboutSlide)"

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
        <ModalBox v-if="sliderAddBox" :title="'Новый слайд'" @close="sliderAddBox = false">
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
import draggable from 'vuedraggable'

export default {
    name: "Home",
    components: {
        Toast,
        draggable,
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
    mounted() {
        this.localMainSlider = Object.values(this.mainSlider).sort((a, b) => a.position - b.position)
    },
    data() {
        return {
            mainSliderBox: false,
            aboutSliderBox: false,
            boxData: {},
            sliderBox: false,
            sliderAddBox: false,
            activeSlider: '',
            currentSlide: {},
            list: [
                {id: 1, text: 'Item 1'},
                {id: 2, text: 'Item 2'},
                {id: 3, text: 'Item 3'}
            ],
            localMainSlider: []
        }
    },
    computed: {
        ...mapGetters(['mainSlider', 'aboutSlider', 'init', 'userAuth', 'showAddBox', 'currentPage', 'firstSliderData', 'errorMessage']),
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
            this.$set(this, 'sliderAddBox', !this.sliderAddBox)
        },
        removeSlide(id, item) {
            this.$store.dispatch('removeMainSlider', {
                _id: id,
                item: item
            })
        },
        removeAboutSlider(id, item){
            this.$store.dispatch('removeAboutSlider', {
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
            this.$set(this, 'sliderAddBox', !this.sliderAddBox)
        },
        editMainSlide(data) {
            this.$store.dispatch('editMainSlider', data)
            this.$set(this, 'sliderBox', !this.sliderBox)
        },
        setPosition(data) {
            const {moved} = data
            const {newIndex, element} = moved

            let nextSlidePosition = this.localMainSlider[newIndex + 1].position + 1
            let nextSlideId = this.localMainSlider[newIndex + 1]._id
            this.$store.dispatch('editMainSlider', {position: newIndex, _id: element._id});
            this.$store.dispatch('editMainSlider', {position: nextSlidePosition, _id: nextSlideId});
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

.slide {
    margin-bottom: 20px;
}
</style>
