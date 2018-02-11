<template>
  <div id='searchbar'>
    <p class="form-font">
      Check your company's trademark risk.
    </p>
    <form id="search-form" class="form-font">
      <md-field>
        <label class="form-font">Company Name:</label>
        <md-input class="form-font" :placeholder="inputPlaceholder" v-model="searchTerm" @focus="clearPlaceholder" @blur="populatePlaceholder"></md-input>
      </md-field>
      <md-field>
        <button class="md-raised form-font" @click.prevent="sendSearches">Submit</button>
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
  props: ['stateSearch', 'federalSearch'],
  methods: {
    clearPlaceholder() {
      this.inputPlaceholder = ''
    },
    populatePlaceholder() {
      this.inputPlaceholder = 'Company Name'
    },
    sendSearches() {
      this.stateSearch(this.searchTerm, 'co');
      this.federalSearch(this.searchTerm);
    }
  }
}
</script>
<style scoped>
  #searchbar {
    margin: 30px 10% 0 10%;
  }
  .form-font{
    font-size: 1rem;
  }
</style>
