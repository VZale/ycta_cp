<template>
    <div class="subcategories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true" :add-title="'Новая подкатегория'"
                        @add="showAddBox = true" @turn-back="showAddBox = false" @change-page="changePage"/>
                <div class="box" v-if="!showAddBox">
                    <template v-if="false">
                        <div class="cards">

                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять подкатегории и они появятся здесь'"/>
                </div>
                <AddBox :avaliable-image-box="false" :page="'subcategory'" v-if="showAddBox" @add="addSubcategory" :btn-title="'Добавить подкатегорию'"/>
                <HiddenBox class="box" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "Subcategories",
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('~/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage')
    },
    data() {
        return {
            showAddBox: false,
            currentPage: 'default'
        }
    },
    methods: {
        addSubcategory(categoryData) {
            this.showAddBox = false
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
