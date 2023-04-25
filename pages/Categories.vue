<template>
    <div class="categories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                        :btn-text="'Новые категории'" :dynamic-header-content="true" :add-title="'Новая категория'"
                        @add="showAddBox = true" @turn-back="showAddBox = false" @change-page="changePage"/>
                <div class="box" v-if="!showAddBox && currentPage === 'default'">
                    <template v-if="Object.keys(pageData?.['categories']).length">
                        <div class="cards">
                            <template v-for="product in pageData['categories']">
                                <Card v-if="!product.isHidden"
                                      :type="'category'"
                                      :total="product.total || 0"
                                      :title="product.title"
                                      :price="product.price"
                                      :description="product.description"
                                      :image="product.images ? product?.images[0] : ''"
                                      :discount="product.discount"
                                      :hot="product.hot"
                                      :isHidden="product.isHidden"
                                      @remove="remove(product.id)"
                                      @hide="hide(product)"
                                      :design="['button','white','large']"
                                      :button-text="'моделей'"
                                />
                            </template>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять категории и они появятся здесь'"/>
                </div>
                <AddBox :page="'category'" v-if="showAddBox" @add="addCategory" :btn-title="'Добавить категорию'"/>
                <HiddenBox class="box" :page="'categories'" v-if="currentPage === 'hide'"/>
            </div>
        </div>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Categories",
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('~/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    data() {
        return {
            showAddBox: false,
            currentPage: 'default'
        }
    },
    computed: {
        ...mapGetters(['pageData'])
    },
    methods: {
        addCategory(categoryData) {
            this.showAddBox = false
            this.$store.commit('setPageData', {
                data: categoryData,
                page: 'categories'
            })
        },
        changePage(page) {
            this.currentPage = page
        },
        remove(id) {
            this.$store.commit('removePageData', {
                page: 'categories',
                id: id
            })
        },
        hide(product) {
            this.$store.commit('hidePageData', {
                page: 'categories',
                data: product
            })
        }
    }
}
</script>

<style scoped>

</style>
