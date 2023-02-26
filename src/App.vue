

<template>
  <div class="container col-md-6 offset-md-3 mt-5">
    <div class="input-group">
      <input v-model="newTodoInput" type="text" placeholder="Add name" class="form-control">
      <button @click="addTodo" class="btn btn-success">Add</button>
    </div>
    <h1>Name List</h1>
    <div v-for="todo in todos" class="card my-3" :class="{ 'border-success text-success': todo.completed}">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h5 :class="{ 'line-through': todo.completed }">{{ todo.name }}</h5>
          </div>
          <div class="col-6 col-md-4">
            <button @click="toggleCompleted(todo.id)" class="btn"
            :class="todo.completed ? 'btn-success' : 'btn-secondary'">&check;</button>
            <button @click="removeTodo(todo.id)" class="btn btn-danger m-2">&cross;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { db } from './firebase/index.js'
import { collection, onSnapshot, query, addDoc, updateDoc } from "firebase/firestore"


  onMounted (async () => {

    const q = query(collection(db, "todo"));
    const unsubscribe = onSnapshot(q,(querySnapshot) => {
      const todosTmp = [];
      querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
        const todo = {

          id: doc.id,
          name: doc.data().name,
          completed: doc.data().completed
        }

        todosTmp.push(todo)
      });

      todos.value = todosTmp
    })
  })

  const newTodoInput = ref('')
  const todos = ref([])

  const addTodo = async () => {

    if (newTodoInput.value != "") {
      
      const docRef = await addDoc(collection(db, "todo"), {
        name: newTodoInput.value,
        completed:false

      })

      console.log(docRef.id)
      newTodoInput.value = ""
    }
  }



const removeTodo = id => {
  todos.value = todos.value.filter(todo => todo.id !== id)
}

const toggleCompleted = id => {
  const index = todos.value.findIndex(todo => todo.id === id)
  //todos.value[index].completed = !todos.value[index].completed  
  updateDoc(doc(collection(db, "todo"), id),{
    completed: !todos.value[index].completed  
  });
}
</script>
<style>
.line-through {
  text-decoration: line-through;
}
</style>


