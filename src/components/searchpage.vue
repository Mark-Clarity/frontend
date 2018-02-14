<template>
  <div id='searchpage'>
    <searchbar class="search-bar" :stateSearch="stateSearch" :federalSearch="federalSearch"></searchbar>
    <resultItem :resultData="federalRisk"></resultItem>
    <resultItem :resultData="stateRisk"></resultItem>
  </div>
</template>
<script>
import searchbar from './searchbar'
import resultItem from './resultItem'

export default {
  name: 'searchpage',
  components: {
    searchbar,
    resultItem
  },
  data() {
    return {
      stateResults: [],
      federalResults: [],
      stateRisk: {type: 'State'},
      federalRisk: {type: 'Federal'},
      searchTerm: ''
    }
  },
  methods: {
    stateSearch(term, state) {
      this.searchTerm = term;
      fetch(`http://162.212.158.116/state_search?query=${term}&state=${state}`)
        .then(res => res.json())
        .then(res => {
          this.stateResults = res.data;
          this.stateResultsProcessed()
        })
    },
    federalSearch(term) {
      fetch(`http://162.212.158.116/federal_search?query=${term}`)
        .then(res => res.json())
        .then(res => {
          if (res.count === 0) {
            this.federalResults = []
          } else {
          this.federalResults = res.trademarks;
        }
          this.federalResultsProcessed()
        })

    },
    federalResultsProcessed() {
      let results = {
        type: 'Federal',
        risk: '',
        trademarks: []
      }
      var riskNumber = 0;
      if(!this.federalResults.length == 0) {
        this.federalResults.forEach((el) => {
          results.trademarks.push(el.wordmark)
        })
        riskNumber = this.federalResults.reduce((acc, el) =>{
          if(el.wordmark.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            return acc += 1
          }
        }, 0)
        switch (true) {
          case riskNumber >= 1:
            results.risk = 'high'
            break;
          case this.federalResults.length > 5:
            results.risk = 'high'
            break;
          case this.federalResults.length > 2:
            results.risk = 'middle'
            break;
          default:
            results.risk = 'low'
        }
        this.federalRisk = results
      } else {
        this.federalRisk = {type: 'Federal', risk: 'low'}
      }
    },
    stateResultsProcessed() {
      let results = {
        type: 'State',
        risk: '',
        trademarks: []
      }
      var riskNumber = 0;
      if(!this.stateResults.length == 0) {
        riskNumber = this.stateResults.reduce((acc, el) =>{
          let cleanName = el.name.replace(/%20/g, " ");
          results.trademarks.push(cleanName)
          if(cleanName.toLowerCase().includes(this.searchTerm.toLowerCase())) {
            return acc += 1;
          }
        }, 0)
        switch (true) {
          case riskNumber >= 1:
            results.risk = 'high'
            break;
          case this.stateResults.length > 5:
            results.risk = 'high'
            break;
          case this.stateResults.length > 2:
            results.risk = 'middle'
            break;
          default:
            results.risk = 'low'
        }
        this.stateRisk = results
      } else {
        this.stateRisk = {type: 'State', risk: 'low'}
      }
    }
  }
}
</script>
<style scoped>
  #searchpage {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-template-rows: repeat(2, 1fr);
    grid-gap: 20px;
  }
  .search-bar {
    grid-row: 1;
    grid-column: 1/3;
  }
</style>
