<script setup>
import CodeEditor from './components/CodeEditor.vue'
import FileReader from './components/FileReader.vue'
const fileContext = ref('')

</script>

<template>
  <FileReader
    v-model='fileContext'
    style='height: 60px;'
  />
  <CodeEditor v-model:code='fileContext' />
</template>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}

body {
  margin: 0;
}
</style>
