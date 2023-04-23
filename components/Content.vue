<template>
    <div class="view-content">
        <FilterView v-if="page === 'filters'"/>
        <CategoriesView v-if="page === 'categories'"/>
        <SubcategoriesView v-if="page === 'subcategories'"/>
        <ProductsView v-if="page === 'products'"/>
    </div>
</template>

<script>

export default {
    components: {
        SubcategoriesView: () => import('@/components/ViewsContent/SubcategoriesView'),
        ProductsView: () => import('@/components/ViewsContent/ProductsView'),
        FilterView: () => import('@/components/ViewsContent/FilterView'),
        CategoriesView: () => import('@/components/ViewsContent/CategoriesView')
    },
    props: {
        page: {
            type: String
        }
    },
    name: "Content"
}
</script>

<style scoped>
.view-content {
    padding: 24px;
    /*height: 850px;*/
    overflow: auto;
}
</style>
