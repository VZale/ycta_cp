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
}

export default {
    state,
    getters,
    actions,
    mutations
}
