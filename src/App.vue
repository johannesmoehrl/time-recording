<template>
  <div class="wrapper">
    <header>
      <h1>Time Tracker</h1>
      <div class="icons">
        <i class="fa-solid fa-download"></i>
        <i class="fa-solid fa-gear"></i>
      </div>
    </header>
    <main>
      <div class="searchbar">
        <input type="text" id="search-name" placeholder="Search..." />
        <input
          type="text"
          id="search-time"
          placeholder="01.01.2024-01.02.2024"
        />
      </div>
      <div v-for="(user, index) in users" :key="user.id" class="time-display">
        <div class="name-work">
          <p>{{ user.value.name }}</p>
          <p class="date">{{ new Date().toLocaleDateString("de-DE") }}</p>
        </div>
        <div class="work-time">
          <div class="work-time-start-end">
            <p>
              {{ new Date(user.value.startTime).toLocaleTimeString("de-DE") }}
            </p>
            <p>
              {{ new Date(user.value.endTime).toLocaleTimeString("de-DE") }}
            </p>
          </div>
        </div>
        <div class="total-time">
          <p>Total Work Time: {{ formattedTimeDiff[index] }}</p>
        </div>
      </div>
    </main>
    <button @click="openModal" class="add-btn">+</button>
  </div>

  <ModalView :isOpen="isModalOpened" @modal-close="closeModal"></ModalView>
</template>

<script setup>
import ModalView from "./components/ModalView.vue";
import { ref, onMounted } from "vue";

const users = ref([]);
const isModalOpened = ref(false);
const formattedTimeDiff = ref([]);

const fetchAndUpdateUsers = () => {
  let items = { ...localStorage };
  users.value = Object.entries(items).map(([key, value]) => ({
    key,
    value: JSON.parse(value),
  }));
  formattedTimeDiff.value = [];

  for (let user of users.value) {
    const startTimeDateObject = new Date(user.value.startTime);
    const endTimeDateObject = new Date(user.value.endTime);

    const timeDifferenceInMilliseconds =
      endTimeDateObject - startTimeDateObject;

    // Convert milliseconds to seconds
    const timeDifferenceInSeconds = timeDifferenceInMilliseconds / 1000;
    const formattedTimeDiffValue = formatTime(timeDifferenceInSeconds);
    formattedTimeDiff.value.push(formattedTimeDiffValue);
  }

  function formatTime(seconds) {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const remainingSeconds = Math.floor(seconds % 60);

    const formattedTime =
      (hours > 0 ? hours + "h " : "") +
      (minutes > 0 ? minutes + "min " : "") +
      (remainingSeconds > 0 ? remainingSeconds + "s" : "");

    return formattedTime;
  }
};

const openModal = () => {
  isModalOpened.value = true;
};

const closeModal = () => {
  isModalOpened.value = false;
  fetchAndUpdateUsers();
};

onMounted(() => {
  fetchAndUpdateUsers();
});
</script>

<style scoped>
.wrapper {
  position: relative;
  height: 100vh;
  width: 100vw;
}
header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
header i {
  font-size: 32px;
  margin: 20px;
  cursor: pointer;
}

.searchbar {
  background-color: grey;
  height: 50px;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
}
.searchbar input {
  width: 100%;
  margin: 20px;
}

.time-display {
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-bottom: 1px solid black;
}
.add-btn {
  cursor: pointer;
  position: absolute;
  left: 50%;
  bottom: 15%;
  transform: translateX(-50%);
  border: none;
  width: 50px;
  height: 50px;
  color: white;
  background-color: black;
  border-radius: 50%;
  font-size: 20px;
}
</style>
