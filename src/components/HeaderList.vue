<template>
  <header class="page-header">
    <div class="header-group">
      <button class="btn back-btn" @click="$router.go(-1)">‹</button>
      <input type="text" v-model="title">
    </div>
    <button class="btn" @click="onOpen">Create new task</button>
    <GDialog
      v-model="modalOpen"
      max-width="500"
    >
      <div class="modal-body">
        <h2>Create a task</h2>
        <input v-model="taskTitle" class="title-input" type="text" placeholder="Title">
        <button @click="addTask">Save</button>
        <button @click="modalOpen = false">Cancel</button>
      </div>
    </GDialog>
  </header>
</template>

<script lang="js">
  import { GDialog } from 'gitart-vue-dialog'

  export default  {
    name: 'HeaderList',
    components: {
      GDialog,
    },
    data () {
      return {
        modalOpen: false,
        taskTitle: ''
      }
    },
    computed: {
      title: {
        get () {
          return this.$store.getters.getTodoById(this.$route.params.id).name
        },
        set (value) {
          this.$store.dispatch('updateTitle', {id: this.$route.params.id, name: value})
        }
      }
    },
    methods: {
      onOpen() {
        this.modalOpen = true
      },
      addTask() {
        this.$store.dispatch('addTask', {
          id: this.$route.params.id,
          data: { 
            title: this.taskTitle,
            status: 'todo',
            updated: new Date().toLocaleString(), 
            id: this.$store.state.todos.find(t => t.id == this.$route.params.id).count+1
          } 
        });
        this.taskTitle = '';
        this.modalOpen = false;
        localStorage.setItem('todos', JSON.stringify(this.$store.state));
      },
      updateTask() {
        this.$store.dispatch('updateTasks', {
          id: this.$route.params.id,
          data: { title: this.title, status: 'todo', updated: new Date().toLocaleString() } 
        });
      },
    },
  }
</script>

<style lang="scss" scoped>
  .page-header {
    display: flex;
    justify-content: space-between;
    margin-bottom: 60px;
  }

  .header-group {
    display: flex;

    input {
      display: block;
      font-size: 2em;
      padding: 0 8px;
      font-weight: bold;
      background: none;
      border-radius: 3px;
      border: 1px solid transparent;
      outline: none;
      width: auto;

      &:focus {
        border-color: rgba(#979797, 0.3);
      }
    }
    .back-btn {
      border: none;
      color: #042c47;
      cursor: pointer;
      width: 40px;
      font-size: 22px;
      margin-right: 26px;
      background-color: rgba(#979797, 0.3);

      &:hover {
        background-color: rgba(#979797, 0.1);
      }
    }
  }
  @media (max-width: 900px) {
    .header-group {
      & .back-btn {
        margin-right: 5px;
      }
      & input {
        width: 115px;
      }
    }
  }
</style>