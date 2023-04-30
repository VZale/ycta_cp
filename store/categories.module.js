import RestService from "@/common/rest.service"

export const state = {}

export const getters = {}

export const mutations = {}

const actions = {
    getCategories() {
        RestService.get('/categories')
            .then(ans => {
                this.commit('setPageData', {
                    data: ans,
                    page: 'categories'
                })
                this.commit('initPage', 'categories')
            })
    },
    addCategory(context, data) {
        const {file, ...dataWithoutFile} = data.data

        const formData = new FormData()
        formData.append('data',JSON.stringify(dataWithoutFile))
        formData.append('file', file)
        RestService.post('/categories', formData)
            .then(() => {
                this.commit('setPageData', data)
            })
    },
    removeCategory(context, data) {
        RestService.delete(`/category/${data._id}`)
            .then(() => {
                this.commit('removePageData', data)
            })
    },
    updateCategory(context, data) {
        RestService.put(`/category/${data.data._id}`, {
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
