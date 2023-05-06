<template>
    <div class="hidden-box">
        <template v-for="(item, i) in data">
            <Card v-if="item.hidden"
                  :type="page"
                  :title="item.name"
                  :price="item.price"
                  :description="item.description"
                  :image="item.image"
                  :discount="item.discount"
                  :hot="item.hot"
                  :isHidden="item.hidden"
                  @remove="remove(item._id, i)"
                  @hide="hide(item)"
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
        },
        data: {
            type: Object
        }
    },
    components: {
        Card: () => import("@/components/Card")
    },
    computed: {
        ...mapGetters(['pageData'])
    },
    methods: {
        remove(id, item) {
            this.$store.dispatch(`remove${this.page}`, {
                item: item,
                _id: id
            })
        },
        hide(product) {
            product.hidden = !product.hidden
            this.$store.dispatch(`update${this.page}`, {
                _id: product._id,
                hidden: product.hidden
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
