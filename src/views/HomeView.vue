<template>
  <div class="title">
    <h1>Your favourite blog</h1>
  </div>
  <div class="add-post">
    <button @click="showModal = true">
      <AkPlus style="width: 2em; height: 2em;" />
      <h2>Новый пост</h2>
    </button>
    <div v-if="showModal">
      <Teleport to="body">
        <ModalAddPost 
          :show="showModal" 
          @confirm="confirmPost" 
          @close="showModal = false" 
        />
      </Teleport>
    </div>
  </div>
  <div class="posts">
    <div>
      <PostItem
        v-for="post in posts"
        :key="post.id"
        :post="post"
        @edit="editPost"
      />
    </div>
  </div>
  <BsArrowUpCircleFill
    class="scroll-to-top"
    @click="scrollToTop(30)"
  />
</template>

<script setup>
import { onMounted, ref, computed } from 'vue';
import { useBlogStore } from '../store/index';
import PostItem from '../components/PostItem.vue';
import ModalAddPost from '../components/ModalAddPost.vue';
import { AkPlus } from '@kalimahapps/vue-icons';
import { BsArrowUpCircleFill } from '@kalimahapps/vue-icons';

const postsStore = useBlogStore();
const posts = computed(() => postsStore.posts);
const showModal = ref(false);

onMounted(() => {
  postsStore.get_all_posts();
  console.log(postsStore.posts);
});

const confirmPost = (post) => {
  postsStore.add_post(post);
  showModal.value = false;
};

const editPost = (id, title) => {
  postsStore.edit_post(id, title);
};

const scrollToTop = (vh) => {
  const scrollToY = (window.innerHeight * vh) / 100;

  window.scrollTo({
    top: scrollToY,
    behavior: 'smooth'
  });
};
</script>