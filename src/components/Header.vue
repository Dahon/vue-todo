<template>
  <header class="page-header">
    <h1>{{title}}</h1>
    <button class="btn" @click="onOpen">Create new list</button>
    <GDialog
      v-model="modalOpen"
      max-width="500"
    >
      <div class="modal-body">
        <h2>Create a list</h2>
        <input v-model="name" class="title-input" type="text" placeholder="Title">
        <button @click="addList">Save</button>
        <button @click="modalOpen = false">Cancel</button>
      </div>
    </GDialog>
  </header>
</template>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }
</style>

<script lang="js">
  import { GDialog } from 'gitart-vue-dialog'
  export default  {
    name: 'Header',
    components: {
      GDialog,
    },
    props: ['title'],
    data () {
      return {
        modalOpen: false,
        name: '',
      }
    },
    methods: {
      onOpen() {
        this.modalOpen = true;
      },
      addList() {
        if (this.name !== '') {
          this.$store.dispatch('updateList', { name: this.name, data: [], id: this.$store.state.todos.length + 1 });
          this.modalOpen = false;
        }
      }
    },
}
</script>
<style scoped>
  @media (max-width: 900px) {
    .page-header {
      justify-content: space-around;
    }
  }
</style>