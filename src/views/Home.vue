<template>
  <div class="container">
        <Header :title="title" ref="headerComp"/>
        <Lists @addList="$refs.headerComp.onOpen()"/>
  </div>
</template>

<script>

import Lists from '~/components/Lists';
import Header from '~/components/Header';

export default {
  name: 'Home',
  components: {
    Lists,
    Header,
  },
  data () {
    return {
        title: 'Lists',
    }
  },
}
</script>
