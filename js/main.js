let eventBus = new Vue()


Vue.component('cols', {
    template: `
 <section id="main" class="main-alt">
        <p class="main__text">Kanban</p>
    <div class="columns">
    <newCard></newCard>
        <column_1 :column_1="column_1"></column_1>
        <column_2 :column_2="column_2"></column_2>
        <column_3 :column_3="column_3"></column_3>  
        <column_4 :column_4="column_4"></column_4>       
    </div>
 </section>
   `,
    data() {
        return {
            column_1: [],
            column_2: [],
            column_3: [],
            column_4: [],
        }
    },
    mounted() {
        eventBus.$on('addColumn_1', card => {
            // Добавление карточки в column_1
            this.column_1.push(card)
        })
        eventBus.$on('addColumn_2', card => {
            // Добавление карточки в column_2
            this.column_2.push(card)
        })
        eventBus.$on('addColumn_3', card => {
            // Добавление карточки в column_3
            this.column_3.push(card)
        })
        eventBus.$on('addColumn_4', card => {
            // Добавление карточки в column_4
            this.column_4.push(card)

            if (card.date > card.deadline) {
                card.period = false
            }
        })
    },
})

Vue.component('column_1', {
    template: `
        <section id="main" class="main-alt">
            <div class="column column__one">
            <p>Запланированные задачи</p>
                <div class="card" v-for="card in column_1">
                   <a @click="deleteCard(card)" style="color: red">Удалить</a>  <a @click="card.edit = true" style="color: green">Редактировать</a>
                   <div class="tasks">Название: {{ card.name }}</div>

                    <div class="tasks">Описание: {{ card.description }}</div>
                    <div class="tasks">Дата создания: {{ card.date }}</div>
                    <div class="tasks">Крайний срок: {{ card.deadline }}</div>
                    <div class="tasks" v-if="card.editDate != null">Последнее изменение: {{ card.editDate }}</div>
                                     <a @click="nextColumn(card)" style="color: mediumblue">Следующая колонка</a>
                    <div class="tasks" v-if="card.edit">
                        <form @submit.prevent="updateTask(card)">
                            <p>Новое название: 
                                <input type="text" v-model="card.name" placeholder="Название">
                            </p>
                            <p>Новое описание: 
                                <textarea v-model="card.description"></textarea>
                            </p>
                            <p>
                                <input type="submit" class="btn" value="Изменить карточку">
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    `,
    props: {
        column_1: {
            type: Array,
        },
        column_2: {
            type: Array,
        },
        card: {
            type: Object
        },
    },
    methods: {
        nextColumn(card) {
            this.column_1.splice(this.column_1.indexOf(card), 1)
            eventBus.$emit('addColumn_2', card)
        },
        deleteCard(card) {
            this.column_1.splice(this.column_1.indexOf(card), 1)
        },
        updateTask(card) {
            card.edit = false
            this.column_1.push(card)
            this.column_1.splice(this.column_1.indexOf(card), 1)
            card.editDate = new Date().toLocaleString()
        },
    },
})