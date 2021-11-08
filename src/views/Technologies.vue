<template>
  <div id="technologies">
    <body>
    <div class="container">
      <h3 class="text-center mb-3">Tecnologías</h3>
      <hr>
      <div v-if="newTechnologyView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <h4 class="m-3">Ingrese el nombre de una Tecnología</h4>
          <input v-model="technology.name" class="mb-3"  placeholder="Ejemplo: Javascript">
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
              <th scope="col">Editar/Eliminar/Detalle</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="element in technologiesArray" :key="element.id">
              <td>{{ element.name }}</td>
              <td>
                <button class="btn btn-success" @click="editTechnology(element)">Editar</button>&nbsp;
                <button class="btn btn-danger" @click="deleteTechnology(element.id)">Eliminar</button>&nbsp;
                <button class="btn btn-primary" @click="deleteTechnology(element.id)">Detalles</button>&nbsp;
                </td>
            </tr>
            </tbody>
          </table>
          <button @click="btnIrANuevo" class="btn btn-success btn-lg mb-3" >Nueva Tecnología</button>
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
      technology:{
        name: null
      },
      technologyEdit:{
        id : null,
        name: null
      },
      idObj: {
        id: null
      },
      technologiesArray: null,
    };
  },
  methods:{
    createTechnology(){
      axios.post("http://localhost:3000/technologies", this.technology).then((result) => {
        console.log(result);
        this.pullTechnologies();
      });
      alert("tecnologia guardada");
      // Swal.fire({
      //   position: 'top-center',
      //   icon: 'success',
      //   title: 'Tecnología guardada correctamente',
      //   showConfirmButton: false,
      //   timer: 1500
      // })
      // this.tableView = true;
      this.newTechnologyView = false;
      this.tableView = true,
    },
    pullTechnologies(){
      axios.get("http://localhost:3000/technologies").then((result) => {
        this.technologiesArray = result.data;
        console.log(result);
      });
},
    deleteTechnology(id){
      this.idObj.id = id;
      axios.delete("http://localhost:3000/technologies" + this.idObj.id, this.idObj).then((result) => {
        console.log(result);
         this.pullTechnologies();
        alert("Eliminado correctamente");
      });
    },
    editTechnology(tech){
      this.technologyEdit.id = tech.id;
      this.technologyEdit.name = this.technology.name;
      axios.put("http://localhost:3000/technologies/" + tech.id, this.technologyEdit).then((result) => {
        console.log(result);
        alert("Editado correctamente");
         this.pullTechnologies();
      });
    },
    btnRegresar(){
      this.tableView = true;
      this.newTechnologyView = false;
    },
    btnIrANuevo(){
      this.tableView = false;
      this.newTechnologyView = true;
    }

  },
  created(){
    this.pullTechnologies();
  }
}
</script>
