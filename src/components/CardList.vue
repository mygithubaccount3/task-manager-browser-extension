<template>
  <div class="cardColumnWrapper">
    <h1 class="cardColumnTitle">{{ columnTitle }}</h1>
    <ul class="cardColumn">
      <draggable
        v-model="cards"
        :move="move"
        group="{name: 'cards', pull: true, put: true}"
        animation="100"
      >
        <Card
          :card="card"
          v-for="card in cards"
          :key="card._id"
          @openEditingDrawer="openEditingDrawer(card)"
        />
      </draggable>
    </ul>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import Component from 'vue-class-component'
import { Prop } from 'vue-property-decorator'
import draggable from 'vuedraggable'
import { CardInterface } from '../interfaces/Card'
import Card from './Card.vue'

@Component({ components: { draggable, Card } })
export default class CardList extends Vue {
  @Prop() private columnTitle!: string;

  cardToUpdate = {
    id: '',
    title: '',
    description: '',
    parentColumn: ''
  }

  futureIndex = -1

  get cards () {
    return this.$store.state.cards.filter((card: CardInterface) => {
      const storageItem = localStorage.getItem(card._id!)
      if (storageItem) {
        return storageItem === this.columnTitle
      }
    })
  }

  set cards (val) {
    const storageItem = localStorage.getItem(this.cardToUpdate.id)
    if (storageItem === this.columnTitle) {
      this.$store.dispatch('updateExistingCard', { card: this.cardToUpdate, futureIndex: this.futureIndex })
    }
  }

  move (e: any) {
    const card = e.draggedContext.element
    this.cardToUpdate = {
      id: card._id,
      title: card.title,
      description: card.description,
      parentColumn: e.relatedContext.component.$parent.$el.children[0].innerText
    }
    this.futureIndex = e.draggedContext.futureIndex
  }

  openEditingDrawer (card: CardInterface) {
    this.$emit('openEditingDrawer', card)
  }
}
</script>

<style lang="scss" scoped>
@import "../mixins/mixins.scss";

.cardColumnWrapper {
  border: 1px solid black;
  display: inline-block;
  margin-bottom: 10px;
  min-width: 150px;
  padding: 15px;
  width: 25%;

  @include respond-to(tablet) {
    width: 45%;
  }

  @include respond-to(smallScreen) {
    width: 100%;
  }
}

.cardColumn {
  padding: 0;
  list-style-type: none;

  & div {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
  }
}
</style>
