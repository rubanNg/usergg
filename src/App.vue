<script setup lang="ts">
import { onMounted, ref } from 'vue';
import UserInfo from './UserInfo.vue';
import VirtualList from './VirtualList.vue';
import { User } from './types'

const items = ref<User[]>([]);
const user = ref<User | undefined>(undefined);

onMounted(() => {
  fetch('https://dummyjson.com/users').then(response => response.json()).then(response => {
    const result: Array<User> = [];

    for (let index = 0; index < 1000; index++) {
      result.push(...response.users.map((apiUser: any) => {
        return {
          name: apiUser.username,
          company: apiUser.company.name,
          position: apiUser.company.title,
          department: apiUser.company.department,
          avatar: `avatars/${Math.floor(Math.random() * 6) + 1}.png`,
          activityFlag: Math.random() > 0.5  ? 'active' : 'inactive',
        } as User;
      }));
    }
    items.value = result;
  });
});

function rowClick(item: User) {
  user.value = item;
}

</script>

<template>
  <div class="container d-flex pt-4">
    <div class="col-md-6">
      <VirtualList
        :items="items"
        :visibleItemsCount="10"
        :itemHeight="45"
        @row-click="rowClick"
      />
    </div>
    <div class="col-md-6">
      <UserInfo :user="user"/>  
    </div>
  </div>
</template>
