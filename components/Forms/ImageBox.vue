<template>
    <div class="image-box">
        <div class="top">
            <label>{{ label }} <span class="require">*</span></label>
            <CheckBox :title="'Использовать заглушку'" v-if="checkbox"/>
        </div>
        <div class="images-container">
            <div v-for="(image, index) in field === 'relatedProducts' ? relatedProducts : images" :key="index"
                 class="item">
                <img :src="image" alt="">
                <span class="material-icons close" @click="remove(index)">close</span>
            </div>
            <div class="item" @click="addProduct">
                <span class="material-icons">add_circle</span>
                <p>{{ btnText }}</p>
                <input type="file" @change="addImage" v-if="field === 'file'">
            </div>
        </div>
        <ModalBox v-if="showProductListModal" :grid="true" :title="'Выберите сопутствующие товары'"
                  @close="showProductListModal = false">
            <template #modalContent>
                <ProductsList/>
            </template>
            <template #button>
                <ButtonBox @update="showSelectedProducts()" :design="['button','red','large','right']"
                           :title="'Добавить товары'" slot="button"/>
            </template>
        </ModalBox>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    components: {
        ProductsList: () => import('@/components/ProductsList'),
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
        Card: () => import("@/components/Card"),
        ModalBox: () => import('@/components/Forms/ModalBox'),
        CheckBox: () => import('@/components/Forms/CheckBox')
    },
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
        }
    },
    name: "ImageBox",
    data() {
        return {
            file: [],
            images: [],
            showProductListModal: false
        }
    },
    computed: {
        ...mapGetters(['reletedProducts', 'chosenProducts','pageData'])
    },
    methods: {
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
            this.field === 'file' ? this[this.field].splice(index, 1) : this.$store.commit('removeReletedProducts', index)
        },
        addProduct() {
            if (this.field === 'file') {
                return
            }

            this.showProductListModal = true
        },
        showSelectedProducts() {
            let images = Object.values(this.pageData['products']).map(el => el.file[0]);
            this.$store.commit('setReletedProducts', images)

            this.$store.commit('clearChosenProducts')
            this.showProductListModal = false
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
