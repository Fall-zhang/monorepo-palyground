<template>
    <codemirror v-model="codeContext" placeholder="在这里写入" autofocus :style="{ minHeight: '400px' }"
      :indent-with-tab="true" :tab-size="2" :extensions="extensions" @ready="log('ready', $event)"
      @change="log('change', $event)" @focus="log('focus', $event)" @blur="log('blur', $event)" />
    <el-button @click="onSaveFile" style="margin:20px">保存</el-button>
</template>

<script setup>
// import { computed, ref } from 'vue'
import { Codemirror } from 'vue-codemirror'
import { javascript } from '@codemirror/lang-javascript'
import { oneDark } from '@codemirror/theme-one-dark'
import { watch } from 'vue';
const props = defineProps({
  code: {
    type: String,
    default: ''
  }
})
watch(() => props.code, () => {
  console.log(props.code);
  codeContext.value = props.code
})
let codeContext = ref('const app = "美团"')
const emit = defineEmits(['update:code'])

const log = (evidence) => {
  console.log(evidence)
}
const extensions = [javascript(), oneDark]
const onSaveFile = (ev) => {
  // console.log(ev);
  // console.log(codeContext.value);
  const blob = new Blob([codeContext.value], { type: 'text/javascript' });
  const url = URL.createObjectURL(blob);;
  const a = document.createElement("a");
  a.download = "sunshine";
  a.href = url;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
}
</script>

<style>
#file-editor {
  height: 600px;
  width: 100vw;
  background-color: antiquewhite;
}
</style>
