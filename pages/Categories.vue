<template>
    <div class="categories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                        :btn-text="'Новые категории'" :dynamic-header-content="true" :add-title="'Новая категория'"
                />
                <div class="box" v-if="!showAddBox && currentPage === 'default'">
                    <template v-if="Object.keys(pageData?.['categories']).length">
                        <div class="cards">
                            <template v-for="product in pageData['categories']">
                                <Card v-if="!product.hidden"
                                      :type="'category'"
                                      :total="product.total || 0"
                                      :title="product.name"
                                      :description="product.description"
                                      :image="product.images ? product?.images[0] : ''"
                                      :isHidden="product.hidden"
                                      @remove="remove(product._id)"
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
    mounted() {
        if (!this.initPages['categories']) {
            this.$store.dispatch('getCategories')
        }
    },
    components: {
        SideBar: () => import('@/components/SideBar'),
        AddBox: () => import('@/components/Forms/AddBox'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    computed: {
        ...mapGetters(['pageData', 'showAddBox', 'currentPage','initPages'])
    },
    methods: {
        addCategory(categoryData) {
            this.$store.dispatch('addCategory', {
                data: categoryData,
                page: 'categories'
            })
        },
        remove(id) {
            this.$store.dispatch('removeCategory', {
                page: 'categories',
                _id: id
            })
        },
        hide(product) {
            product.hidden = !product.hidden
            this.$store.dispatch('updateCategory', {
                page: 'categories',
                data: product
            })
        }
    }
}
</script>

<style scoped>

</style>
