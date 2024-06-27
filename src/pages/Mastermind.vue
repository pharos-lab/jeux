<template>
    <main class="flex items-center flex-col">
        <div class="mastermind-grid bg-slate-200 divide-slate-300 divide-y">
            <div class="row flex divide-x divide-slate-300" v-for="n in 10">
                <div class="combination flex gap-4 p-2" ref="combinations">
                    <div class="size-7 rounded-full border bg-white" v-for="n in 4"></div>
                </div>
                <div class="result flex flex-wrap justify-center w-14 p-2" ref="results">
                    <div class="size-4 rounded-full border bg-white" v-for="n in 4"></div>
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
    const combinations = ref()
    const results = ref()
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
            combinations.value[currentLine.value].children[lineIndex.value].classList.add(colorMap[color])
            lineIndex.value++
        }
    }

    const undo = () => {
        if (lineIndex >= 1) {
            combinations.value[currentLine.value].children[lineIndex.value - 1].classList.remove(colorMap[lastColor.value])
            combination.value.pop()
            lineIndex.value--
            lastColor.value = combination.value.at(-1)

        }
    }

    const submitCombination = () => {
        if (lineIndex.value == 4) {
            goodPlacePawn()
            wrongPlacePawn()
            lineIndex.value = 0
            currentLine.value--
        }
    }

    const goodPlacePawn = () => {
        console.log('good')
    }

    const wrongPlacePawn = () => {
        console.log('wrong')
    }

    const test = () => {
        console.table(
            'current line: ' + currentLine.value,
            'current Index: '+ lineIndex.value,
        )
    }
</script>