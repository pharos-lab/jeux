<template>
    <main class="flex items-center flex-col">
        <div class="mastermind-grid bg-slate-300 divide-slate-400 divide-y">
            <div class="row flex divide-x divide-slate-300" v-for="n in 10">
                <div class="combination flex gap-4 p-2" ref="combinationsGrid">
                    <div class="size-7 rounded-full border bg-white" v-for="n in 4"></div>
                </div>
                <div class="result flex flex-wrap justify-center w-14 p-2" ref="resultsGrid">
                    <div class="size-4 rounded-full border" v-for="n in 4"></div>
                </div>
            </div>
        </div>

        <div class="mastermind-choice flex gap-4 mt-8">
            <button @click="add('red')" class="bg-red-500 rounded size-7"></button>
            <button @click="add('orange')" class="bg-orange-500 rounded size-7"></button>
            <button @click="add('green')" class="bg-green-500 rounded size-7"></button>
            <button @click="add('blue')" class="bg-blue-500 rounded size-7"></button>
            <button @click="add('yellow')" class="bg-yellow-500 rounded size-7"></button>
            <button @click="add('purple')" class="bg-purple-500 rounded size-7"></button>
        </div>
        <div class="flex gap-4 justify-center mt-4">
            <button class="px-3 py-2 rounded bg-slate-100" @click="undo">undo</button>
            <button class="px-3 py-2 rounded bg-slate-100"@click="submitCombination">go</button>
            <button  class="px-3 py-2 rounded bg-slate-100" @click="test">test</button>
        </div>
    </main>
</template>

<script setup>
    import { ref } from 'vue'

    const combination = ref([])
    const combinationToFind = ['red', 'blue', 'green', 'red']
    const combinations = ref([])
    const combinationsGrid = ref()
    const results = ref([])
    const resultsGrid = ref()
    const currentResult = ref({
        'good': 0,
        'bad': 0
    })
    const currentLine = ref(9)
    const lineIndex = ref(0)
    const colorMap = {
        'red': 'bg-red-500',
        'orange': 'bg-orange-500',
        'green': 'bg-green-500',
        'blue': 'bg-blue-500',
        'yellow': 'bg-yellow-500',
        'purple': 'bg-purple-500'
    }
    const lastColor = ref('')

    const add = (color) => {
        if (lineIndex.value < 4) {
            lastColor.value = color
            combination.value.push(color)
            combinationsGrid.value[currentLine.value].children[lineIndex.value].classList.add(colorMap[color])
            lineIndex.value++
        }
    }

    const undo = () => {
        if (lineIndex.value >= 1) {
            combinationsGrid.value[currentLine.value].children[lineIndex.value - 1].classList.remove(colorMap[lastColor.value])
            combination.value.pop()
            lineIndex.value--
            lastColor.value = combination.value.at(-1)

        }
    }

    const submitCombination = () => {
        if (lineIndex.value == 4) {
            const userCombination = [...combination.value]
            const cpuCombination = [...combinationToFind]
            goodPlacePawn(userCombination, cpuCombination)
            wrongPlacePawn(userCombination, cpuCombination)
            drawResult()
            console.log(currentResult.value)
            lineIndex.value = 0
            currentLine.value--
            currentResult.value = {
            'good': 0,
            'bad': 0
            }
        }
        console.log(combination.value)
        console.log(combinationToFind)
    }

    const goodPlacePawn = (userCombination, cpuCombination) => {
        userCombination.forEach((element, index) => {
            if (element == cpuCombination[index]) {
                userCombination[index] = 'a'
                cpuCombination[index] = 'b'
                currentResult.value['good']++
            }
        })
    }

    const wrongPlacePawn = (userCombination, cpuCombination) => {
        userCombination.forEach((element, index) => {
            if (cpuCombination.includes(element)) {
                userCombination[index] = 'x'
                cpuCombination[cpuCombination.indexOf(element)] = 'y'
                currentResult.value['bad']++
            }
        })
    }

    const drawResult = () => {
        for (let i = 0; i<currentResult.value['good']; i++) {
            resultsGrid.value[currentLine.value].children[i].classList.add('bg-gray-200')
        }
        for (let i = 0; i<currentResult.value['bad']; i++) {
            resultsGrid.value[currentLine.value].children[i + currentResult.value['good']].classList.add('bg-black')
        }
    }

    const test = () => {
        console.table(
            'current line: ' + currentLine.value,
            'current Index: '+ lineIndex.value,
            'currrent result: ' + currentResult.value
        )
    }
</script>