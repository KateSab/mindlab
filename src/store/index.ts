import { defineStore } from 'pinia';
import { IPost } from '../interfaces/IPost';

export const useBlogStore = defineStore('blogStore', {
  state: () => ({
    BASE_URL: 'https://jsonplaceholder.typicode.com',
    posts: [] as IPost[],
  }),
  actions: {
    async get_all_posts() {
      try {
        const response = await fetch(`${this.BASE_URL}/posts`);
        const data = await response.json();
        this.posts = data;
      } catch (error) {
        console.error(error);
      }
    },

    async add_post(post: IPost) {
      try {
        const response = await fetch(`${this.BASE_URL}/posts`, {
          method: 'POST',
          body: JSON.stringify(post),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const newPost = await response.json();
        this.posts.push(newPost);
        alert('Пост успешно добавлен!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при добавлении поста!');
      }
    },

    async delete_post(id: number) {
      try {
        await fetch(`${this.BASE_URL}/posts/${id}`, {
          method: 'DELETE',
        });
        this.posts = this.posts.filter(post => post.id !== id);
        alert('Пост успешно удален!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при удалении поста!');
      }
    },

    async edit_post(id: number, title: string) {
      try {
        const response = await fetch(`${this.BASE_URL}/posts/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({ title }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        });
        const updatedPost = await response.json();
        const postIndex = this.posts.findIndex(post => post.id === id);
        if (postIndex !== -1) {
          this.posts[postIndex].title = updatedPost.title;
        }
        alert('Пост успешно изменен!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при изменении заголовка поста!');
      }
    },
  },
});
