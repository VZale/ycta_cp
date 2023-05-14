<template>
    <div class="categories" v-if="userAuth">
        <div class="main container">
            <SideBar/>
            <div class="content">
                <Header :page="'categories'" :cur-page="'Категории'" :hide-page="'Скрытые категории'"
                        :btn-text="'Новые категории'" :dynamic-header-content="true" :add-title="'Новая категория'"
                />
                <div class="box" v-if="!showAddBox && !showEditBox && currentPage === 'default'">
                    <ScrollPanel style="width: 100%; height: 700px">

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
                    </ScrollPanel>
                </div>
                <AddCategory v-if="showAddBox" @add="addCategory" :btn-title="'Добавить категорию'"/>
                <HiddenBox class="box" :page="'Category'" v-if="currentPage === 'hide'" :data="categories"/>
                <EditBox @save-changes="saveCategory" :data="currentCategory" v-if="showEditBox" :type="'category'"
                         :btnText="'Сохранить'"/>
            </div>
        </div>
        <Toast/>
    </div>
    <PageNotFound v-else/>
</template>

<script>
import {mapGetters} from "vuex"
import Editor from 'primevue/editor';
import ScrollPanel from "primevue/scrollpanel";
import PageNotFound from "@/pages/pageNotFound";
import Toast from 'primevue/toast';


export default {
    name: "Categories",
    components: {
        Editor,
        Toast,
        ScrollPanel,
        PageNotFound,
        EditBox: () => import('@/components/Forms/EditBox'),
        SideBar: () => import('@/components/SideBar'),
        AddCategory: () => import('@/components/Forms/AddCategory'),
        HiddenBox: () => import('@/components/HiddenBox'),
        WarningMessage: () => import('@/components/WarningMessage'),
        Card: () => import('@/components/Card')
    },
    data() {
        return {
            currentCategory: []
        }
    },
    computed: {
        ...mapGetters(['errorMessage','userAuth','categories', 'showAddBox', 'currentPage', 'initPages', 'showEditBox'])
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
            this.$store.commit('setEditBox', false)
        },
        hide(category) {
            const hiddenStatus = category.hidden
            this.$store.dispatch('updateCategory', {
                _id: category._id,
                hidden: !hiddenStatus
            })
        },
        edit(category) {
            this.currentCategory = category
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

</style>
