<template>
  <div>
    <input style="margin:20px" type="file" @change="changeFile" accept="text/javascript">
  </div>
</template>
<script setup>
defineProps(['modelValue'])
const emit = defineEmits(['update:modelValue'])
const changeFile = (ev) => {
  const fileContent = ev.target.files
  const fileReader = new FileReader()
  fileReader.readAsText(fileContent[0])
  fileReader.onload = (e) => {
    console.log(fileReader.result);
    emit('update:modelValue', fileReader.result)
  }
}
const file = ref(null)

</script>