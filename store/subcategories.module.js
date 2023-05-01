import RestService from "@/common/rest.service"

export const state = {}

export const getters = {}

export const mutations = {}

const actions = {
    getSubcategories() {
        RestService.get('/sub_categories')
            .then(ans => {
                this.commit('setPageData', {
                    data: ans,
                    page: 'subcategories'
                })
                this.commit('initPage', 'subcategories')
            })
    },

    addSubcategory(context, data) {
        const { name, categories, hidden, description } = data.data
        const modifiedData = { name, category_id: categories, hidden, description }

        RestService.post('/sub_categories', modifiedData)
            .then(ans => {
                this.commit('setPageData', {
                    data: ans,
                    page: 'subcategories'
                })
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
