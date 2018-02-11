<template>
  <div id='searchbar'>
    <p>
      Check your company's trademark risk.
    </p>
    <form id="search-form">
      <md-field>
        <label>Company Name:</label>
        <md-input :placeholder="inputPlaceholder" v-model="searchTerm" @focus="clearPlaceholder" @blur="populatePlaceholder"></md-input>
      </md-field>
      <md-field>
        <button class="md-raised" @click.prevent="sendSearches">Submit</button>
      </md-field>
    </form @submit.prevent="sendSearches">
  </div>
</template>
<script>
export default {
  name: 'searchbar',
  data() {
    return {
      searchTerm: '',
      inputPlaceholder: 'Company Name'
    }
  },
  props: ['stateSearch', 'fedralSearch'],
  methods: {
    clearPlaceholder() {
      this.inputPlaceholder = ''
    },
    populatePlaceholder() {
      this.inputPlaceholder = 'Company Name'
    },
    sendSearches() {
      this.stateSearch(this.searchTerm, 'co');
      this.fedralSearch(this.searchTerm);
    }
  }
}
</script>
<style scoped>
  #searchbar {
    margin: 30px 10% 0 10%;
  }
</style>
