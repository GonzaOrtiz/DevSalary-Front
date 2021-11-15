<template>
  <div id="technologies">
    <body>
    <div class="container">
      <h3 class="text-center mb-3">Tarifa</h3>
      <hr>

      <div v-if="tableView" class="d-flex justify-content-around">
        <div class="card col-10 text-center bg-light align-items-center shadow-lg">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Nombre</th>
              <th scope="col">Tecnología</th>
              <th scope="col">Antiguedad</th>
              <th scope="col">Idioma</th>
              <th scope="col">Salario Promedio</th>
              <th scope="col">Margen Bruto</th>
              <th scope="col">Divisa</th>
              <th scope="col">Editar/Eliminar</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="element in ratesArray" :key="element.id">
              <td>{{ element.name }}</td>
              <td>{{ element.technology_id }}</td>
              <td>{{ element.seniority }}</td>
              <td>{{ element.language }}</td>
              <td>{{ element.average_salary }}</td>
              <td>{{ element.gross_margin }}</td>
              <td>{{ element.currency }}</td>

              <td>
                <button class="btn btn-success" @click="btnEditRate(element)">Editar</button>&nbsp;
                <button class="btn btn-danger" @click="deleteRate(element.id)">Eliminar</button>&nbsp;
              </td>
            </tr>
            </tbody>
          </table>
          <button @click="btnIrANuevo" class="btn btn-primary btn-lg mb-3" >Nueva Tarifa</button>
        </div>
      </div>

      <div v-if="newRatesView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Tecnología</label>
                <input v-model="rate.technologyId" class="form-control">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Antiguedad</label>
                <input v-model="rate.seniority" class="form-control">
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Idioma</label>
                <input v-model="rate.language" class="form-control">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Salario Promedio</label>
                <input v-model="rate.average_salary" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Margen Bruto</label>
                <input v-model="rate.gross_margin" class="form-control">
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Divisa</label>
                <input v-model="rate.currency" class="form-control">
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-center">
              <button class="btn btn-primary btn-lg mb-2" @click="createRate" >Crear</button>&nbsp;
              <button @click="btnRegresar" class="btn btn-danger btn-lg mb-2" >Regresar</button>
            </div>
          </div>
        </div>
      </div>


<!--      <div v-if="editTechnologyView" class="d-flex justify-content-around">-->
<!--        <div class="card col-5 text-center bg-light align-items-center shadow-lg">-->
<!--          <h4 class="m-3">Ingrese el nombre de una Tecnología</h4>-->
<!--          <input v-model="technology.name" class="mb-3"  placeholder="Ejemplo: Javascript">-->
<!--          <div class="row">-->
<!--            <div class="col-sm-12 text-center">-->
<!--              <button class="btn btn-primary btn-lg mb-2" @click="editTechnology" >Editar</button>&nbsp;-->
<!--              <button @click="btnRegresarEdit" class="btn btn-danger btn-lg mb-2" >Regresar</button>-->
<!--            </div>-->
<!--          </div>-->
<!--        </div>-->
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
      newRatesView: true,
      tableView: true,
      rate: {
        name: null,
        technologyId : null,
        seniority: null,
        language: null,
        average_salary: null,
        gross_margin: null,
        currency: null,
       },
      ratesArray: null,
    };
  },
  methods:{
    pullRates(){
      axios.get("http://localhost:3000/rates").then((result) => {
        this.ratesArray = result.data;
        console.log(result);
        console.log(this.ratesArray);
      });
    },
    createRate() {
      axios.post("http://localhost:3000/rates", this.rate).then((result) => {
        console.log(result);
        this.pullRates();
      });
      alert("Tarifa guardada");
      // this.newTechnologyView = false;
      // this.tableView = true;
    },
  },
  created(){
    this.pullRates();
  }
}
</script>
<style>

</style>
