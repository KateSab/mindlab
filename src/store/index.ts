import { defineStore } from 'pinia'
import { ref } from 'vue'
// import axios from 'axios';
import { IPost } from '../interfaces/IPost';

export const useBlogStore = defineStore('blogStore', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  const posts = ref<IPost[]>([]);
  const current_post = ref<IPost>({} as IPost);

  async function get_all_posts() {
    try {
      const response = await fetch(`${BASE_URL}` + '/posts');
      const data = await response.json();
      posts.value = data;
    } catch (error) {
      console.error(error);
    }
  }

  async function get_post(id: number) {
    try {
      const response = await fetch(`${BASE_URL}` + `/posts?id=${id}`);
      const data = await response.json();
      current_post.value.userId = data.userId;
      current_post.value.id = data.id;
      current_post.value.title = data.title;
      current_post.value.body = data.body;
    } catch (error) {
      console.error(error);
    }
  }

  async function delete_post(id: number) {
    try {
      await fetch(`${BASE_URL}` + `/posts/${id}`, {
        method: 'DELETE',
      });
      get_all_posts();
    } catch (error) {
      console.error(error);
    }
  }

  return { posts, get_all_posts, get_post, delete_post }
})