<template>
  <q-item
    v-for="step in store.steps"
    :key="step.title"
  >
    <q-btn
      :label="step.title"
      style="width:100%"
      :class="{ active: step.id === store.getCurrentStep.id }"
      @click="store.setCurrentStep(step.id)"
    >
    </q-btn>
  </q-item>
</template>

<script>
import { ref, computed } from 'vue'
import { useStepsStore } from 'src/stores/steps'

export default {
  setup() {

    const activeTab = ref("activation");

    const store = useStepsStore()
    console.log('store', store)

    const isActiveTab = computed((label) => {
      return label === activeTab.value;
    });

    return {
      isActiveTab,
      store
    };
  },
}
</script>

<style scoped lang="scss">
.active {
  background-color: $primary;
  color: white;
}
</style>
