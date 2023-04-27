import Vuex from 'vuex'
import main from './main.module'
import filters from './filters.module'
import view from './view.module'

const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: [
            main,
            filters,
            view
        ]
    })
}

export default createStore
