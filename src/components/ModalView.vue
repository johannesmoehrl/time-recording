<template>
  <div v-if="isOpen" class="modal-wrapper">
    <div class="modal">
      <h4>Add your Entry</h4>
      <div class="name-container">
        <label for="users">Name: </label>
        <select name="users" id="users">
          <option v-for="user in users" :key="user.id">{{ user.name }}</option>
        </select>
      </div>
      <div class="additonal-info-container">
        <label for="additional-info">Worked on: </label>
        <input id="additional-info" type="text" />
      </div>

      <div class="time-picker-container">
        <p>Start Time:</p>
        <VueDatePicker v-model="startTime"></VueDatePicker>
      </div>

      <div class="time-picker-container">
        <p>End Time:</p>
        <VueDatePicker v-model="endTime"></VueDatePicker>
      </div>
      <div class="buttons">
        <button @click.stop="emit('modal-close')" class="btn" id="cancel">
          Cancel
        </button>
        <button
          @click="sendTimeToParent, createNewUser()"
          @click.stop="emit('modal-close')"
          class="btn"
          id="add"
        >
          Add
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
import VueDatePicker from "@vuepic/vue-datepicker";
import "@vuepic/vue-datepicker/dist/main.css";

const props = defineProps({
  isOpen: Boolean,
});

const emit = defineEmits(["modal-close"]);

const startTime = ref();
const endTime = ref();

const users = ref([
  {
    id: Math.floor(Math.random() * 1000000),
    name: "Johannes Möhrl",
  },
  {
    id: Math.floor(Math.random() * 1000000),
    name: "John Doe",
  },
]);

class User {
  constructor(id, name) {
    (this.id = id), (this.name = name);
  }
}

const createNewUser = () => {
  let user = new User(Math.floor(Math.random() * 1000000));
  localStorage.setItem("user", JSON.stringify(user));
  console.log("hello");
};
</script>

<style scoped>
.modal-wrapper {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.77);
  z-index: 10;
  display: flex;
  align-items: center;
  justify-content: center;
}
.modal {
  background-color: white;
  height: 80vh;
  width: 80vw;
  border-radius: 20px;
}
h4 {
  padding: 0 20px 0 20px;
}
.name-container {
  display: flex;
  justify-content: space-between;
  padding: 0 20px 0 20px;
}
.additonal-info-container {
  display: flex;
  justify-content: space-between;
  padding: 10px 20px 0 20px;
}
input {
  border-radius: 5px;
  width: 80%;
  border: 1px solid black;
}
.time-picker-container {
  padding: 10px 20px 0 20px;
}
.buttons {
  width: 100%;
  display: flex;
  display: flex;
  justify-content: center;
  align-items: center;
}
.btn {
  width: 150px;
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  border: 1px solid black;
  margin-top: 50px;
}
</style>
