import Vue from "vue"

export const state = {
    fields: {
        productFields: {
            baseFields: {
                title: {
                    label: 'Введите название товара',
                    placeholder: 'Название товара'
                },
                price: {
                    label: 'Введите стоимость товара',
                    placeholder: 'Стоимость товара'
                },
                category: {
                    label: 'Выберите категорию',
                    placeholder: 'Категория товара',
                    isSelect: true,
                    select: []
                },
                // subcategory: {
                //     label: 'Выберите подкатегорию',
                //     placeholder: 'Подкатегория товара',
                //     isSelect: true,
                //     select: []
                // },
            },
            filterList: {
                color: 'Цвет',
                size: 'Размеры',
                format: 'Формат',
            },
            labels: {
                hot: {
                    title: 'Хит продаж',
                    state: false,
                },
                discount: {
                    title: 'Скидка на товар',
                    state: false
                }
            },
            images: {
                useDefault: false,
                images: []
            },
            relatedProducts: []
        },
        categoryFields: {
            baseFields: {
                title: {
                    label: 'Введите название категории',
                    placeholder: 'Название категории'
                },
            },
            images: {
                useDefault: false,
                images: []
            },
        },
        subcategoryFields: {
            baseFields: {
                title: {
                    label: 'Введите название подкатегории',
                    placeholder: 'Название подкатегории'
                },
                category: {
                    label: 'Выберите в какой категории будет находиться эта подкатегория',
                    placeholder: 'Категория товара',
                    isSelect: true,
                    select: []
                },
            }
        }
    },
    pageData: {
        categories: {},
        subcategories: {},
        products: {}
    }
}

export const getters = {
    fields() {
        return state.fields
    },
    pageData() {
        return state.pageData
    }
}

export const mutations = {
    setPageData(_, data) {
        if (!state.pageData[data.page][data.data.id]) {
            Vue.set(state.pageData[data.page], data.data.id, {})
        }
        Vue.set(state.pageData[data.page], data.data.id, data.data)


        switch (data.page){
            case 'categories':
                state.fields.productFields.baseFields.category.select.push({
                    value: data.data.title
                })
                return
            case 'subcategories':
                state.fields.productFields.baseFields.subcategory.select.push({
                    value: data.data.title
                })
                return
            default:
                return
        }
    },
    removePageData(_, data) {
        Vue.delete(state.pageData[data.page], data.id)
    },
    hidePageData(_, data) {
        if (state.pageData[data.page][data.data.id].isHidden) {
            Vue.set(state.pageData[data.page][data.data.id], 'isHidden', false)
        } else {
            Vue.set(state.pageData[data.page][data.data.id], 'isHidden', true)
        }
    }
}

const actions = {}

export default {
    state,
    getters,
    actions,
    mutations
}
