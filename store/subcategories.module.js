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
                    data: {ans},
                    page: 'subcategories'
                })
            })
    },

    removeSubcategory(context, data) {
        RestService.delete(`/sub_category/${data._id}`)
            .then(() => {
                this.commit('removePageData', data)
            })
    },
    updateSubcategory(context, data) {
        RestService.put(`/sub_category/${data.data._id}`, {
            hidden: data.data.hidden
        })
            .then(() => {
                this.commit('hidePageData', data)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
