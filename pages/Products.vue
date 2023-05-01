<template>
    <div class="products">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'products'" :cur-page="'Товары'" :hide-page="'Скрытые товары'"
                        :btn-text="'Новый товар'" :dynamic-header-content="true" :add-title="'Новый товар'"
                />
                <div class="box" v-if="!showAddBox && currentPage !== 'hide'">
                    <template v-if="Object.keys(pageData?.['products']).length">
                        <div class="cards">
                            <template v-for="product in pageData?.['products']">
                                <Card v-if="!product.hidden"
                                      :type="'product'"
                                      :title="product.name"
                                      :price="product.price"
                                      :description="product.description"
                                      :image="product.images ? product?.images[0] : ''"
                                      :discount="product.discount"
                                      :hot="product.hot"
                                      :isHidden="product.hidden"
                                      @remove="remove(product._id)"
                                      @hide="hide(product)"
                                />
                            </template>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять товары и они появятся здесь'"/>
                </div>
                <AddBox :page="'product'" v-if="showAddBox" @add="addProduct" :btn-title="'Добавить товар'"/>
                <HiddenBox class="box" :page="'products'" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Products",
    mounted() {
        if (!this.initPages['products']) {
            // this.$store.dispatch('getProducts')
        }
    },
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('@/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    computed: {
        ...mapGetters(['pageData', 'showAddBox', 'currentPage','initPages'])
    },
    methods: {
        addProduct(productData) {
            this.$store.commit('setPageData', {
                data: productData,
                page: 'products'
            })
        },
        remove(id) {
            this.$store.commit('removePageData', {
                page: 'products',
                id: id
            })
        },
        hide(product) {
            this.$store.commit('hidePageData', {
                page: 'products',
                data: product
            })
        }
    }
}
</script>

<style scoped>

</style>
