import RestService from "@/common/rest.service"
import Vue from "vue"

export const state = {
    chosenProducts: []
}

export const getters = {
    chosenProducts() {
        return state.chosenProducts
    }
}

export const mutations = {
    chooseProduct(context, data) {
        console.log(data)
        // Vue.set(state.chosenProducts, data.id, data.state = !data.state || false)
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
