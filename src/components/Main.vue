<script setup>
import { reactive, computed } from "vue";

import Cell from "./Cell.vue";
import AddButton from "./AddButton.vue";
import RemoveButton from "./RemoveButton.vue";
import Editable from "./Editable.vue";

const expenses = reactive([
  {
    description: "Butterbeer",
    total: 135.3,
  },
  {
    description: "Polyfuice Potion",
    total: 214.25,
  },
  {
    description: "Fizzing Whizzbees",
    total: 50.49,
  },
]);

function addExpense() {
  // add new expense
  expenses.push({ description: "Expense", total: 0 });

  // amend excluded matrix
  excludedMatrix.push(Array(expenses.length).fill(false));
}

function removeExpense(expenseIdx) {
  console.log("remove expense!", expenseIdx);
}

const people = reactive([
  {
    name: "Harry",
    spent: 0,
  },
  {
    name: "Hermione",
    spent: 0,
  },
  {
    name: "Ron",
    spent: 0,
  },
  {
    name: "Voldemort",
    spent: 0,
  },
  {
    name: "Dumbledore",
    spent: 0,
  },
  {
    name: "Snape",
    spent: 0,
  },
]);

function addPerson() {
  // add new person
  people.push({
    name: "Person",
    spent: 0, // TODO: use pre-spending amounts?
  });

  // amend excluded matrix
  for (let expenseIdx = 0; expenseIdx < expenses.length; expenseIdx++) {
    excludedMatrix[expenseIdx].push(false);
  }
}

function removePerson(personIdx) {
  console.log("remove person!", personIdx);
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
      <div v-for="(person, personIdx) in people" :key="personIdx" class="flex">
        <Cell class="flex items-stretch">
          <div class="flex flex-col">
            <Editable v-model="person.name" />
          </div>
          <RemoveButton @click="removePerson(personIdx)" />
        </Cell>
      </div>
    </div>

    <div class="flex flex-col col-span-1 row-span-1">
      <Cell
        v-for="(expense, expenseIdx) in expenses"
        :key="expenseIdx"
        class="flex items-stretch"
        size="l"
      >
        <div class="flex flex-col">
          <Editable v-model="expense.description" />
          <Editable
            v-model="expense.total"
            class="border-t-[1px] border-gray-600"
          />
        </div>
        <RemoveButton @click="removeExpense(expenseIdx)" />
      </Cell>
    </div>

    <div class="col-start-2 col-end-auto row-start-2 flex">
      <div
        v-for="(expensesPerPerson, personIdx) in expensePerPersonMatrix"
        :key="personIdx"
      >
        <div class="flex-grow flex flex-col">
          <Cell
            v-for="(expensePerPerson, expenseIdx) in expensesPerPerson"
            :key="expenseIdx"
            class="flex justify-center items-center cursor-pointer transition-all hover:bg-gray-600"
            @click="excludePersonFromExpense(personIdx, expenseIdx)"
          >
            {{ expensePerPerson }}
          </Cell>

          <Cell class="absolute top-[100%]" :withBorder="false">
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

    <AddButton size="l" class="absolute left-0 top-[100%]" @click="addExpense">
      +
    </AddButton>

    <AddButton class="absolute right-0 bottom-[100%]" @click="addPerson">
      +
    </AddButton>
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
</style>
