<template>
    <main class="flex items-center flex-col">
        <div class="mastermind-grid bg-slate-200 divide-slate-300 divide-y">
            <div class="row flex divide-x divide-slate-300" v-for="n in 10">
                <div class="combination flex gap-4 p-2">
                    <div class="size-7 rounded-full border bg-white" v-for="n in 4"></div>
                </div>
                <div class="result flex flex-wrap justify-center w-14 p-2">
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
            <button class="px-3 py-2 rounded bg-slate-100">go</button>
        </div>
    </main>
</template>