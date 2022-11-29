<script setup>
import { reactive, computed, onMounted } from "vue";

import Cell from "./Cell.vue";

const expenses = reactive([
  {
    description: "Drinks",
    total: 135.3,
  },
  {
    description: "Tokyo sushi",
    total: 214.25,
  },
  {
    description: "Pizza",
    total: 50.49,
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

  // amend excluded matrix

  // amend expenses matrix
}

const people = reactive([
  {
    name: "Min",
    spent: 0,
  },
  {
    name: "Hya",
    spent: 0,
  },
  {
    name: "Jess",
    spent: 0,
  },
  {
    name: "So",
    spent: 0,
  },
  {
    name: "Darren",
    spent: 0,
  },
  {
    name: "Bum",
    spent: 0,
  },
  {
    name: "Mun",
    spent: 0,
  },
]);

const newPersonInitialState = { name: "Enter name", spent: 0 };
const newPersonState = reactive(newPersonInitialState);

function addPerson() {
  // add new person, then reset state
  people.push({ name: newPersonState.name, spent: newPersonState.spent });
  newPersonState.value = newPersonInitialState;

  // amend excluded matrix

  // amend expenses matrix
}

function generateExcludedMatrix() {
  const matrix = [];

  for (let expenseIdx = 0; expenseIdx < expenses.length; expenseIdx++) {
    const row = []; // hold info on who is excluded from given expense
    for (let personIdx = 0; personIdx < people.length; personIdx++) {
      row.push(false);
    }
    matrix.push(row);
  }

  return matrix;
}

const excludedMatrix = reactive(generateExcludedMatrix());

function excludePersonFromExpense(personIdx, expenseIdx) {
  excludedMatrix[expenseIdx][personIdx] =
    !excludedMatrix[expenseIdx][personIdx];
}

const expensePerPersonMatrix = computed(() => {
  const matrix = [];

  for (let personIdx = 0; personIdx < people.length; personIdx++) {
    const row = []; // hold expense per person
    for (let expenseIdx = 0; expenseIdx < expenses.length; expenseIdx++) {
      const expense = expenses[expenseIdx];

      const numExcluded = excludedMatrix[expenseIdx].reduce((acc, cur) => {
        return cur === true ? acc + 1 : acc;
      }, 0);

      const expensePerPerson = parseFloat(
        expense.total / (people.length - numExcluded)
      ).toFixed(2);

      if (excludedMatrix[expenseIdx][personIdx]) {
        row.push("-");
      } else {
        row.push(expensePerPerson);
      }
    }
    matrix.push(row);
  }

  return matrix;
});
</script>

<template>
  <div class="relative table-layout">
    <div class="flex flex-col col-span-1 pt-2">
      <span class="text-[30px]">1 / N</span>
      <span>calculator</span>
    </div>
    <div class="flex col-start-2 col-end-auto">
      <Cell v-for="(item, i) in expenses" :key="i" class="flex flex-col">
        <input v-model="item.description" class="editable" />
        <input v-model="item.total" class="editable" />
      </Cell>
    </div>

    <div class="flex flex-col col-span-1 row-span-1">
      <div v-for="(person, index) in people" :key="index" class="flex">
        <Cell class="flex flex-col">
          <input v-model="person.name" class="editable" />
          <input v-model="person.spent" class="editable" />
        </Cell>
      </div>
    </div>

    <div class="col-start-2 col-end-auto row-start-2 flex flex-col">
      <div
        v-for="(expensesPerPerson, personIdx) in expensePerPersonMatrix"
        :key="personIdx"
      >
        <div class="flex-grow flex">
          <Cell
            v-for="(expensePerPerson, expenseIdx) in expensesPerPerson"
            :key="expenseIdx"
            class="flex justify-center items-center"
            @click="excludePersonFromExpense(personIdx, expenseIdx)"
          >
            {{ expensePerPerson }}
          </Cell>

          <Cell class="absolute left-[100%]" :withBorder="false">
            {{
              parseFloat(
                expensesPerPerson.reduce((acc, amount) => {
                  return amount !== "-" ? acc + parseFloat(amount) : acc;
                }, 0)
              ).toFixed(2)
            }}
          </Cell>
        </div>
      </div>
    </div>

    <button class="btn absolute right-0 bottom-[100%]" @click="addExpense">
      +
    </button>

    <button class="btn absolute left-0 top-[100%]" @click="addPerson">+</button>
  </div>
</template>

<style scoped>
.table-layout {
  display: grid;
  grid-template-columns: auto 1fr;
}

.editable {
  width: 100%;
  height: 50%;
  padding-left: 10px;
  padding-right: 10px;
}

.btn {
  width: 10rem;
  height: 2rem;
  background-color: #747474;
}
.btn:hover {
  background-color: #414141;
}
</style>
