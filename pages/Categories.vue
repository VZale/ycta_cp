<template>
    <div class="categories">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                        :btn-text="'Новые категории'" :dynamic-header-content="true" :add-title="'Новая категория'"
                />
                <div class="box" v-if="!showAddBox && !showEditBox && currentPage === 'default'">
                    <template v-if="Object.keys(categories).length">
                        <div class="cards">
                            <template v-for="(category, i) in categories">
                                <Card v-if="category && !category.hidden"
                                      :type="'Category'"
                                      :total="category.total || 0"
                                      :title="category.name"
                                      :description="category.description"
                                      :image="category.image"
                                      :isHidden="category.hidden"
                                      :design="['button','white','large']"
                                      :button-text="'моделей'"
                                      @remove="remove(category._id,i)"
                                      @hide="hide(category)"
                                      @edit="edit(category)"
                                />
                            </template>
                        </div>
                    </template>
                    <WarningMessage v-else :warning-message="'Начните добавлять категории и они появятся здесь'"/>
                </div>
                <AddCategory v-if="showAddBox" @add="addCategory" :btn-title="'Добавить категорию'"/>
                <HiddenBox class="box" :page="'Category'" v-if="currentPage === 'hide'" :data="categories"/>
                <EditBox @save-changes="saveCategory" :data="currentCategory" v-if="showEditBox" :type="'category'" :btnText="'Сохранить'"/>
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
        EditBox: () => import('@/components/Forms/EditBox'),
        SideBar: () => import('@/components/SideBar'),
        AddCategory: () => import('@/components/Forms/AddCategory'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    data() {
        return {
            showEditBox: false,
            currentCategory: []
        }
    },
    computed: {
        ...mapGetters(['categories', 'showAddBox', 'currentPage', 'initPages'])
    },
    methods: {
        addCategory(categoryData) {
            this.$store.dispatch('addCategory', categoryData)
        },
        remove(id, item) {
            this.$store.dispatch('removeCategory', {
                item: item,
                _id: id
            })
        },
        saveCategory(data) {
            if (data.newData) {
                this.$store.dispatch('editCategory', data)
            }
            this.showEditBox = false
        },
        hide(category) {
            category.hidden = !category.hidden
            this.$store.dispatch('updateCategory', {
                _id: category._id,
                hidden: category.hidden
            })
        },
        edit(category) {
            this.currentCategory = category
            this.showEditBox = true
        }
    }
}
</script>

<style scoped>

</style>
