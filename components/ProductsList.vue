<template>
    <div class="products-list" v-if="Object.keys(pageData['products']).length">
        <template v-for="product in pageData['products']">
            <Card v-if="!product.hidden"
                  :type="'product'"
                  :title="product.name"
                  :price="product.price"
                  :description="product.description"
                  :image="product.file ? product?.file[0] : ''"
                  :discount="product.discount"
                  :hot="product.hot"
                  :id="product._id"
                  :isHidden="product.hidden"
                  :related-products="true"
                  @remove="remove(product.id)"
                  @hide="hide(product)"
            />
        </template>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "ProductsList",
    components: {
        Card: () => import("@/components/Card")
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
.products-list {
    padding: 24px;
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(320px, 1fr) );
    grid-template-rows: max-content;
    gap: 12px;
}
</style>
