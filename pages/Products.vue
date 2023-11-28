<template>
    <div class="products" v-if="userAuth">
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
                                <div class="end" ref="end"></div>
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
        <Toast/>
    </div>
    <PageNotFound v-else/>
</template>

<script>
import {mapGetters} from "vuex"
import ScrollPanel from 'primevue/scrollpanel';
import PageNotFound from "@/pages/pageNotFound";
import Toast from 'primevue/toast';


export default {
    name: "Products",
    mounted() {
        const intersectionObserver = new IntersectionObserver(entries => {
            if (entries[0]?.isIntersecting && !this.isLoading) {
                this.loadMore()
            }
        }, {
            threshold: 1.0
        })
        if (this.$refs.end) {
            intersectionObserver.observe(this.$refs.end)
        }
    },
    components: {
        PageNotFound,
        ScrollPanel,
        Toast,
        EditProducts: () => import('@/components/Forms/EditProducts'),
        SideBar: () => import('@/components/SideBar'),
        AddProduct: () => import('@/components/Forms/AddProduct'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    data() {
        return {
            isLoading: false,
            pagesShown: 1,
            offset: 1,
            limit: 18,
            currentProduct: {}
        }
    },
    computed: {
        ...mapGetters(['errorMessage','userAuth', 'products', 'showAddBox', 'currentPage', 'initPages', 'showEditBox'])
    },
    methods: {
        loadMore() {
            this.isLoading = false
            ++this.pagesShown
            this.$store.dispatch(`getProducts`, {
                offset: this.pagesShown,
            })
        },
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
            let productState = product.hidden
            this.$store.dispatch('editProduct', {
                hidden: !productState,
                _id: product._id
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
    },
    watch: {
        deep: true,
        errorMessage(val) {
            if (val) {
                this.$toast.add({severity: 'error', summary: 'Error Message', detail: `${val}`, life: 3000})
            }
        }
    }
}
</script>

<style scoped>
.p-chips {
    display: grid;
    width: 100%;
    min-height: 60px;
    border: none;
    outline: none;
    background-color: transparent;
    color: var(--black);
    position: relative;
    z-index: 3;
    font-size: 18px;
    font-weight: 400;
}

.p-chips-input-token {
    background: var(--gray-1);
}
</style>
