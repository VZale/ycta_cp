<template>
    <div class="image-box">
        <div class="top" v-if="label">
            <label>{{ label }} <span class="require">*</span></label>
            <CheckBox :title="'Использовать заглушку'" v-if="checkbox && field !== 'slide'"/>
        </div>
        <div class="images-container">
            <template v-for="(item, index) in field === 'relatedProducts' ? reletedProducts : images">
                <div class="item">
                    <img :src="getPath(item)" alt="">
                    <span class="material-icons close" @click="remove(index)">close</span>
                </div>
            </template>
            <div class="item" @click="add">
                <span class="material-icons">add_circle</span>
                <p>{{ btnText }}</p>
                <input type="file" @change="addImage" v-if="field === 'file'">
            </div>
        </div>
        <template v-if="field !== 'slide'">
            <ModalBox v-if="showProductListModal" :grid="true" :title="'Выберите сопутствующие товары'"
                      @close="showProductListModal = false">
                <template #modalContent>
                    <ProductsList/>
                </template>
                <template #button>
                    <ButtonBox @update="showSelectedProducts()" :design="['button','red','large','right']"
                               :title="'Добавить товары'"/>
                </template>
            </ModalBox>
        </template>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    props: {
        label: {
            type: String
        },
        field: {
            type: String
        },
        checkbox: {
            type: Boolean,
            default: true
        },
        btnText: {
            type: String
        },
        image: {
            type: [Array, String]
        }
    },
    mounted() {
        if (this.image) {
            this.images.push(this.image)
            this.file.push(this.file)
        }

        if (!this.images[0]?.length) {
            this.images = []
            this.file = []
        }
    },
    name: "ImageBox",
    components: {
        ProductsList: () => import('@/components/ProductsList'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        Card: () => import("@/components/Card"),
        ModalBox: () => import('@/components/Forms/ModalBox'),
        CheckBox: () => import('@/components/Forms/CheckBox')
    },
    data() {
        return {
            file: [],
            images: [],
            showProductListModal: false,
        }
    },
    computed: {
        ...mapGetters(['reletedProducts', 'chosenProducts', 'pageData', 'products']),
    },
    methods: {
        getPath(item) {
            const regex = /\.(png|jpe?g)$/i;
            if (regex.test(item)) {
                return 'https://api.kirpichkrasnodar.ru/file/download/' + item
            }

            if (this.field === 'file') {
                return item
            }

            return 'https://api.kirpichkrasnodar.ru/file/download/' + item
        },
        sendImageArray() {
            let field = {
                field: this.field,
                inputData: this.file
            }

            this.$emit('updateImages', field)
        },
        addImage(event) {
            const file = event.target.files[0]
            const reader = new FileReader()
            reader.readAsDataURL(file)
            reader.onload = () => {
                this.images.push(reader.result)
                this.file.push(file)
            }
            this.sendImageArray()
        },
        remove(index) {
            if (this.field === 'file') {
                this['file'].splice(index, 1)
                this['images'].splice(index, 1)
            } else {
                this.$store.commit('removeReletedProducts', index)
            }
        },
        add() {
            if (this.field === 'file') {
                return
            }

            if (this.field === 'slide') {
                this.$emit('add-slide', this.field)
                return
            }

            this.showProductListModal = true
        },
        showSelectedProducts() {
            let images = Object.values(this.chosenProducts).map(el => el.data.images[0]);
            let ids = Object.values(this.chosenProducts).map(el => el.data._id);
            this.$store.commit('setReletedProducts', images)
            this.$store.commit('clearChosenProducts')

            this.showProductListModal = false

            let field = {
                field: 'same_products_id',
                inputData: ids
            }

            this.$emit('updateImages', field)
        }
    }
}
</script>

<style scoped>

.top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
    margin-bottom: 20px;
}

.images-container {
    display: flex;
    flex-wrap: wrap;
    gap: 10px;
    object-fit: contain;
}

.images-container .item {
    height: 150px;
    width: 200px;
    position: relative;
    border-radius: 12px;
    border: 2px solid var(--gray-2);
    overflow: hidden;
}

.images-container .item:last-child {
    cursor: pointer;
    display: inline-flex;
    flex-direction: column;
    text-align: center;
    align-items: center;
    justify-content: center;
    border: 5px dashed var(--gray-2);
    color: var(--gray-4);
    padding: 0 10px;
}

.images-container .item img {
    width: 100%;
    height: 100%;
    object-fit: contain;
}

.images-container input {
    opacity: 0;
    width: 100%;
    height: 100%;
    position: absolute;
    cursor: pointer;
}

.close {
    position: absolute;
    top: 10px;
    right: 5px;
    color: var(--white);
    background-color: var(--black);
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 5px;
    font-size: 16px;
    font-weight: bold;
    border-radius: 100%;
    cursor: pointer;
}

</style>
