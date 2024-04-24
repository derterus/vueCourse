<template>
    <div class="patient-view">
      <h1>Информация о пациенте</h1>
      <div v-if="patient">
        <p><strong>Имя:</strong> {{ patient.FirstName }}</p>
        <p><strong>Фамилия:</strong> {{ patient.LastName }}</p>
        <p><strong>Дата рождения:</strong> {{ new Date(patient.DateOfBirth).toISOString().split('T')[0] }}</p>
        <p><strong>Пол:</strong> {{ patient.Gender }}</p>
        <p><strong>Номер телефона:</strong> {{ patient.PhoneNumber }}</p>
        <p><strong>Электронная почта:</strong> {{ patient.Email }}</p>
        <p><strong>Диагноз:</strong> {{ patient.Diagnosis }}</p>
        <p><strong>Адрес:</strong> {{ patient.Adress }}</p>
        <img :src="patient.Photo" width="150px">
      </div>
      <button @click="goBack">Назад</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        patient: null
      };
    },
    methods: {
      getPatient() {
        const id = this.$route.params.id;
        axios.get('http://localhost:3000/patient/' + id)
          .then(response => {
            this.patient = response.data[0];
          })
          .catch(error => {
            console.error(error);
          });
      },
      goBack() {
        this.$router.go(-1);
      }
    },
    created() {
      this.getPatient();
    },
  };
  </script>
  
  <style scoped>
  .patient-view {
    display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center; 
  }
  
  button {
    padding: 10px 20px;
    margin: 5px;
    background-color: #4CAF50;
    color: white;
    border: none;
    text-decoration: none;
    display: inline-block;
    font-size: 16px;
    cursor: pointer;
  }
  
  button:hover {
    background-color: #45a049;
  }
  </style>
  