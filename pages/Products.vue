<template>
    <div class="categories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'products'" :cur-page="'Товары'" :hide-page="'Скрытые товары'"
                        :btn-text="'Новый товар'" :dynamic-header-content="true" :add-title="'Новый товар'"
                        @add="showAddBox = true" @turn-back="showAddBox = false" @change-page="changePage"/>
                <Content class="view" :page="'products'" v-if="!showAddBox && currentPage === 'default'"/>
                <AddBox :page="'product'" v-if="showAddBox" @add="addProduct" :btn-title="'Добавить товар'"/>
                <HiddenBox class="view" :page="'products'" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Products",
    components: {
        SideBar: () => import('@/components/SideBar'),
        Content: () => import('@/components/Content'),
        AddBox: () => import('@/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox')
    },
    data() {
        return {
            showAddBox: false,
            currentPage: 'default'
        }
    },
    methods: {
        addProduct(productData) {
           this.$store.commit('setPageData', {
               data: productData,
               page: 'products'
           })
        },
        changePage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style scoped>

</style>
