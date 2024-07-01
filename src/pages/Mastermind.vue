<template>
    <main class="flex items-center flex-col">
        <button @click="mode = 'cpu'" v-show="mode == 'user'">change to cpu</button>
        <button @click="mode = 'user'" v-show="mode == 'cpu'">change to user</button>
        <div class="mastermind-grid bg-slate-300 divide-slate-400 divide-y">
            <div class="row flex divide-x divide-slate-300" v-for="line in 10">
                <div class="combination flex gap-4 p-2" ref="combinationsGrid">
                    <div class="size-7 rounded-full border " v-for="combinationCase in 4"
                        :class="colorMap[combinations[line - 1][combinationCase - 1]]"></div>
                </div>
                <div class="result flex flex-wrap justify-center w-14 p-2" ref="resultsGrid">
                    <div class="size-4 rounded-full border" v-for="resultCase in 4"
                        :class="colorMap[results[line - 1][resultCase - 1]]"></div>
                </div>
            </div>
        </div>

        <div class="mastermind-choice flex gap-4 mt-8" v-show="mode == 'user'">
            <button @click="add('red')" class="bg-red-500 rounded size-7"></button>
            <button @click="add('orange')" class="bg-orange-500 rounded size-7"></button>
            <button @click="add('green')" class="bg-green-500 rounded size-7"></button>
            <button @click="add('blue')" class="bg-blue-500 rounded size-7"></button>
            <button @click="add('yellow')" class="bg-yellow-500 rounded size-7"></button>
            <button @click="add('purple')" class="bg-purple-500 rounded size-7"></button>
        </div>

        <div class="mastermind-choice flex gap-4 mt-8" v-show="mode == 'cpu'">
            <button @click="add('red')" class="bg-slate-200 rounded size-7"></button>
            <button @click="add('orange')" class="bg-black rounded size-7"></button>
        </div>



        <div class="flex gap-4 justify-center mt-4" v-show="mode == 'user'">
            <button class="px-3 py-2 rounded bg-slate-100" @click="undo">undo</button>
            <button class="px-3 py-2 rounded bg-slate-100" @click="submitCombination" >go</button>
        </div>

        <div class="flex gap-4 justify-center mt-4" v-show="mode == 'cpu'">
            <button class="px-3 py-2 rounded bg-slate-100" @click="undoResult">undo</button>
            <button class="px-3 py-2 rounded bg-slate-100" @click="submitResult" >go result</button>
        </div>
        <div class="self-stretch p-4">

            <pre>to find: {{ combinationToFind }}</pre>
            {{ combinations }}
        {{ results }}
        </div>
    </main>
</template>

<script setup>
import { ref } from 'vue'

const mode = ref('user')
const colors = ['red', 'orange', 'yellow', 'green', 'blue', 'purple']
const combinationToFind = [...Array(4)].map(color => colors[Math.floor(Math.random() * 6)])
const combinations = ref([...Array(10)].map(line => Array(4).fill('')))
const results = ref([...Array(10)].map(line => Array(4).fill('')))
const currentLine = ref(9)
const combinationIndex = ref(0)
const resultIndex = ref(0)
const colorMap = {
    'red': 'bg-red-500',
    'orange': 'bg-orange-500',
    'green': 'bg-green-500',
    'blue': 'bg-blue-500',
    'yellow': 'bg-yellow-500',
    'purple': 'bg-purple-500',
    'good': 'bg-white',
    'bad': 'bg-black',
    '': ''
}

const add = (color) => {
    if (combinationIndex.value < 4 && currentLine.value >= 0) {
        combinations.value[currentLine.value][combinationIndex.value] = color
        combinationIndex.value++
    }
}

const undo = () => {
    if (combinationIndex.value >= 1) {
        combinationIndex.value--
        combinations.value[currentLine.value][combinationIndex.value] = ''
        lastColor.value = combination.value.at(-1)
    }
}

const submitCombination = () => {
    if (combinationIndex.value == 4) {
        const userCombination = [...combinations.value[currentLine.value]]
        const cpuCombination = [...combinationToFind]
        goodPlacePawn(userCombination, cpuCombination)
        wrongPlacePawn(userCombination, cpuCombination)
        combinationIndex.value = 0
        resultIndex.value = 0
        currentLine.value--
    }
}

const goodPlacePawn = (userCombination, cpuCombination) => {
    userCombination.forEach((element, index) => {
        if (element == cpuCombination[index]) {
            userCombination[index] = 'a'
            cpuCombination[index] = 'b'
            results.value[currentLine.value][resultIndex.value] = 'good'
            resultIndex.value++
        }
    })
}

const wrongPlacePawn = (userCombination, cpuCombination) => {
    userCombination.forEach((element, index) => {
        if (cpuCombination.includes(element)) {
            userCombination[index] = 'x'
            cpuCombination[cpuCombination.indexOf(element)] = 'y'
            results.value[currentLine.value][resultIndex.value] = 'bad'
            resultIndex.value++
        }
    })
}

const test = () => {
    console.table(
        'current line: ' + currentLine.value,
        'current Index: ' + combinationIndex.value,
        'currrent result: ' + currentResult.value
    )
}
</script>