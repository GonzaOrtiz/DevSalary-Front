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
              <td>{{ element.technologyId }} tech</td>
              <td>{{ element.seniority }} seniority</td>
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
          <button @click="goToNew" class="btn btn-primary btn-lg mb-3" >Nueva Tarifa</button>
        </div>
      </div>

      <div v-if="newRatesView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Tecnología</label>
                <select class="form-control" v-model="rate.technologyId" >
                    <option v-for="element in technologiesArray" :key="element.id" v-bind:value="element.id">
                       {{element.name}}
                    </option>
                </select>
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
              <button @click="goBackToTable" class="btn btn-danger btn-lg mb-2" >Regresar</button>
            </div>
          </div>
        </div>
      </div>


      <div v-if="editRatesView" class="d-flex justify-content-around">
        <div class="card col-5 text-center bg-light align-items-center shadow-lg">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Tecnología</label>
                <select class="form-control" v-model="rate.technologyId" >
                  <option v-for="element in technologiesArray" :key="element.id" v-bind:value="element.id">
                    {{element.name}}
                  </option>
                </select>
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
              <button class="btn btn-primary btn-lg mb-2" @click="editRate" >Editar</button>&nbsp;
              <button @click="goBackToTable" class="btn btn-danger btn-lg mb-2" >Regresar</button>
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
      newRatesView: false,
      tableView: true,
      editRatesView: false,
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
      technologiesArray:null,
      idObj: {
        id: null,
      },
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
      this.newRatesView = false;
      this.tableView = true;
    },
     pullTechnologies(){
      axios.get("http://localhost:3000/technologies").then((result) => {
        this.technologiesArray = result.data;
        console.log(result);
      });
    },
    deleteRate(id) {
      this.idObj.id = id;
      axios.delete("http://localhost:3000/rates/" + this.idObj.id, this.idObj).then((result) => {
        console.log(result);
        this.pullTechnologies();
        alert("Eliminado correctamente");
      });
    },
    editRate(){
      axios.put("http://localhost:3000/rates/" + this.rate.id , this.rate).then((result) => {
        console.log(result);
        alert("Editado correctamente");
        this.pullTechnologies();
        this.tableView = true;
        this.editRatesView = false;
      });
    },
    btnEditRate(rate){
      this.editTechnology = true;
      this.tableView = false;
      this.rate.id = rate.id;
      this.rate.technologyId = rate.technologyId;
      this.rate.language = rate.language;
      this.rate.average_salary = rate.average_salary;
      this.rate.seniority = rate.seniority;
      this.rate.gross_margin = rate.gross_margin;
      this.rate.currency = rate.currency;

    },
    goToNew(){
      this.tableView = false;
      this.newRatesView= true;
    },
    goBackToTable(){
      this.tableView = true;
      this.newRatesView= false;
    },
  },
  created(){
    this.pullRates();
    this.pullTechnologies();
  }
}
</script>
<style>

</style>
