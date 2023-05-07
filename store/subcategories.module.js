import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    subcategories: {}
}

export const getters = {
    subcategories() {
        return state.subcategories
    }
}

export const mutations = {
    setSubcategories(context, data) {
        for (const item in data) {
            Vue.set(state.subcategories, item, data[item])
        }
    },
    removeSubcategory(context, data) {
        Vue.delete(state.subcategories, data)
    },
    editSubcategory(context, data) {
        const subcategoryToUpdate = Object.values(state.subcategories).find(category => category._id === data._id)
        if (subcategoryToUpdate) {
            Object.assign(subcategoryToUpdate, data)
        }
    },
    addSubcategory(context, data) {
        let count = Object.keys(state.subcategories).length
        Vue.set(state.subcategories, count, {})
        for (const item in data) {
            state.subcategories[count][item] = data[item]
        }
    },
}

const actions = {
    getSubcategories() {
        RestService.get('/sub_categories')
            .then(ans => {
                this.commit('setSubcategories', ans)
            })
    },

    addSubcategory(context, data) {
        const {name, categories, hidden, description} = data
        const modifiedData = {name, category_id: categories, hidden, description}

        RestService.post('/sub_categories', modifiedData)
            .then(ans => {
                this.commit('addSubcategory', ans)
            })
    },

    removeSubcategory(context, data) {
        RestService.delete(`/sub_category/${data._id}`)
            .then(() => {
                this.commit('removeSubcategory', data.item)
            })
    },
    updateSubcategory(context, data) {
        const {_id, ...updatedData} = data

        RestService.put(`/sub_category/${_id}`, updatedData)
            .then((ans) => {
                this.commit('editSubcategory', data)
            })
    }
}

export default {
    state,
    getters,
    actions,
    mutations
}
