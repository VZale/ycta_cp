<template>
    <div class="subcategories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'subcategories'" :cur-page="'Подкатегории'" :hide-page="'Скрытые подкатегории'"
                        :btn-text="'Новая подкатегория'" :dynamic-header-content="true"
                        :add-title="'Новая подкатегория'"
                />
                <div class="box" v-if="!showAddBox && currentPage === 'default'"
                     :class="{'filters-not-added': !Object.keys(pageData['subcategories']).length}">
                    <template v-if="Object.keys(pageData['subcategories']).length">
                        <div class="item" v-for="(filterItem, i) in pageData['subcategories']" :key="i">
                            <h2 class="subtitle">{{ filterItem.title }}</h2>
                            <!--                            <h2 class="subtitle">{{ filterItem.value.join(', ') }}</h2>-->
                            <Actions :item="i"/>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять фильтры и они появятся здесь'"/>
                </div>
                <AddBox :avaliable-image-box="false" :page="'subcategory'" v-if="showAddBox" @add="addSubcategory"
                        :btn-title="'Добавить подкатегорию'"/>
                <HiddenBox class="box" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Subcategories",
    mounted() {
        if (!this.initPages['subcategories']) {
            this.$store.dispatch('getSubcategories')
        }
    },
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('@/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage')
    },
    computed: {
        ...mapGetters(['showAddBox', 'currentPage', 'pageData', 'initPages'])
    },
    methods: {
        addSubcategory(categoryData) {
            this.$store.dispatch('addSubcategory', {
                data: categoryData,
                page: 'subcategories'
            })
        },
    },
}
</script>

<style scoped>
.item {
    display: flex;
    justify-content: space-between;
    align-items: center;
    border-bottom: 1px solid var(--gray-1);
    padding-bottom: 15px;
    margin-bottom: 15px;
}
</style>
