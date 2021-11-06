<template>
  <div id="technologies">
    <body>
    <div class="container">
      <h3 class="text-center mb-3">Tecnologías</h3>
      <hr>
      <div v-if="!tableView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <h4 class="m-3">Ingrese el nombre de una Tecnología</h4>
          <input class="mb-3"  placeholder="Ejemplo: Javascript">
          <button class="btn btn-primary btn-lg mb-3" @click="createTechnology" >Crear</button>
        </div>
      </div>

      <div v-if="tableView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
            </tr>
            </thead>
            <tbody>
            <tr>
              <th scope="row">1</th>
              <td>Mark</td>
              <td>Otto</td>
              <td>@mdo</td>
            </tr>
            </tbody>
          </table>
          <button @click="btnRegresar" class="btn btn-danger btn-lg mb-3" >Regresar</button>
        </div>
      </div>

      <div class="text-center mt-5">
        <button v-if="!tableView" class="btn btn-success btn-lg font-weight-bold  shadow-lg" @click="viewTechnologies" >Ver Tecnologías</button>
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
      tableView: false,
      technology:{
        name: null
      }
    };
  },
  methods:{
    createTechnology(){
      axios.post("https://jsonplaceholder.typicode.com/technology", this.technology).then((result) => {
        console.log(result);
      });
      alert('Creado correctamente');
    },
    viewTechnologies(){
      this.tableView = true;
    },
    btnRegresar(){
      this.tableView = false;
    }

  }
}
</script>
