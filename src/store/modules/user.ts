import { defineStore } from 'pinia'

export const useStore = defineStore('user', {
  state: () => ({
    counter: 0,
  }),
  getters: {
    // type is automatically inferred because we are not using `this`
    doubleCount: (state) => state.counter * 2,
    // here we need to add the type ourselves (using JSDoc in JS). We can also
    // use this to document the getter
    /**
     * Returns the counter value times two plus one.
     *
     * @returns {number}
     */
    doubleCountPlusOne() {
      // autocompletion ✨
      return this.doubleCount + 1
    },
  },
  actions: {
    increment() {
      this.counter++
    },
    randomizeCounter() {
      this.counter = Math.round(100 * Math.random())
    },
    async registerUser(login, password) {
    },
  }
})