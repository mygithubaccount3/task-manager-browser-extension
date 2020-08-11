<template>
  <div class="contentWrapper">
    <Drawer
      @openDrawer="openDrawer"
      @closeDrawer="closeDrawer"
      :showDrawer="showDrawer"
      :drawerForCreatingColumn="drawerForCreatingColumn"
      :card="card"
    />
    <Header :email="email" @openDrawer="openDrawer"/>
    <div class="cardListsWrapper">
      <CardList v-for="columnTitle in columns" :columnTitle="columnTitle" :key="columnTitle" @openEditingDrawer="openEditingDrawer"/>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { MutationMethod, ActionMethod } from 'vuex'
import { Action, Mutation } from 'vuex-class'
import { CardInterface } from '../interfaces/Card'
import Drawer from '../components/Drawer.vue'
import Header from '../components/Header.vue'
import CardList from '../components/CardList.vue'

@Component({ name: 'Home', components: { Drawer, Header, CardList } })
export default class Home extends Vue {
  @Mutation showError!: MutationMethod

  @Action fetchAllCards!: ActionMethod

  card: CardInterface = { title: '', description: '', parentColumn: '' }
  email: string | null = '';
  showDrawer = false;
  drawerForCreatingColumn = false;

  get columns () {
    return this.$store.state.columns
  }

  created () {
    if (localStorage) {
      try {
        this.email = localStorage.getItem('email')
      } catch (e) {
        this.showError(`Error occured: ${e.message}`)
      }
    } else {
      this.showError('Your browser does not support localStorage. The app will not work')
    }

    if (!this.email) {
      this.$router.replace('login')
    }
    this.fetchAllCards()
  }

  openDrawer (drawerForCreatingColumn: boolean) {
    this.showDrawer = true
    this.drawerForCreatingColumn = drawerForCreatingColumn
  }

  openEditingDrawer (card: CardInterface) {
    this.card = card
    this.openDrawer(false)
  }

  closeDrawer () {
    this.showDrawer = false
    this.card = { title: '', description: '', parentColumn: '' }
  }
}
</script>

<style lang="scss" scoped>
.contentWrapper {
  min-height: 150px;
  position: relative;
}

.cardListsWrapper {
  align-items: flex-start;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
  margin-top: 20px;
}
</style>
