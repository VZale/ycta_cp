<template>
    <aside class="side-bar">
        <div class="top">
            <img class="logo" :src="require('@/assets/ycta-logo.png')" alt="">
            <ul class="menu">
                <li>
                    <NuxtLink to="/filters">Фильтры</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/categories">Категории</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/subcategories">Подкатегории</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/products">Товары</NuxtLink>
                </li>
                <li>
                    <NuxtLink to="/web-home">Главная старница</NuxtLink>
                </li>
            </ul>
        </div>
        <span class="log-out" @click="logout()">
            <img :src="require('@/assets/ycta-icons/logout.png')" alt="">
            Выйти
      </span>
    </aside>
</template>

<script>
import {mapGetters} from "vuex";

export default {
    name: "SideBar",
    methods: {
        logout() {
            this.$store.dispatch('logout')
        }
    },
    computed: {
        ...mapGetters(['init'])
    }
}
</script>

<style scoped>
.side-bar {
    background-color: var(--white);
    border-radius: 12px;
    padding: 20px;
    height: 100%;
    display: grid;
    grid-template-rows:repeat(2, max-content);
    place-content: space-between stretch;
}

.logo {
    margin-bottom: 36px;
}

a {
    padding: 12px;
    border-radius: 8px;
    font-weight: 500;
    font-size: 18px;
    line-height: 140%;
    color: var(--black);
    display: inline-block;
    width: 100%;
}

.nuxt-link-exact-active.nuxt-link-active {
    background-color: var(--gray-1);
}

.log-out {
    display: grid;
    place-items: center;
    grid-template-columns: repeat(2, max-content);
    gap: 12px;
    cursor: pointer;
}
</style>
