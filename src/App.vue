<template>
  <div id="app">
    <header>
      <h1>MarkClarity</h1>
    </header>
    <main>
      <router-view/>
    </main>
    <footer>
      <p>
        More searches coming soon...
      </p>
      <md-switch disabled>Domain Info</md-switch>
      <md-switch disabled>Social Media Handlers</md-switch>
    </footer>
  </div>
</template>

<script>
export default {
  name: 'App',
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

main {
  margin: 0 10% 0 10%;
}

header {
  box-shadow: 0 3px 1px -2px rgba(0,0,0,.2), 0 2px 2px 0 rgba(0,0,0,.14), 0 1px 5px 0 rgba(0,0,0,.12);
  padding: 20px 10% 20px 10%;
  width: 100vw;
}
header {
  background-color: #292670;
}
header h1 {
  color: #9FBAD6;
}

footer {
  width: 100vw;
  position: fixed;
  bottom: 0;
  padding: 20px 20% 0 20%;
}
</style>
