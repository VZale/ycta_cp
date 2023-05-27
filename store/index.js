import Vuex from 'vuex'
import main from './main.module'
import filters from './filters.module'
import categories from './categories.module'
import subcategories from './subcategories.module'
import products from './products.module'
import view from './view.module'
import home from './home.module'

const createStore = () => {
    return new Vuex.Store({
        namespaced: true,
        modules: [
            main,
            filters,
            categories,
            subcategories,
            products,
            view,
            home
        ]
    })
}

export default createStore
