<script setup lang="ts">
import { computed, onUpdated, ref, toRefs } from 'vue';
import { ListProps, User } from './types';

const props = defineProps<ListProps>();
const emits = defineEmits<{
  'row-click': [item: unknown],
}>();

const {
  items,
  visibleItemsCount,
  itemHeight,
} = toRefs(props);

const startOffsetTop = ref(0);
const visibleItems = computed(() => {
  const start = startOffsetTop.value / itemHeight.value;
  return items.value.slice(start, start + visibleItemsCount.value)
});

const computedListStyles = computed(() => {
  const mainWrapperHeight = { height: `${itemHeight.value * visibleItems.value.length}px` };
  const listWrapperHeight = { height: `${itemHeight.value * items.value.length}px` };
  const listItemHeight = { height: `${itemHeight.value}px` };
  const listStyles = {
    ...mainWrapperHeight,
    top: `${startOffsetTop.value}px`,
    width: '100%',
    height: '100%',
    position: 'absolute',
  };

  return {
    mainWrapperHeight,
    listWrapperHeight,
    listItemHeight,
    listStyles,
  }
});



function listScroll({ target }: Event) {
  startOffsetTop.value = (target as HTMLElement).scrollTop;
}

function rowClick(item: unknown) {
  emits('row-click', item);
}
</script>

<template>
  <div
    class="main-list"
    :style="computedListStyles.mainWrapperHeight"
    @scroll="listScroll"
  >
    <div :style="computedListStyles.listWrapperHeight"></div>
    <ul :style="computedListStyles.listStyles">
      <li
        v-for="item in visibleItems"
        :key="item.id"
        :style="computedListStyles.listItemHeight"
        class="list-item"
        @click="rowClick(item)"
      >
        <div class="d-flex align-items-center">
          <img class="avatar" :src="item.avatar" alt="">
          <span class="px-4">{{ item.name }}</span>
        </div>
      </li>
    </ul>
  </div>
</template>

<style scoped>
.main-list {
  overflow: auto;
  position: relative;
}
.list-item {
  width: 100%;
  display: flex;
  align-items: center;
  cursor: pointer;
  padding-left: 20px;
}
.list-item:hover {
  background-color: royalblue;
  color: white;
  transition: .6s;
}
.avatar {
  height: 30px;
  width: 30px;
}
</style>