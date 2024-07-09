<template>
  <div class="post-wrapper">
    <div class="post-header">
      <div class="post-author">
        <img class="avatar" :src="`https://i.pravatar.cc/150?u=${post.userId}`" alt="Avatar" />
        <p>user: id{{ post.userId }}</p>
      </div>
      <div class="post-actions">
        <CaTrashCan class="icon" style="color: darkred;"/>
        <ByEdit class="icon"/>
      </div>
    </div>
    <div class="post-title">
      <h2>{{ post.title }}</h2>
    </div>
    <div class="post-body">
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import { defineProps } from 'vue';
import { CaTrashCan } from '@kalimahapps/vue-icons';
import { ByEdit } from '@kalimahapps/vue-icons';
// Определение пропсов, которые принимает компонент
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});
</script>

<style scoped>
.icon {
  background-color: #1d1d1d;
  cursor: pointer;
  font-size: 1em;
  padding: 0.5em;
  margin: 0.2em;
  border: #1d1d1d 1px solid;
  border-radius: 8px;
}
</style>