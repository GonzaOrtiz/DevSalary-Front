<template>
  <div class="container">
    <body>
      <h3 class="text-center mb-3">Calculadora</h3>
      <hr />

      <div class="d-flex justify-content-around">
        <div
          class="card col-5 text-center bg-light align-items-center shadow-lg">
          <div class="row">
            <div class="col-lg-6">
              <div class="mb-6">
                <label class="form-label">Tecnología</label>
                <select class="form-control" v-model="rate.technologyId">
                  <option
                    v-for="element in technologiesArray"
                    :key="element.id"
                    v-bind:value="element.id"
                  >
                    {{ element.name }}
                  </option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Antiguedad</label>
                <select class="form-control" v-model="rate.seniority">
                  <option>Junior</option>
                  <option>Semi-Senior</option>
                  <option>Senior</option>
                </select>
              </div>
            </div>
          </div>

          <div class="row">
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Idioma</label>
                <select class="form-control" v-model="rate.language">
                  <option>Inglés</option>
                  <option>Español</option>
                </select>
              </div>
            </div>
            <div class="col-lg-6">
              <div class="mb-3">
                <label class="form-label">Divisa</label>
                <select class="form-control" v-model="rate.currency">
                  <option>ARS</option>
                  <option>USD</option>
                </select>
              </div>
            </div>
          </div>
          <div class="row">
            <div class="col-sm-12 text-center">
              <button class="btn btn-primary btn-lg mb-2" @click="filter">
                Buscar</button
              >&nbsp;
<!--              <button @click="goBackToTable" class="btn btn-danger btn-lg mb-2">-->
<!--                Regresar-->
<!--              </button>-->
            </div>
          </div>
        </div>
      </div>
<hr>
      <div class="d-flex justify-content-around">
        <div class="card col-10 text-center bg-light align-items-center shadow-lg">
          <table class="table">
            <thead>
            <tr>
              <th scope="col">Tecnología</th>
              <th scope="col">Antiguedad</th>
              <th scope="col">Idioma</th>
              <th scope="col">Salario</th>
              <th scope="col">Margen Bruto</th>
              <th scope="col">Divisa</th>
            </tr>
            </thead>
            <tbody>
            <tr v-for="element in ratesFilterArray" :key="element.id">
              <td>{{ element.technology.name }} </td>
              <td>{{ showSeniority(element.seniority) }} </td>
              <td>{{ showLanguage(element.language) }}</td>
              <td>{{ element.average_salary }}</td>
              <td>{{ element.gross_margin }}</td>
              <td>{{ element.currency }}</td>

            </tr>
            </tbody>
          </table>
        </div>
      </div>
    </body>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      rate: {
        name: null,
        technologyId: null,
        seniority: null,
        language: null,
        currency: null,
      },
      technologiesArray: null,
      ratesFilterArray: null,
    };
  },
  methods: {
    pullTechnologies() {
      axios.get("http://localhost:3000/technologies").then((result) => {
        this.technologiesArray = result.data;
        console.log(result);
      });
    },
    filter(){
      if(this.rate.seniority === 'Junior' ) this.rate.seniority = "1";
      if(this.rate.seniority === 'Semi-Senior' ) this.rate.seniority = "2";
      if(this.rate.seniority === 'Senior' ) this.rate.seniority = "3";

      if(this.rate.language === 'Inglés' ) this.rate.language = "2";
      if(this.rate.language === 'Español' ) this.rate.language = "1";

      axios.post("http://localhost:3000/rates/filter", this.rate).then((result) => {
        this.ratesFilterArray = result.data;
        console.log(result);
        console.log(this.ratesFilterArray);


        if(this.rate.seniority === '1' ) this.rate.seniority = "Junior";
        if(this.rate.seniority === '2' ) this.rate.seniority = "Semi-Senior";
        if(this.rate.seniority === '3' ) this.rate.seniority = "Senior";

        if(this.rate.language === '2' ) this.rate.language = "Inglés";
        if(this.rate.language === '1' ) this.rate.language = "Español";
      });
    },
    showLanguage(language){
      if(language === 1){
        return 'Español';
      }
      if(language === 2){
        return 'Inglés';
      }
    },
    showSeniority(seniority){
      if(seniority === 1){
        return 'Junior';
      }
      if(seniority === 2){
        return 'Semi-Senior';
      }
      if(seniority === 3){
        return 'Senior';
      }
    }
  },
  created() {
    this.pullTechnologies();
  },
};
</script>

<style scoped></style>
