<template>
  <div class="post-wrapper">
    <div class="post-header">
      <div class="post-author">
        <img class="avatar" :src="`https://i.pravatar.cc/150?u=${post.userId}`" alt="Avatar" />
        <p style="font-weight: 500;">user: {{ post.userId }}</p>
      </div>
      <div class="post-actions">

        <ByEdit 
          v-if="!editMode"
          @click="editMode=true" 
          class="icon"
        />
        <AkCheck
          v-else 
          @click="editMode=false" 
          class="icon-confirm"
        />

        <CaTrashCan 
          v-if="!editMode"
          @click="showModal = true" 
          @confirm="confirmDeletion" 
          @close="showModal = false"
          class="icon" 
          style="color: red;"
        />

        <Teleport to="body">
          <!-- use the modal component, pass in the prop -->
          <ModalConfirm :show="showModal" @close="showModal = false" @confirm="confirmDeletion">
            <template #header>
              <h3>Подтвердите удаление поста №{{ post.id }}</h3>
            </template>
          </ModalConfirm>
        </Teleport>
      </div>
    </div>
    <div class="post-title">
      <h2 v-if="!editMode">{{ post.title }}</h2>
      <input v-else type="text" v-model="post.title">
    </div>
    <div class="post-body">
      <p>{{ post.body }}</p>
    </div>
  </div>
</template>

<script setup>
import ModalConfirm from './ModalConfirm.vue'
import { useBlogStore } from '../store/index'
import { CaTrashCan } from '@kalimahapps/vue-icons';
import { ByEdit } from '@kalimahapps/vue-icons';
import { AkCheck } from '@kalimahapps/vue-icons';
import { ref } from 'vue'

const postsStore = useBlogStore();

const showModal = ref(false);
const editMode = ref(false);

// Определение пропсов, которые принимает компонент
const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const confirmDeletion = () => {
  showModal.value = false;
  postsStore.delete_post(props.post.id);
};
</script>

<style scoped>
.modal {
  position: fixed;
  z-index: 999;
  top: 20%;
  left: 50%;
  width: 300px;
  margin-left: -150px;
}
</style>