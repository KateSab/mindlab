<template>
  <Transition name="modal">
    <div v-if="show" class="modal-mask">
      <div class="new-post-wrapper">
        <div class="post-wrapper">
          <div class="post-header">
            <div class="post-author">
              <img class="avatar" :src="`https://i.pravatar.cc/150?u=23`" alt="Avatar" />
              <p style="font-weight: 500;">user: 1</p>
            </div>
            <div class="post-actions">
              <AkCheck
                @click="$emit('confirm', post)" 
                class="icon-submit"
              />
              <CgClose
                @click="$emit('close')" 
                class="icon-close"
              />
            </div>
          </div>
          <div class="post-title">
            <input type="text" v-model="post.title" placeholder="Введите заголовок поста">
          </div>
          <div class="post-body">
            <p>{{ post.body }}</p>
          </div>
        </div>
      </div>
    </div>
  </Transition>
</template>

<script setup>
import { ref } from 'vue';
import { AkCheck } from '@kalimahapps/vue-icons';
import { CgClose } from '@kalimahapps/vue-icons';


const props = defineProps({
  show: Boolean
});

const emit = defineEmits(['confirm', 'close']);

const post = ref({
  userId: 1,
  title: '',
  body: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim. Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.'
});

const closeModal = () => {
  emit('close');
};
</script>