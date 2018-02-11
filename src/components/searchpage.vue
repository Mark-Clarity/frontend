<template>
  <div id='searchpage'>
    <searchbar class="search-bar" :stateSearch="stateSearch" :fedralSearch="fedralSearch"></searchbar>
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
      fedralResults: [],
      stateRisk: {type: 'State'},
      federalRisk: {type: 'Fedral'},
      searchTerm: ''
    }
  },
  methods: {
    stateSearch(term, state) {
      this.searchTerm = term;
      fetch(`http://162.212.158.116/state_search?query=${term}&state=${state}`)
        .then(res => res.json())
        .then(res => {
          console.log('state', res);
          this.stateResults = res;
          this.stateResultsProcessed()
        })
    },
    fedralSearch(term) {
      fetch(`http://162.212.158.116/federal_search?query=${term}`)
        .then(res => res.json())
        .then(res => {
          console.log('fedral', res);
          if (res.count === 0) {
            this.fedralResults = []
          } else {
          this.fedralResults = res.trademarks;
        }
          this.fedralResultsProcessed()
        })

    },
    fedralResultsProcessed() {
      console.log('fedral');
      let results = {
        type: 'Fedral',
        risk: '',
        trademarks: []
      }
      console.log(!this.fedralResults.length == 0);
      if(!this.fedralResults.length == 0) {
        console.log('if triggered');
        this.fedralResults.forEach((el) => {
          results.trademarks.push(el.wordmark)
        })
        var riskNumber = this.fedralResults.reduce((acc, el) =>{
          if(el.wordmark === this.searchTerm) {
            return acc++
          }
        }, 0)
        console.log(riskNumber);
        switch (true) {
          case riskNumber > 1:
            results.risk = 'high'
            break;
          case this.fedralResults.length > 5:
            results.risk = 'high'
            break;
          case this.fedralResults.length > 2:
            results.risk = 'middle'
            break;
          default:
            results.risk = 'low'
        }
        this.federalRisk = results
      } else {
        this.federalRisk = {type: 'Fedral', risk: 'low'}
      }
    },
    stateResultsProcessed() {
      let results = {
        type: 'State',
        risk: '',
        trademarks: []
      }
      if(!this.stateResults.length === 0) {
        let riskNumber = this.stateResults.reduce((acc, el) =>{
          results.trademarks.push(el.wordmark)
          if(el.wordmark === this.searchTerm) {
            return acc++
          }
        }, 0)
        switch (true) {
          case riskNumber > 1:
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
