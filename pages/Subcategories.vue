<template>
    <div class="subcategories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true" :add-title="'Новая подкатегория'"
                        @add="showAddBox = true" @turn-back="showAddBox = false" @change-page="changePage"/>
                <Content class="view" :page="'subcategories'" v-if="!showAddBox && currentPage === 'default'"/>
                <AddBox :avaliable-image-box="false" :page="'subcategory'" v-if="showAddBox" @add="addSubcategory" :btn-title="'Добавить подкатегорию'"/>
                <HiddenBox class="view" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Subcategories",
    components: {
        SideBar: () => import('@/components/SideBar'),
        Content: () => import('@/components/Content'),
        AddBox: () => import('~/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox')
    },
    data() {
        return {
            showAddBox: false,
            currentPage: 'default'
        }
    },
    methods: {
        addSubcategory(categoryData) {
            console.log('subcategoryData', categoryData)
        },
        changePage(page) {
            this.currentPage = page
        }
    }
}
</script>

<style scoped>

</style>
