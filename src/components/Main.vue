<script setup>
import { reactive, computed } from "vue";

import Cell from "./Cell.vue";
import AddButton from "./AddButton.vue";
import RemoveButton from "./RemoveButton.vue";
import Editable from "./Editable.vue";

const expenses = reactive([
  {
    description: "Drinks",
    total: 123.5,
  },
  {
    description: "Food",
    total: 231.67,
  },
]);

function addExpense() {
  // add new expense
  expenses.push({ description: "Expense", total: 0 });

  // amend excluded matrix
  excludedMatrix.push(Array(expenses.length).fill(false));
}

function removeExpense(expenseIdx) {
  expenses.splice(expenseIdx, 1);

  excludedMatrix.splice(expenseIdx, 1);
}

const people = reactive([
  {
    name: "Olivia",
    spent: 0,
  },
  {
    name: "Chris",
    spent: 0,
  },
  {
    name: "Mike",
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
  people.splice(personIdx, 1);

  excludedMatrix.forEach((row) => {
    row.splice(personIdx, 1);
  });
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
  <div class="my-auto relative grid grid-cols-1">
    <!-- App title -->
    <div class="flex flex-col col-span-1 pt-2">
      <span class="text-[30px]">1 / N</span>
      <span>calculator</span>
    </div>

    <!-- Header for people -->
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

    <!-- Header for expenses -->
    <div class="flex flex-col col-span-1 row-span-1">
      <Cell
        v-for="(expense, expenseIdx) in expenses"
        :key="expenseIdx"
        class="flex items-stretch"
        size="l"
      >
        <div class="flex flex-col">
          <Editable
            v-model="expense.description"
            class="border-t-[1px] border-[#66668b]"
          />
          <Editable v-model="expense.total" />
        </div>
        <RemoveButton @click="removeExpense(expenseIdx)" />
      </Cell>
    </div>

    <!-- Expense per person -->
    <div class="col-start-2 col-end-auto row-start-2 flex">
      <div
        v-for="(expensesPerPerson, personIdx) in expensePerPersonMatrix"
        :key="personIdx"
      >
        <div class="flex-grow flex flex-col">
          <Cell
            v-for="(expensePerPerson, expenseIdx) in expensesPerPerson"
            :key="expenseIdx"
            class="flex justify-center items-center cursor-pointer transition-all hover:bg-[#66668b] border-r-[1px] border-b-[1px] border-[#66668b]"
            @click="excludePersonFromExpense(personIdx, expenseIdx)"
          >
            {{ expensePerPerson }}
          </Cell>

          <Cell class="absolute top-[100%] font-bold">
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

    <!-- Buttons -->
    <AddButton
      size="l"
      class="absolute left-0 top-[100%]"
      @click="addExpense"
    />
    <AddButton class="absolute right-0 bottom-[100%]" @click="addPerson" />
  </div>

  <section>
    Made with ☕ by
    <a href="https://github.com/mikemklee/one-over-n" target="_blank">@leemun1</a>
  </section>
</template>

<style scoped></style>
