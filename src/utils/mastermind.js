import { ref, computed } from 'vue'

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

const combinationColor = (indexes) => {
    return computed(() => {
        return colorMap[combinations[indexes[0] -1][indexes[1] - 1]]
    })
}

const resultColor = (indexes) => {
    return computed(() => {
        return colorMap[results[line -1 ][resultCase - 1]]
    })
}

export { add, undo, submitCombination, combinationColor, resultColor }