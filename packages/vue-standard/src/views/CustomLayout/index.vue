<template>
  <div>
    规格古斯{{ props.keepModifiers }}
    {{ props.keepModifiers ? keep[0] : keep }}
  </div>
</template>
<script setup>
const props = defineProps(['keep', 'keepModifiers'])

console.log(props.keepModifiers)
defineEmits(['update:keep'])
</script>
