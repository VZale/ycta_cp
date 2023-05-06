<template>
    <div class="products-list" v-if="Object.keys(products).length">
        <template v-for="(product, i) in products">
            <Card v-if="!product.hidden"
                  :id="product"
                  :type="'product'"
                  :title="product.name"
                  :price="product.price"
                  :description="product.description"
                  :image="product.images ? product.images[0] : ''"
                  :labels="product.labels"
                  :related-products="true"
                  :isHidden="product.hidden"
                  @remove="remove(product._id, i)"
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
        ...mapGetters(['products'])
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
