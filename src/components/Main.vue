<script setup>
import { reactive } from "vue";

const expenses = reactive([
  {
    description: "Food",
    total: 0,
  },
]);

const newExpenseInitialState = { description: "Enter description", total: 0 };
const newExpenseState = reactive(newExpenseInitialState);

function addExpense() {
  // add new expense, then reset state
  people.push({
    description: newExpenseState.description,
    total: newExpenseState.total,
  });
  newExpenseState.value = newExpenseInitialState;
}

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

  <div class="border border-purple-300 relative">
    <div class="border border-gray-300 flex ml-48">
      <div v-for="(item, i) in expenses" :key="i" class="flex flex-col h-14">
        <input v-model="item.description" />
        <input v-model="item.total" />
      </div>
    </div>

    <div class="border border-gray-300 flex flex-col">
      <div v-for="(person, index) in people" :key="index" class="flex">
        <div class="border border-yellow-500 flex flex-col w-48">
          <input v-model="person.name" />
          <input v-model="person.spent" />
        </div>
        <div class="border border-pink-500 flex-grow">
          <div v-for="(item, j) in expenses" :key="j">
            <input type="checkbox" />
          </div>
        </div>
      </div>
    </div>
    <div class="flex flex-col absolute right-[-12rem] top-0">
      <input v-model="newExpenseState.description" />
      <input v-model="newExpenseState.total" />
      <button @click="addExpense">+</button>
    </div>

    <div class="flex flex-col absolute">
      <input v-model="newPersonState.name" />
      <input v-model="newPersonState.spent" />
      <button @click="addPerson">+</button>
    </div>
  </div>
</template>

<style scoped></style>
