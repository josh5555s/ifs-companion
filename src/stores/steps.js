import { defineStore } from 'pinia';

class StepMessage {
  constructor(sent, stepId, name, bgColor, textColor, title, text, options) {
    this.sent = sent;
    this.stepId = stepId;
    this.name = name;
    this.bgColor = bgColor;
    this.textColor = textColor;
    this.title = title;
    this.text = text;
    this.options = options;
    this.messageId = StepMessage.nextMessageId++;
  }

  static getNextMessageId() {
    if (!this.nextMessageId) {
      this.nextMessageId = 1;
    }
    return this.nextMessageId++;
  }
}

class UserStepMessage extends StepMessage {
  constructor(text) {
    super(true, null, 'user', 'green', 'white', null, text, null);
  }
  body() { return [this.text]; }
}

class BotStepMessage extends StepMessage {
  constructor(stepId, title, text, options) {
    super(false, stepId, 'companion', '$primary', 'white', title, text, options);
  }
  body() {
    return [
      this.text,
      ...this.options.map(({ number, text }) => `${number}) ${text}`),
    ];
  }
}

class StepOption {
  constructor(number, text, next) {
    this.number = number;
    this.text = text;
    this.next = next;
  }
}

// Create instances of StepMessage and StepOption
const options = [
  new StepOption('1', 'If you know which part is causing an issue, choose it.', 'P0.1'),
  new StepOption('2', 'Be aware of which parts are activated at the moment, and sense which one most needs your attention.', 'P1'),
  new StepOption('3', 'If you have a trailhead, discern which parts are involved and choose one. Or, access each part and see which one most needs to be worked with.', 'P0.3'),
];

const stepMessage = new BotStepMessage('P0', 'Choosing a Part', "Let's choose a part to work with. There are a few ways to do this:", options);

const chat = [stepMessage];

export const useStepsStore = defineStore('steps', {
  id: 'steps',
  state: () => ({
    chat: chat,
    currentStepID: 'P0',
    steps:
      [
        {
          id: "P0",
          name: "companion",
          title: "Choosing a Part",
          text: "Let's choose a part to work with. There are a few ways to do this:",
          options: [
            {
              number: '1',
              text: "If you know which part is causing an issue, choose it.",
              next: "P0.1",
            },
            {
              number: '2',
              text: "Be aware of which parts are activated at the moment, and sense which one most needs your attention.",
              next: "P1",
            },
            {
              number: '3',
              text: "If you have a trailhead, discern which parts are involved and choose one. Or, access each part and see which one most needs to be worked with.",
              next: "P0.3",
            },
          ],
        },
        {
          id: "P0.1",
          name: "companion",
          title: "Choosing a Part",
          text: "What is the part that you will be working with?",
          options: false,
          next: "P1",
        },
        {
          id: "P0.3",
          name: "companion",
          title: "Choosing a Part",
          text: "What is the trailhead that you are working with?",
          options: false,
          next: "P0.31",
        },
        {
          id: "P0.31",
          name: "companion",
          title: "Choosing a Part",
          text: "What part feels most important to work with at this trailhead?",
          options: false,
          next: "P1",
        },
        {
          id: "P1",
          name: "companion",
          title: "Accessing the Part",
          text: "Let's cultivate your access to the part. There are a several ways to do this:",
          options: [
            { number: '1', text: "If the part is not activated, imagine yourself in a recent situation when the part was activated." },
            { number: '2', text: "Sense the part in your body" },
            { number: '3', text: "What is the part feeling?" },
            { number: '4', text: "Is there an image associated with the part?" },
            { number: '5', text: "Is the part saying anything?" },
          ],
        },
        {
          id: "P2",
          name: "companion",
          title: "Unblending Target Part",
          text: "Check to see if you are caught up in the part's feelings or beliefs.",
          options: [
            { number: '1', text: "I am" },
            { number: '2', text: "I'm not" },
          ],
        },
        {
          id: "P2.1",
          name: "companion",
          title: "Unblending Concerned Parts",
          text: "",
          options: [
            { number: '1', text: "Ask the part to make space for you to be there too, or seperate from you, so you can get to know it." },
            { number: '2', text: "Move back to separate from the part." },
            { number: '3', text: "Get an image of the part at a distance from you." },
            { number: '4', text: "Do a short centering/grounding meditation." },
            { number: '5', text: "Draw the part" },
          ],

        },
        { id: "P3", title: "Unblending Concerned Parts" },
        { id: "P4", title: "Getting to Know Protector" },
        { id: "P5", title: "Developing Trust with Protector" },
        { id: "E0", title: "Getting Permission to Work With Exile" },
        { id: "E1", title: "Accessing the Exile" },
        { id: "E2", title: "Unblending Exile" },
        { id: "E3", title: "Unblending Concerned Parts" },
        { id: "E4", title: "Getting to Know Exile" },
        { id: "E5", title: "Developing Trust with Exile" },
        { id: "R0", title: "Witnessing Origins" },
        { id: "R1", title: "Reparenting the Exile" },
        { id: "R2", title: "Retrieving the Exile" },
        { id: "R3", title: "Unburdening the Exile" },
        { id: "R4", title: "Integration and Follow-up" },

      ],
  }),
  getters: {
    getCurrentStep: (state) => state.steps.find((step) => {
      return step.id === state.currentStepID
    }),
    getChat: (state) => { return state.chat; }
  },
  actions: {
    instantiateStepMessageByStepId(stepID) {
      const stepToInstantiate = this.steps.find((step) => step.id === stepID);
      if (stepToInstantiate) {
        const stepMessageInstance = new BotStepMessage(
          stepToInstantiate.id,
          stepToInstantiate.title,
          stepToInstantiate.text,
          stepToInstantiate.options
        );
        this.chat.push(stepMessageInstance);
      } else {
        console.error(`Step with ID "${stepID}" not found.`);
      }
    },
    pushUserMessage(message) {
      const userMessageInstance = new UserStepMessage(message);
      this.chat.push(userMessageInstance);
    },
    setCurrentStep(stepID) {
      this.currentStepID = stepID;
    },
    selectOption(optionsNumber) {
      const options = this.getCurrentStep.options.find((option) => {
        return option.number === optionsNumber
      });
      this.currentStepID = options.next;
      this.instantiateStepMessageByStepId(this.currentStepID)
    },

  },
});
