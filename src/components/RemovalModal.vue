<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        Do you really want to remove this card?
        <button
          class="modal-default-button"
          @click="removeCard(id)"
        >OK</button>
        <button class="modal-default-button" @click="toggleModal">Cancel</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'

@Component
export default class RemovalModal extends Vue {
  @Prop() private id!: string;

  removeCard (id: string) {
    this.$emit('removeCard', id)
    this.toggleModal()
  }

  toggleModal () {
    this.$emit('toggleModal')
  }
}
</script>

<style lang="scss" scoped>
.modal-mask {
  position: fixed;
  z-index: 9998;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  transition: opacity 0.3s ease;
}

.modal-container {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: 50px;
  width: 300px;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
}

.modal-header h3 {
  margin-top: 0;
  color: #42b983;
}

.modal-body {
  margin: 20px 0;
}

.modal-default-button {
  align-self: flex-end;
  float: right;
  width: 60px;
}

.modal-enter {
  opacity: 0;
}

.modal-leave-active {
  opacity: 0;
}

.modal-enter .modal-container,
.modal-leave-active .modal-container {
  -webkit-transform: scale(1.1);
  transform: scale(1.1);
}
</style>
