import { defineStore } from 'pinia'
import { ref } from 'vue'
// import axios from 'axios';
import { IPost } from '../interfaces/IPost';

export const useBlogStore = defineStore('blogStore', () => {
  const BASE_URL = 'https://jsonplaceholder.typicode.com';
  const posts = ref<IPost[]>([]);

  async function get_all_posts() {
    try {
      const response = await fetch(`${BASE_URL}` + '/posts');
      const data = await response.json();
      posts.value = data;
    } catch (error) {
      console.error(error);
    }
  }

  async function add_post(post: IPost) {
    try {
      const response = await fetch(`${BASE_URL}` + '/posts', {
        method: 'POST',
        body: JSON.stringify(post),
        headers: {
          'Content-type': 'application/json; charset=UTF-8',
        },
      });
      const newPost = await response.json();
      posts.value.push(newPost);
      console.log(posts);

      alert('Пост успешно добавлен!');
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при добавлении поста!');
    }
  }

  async function delete_post(id: number) {
    try {
      await fetch(`${BASE_URL}` + `/posts/${id}`, {
        method: 'DELETE',
      });
      alert('Пост успешно удален!');
      get_all_posts();
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при удалении поста!');
    }
  }

  return { posts, get_all_posts, add_post, delete_post }
})