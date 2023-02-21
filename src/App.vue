<template>
  <div class="container col-md-4 offset-md-3 mt-4">
    <div class="input-group">
      <input v-model="newstudentsInput" type="text" placeholder="Add New Student" class="form-control">
      <button @click="addstudents" class="btn btn-success">ADD STUDENT</button>
    </div>
    <h1 class="">List of students</h1>
    <div v-for="student in students" class="student my-3" :class="{ 'border-success text-success': student.completed }">
      <div class="card-body">
        <div class="row">
          <div class="col-md-8">
            <h5 :class="{ 'line-through': student.completed}">{{ student.studentName }}</h5>
          </div>
          <div class="col-6 col-md-4">
            <button @click="toggleCompleted(student.id)" class="btn"
              :class="student.completed ? 'btn-success' : 'btn-secondary'">&check;</button>
            <button @click="removestudents(student.id)" class="btn btn-danger m-2">&cross;</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, transformVNodeArgs } from 'vue'
import { db } from './firebase/index.js'
import { collection, getDocs, addDoc, onSnapshot, deleteDoc, doc, QuerySnapshot } from "firebase/firestore";

onMounted(async () => {
  const q = (collection(db, "students"));
  onSnapshot(q,(querySnapshot)=>{
    const studentsTmp = []
  querySnapshot.forEach((doc) => {
    console.log(doc.id, " => ", doc.data());
    const student = {
      id: doc.id,
      studentName: doc.data().studentName,
      completed: doc.data().completed
    }
    studentsTmp.push(student)
  });
  students.value = studentsTmp
  })
})

const newstudentsInput = ref('')
const students = ref([])

const id = ref(1)
const addstudents = async () => {
  if (newstudentsInput.value != '') {
 
    await addDoc(collection(db, "students"),{
      studentName: newstudentsInput.value,
      completed: false
    })
    newstudentsInput.value = ''
  }
}

const removestudents = id => {
  //students.value = students.value.filter(student => student.id !== id)
  deleteDoc(doc(db,"students", id))
}

const toggleCompleted = id => {
  const index = students.value.findIndex(student => student.id === id)
  students.value[index].completed = !students.value[index].completed
}

</script>

<style>
.line-through {
  text-decoration: line-through;
}
body {
  background-image: url('https://images.squarespace-cdn.com/content/v1/554aee23e4b022bdc70d0e3d/1431211180915-86I3ICJ8LKO3L85D8O0K/Position-1_-20mod.jpg?format=1500w');
  background-repeat: no-repeat;
  background-attachment: fixed;
  background-size: 100% 100%;
  font-family: 'Nunito', sans-serif;
  margin:0; padding:0;
  box-sizing: border-box;
  outline: none; border:none;
  text-decoration: none;
  text-transform: capitalize;

}
.container{
  place-content: center;
  background-color:rgb(173, 220, 220);
}
h1{
  background-color:teal;
  place-content: center;
}

</style>

