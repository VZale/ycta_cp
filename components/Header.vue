<template>
  <header class="header">
    <div class="left">
      <span class="current-page">{{ curPage }}</span>
      <span class="hide-page">{{ hidePage }}</span>
    </div>
    <button class="button black small">
      <i class="material-icons">add_circle</i>
      {{ btnText }}
    </button>
  </header>
</template>

<script>
export default {
  props: {
    curPage: {
      type: String
    },
    hidePage: {
      type: String
    },
    btnText: {
      type: String
    },
    filters: {
      type: String
    }
  },
  name: "Header",
}
</script>

<style scoped>
header {
  padding: 24px;
  border-radius: 12px;
  background-color: var(--white);
  width: 100%;
  display: grid;
  grid-template-columns: repeat(2, max-content);
  place-content: space-between;
  place-items: center;
}

.left span {
  margin-right: 16px;
  font-weight: 500;
  font-size: 24px;
  line-height: 120%;
  cursor: pointer;
}

.left span:last-child {
  margin-right: 0;
}

.hide-page {
  color: var(--gray-3);
}

button {
  display: grid;
  grid-template-columns: repeat(2, max-content);
  place-items: center center;
  gap: 5px;
}
</style>
