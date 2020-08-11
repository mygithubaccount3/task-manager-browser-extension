<template>
  <div class="header">
    <span class="header__userEmail">&lt;{{this.email}}&gt;</span>
    <button @click="createList" class="header__btn">Create List</button>
    <button @click="logout" class="header__btn">LogOut</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import { Mutation } from 'vuex-class'
import { MutationMethod } from 'vuex'

@Component
export default class Header extends Vue {
  @Mutation showError!: MutationMethod

  @Prop() private email!: string;

  createList () {
    this.$emit('openDrawer', true)
  }

  logout () {
    if (localStorage) {
      try {
        localStorage.removeItem('email')
        this.$router.replace('login')
      } catch (e) {
        this.showError(`Error occured: ${e.message}`)
      }
    } else {
      this.showError('Your browser does not support localStorage')
    }
  }
}
</script>

<style lang="scss" scoped>
.header {
  align-items: center;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid black;
  padding-top: 10px;
  padding-bottom: 10px;

  &__userEmail {
    margin-left: 10px;
  }

  &__btn {
    background-color: white;
    border: 1px solid #000000;
    border-radius: 5px;
    margin-right: 10px;
    padding: 5px 30px;
    text-decoration: none;
  }
}
</style>
