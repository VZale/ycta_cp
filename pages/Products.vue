<template>
    <div class="products">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'products'" :cur-page="'Товары'" :hide-page="'Скрытые товары'"
                        :btn-text="'Новый товар'" :dynamic-header-content="true" :add-title="'Новый товар'"
                />

                <div class="box" v-if="!showAddBox && !showEditBox && currentPage !== 'hide'">
                    <ScrollPanel style="width: 100%; height: 700px">
                        <template v-if="Object.keys(products).length">
                            <div class="cards">
                                <template v-for="(product, i) in products">
                                    <Card v-if="!product.hidden"
                                          :type="'product'"
                                          :title="product.name"
                                          :price="product.price"
                                          :description="product.description"
                                          :image="product.images ? product.images[0] : ''"
                                          :labels="product.labels"
                                          :isHidden="product.hidden"
                                          @remove="remove(product._id, i)"
                                          @hide="hide(product)"
                                          @edit="edit(product)"

                                    />
                                </template>
                            </div>
                        </template>
                        <WarningMessage v-else :warning-message="'Начните добавлять товары и они появятся здесь'"/>
                    </ScrollPanel>
                </div>
                <AddProduct v-if="showAddBox" @add="addProduct" :btn-title="'Добавить товар'"/>
                <HiddenBox class="box" :page="'products'" v-if="currentPage === 'hide'"/>
                <EditProducts v-if="showEditBox" @save-changes="saveProduct" :data="currentProduct" :type="'product'"
                              :btnText="'Сохранить'"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"
import ScrollPanel from 'primevue/scrollpanel';

export default {
    name: "Products",
    components: {
        ScrollPanel,
        EditProducts: () => import('@/components/Forms/EditProducts'),
        SideBar: () => import('@/components/SideBar'),
        AddProduct: () => import('@/components/Forms/AddProduct'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    data() {
        return {
            currentProduct: [],
        }
    },
    computed: {
        ...mapGetters(['products', 'showAddBox', 'currentPage', 'initPages', 'showEditBox'])
    },
    methods: {
        addProduct(productData) {
            if (productData.same_products_id?.length) {
                const {same_products_id, ...data} = productData;
                this.$store.dispatch('addSameproducts', {
                    sameproduct: {
                        products: same_products_id,
                        hidden: false
                    },
                    data: data
                })
                return
            }
            this.$store.dispatch('addProduct', productData)
        },
        remove(id, item) {
            this.$store.dispatch('removeProduct', {
                _id: id,
                item: item
            })
        },
        hide(product) {
            this.$store.commit('hidePageData', {
                page: 'products',
                data: product
            })
        },
        saveProduct(data) {
            this.$store.dispatch('editProduct', data)
            this.$store.commit('setEditBox', false)
        },
        edit(product) {
            this.$store.commit('clearReletedProducts')
            this.currentProduct = product
            this.$store.commit('setEditBox', true)
        }
    }
}
</script>

<style scoped>

</style>
