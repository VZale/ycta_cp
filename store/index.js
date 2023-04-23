import Vuex from 'vuex'
import main from './main.module'
import filters from './filters.module'

const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: [
            main,
            filters,
        ]
    })
}

export default createStore
