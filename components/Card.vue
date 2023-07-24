<template>
    <div class="card" @click="chooseProduct(id)" :class="type === 'slide' ? 'slide' : ''">
        <h2 class="title" v-if="type === 'Category'">{{ title }}</h2>
        <div class="slide-box" v-if="type === 'slide'">
            <h2 class="title">{{title}}</h2>
            <p class="desk">{{description}}</p>
        </div>
        <div class="more-info">
            <div class="markets" v-if="labels">
                <span class="material-icons percent"
                      v-if="labels[0] === 'discount' || labels[1] === 'discount'">percent</span>
                <span class="discount" v-if="labels[0] === 'hot' || labels[1] === 'hot'">Хит продаж</span>
            </div>
            <div class="checkbox" @click="chooseProduct(id)" v-if="relatedProducts">
                <span @click="chooseProduct(id)" :class="{checked:chosenProducts[id._id]?.state}"></span>
            </div>
        </div>
        <div class="img-content" @click.stop v-if="options">
            <span class="material-icons" title="Редактировать" @click="$emit('edit')">edit</span>
            <span class="material-icons" v-if="hide" :title="isHidden ? 'отобразить' : 'скрыть'"
                  @click="$emit('hide')">visibility</span>
            <span class="material-icons" title="Удалить" @click="$emit('remove')">delete</span>
        </div>
        <img
            :src="image !== 'no-image' ? 'https://api.kirpichkrasnodar.ru/file/download/'+ image : require(`@/assets/no-image.png`)"
            :alt="image">
        <div class="product-info" v-if="type === 'product'">
            <span class="price">{{ price.toFixed(2) }}₽</span>
            <span class="sub-title">{{ title }}</span>
        </div>
        <ButtonBox v-if="design && type !== 'Category' && type !== 'product'" :total="total" :design="design"
                   :title="buttonText"/>
    </div>
</template>

<script>
import {mapGetters} from "vuex"

export default {
    name: "Card",
    props: {
        id: {
            type: Object
        },
        hide: {
            type: Boolean,
            default: true
        },
        type: {
            type: String
        },
        isHidden: {
            type: Boolean
        },
        price: {
            type: Number
        },
        options: {
            type: Boolean,
            default: true
        },
        product: {
            type: Boolean,
            default: false
        },
        infoProduct: {
            type: Boolean,
            default: false
        },
        labels: {
            type: Array
        },
        title: {
            type: String,
        },
        description: {
            type: String
        },
        image: {
            type: String,
            default: 'no-image'
        },
        design: {
            type: Array
        },
        buttonText: {
            type: String
        },
        category: {
            type: String
        },
        total: {
            type: Number
        },
        relatedProducts: {
            type: Boolean,
            default: false
        }
    },
    components: {
        ButtonBox: () => import('@/components/Forms/ButtonBox'),
    },
    computed: {
        ...mapGetters(['chosenProducts', 'pageData'])
    },
    methods: {
        chooseProduct(product) {
            if (!this.relatedProducts) {
                return
            }

            this.$store.commit('chooseProduct', {
                id: product._id,
                state: this.chosenProducts[product._id]?.state,
                data: product
            })
        },
        goTo(route) {
            if (!this.routing) {
                return
            }

            this.$router.push(`${route}`)
        }
    }
}
</script>

<style scoped>
.card {
    position: relative;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    color: #32343B;
    background-color: var(--white);
    border-radius: 12px;
    padding: 24px;
    overflow: hidden;
    cursor: pointer;
    min-height: 400px;
}

.card::after {
    content: '';
    position: absolute;
    background-color: transparent;
    transition: all .3s ease-out;
    opacity: 0;
}

.card:hover .img-content {
    opacity: 1;
    visibility: visible;
}

.card:hover::after {
    opacity: 1;
}

.card::after {
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(50, 52, 59, 0.3);
    border-radius: 12px;
}

.card img {
    object-fit: cover;
    border-radius: 10px;
}

.markers {
    display: flex;
    align-items: center;
    gap: 5px;
    font-weight: 600;
    font-size: 12px;
    line-height: 140%;
    position: relative;
    z-index: 5;
}

.percent,
.discount {
    display: inline-block;
}

.percent {
    border-radius: 100%;
    color: var(--white);
    padding: 6px;
    font-size: 12px;
    background-color: var(--black);
}

.discount {
    padding: 6px 10px;
    border-radius: 20px;
    color: var(--white);
    background-color: var(--red-1);
}

.card .img-content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 10;
    gap: 10px;
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in-out;
}

.img-content span {
    padding: 10px;
    border-radius: 100%;
    transition: all .3s ease-in-out;
    background-color: var(--white);
}

.img-content span:hover {
    color: var(--white);
    background-color: var(--red-1);
}

.card.main {
    background: var(--red-1);
}

.card.discount,
.card.main {
    position: relative;
    color: var(--white);
}

.card.discount h3,
.card.main h3 {
    font-size: 40px;
    line-height: 110%;
    margin-bottom: 15px;
    font-weight: 500;
}

.card.discount img {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-position: center center;
    background-repeat: no-repeat;
    background-size: cover;
    z-index: 2;
}

.card.discount .top-content,
.card.discount button {
    position: relative;
    z-index: 3;
    border: none;
}

.card h3 {
    font-size: 24px;
    line-height: 120%;
    font-weight: 500;
}

.card.main p {
    font-weight: 400;
}

.card.main::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    background-image: url("/assets/ycta-decor/lines.png");
    background-repeat: no-repeat;
    background-position: bottom right;
}

.card.slide::before {
    content: '';
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0,0,0, 0.3);
}

.card .button {
    border: 2px solid #EDEFF4;
    font-size: 18px;
    width: fit-content;
}

.product-info {
    display: flex;
    flex-direction: column;
    gap: 10px;
    margin-top: 15px;
}

.product-info .price {
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
}

.product-info .sub-title {
    font-weight: 400;
    font-size: 18px;
    line-height: 140%;
}

.more-info {
    position: absolute;
    top: 35px;
    left: 30px;
    z-index: 10;
    display: grid;
    grid-template-columns: repeat(2, max-content);
    place-items: center;
    place-content: inherit;
}

.checkbox {
    display: inline-flex;
    align-items: center;
    cursor: pointer;
}

.checkbox p {
    padding-left: 10px;
    white-space: nowrap;
}

.checkbox span {
    display: inline-block;
    border: 2px solid var(--gray-2);
    border-radius: 3px;
    width: 16px;
    height: 16px;
    position: relative;
}

.checkbox span::after {
    content: '';
    position: absolute;
    width: 10px;
    height: 10px;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    border-radius: 2px;
    background-color: var(--red-1);
    opacity: 0;
    visibility: hidden;
    transition: all .3s ease-in-out;
}

.checkbox span.checked::after {
    opacity: 1;
    visibility: visible;
}

.slide-box {
    position: absolute;
    display: flex;
    flex-direction: column;
    gap: 20px;
    padding: 20px;
    color: var(--white);
}

@media (max-width: 768px) {
    .card {
        min-height: 350px;
    }
}
</style>
