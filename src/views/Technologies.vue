<template>
  <div id="technologies">
    <body>
    <div class="container">
      <h3 class="text-center mb-3">Tecnologías</h3>
      <hr>
      <div v-if="tableView" class="d-flex justify-content-around">
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

      <div v-if="!tableView" class="d-flex justify-content-around">
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
              <td><a href="">Editar</a><a href="">Eliminar</a><a href="">Detalle</a></td>
            </tr>
            </tbody>
          </table>
          <button @click="btnIrANuevo" class="btn btn-success btn-lg mb-3" >Nueva Tecnología</button>
        </div>
      </div>

<!--      <div class="text-center mt-5">-->
<!--        <button v-if="!tableView" class="btn btn-success btn-lg font-weight-bold  shadow-lg" @click="viewTechnologies" >Ver Tecnologías</button>-->
<!--      </div>-->
    </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data(){
    return{
      tableView: false,
      technology:{
        name: null
      },
      technologiesArray: null,
    };
  },
  methods:{
    createTechnology(){
      axios.post("http://localhost:3000/technologies", this.technology).then((result) => {
        console.log(result);
      });
      alert('Creado correctamente');
    },
    pullTechnologies(){
      axios.get("http://localhost:3000/technologies").then((result) => {
        this.technologiesArray = result.data;
        console.log(result);
      });
},
    btnRegresar(){
      this.tableView = false;
    },
    btnIrANuevo(){
      this.tableView = true;
    }

  },
  created(){
    this.pullTechnologies();
  }
}
</script>
