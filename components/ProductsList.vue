<template>
    <div class="products-list">
        <Card
            :title="'Тротуарная плитка'"
            :category="'Тротуарная плитка'"
            :info-product="true"
            :button-text="'159 моделей'"
            :button-classes="['small white']"
            :image="'product-1'"
        />
        <Card
            :title="'Тротуарная плитка'"
            :category="'Тротуарная плитка'"
            :info-product="true"
            :button-text="'159 моделей'"
            :button-classes="['small white']"
            :image="'product-1'"
        />
        <Card
            :title="'Тротуарная плитка'"
            :category="'Тротуарная плитка'"
            :info-product="true"
            :button-text="'159 моделей'"
            :button-classes="['small white']"
            :image="'product-1'"
        />
    </div>
</template>

<script>
export default {
    name: "ProductsList",
    components: {
        Card: () => import("@/components/Card")
    }
}
</script>

<style scoped>

</style>
