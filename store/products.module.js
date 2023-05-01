import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    chosenProducts: {},
    reletedProducts: {}
}

export const getters = {
    chosenProducts() {
        return state.chosenProducts
    },

    reletedProducts() {
        return state.reletedProducts
    }
}

export const mutations = {
    chooseProduct(context, data) {
        Vue.set(state.chosenProducts, data.id, data.state = !data.state || false)
    },

    setReletedProducts(context, data) {
        console.log(data)
        Vue.set(state, 'reletedProducts', data)
    },

    removeReletedProducts(context, id) {
        state.reletedProducts.splice(id, 1)
    },

    clearChosenProducts() {
        Vue.set(state, 'chosenProducts', {})
    }
}

const actions = {
    getProducts() {
        RestService.get('/products')
            .then(ans => {
                this.commit('setPageData', {
                    data: ans,
                    page: 'products'
                })
                this.commit('initPage', 'products')
            })
    },
}

export default {
    state,
    getters,
    actions,
    mutations
}
