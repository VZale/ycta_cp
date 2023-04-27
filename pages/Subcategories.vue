<template>
    <div class="subcategories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true" :add-title="'Новая подкатегория'"
                        />
                <div class="box view" :class="{'filters-not-added': !Object.keys(pageData).length}">
                    <div class="item main-item" v-if="Object.keys(pageData).length">
                        <h2 class="subtitle">Название фильтра</h2>
                        <h2 class="subtitle">Пункты фильтрации</h2>
                    </div>
                    <template v-if="Object.keys(pageData).length">
                        <div class="item" v-for="(filterItem, i) in pageData" :key="i">
                            <h2 class="subtitle">{{ filterItem.title }}</h2>
<!--                            <h2 class="subtitle">{{ filterItem.value.join(', ') }}</h2>-->
                            <Actions :item="i"/>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                </div>
                <AddBox :avaliable-image-box="false" :page="'subcategory'" v-if="showAddBox" @add="addSubcategory" :btn-title="'Добавить подкатегорию'"/>
                <HiddenBox class="box" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "Subcategories",
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('~/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage')
    },
    computed: {
        ...mapGetters(['showAddBox','currentPage','pageData'])
    },
    methods: {
        addSubcategory(categoryData) {
            console.log('subcategoryData', categoryData)
        },
    },
}
</script>

<style scoped>

</style>
