<template>
  <li class="cardWrapper">
    <RemovalModal
          v-if="showRemovalModal"
          @toggleModal="toggleRemovalModal"
          @removeCard="deleteCard"
          :id="itemIDToRemove"
        />
      <div class="card">
        <div class="card__header">
          <font-awesome-icon
            icon="pen"
            size="2x"
            @click="editCard({ id: card._id, title: card.title, text: card.description, imgURL: card.imgURL, parentColumn: card.parentColumn })"
            class="card__penIcon"
          />
          <font-awesome-icon icon="trash" size="2x" @click="toggleRemovalModal(card._id)" />
        </div>
        <div class="card__content">
          <h1 class="card__title">{{card.title}}</h1>
          <p class="card__description">{{card.description}}</p>
        </div>
      </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator'
import { ActionMethod } from 'vuex'
import { Action } from 'vuex-class'
import { CardInterface } from '../interfaces/Card'
import RemovalModal from './RemovalModal.vue'

@Component({ components: { RemovalModal } })
export default class Cards extends Vue {
  @Action removeCard!: ActionMethod

  @Prop() private card?: CardInterface

  showRemovalModal = false;
  itemIDToRemove = ''

  toggleRemovalModal (id: string) {
    this.showRemovalModal = !this.showRemovalModal
    this.showRemovalModal ? this.itemIDToRemove = id : this.itemIDToRemove = ''
  }

  deleteCard (id: string) {
    this.removeCard(id)
  }

  editCard (card: CardInterface) {
    this.$emit('openEditingDrawer', card)
  }
}
</script>

<style lang="scss" scoped>
@import "../mixins/mixins.scss";

.cardWrapper {
    background-color: #d0c0ff;
    border-radius: 10px;
    margin-bottom: 30px;
    padding: 10px;
}

.cardsWrapper {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  list-style-type: none;
  margin: auto;
  padding: 0;
  width: 90%;
}

.card {
  box-sizing: border-box;
  display: inline-block;
  margin-top: 10px;
  margin-bottom: 10px;
  width: 65%;

  @include respond-to(tablet) {
    width: 80%;
  }

  @include respond-to(smallScreen) {
    width: 100%;
  }

  &__header {
    border-bottom: 1px solid black;
    padding: 10px;
    text-align: right;
  }

  &__penIcon {
    margin-right: 10px;
  }

  &__content {
    padding: 10px;
  }

  &__title,
  &__description {
    font-size: 15px;
    text-align: left;
    word-break: break-all;
  }
}
</style>
