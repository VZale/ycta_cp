<template>
    <p>{{warningMessage}}</p>
</template>

<script>
export default {
    name: "WarningMessage",
    props: {
        warningMessage: {
            type: String,
        }
    }
}
</script>

<style scoped>
p {
    color: var(--gray-3);
    font-weight: 500;
    font-size: 24px;
    line-height: 120%;
    max-width: 400px;
    margin: 0 auto;
    text-align: center;
    height: 100%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
}
</style>
