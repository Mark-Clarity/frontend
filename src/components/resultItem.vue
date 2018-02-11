<template>
  <div id='resultItem' v-if="showCard">
    <md-card md-with-hover :class="{ 'low-risk': isLowRisk, 'middle-risk': isMiddleRisk, 'high-risk': isHighRisk }">
    <md-ripple>
      <md-card-header>
        <div class="md-title">{{ resultData.type }}</div>
      </md-card-header>

      <md-card-content>
        <p v-if="resultData">
          Your risk is {{ resultData.risk }}.
        </p>
      </md-card-content>

      <md-card-actions>
        <md-button>See details...</md-button>
      </md-card-actions>
    </md-ripple>
  </md-card>
  </div>
</template>
<script>
export default {
  name: 'resultItem',
  props: ['resultData'],
  computed: {
    isLowRisk() {
      if(!this.resultData.risk) {
        return false
      } else {
      return this.resultData.risk === 'low'
      }
    },
    isMiddleRisk() {
      if(!this.resultData.risk) {
        return false
      } else {
      return this.resultData.risk === 'middle'
      }
    },
    isHighRisk() {
      if(!this.resultData.risk) {
        return false
      } else {
      return this.resultData.risk === 'high'
      }
    },
    showCard() {
      return this.resultData.risk
    }
  }
}
</script>
<style scoped>
  .low-risk {
    background-color: lightgreen;
  }
  .middle-risk {
    background-color: lightyellow;
  }
  .high-risk {
    background-color: pink;
  }
</style>
