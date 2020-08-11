<template>
  <transition name="modal">
    <div class="modal-container">
      <span class="emodji">&#x1F631;</span>
      <slot></slot>
      <button class="modal-default-button" @click="closeAlertModal">OK</button>
    </div>
  </transition>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Mutation } from 'vuex-class'
import { MutationMethod } from 'vuex'

@Component
export default class AlertModal extends Vue {
  @Mutation showError!: MutationMethod

  closeAlertModal () {
    this.showError('')
  }
}
</script>

<style lang="scss" scoped>
.emodji {
  font-size: 80px;
}

.modal-container {
  box-sizing: border-box;
  position: absolute;
  left: calc(50% - 125px);
  flex-direction: column;
  align-items: center;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  height: auto;
  width: 250px;
  margin: 0px auto;
  padding: 20px 30px;
  padding-top: 0;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  font-family: Helvetica, Arial, sans-serif;
  z-index: 2000;
}

.modal-default-button {
  align-self: flex-end;
  float: right;
  margin-top: 15px;
  width: 60px;
}

.modal-enter-active {
  animation: slideFromTop 0.5s;
}

.modal-leave-active {
  animation: slideFromTop 0.5s reverse;
}

@keyframes slideFromTop {
  0% {
    transform: translateY(-120%);
  }
  80% {
    transform: translateY(20%);
  }
  100% {
    transform: translateY(0%);
  }
}
</style>
