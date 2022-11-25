<script setup>
import { reactive } from "vue";

const expenses = reactive([
  {
    description: "Food",
    total: 0,
  },
]);

const people = reactive([
  {
    name: "John",
    spent: 0,
  },
]);

const newPersonInitialState = { name: "Enter name", spent: 0 };
const newPersonState = reactive(newPersonInitialState);

function addPerson() {
  // add new person, then reset state
  people.push({ name: newPersonState.name, spent: newPersonState.spent });
  newPersonState.value = newPersonInitialState;
}
</script>

<template>
  <h1>1 / N</h1>

  <div>
    <h3>Expenses</h3>
    <div v-for="item in expenses">
      <div>
        <input v-model="item.description" />
      </div>
      <div>
        <input v-model="item.total" />
      </div>
    </div>
  </div>

  <div>
    <h3>People</h3>
    <div v-for="person in people">
      <div>
        <input v-model="person.name" />
      </div>
      <div>
        <input v-model="person.spent" />
      </div>
    </div>
  </div>

  <div>
    <h3>Add new person</h3>
    <div>
      <input v-model="newPersonState.name" />
      <input v-model="newPersonState.spent" />
    </div>
    <button @click="addPerson">Save</button>
  </div>
</template>

<style scoped></style>
