<template>
  <div id="technologies">
    <body>
    <div class="container">
      <h3 class="text-center mb-3">Tecnologías</h3>
      <hr>
      <div v-if="newTechnologyView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
        <div class="col-lg-6">
          <div class="mb-3">
          <label class="form-label">Margen Bruto</label>
          <input v-model="technology.name" class="form-control">
          </div>
        </div>
          <div class="row">
            <div class="col-sm-12 text-center">
            <button class="btn btn-primary btn-lg mb-2" @click="createTechnology" >Crear</button>&nbsp;
            <button @click="btnRegresar" class="btn btn-danger btn-lg mb-2" >Regresar</button>
            </div>
          </div>
          </div>
      </div>

      <div v-if="tableView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Editar/Eliminar</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="element in technologiesArray" :key="element.id">
              <td>{{ element.name }}</td>
              <td>
                <button class="btn btn-success" @click="btnEditTechnology(element)">Editar</button>&nbsp;
                <button class="btn btn-danger" @click="deleteTechnology(element.id)">Eliminar</button>&nbsp;
                </td>
            </tr>
            </tbody>
          </table>
          <button @click="btnIrANuevo" class="btn btn-primary btn-lg mb-3" >Nueva Tecnología</button>
        </div>
      </div>

<div v-if="editTechnologyView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <div class="col-lg-6">
            <div class="mb-3">
          <label class="form-label">Margen Bruto</label>
          <input v-model="technology.name" class="form-control">
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-center">
            <button class="btn btn-primary btn-lg mb-2" @click="editTechnology" >Editar</button>&nbsp;
            <button @click="btnRegresarEdit" class="btn btn-danger btn-lg mb-2" >Regresar</button>
            </div>
          </div>
          </div>
      </div>

    </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";


export default {
  data(){
    return{
      tableView: true,
      newTechnologyView: false,
      editTechnologyView: false,
      technology:{
        name: null,
      },
      idObj: {
        id: null,
      },
      technologiesArray: null,
    };
  },
  methods:{
    createTechnology() {
      axios.post("http://localhost:3000/technologies", this.technology).then((result) => {
      console.log(result);
      this.pullTechnologies();
      });
      alert("tecnologia guardada");
      this.newTechnologyView = false;
      this.tableView = true;
},
    pullTechnologies(){
      axios.get("http://localhost:3000/technologies").then((result) => {
        this.technologiesArray = result.data;
        console.log(result);
      });
},
    deleteTechnology(id) {
      this.idObj.id = id;
      axios.delete("http://localhost:3000/technologies/" + this.idObj.id, this.idObj).then((result) => {
         console.log(result);
         this.pullTechnologies();
        alert("Eliminado correctamente");
      });
    },
    editTechnology(){
      axios.put("http://localhost:3000/technologies/" + this.technology.id , this.technology).then((result) => {
        console.log(result);
        alert("Editado correctamente");
         this.pullTechnologies();
      this.tableView = true;
      this.editTechnologyView = false;
      });
    },
    btnRegresar(){
      this.tableView = true;
      this.newTechnologyView = false;
    },
    btnIrANuevo(){
      this.technology.name = null;
      this.tableView = false;
      this.newTechnologyView = true;
    },
    btnEditTechnology(tech){
      this.editTechnologyView = true;
      this.tableView = false;
      this.technology.id = tech.id;
      this.technology.name = tech.name;
    },
    btnRegresarEdit(){
      this.tableView = true;
      this.editTechnologyView = false;
    },

  },
  created(){
    this.pullTechnologies();
  }
}
</script>
