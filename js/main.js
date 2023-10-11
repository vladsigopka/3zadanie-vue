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