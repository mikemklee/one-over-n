<script setup>
import { reactive, computed } from "vue";

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
  expenses.push({
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

const expensePerPersonMatrix = computed(() => {
  const matrix = [];

  for (let i = 0; i < people.length; i++) {
    const row = [];
    for (let j = 0; j < expenses.length; j++) {
      row.push(expenses[j]);
    }
    matrix.push(row);
  }

  return matrix;
});
</script>

<template>
  <h1 class="text-left mb-10">1 / N</h1>

  <div class="relative table-layout">
    <div class="col-span-1 cell">
      <!-- placeholder for layout -->
    </div>
    <div class="flex col-start-2 col-end-auto">
      <div v-for="(item, i) in expenses" :key="i" class="flex flex-col cell">
        <input v-model="item.description" class="editable" />
        <input v-model="item.total" class="editable" />
      </div>
    </div>

    <div class="flex flex-col col-span-1 row-span-1">
      <div v-for="(person, index) in people" :key="index" class="flex">
        <div class="flex flex-col cell">
          <input v-model="person.name" class="editable" />
          <input v-model="person.spent" class="editable" />
        </div>
      </div>
    </div>

    <div class="col-start-2 col-end-auto row-start-2 flex flex-col">
      <div v-for="(row, rowIdx) in expensePerPersonMatrix" :key="rowIdx">
        <div class="flex-grow flex">
          <div
            v-for="(item, j) in row"
            :key="j"
            class="cell flex justify-center items-center"
          >
            {{ parseFloat(item.total / people.length).toFixed(2) }}
          </div>
        </div>
      </div>
    </div>

    <div class="flex flex-col absolute left-[100%] top-0">
      <button class="btn" @click="addExpense">+</button>
    </div>

    <div class="absolute right-[100%] bottom-0">
      <button class="btn" @click="addPerson">+</button>
    </div>
  </div>
</template>

<style scoped>
.table-layout {
  display: grid;
  grid-template-columns: auto 1fr;
}

.cell {
  border: 1px solid #414141;
  width: 10rem;
  height: 4rem;
}

.editable {
  width: 100%;
  height: 50%;
  padding-left: 10px;
  padding-right: 10px;
}

.btn {
  width: 2rem;
  height: 4rem;
  background-color: #747474;
}
.btn:hover {
  background-color: #414141;
}
</style>
