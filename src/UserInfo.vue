<script setup lang="ts">
import { User } from "./types";

const props = defineProps<{ user: User }>();
</script>

<template>
  <div v-if="!user" class="d-flex no-user">Выберите пользователя</div>
  <div v-else class="user-wrapper">
    <div class="user-name">
      {{ user.name }}
    </div>
    <div class="d-flex user-info">
      <div style="position: relative">
        <img :src="user.avatar" class="user-avatar">
        <div class="user-status" :class="user.activityFlag"></div>
      </div>
      <div class="d-flex flex-column user-details">
        <p class="user-details-row">Должность: {{ user.position }}</p>
        <p class="user-details-row">Отдел: {{ user.department }}</p>
        <p class="user-details-row">Компания: {{ user.company }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.no-user {
  height: 50px;
  display: flex;
  font-size: 20px;
  justify-content: center;
  align-items: center;
}
.user-wrapper {
  padding: 20px;
  background-color: antiquewhite;
}
.user-name {
  width: 100%;
  height: 60px;
  background-color: #99dbed;
  align-items: center;
  justify-content: center;
  display: flex;
  color: white;
  font-size: 44px;
}
.user-info {
  padding-top: 20px;
}
.user-avatar {
  height: 200px;
  width: 200px;
  border-radius: 50%;
  border: 2px solid #2fa19e;
}
.user-details {
  width: 100%;
  justify-content: center;
  gap: 20px;
  padding-left: 20px;
}

.user-details-row {
  font-size: 22px;
}
.user-status {
  height: 60px;
  width: 60px;
  border-radius: 50%;
  position: absolute;
  bottom: 0px;
  left: 0px;
}

.active {
  background-color: #2fa19e;
}

.inactive {
  background-color: #c1c3c3;
}
</style>