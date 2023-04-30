<template>
    <div class="hidden-box">
        <template v-for="product in pageData?.[page]">
            <Card v-if="product.hidden"
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

<script>
import {mapGetters} from "vuex"

export default {
    name: "HiddenBox",
    props: {
        page: {
            type: String
        }
    },
    components: {
        Card: () => import("@/components/Card")
    },
    computed: {
        ...mapGetters(['pageData'])
    },
    methods: {
        remove(id) {
            this.$store.dispatch('removeCategory', {
                page: this.page,
                _id: id
            })
        },
        hide(product) {
            product.hidden = !product.hidden
            this.$store.dispatch('updateCategory', {
                page: this.page,
                data: product
            })
        }
    }
}
</script>

<style scoped>
.hidden-box {
    padding: 24px;
    display: grid;
    grid-template-columns: repeat( auto-fill, minmax(280px, 1fr) );
    grid-template-rows: max-content;
    gap: 12px;
}
</style>
