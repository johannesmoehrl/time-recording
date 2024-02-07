import { ref, computed } from "vue";
import { defineStore } from "pinia";

export const useTimeStore = defineStore("time", {
  state: () => ({
    users: [
      {
        id: Math.floor(Math.random() * 1000000),
        name: "Johannes Möhrl",
        startTime: 0,
        endTime: 0,
      },
      {
        id: Math.floor(Math.random() * 1000000),
        name: "John Doe",
        startTime: 0,
        endTime: 0,
      },
    ],
  }),
  actions: {
    addTime(name, startTime, endTime) {
      this.users.push({
        id: Math.floor(Math.random() * 1000000),
        name,
        startTime,
        endTime,
      });
    },
  },
});
