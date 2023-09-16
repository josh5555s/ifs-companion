<template>
  <q-page class="flex flex-center bg-grey-2">
    <div class="q-pa-md row justify-center">
      <div style="width: 100%; max-width: 400px">
        <q-chat-message
          v-for="message in chat"
          :key="message.messageId"
          :name="message.name"
          :text="message.body()"
          :bg-color="message.bgColor"
          :text-color="message.textColor"
          :sent="message.sent"
        />
        <!-- <q-chat-message
          name="companion"
          :text="textArray"
          bg-color="primary"
          text-color="white"
        /> -->


        <q-chat-message
          v-if="textInput.length > 0"
          name="user"
          sent
          bg-color="green"
          text-color="white"
        >
          <q-spinner-dots size="2rem" />
        </q-chat-message>
      </div>


      <q-input
        class="q-mt-xl"
        outlined
        v-model="textInput"
        @keydown.enter="selectOption(textInput)"
      >
        <template v-slot:append>
          <q-icon
            name="send"
            color="primary"
            @click="selectOption(textInput)"
          />
        </template>
      </q-input>
    </div>


  </q-page>
</template>

<script>
import { ref, reactive, computed, defineComponent } from 'vue'
import { useStepsStore } from 'src/stores/steps'

export default defineComponent({
  name: 'IndexPage',
  setup() {

    const textInput = ref('')




    const store = useStepsStore()
    const chat = computed(() => store.getChat)
    const step = computed(() => store.getCurrentStep)

    const textArray = computed(() => {
      return [
        step.value.text,
        ...step.value.options.map(({ number, text }) => `${number}) ${text}`),
      ];
    })

    const selectOption = (optionNumber) => {
      // push textInput to state.chat
      store.pushUserMessage(textInput.value)
      textInput.value = ''
      store.selectOption(optionNumber)
    }

    return {
      store,
      chat,
      textInput,
      textArray,
      selectOption
    };
  },
})
</script>
