<template>
    <div class="patients-index">
      <h1>{{ title }}</h1>
      <p>Страница {{ currentPage }} из {{ pageCount }}</p>
      <p>
        <button @click="createPatient" class="btn btn-success">Создание пациента</button>
      </p>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn">Предыдущая</button>
        <button @click="nextPage" :disabled="currentPage === pageCount" class="btn">Следующая</button>
      </div>
      <table>
        <thead>
          <tr>
            <th>№</th>
            <th>Имя</th>
            <th>Фамилия</th>
            <th>Дата рождения</th>
            <th>Пол</th>
            <th>Номер телефона</th>
            <th>Электронная почта</th>
            <th>Диагноз</th>
            <th>Адрес</th>
            <th>Фото</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(patient, index) in paginatedData" :key="patient.id">
            <td>{{ index + 1 }}</td>
            <td>{{ patient.FirstName }}</td>
            <td>{{ patient.LastName }}</td>
            <td>{{ new Date(patient.DateOfBirth).toISOString().split('T')[0] }}</td>
            <td>{{ patient.Gender }}</td>
            <td>{{ patient.PhoneNumber }}</td>
            <td>{{ patient.Email }}</td>
            <td>{{ patient.Diagnosis }}</td>
            <td>{{ patient.Adress }}</td>
            <td>
              <img :src="patient.Photo" width="150px">
            </td>
            <td>
                <button @click="viewPatient(patient.id)">Просмотреть</button>
              <button @click="editPatient(patient.id)">Редактировать</button>
              <button @click="deletePatient(patient.id)">Удалить</button>
            </td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1" class="btn">Предыдущая</button>
        <button @click="nextPage" :disabled="currentPage === pageCount" class="btn">Следующая</button>
      </div>
    </div>
  </template>
  
  <script>
  import axios from 'axios';
  
  export default {
    data() {
      return {
        title: 'Пациенты',
        patients: [],
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.patients.length / this.itemsPerPage);
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.patients.slice(start, end);
      }
    },
    methods: {
      getPatients() {
        axios.get('http://localhost:3000/patient')
          .then(response => {
            this.patients = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createPatient() {
        this.$router.push('/patient/create');
      },
      editPatient(id) {
        this.$router.push('/patient/edit/'+id);
      },
      viewPatient(id) { 
      this.$router.push('/patient/show/'+id);
    },
      async deletePatient(id) {
        try {
          await axios.delete('http://localhost:3000/patient/'+id);
          alert('Успешно удален!');
          this.getPatients();
        } catch (error) {
          console.error(error);
          alert('Произошла ошибка при удалении пациента.');
        }
      },
      nextPage() {
        if (this.currentPage < this.pageCount) {
          this.currentPage++;
        }
      },
      prevPage() {
        if (this.currentPage > 1) {
          this.currentPage--;
        }
      },
    },
    created() {
      this.getPatients();
    },
  };
  </script>
  
  <style scoped>
  .btn {
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
  
  .btn:hover {
    background-color: #45a049;
  }
  
  .pagination {
    display: flex;
    justify-content: center;
    align-items: center;
    margin-top: 20px;
  }
  </style>
  