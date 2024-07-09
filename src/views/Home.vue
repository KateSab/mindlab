<template>
  <div class="title">
    <h1>Лучше, чем twitter</h1>
  </div>
  <div class="posts">
    <div>
      <PostItem v-for="post in postsStore.posts" :key="post.id" :post="post" />
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { useBlogStore } from '../store/index'
import PostItem from '../components/PostItem.vue'

const postsStore = useBlogStore();

onMounted(() => {
  postsStore.get_all_posts();

  console.log(postsStore.posts);
})
</script>