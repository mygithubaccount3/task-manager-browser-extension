<template>
  <transition name="modal">
    <div class="modal-mask">
      <div class="modal-container">
        <div id="spinner" ref="spinner"></div>
        <img v-for="el in imagesURLs" :src="el" :alt="el" :key="el" class="img" @click="selectImage">
        <button class="modal-default-button" @click="closePopup">Close</button>
      </div>
    </div>
  </transition>
</template>

<script lang="ts">
/// <reference types="chrome"/>
import Vue from 'vue'
import Component from 'vue-class-component'
import { Ref } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { MutationMethod } from 'vuex'
import apiService from '../services/api.service'

@Component
export default class ImagesPopup extends Vue {
  @Mutation showError!: MutationMethod

  @Ref() readonly spinner!: HTMLDivElement;

  imagesURLs: Array<string> = []
  port = browser.runtime.connect()

  mounted () {
    this.spinner.className = 'show'
    this.port.postMessage({ fetch: true })

    this.port.onMessage.addListener((msg: any) => {
      if (msg.url) {
        this.imagesURLs.push(msg.url)
      } else if (!msg.spinner) {
        this.spinner.className = ''
      } else if (msg.error) {
        this.showError(`Error occured: ${msg.error}`)
      }
    })
  }

  selectImage (e: Event) {
    if (e.target) {
      const target = e.target as HTMLImageElement
      this.$emit('saveImage', target.src)
    }
  }

  closePopup () {
    this.port.postMessage({ cancel: true })
    this.$emit('closePopup')
  }
}
</script>

<style lang="scss" scoped>
#spinner{
  visibility: hidden;
  width: 80px;
  height: 80px;
  border: 2px solid #f3f3f3;
  border-top:3px solid #d0c0ff;
  border-radius: 100%;
  position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
  margin: auto;
  animation: spin 1s infinite linear;
}

@keyframes spin {
  from {
      transform: rotate(0deg);
  } to {
      transform: rotate(360deg);
  }
}

#spinner.show {
  visibility: visible;
}

.modal-mask {
  display: flex;
  align-items: center;
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
  height: 50%;
  width: 50%;
  margin: 0px auto;
  padding: 20px 30px;
  background-color: #fff;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.33);
  transition: all 0.3s ease;
  font-family: Helvetica, Arial, sans-serif;
  overflow-y: scroll;
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
  position: fixed;

  background-color: white;
    border: 1px solid #000000;
    border-radius: 5px;
    margin-right: 10px;
    padding: 5px 30px;
    text-decoration: none;
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

.img {
    width: 33.3%;
}
</style>
