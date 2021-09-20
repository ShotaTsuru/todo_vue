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
      nextTodoId: Math.max(...todos.map((p)=> p.id)),
      editIndex: -1,
    }
  },
  computed: {
    changeButton() {
      return this.editIndex === -1 ? "Add" : "Edit"
    }
  },
  methods: {
    addNewTodo() {
      if(this.editIndex === -1) {
        this.todos.push({
          id: this.nextTodoId++,
          title: this.newTodoText
        })
        localStorage.setItem(this.nextTodoId, this.newTodoText);
      } else {
        this.todos.splice(this.editIndex, 1, {
          id: this.nextTodoId,
          title: this.newTodoText
        });
        localStorage.setItem(this.nextTodoId, this.newTodoText);
      }
      this.editIndex = -1;
      this.newTodoText = '';
    },
    removeTodo(id) {
      console.log(id);
      localStorage.removeItem(id);
    },
    editTodo(index) {
      this.editIndex = index;
      this.newTodoText = this.todos[index]['title'];
      this.$refs.editor.focus();
      console.log(1);

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
  emits: ['remove', 'edit']
})

app.mount('#todo-list-example')
