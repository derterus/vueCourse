<template>
    <div class="doctor-view">
      <h1>Информация о враче</h1>
      <div v-if="doctor">
        <p><strong>Имя:</strong> {{ doctor.FirstName }}</p>
        <p><strong>Фамилия:</strong> {{ doctor.LastName }}</p>
        <p><strong>Специализация:</strong> {{ doctor.Specialization }}</p>
        <p><strong>Номер телефона:</strong> {{ doctor.PhoneNumber }}</p>
        <p><strong>Электронная почта:</strong> {{ doctor.Email }}</p>
        <p><strong>Опыт работы (лет):</strong> {{ doctor.ExperienceYears }}</p>
        <p><strong>Рабочий график:</strong> {{ doctor.WorkSchedule }}</p>
        <p><strong>Адрес:</strong> {{ doctor.Adress }}</p>
        <img :src="doctor.Photo" width="150px">
      </div>
      <button @click="goBack">Назад</button>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        doctor: null
      };
    },
    methods: {
      getDoctor() {
        const id = this.$route.params.id;
        axios.get('http://localhost:3000/doctors/' + id)
          .then(response => {
            this.doctor = response.data[0];
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
      this.getDoctor();
    },
  };
  </script>
  
  <style scoped>
  .doctor-view {
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
  