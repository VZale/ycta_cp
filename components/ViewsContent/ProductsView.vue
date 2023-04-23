<template>
    <div class="box">
        <template v-if="Object.keys(pageData?.['products']).length">
            <div class="cards">
                <template v-for="product in pageData?.['products']">
                    <Card v-if="!product.isHidden"
                          :type="'product'"
                          :title="product.title"
                          :price="product.price"
                          :description="product.description"
                          :image="product.images ? product?.images[0] : ''"
                          :discount="product.discount"
                          :hot="product.hot"
                          :isHidden="product.isHidden"
                          @remove="remove(product.id)"
                          @hide="hide(product)"
                    />
                </template>
            </div>
        </template>
        <WarningMessage v-else :warning-message="'Начните добавлять товары и они появятся здесь'"/>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "ProductsView",
    components: {
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import("@/components/Actions"),
        Card: () => import("@/components/Card")
    },
    data() {
        return {}
    },
    computed: {
        ...mapGetters(['pageData'])
    },
    methods: {
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
.box {
    width: 100%;
    height: 100%;
}

.cards {
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(280px, 1fr) );
    grid-template-rows: max-content;
    gap: 12px;
}

</style>
