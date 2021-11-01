<template>
  <div>
    <HeaderList/>
    <section class="search-container">
      <form action="" class="search-form">
        <input v-model="searchInput" class="search-input" type="text" placeholder="Search">
        <select class="dropdown" v-model="selectedType">
          <option value="all">All</option>
          <option value="todo">Todo</option>
          <option value="done">Done</option>
        </select>
      </form>
    </section>
    <section class="list-items">
      <div v-for="(item) in todos" class="item" :key="item.id">
        <h2 class="item-title">
          <span>{{ item.title }}</span>
          <span class="item-status" :class="'item-status-' + item.status">{{ item.status }}</span>
        </h2>
        <div class="item-options">
          <div class="option">Last updated: {{ item.updated }}</div>
          <div class="option">
            <button @click="onShowEdit(item)">Edit</button>
            <button @click="onChangeStatus(item)">{{item.status == 'done' ? 'todo' : 'done'}}</button>
          </div>
        </div>
      </div>
    </section>
    <GDialog
      v-model="modalOpen"
      max-width="500"
    >
      <div class="modal-body">
        <h2>Edit a task</h2>
        <input v-model="editItem.title" class="title-input" type="text" placeholder="Title">
        <button @click="onEditSave">Save</button>
        <button @click="modalOpen = false">Cancel</button>
      </div>
    </GDialog>
  </div>
</template>
<script>
import HeaderList from '~/components/HeaderList';
import { GDialog } from 'gitart-vue-dialog';

  export default {
    components: {
      HeaderList,
      GDialog
    },
    data () {
      return {
        searchInput: '',
        selectedType: 'all',
        editItem: {},
        modalOpen: false
      }
    },
    computed: {
      todos() {
        return this.filterByStatus(this.filterByName(this.$store.getters.getTodoById(this.$route.params.id)));
      }
      
    },
    methods: {
      onChangeStatus(item) {
        if (item.status == 'done') {
          this.$store.dispatch('updateTask', {id: this.$route.params.id, item: {...item, status: 'todo', updated: new Date().toLocaleString()}})
        } else {
          this.$store.dispatch('updateTask', {id: this.$route.params.id, item: {...item, status: 'done', updated: new Date().toLocaleString()}})
        }
      },

      filterByStatus(lists) {
        if (this.selectedType == 'all') return lists
        return lists.filter(list => list.status == this.selectedType);
      },

      filterByName(lists) {
        return lists.data.filter(list => list.title.toLowerCase().indexOf(this.searchInput) > -1);
      },

      onShowEdit(item) {
        this.modalOpen = true;
        this.editItem = Object.assign({}, item);
      },

      onEditSave() {
        this.$store.dispatch('updateTask', {id: this.$route.params.id, item: {...this.editItem, title: this.editItem.title, updated: new Date().toLocaleString()}});
        this.modalOpen = false;
        localStorage.setItem('todos', this.$store.state);
      }
    },
  }
</script>


<style lang="scss" scoped>
  $list-bg: #0067af;

  .search-container {
    margin-bottom: 60px;

    .search-form {
      display: flex;
      justify-content: space-between;
      width: 100%;
    }

    .search-input {
      background: none;
      border-radius: 3px;
      border: 1px solid rgba(#979797, 0.3);
      outline: none;
      padding: 0 8px;
      font-size: 1rem;
      flex: 1;
      margin-right: 36px;
    }

    .dropdown {
      border-radius: 3px;
      border: 0;
      text-decoration: none;
      align-items: center;
      background-color: rgba(151, 151, 151, 0.3);
      white-space: nowrap;
      cursor: pointer;
      font-weight: 500;
      display: block;
      padding: 0 8px;
      height: 36px;
      font-size: 1rem;
      width: 120px;
    }
  }

  .list-items {

    .item {
      display: flex;
      justify-content: space-between;
      margin-bottom: 36px;
    }

    .item-title {
      font-weight: normal;
      flex: 1;

      .title-done {
        text-decoration: line-through;
      }
    }

    .item-options {
      width: 250px;
      display: flex;
      align-items: flex-end;
      flex-direction: column;

      .option {
        margin-bottom: 6px;

        button {
          margin-left: 6px;
          border: none;
          color: #042c47;
          cursor: pointer;
          border-radius: 3px;
          padding: 4px 6px;
          background-color: rgba(#979797, 0.3);

          &:hover {
            background-color: rgba(#979797, 0.1);
          }
        }
      }
    }

    .item-status {
      color: #fff;
      padding: 0px 4px;
      border-radius: 3px;
      font-size: 12px;
      line-height: 16px;
      vertical-align: top;
      margin-left: 8px;

      &-todo {
        background-color: #d0021b;
      }
      &-done {
        background-color: #7ed321;
      }
    }
  }
  @media (max-width: 900px) {
    .search-container {
      padding: 0 10px;

      & .search-input {
        margin-right: 5px;
      }
    }
    .list-items {
      padding: 0 10px;
      
      & .item {
        flex-direction: column;

        & .item-options {
          width: auto;
        }
      }
    }
  }
</style>
