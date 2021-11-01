<template>
  <div class="wrapper">
    <router-view/>
  </div>
</template>

<script>

export default {
  beforeCreate() {
		this.$store.commit('initialiseStore');
	}
};
</script>
