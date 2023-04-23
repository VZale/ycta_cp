<template>
    <div class="box">
        <template v-if="false">
            <div class="cards">

            </div>
        </template>
        <WarningMessage v-else :warning-message="'Начните добавлять подкатегории и они появятся здесь'"/>
    </div>
</template>

<script>
export default {
    name: "SubcategoriesView",
    components: {
        WarningMessage: () => import('@/components/WarningMessage'),
        Actions: () => import("@/components/Actions"),
        Card: () => import("@/components/Card")
    },
    data() {
        return {}
    },
}
</script>

<style scoped>
.box {
    height: 100%;
}
</style>
