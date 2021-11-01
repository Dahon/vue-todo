<template>
  <section class="list-container">
    <div class="list" v-for="(list, index) in lists" :key="index" @click="toList(list.id)">
        <h2>
          {{list.name}}
        </h2>
    </div>
    <div class="list create-list" @click="addList">
      <h2 class="font-weight-500">Create new list</h2>
    </div>
  </section>
</template>

<script>

export default {
  name: 'Lists',
  components: {
  },
  props: [],
  data () {
    return {
    }
  },
  computed: {
    lists() {
        return this.$store.state.todos;
    }
  },
  methods: {
    toList(id) {
      this.$router.push({name: 'todo', params: { id }})
    },
    addList() {
      this.$emit("addList");
    }
  }
}
</script>


<style lang="scss" scoped>
  $list-bg: #0067af;

  .list-container {
    display: grid;
    grid-template-columns: repeat(auto-fill, 240px);
    grid-gap: 3rem;
    justify-content: space-between;

    .list {
      width: 240px;
      height: 160px;
      background-color: $list-bg ;
      display: flex;
      justify-content: center;
      align-items: center;
      cursor: pointer;
      &:hover {
        background-color: rgba($list-bg, 0.9);
      }
    }

    .create-list {
      background-color: #091e4230;
      h2 {
        color: #172b4d;
      }

      &:hover {
        background-color: #091e420a;
      }
    }

    h2 {
      color: #fff;
    }
    
    a {
      text-decoration: none;
    }
  }
  @media (max-width: 900px) {
    .list-container {
      justify-content: center;
    }
  }

</style>
