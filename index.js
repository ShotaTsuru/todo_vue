let todos = []
for( let i = 0; i < localStorage.length; i++ ){
  let id = localStorage.key(i);
  let obj = { id: id, title: localStorage.getItem(id) };
  todos.push(obj);
}
const app = Vue.createApp({
  data() {
    return {
      newTodoText: '',
      todos: todos,
      nextTodoId: Math.max(...todos.map((p)=> p.id))
    }
  },
  methods: {
    addNewTodo() {
      this.todos.push({
        id: this.nextTodoId++,
        title: this.newTodoText
      })
      localStorage.setItem(this.nextTodoId, this.newTodoText);
      this.newTodoText = '';
    },
    removeTodo(id) {
      console.log(id);
      localStorage.removeItem(id);
    },
    editTodo() {

    }
  }
})

app.component('todo-item', {
  template: `
    <li>
      {{ title }}
      <button @click="$emit('remove')">Remove</button>
      <button @click="$emit('edit')">Edit</button>
    </li>
  `,
  props: ['title'],
  emits: ['remove']
})

app.mount('#todo-list-example')
