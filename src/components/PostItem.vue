<template>
  <div class="post-wrapper">
    <div class="post-header">
      <div class="post-author">
        <img
          class="avatar"
          :src="`https://i.pravatar.cc/150?u=${post.userId}`"
          alt="Avatar"
        >
        <p style="font-weight: 500;">
          user: {{ post.userId }}
        </p>
      </div>
      <div class="post-actions">
        <ByEdit 
          v-if="!editMode"
          class="icon" 
          @click="editMode=true"
        />
        <AkCheck
          v-else 
          class="icon-confirm" 
          @click="$emit('edit', post.id, editedTitle), editMode = false"
        />

        <CaTrashCan 
          v-if="!editMode"
          class="icon" 
          style="color: red;" 
          @click="showModal = true"
          @confirm="confirmDeletion" 
          @close="showModal = false"
        />

        <Teleport to="body">
          <ModalConfirm
            :show="showModal"
            @close="showModal = false"
            @confirm="confirmDeletion"
          >
            <template #header>
              <h3>Подтвердите удаление поста №{{ post.id }}</h3>
            </template>
          </ModalConfirm>
        </Teleport>
      </div>
    </div>
    <div class="post-title">
      <h2 v-if="!editMode">
        {{ post.title }}
      </h2>
      
      <input
        v-else
        v-model="editedTitle"
        type="text"
      >
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

const props = defineProps({
  post: {
    type: Object,
    required: true
  }
});

const emit = defineEmits(['edit']);

const postsStore = useBlogStore();

const showModal = ref(false);
const editMode = ref(false);
const editedTitle = ref(props.post.title);

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