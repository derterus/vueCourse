<template>
    <div class="doctors-index">
      <h1>{{ title }}</h1>
      <p>Страница {{ currentPage }} из {{ pageCount }}</p>
      <p>
        <button @click="createDoctor" class="btn btn-success">Создание доктора</button>
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
            <th>Специализация</th>
            <th>Номер телефона</th>
            <th>Электронная почта</th>
            <th>Опыт работы (лет)</th>
            <th>Рабочий график</th>
            <th>Адрес</th>
            <th>Фото</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
            <tr v-for="(doctor, index) in paginatedData" :key="doctor.id">
            <td>{{ index + 1 }}</td>
            <td>{{ doctor.FirstName }}</td>
            <td>{{ doctor.LastName }}</td>
            <td>{{ doctor.Specialization }}</td>
            <td>{{ doctor.PhoneNumber }}</td>
            <td>{{ doctor.Email }}</td>
            <td>{{ doctor.ExperienceYears }}</td>
            <td>{{ doctor.WorkSchedule }}</td>
            <td>{{ doctor.Adress }}</td>
            <td>
              <img :src="doctor.Photo" width="150px">
            </td>
            <td>
                <button @click="viewDoctor(doctor.id)">Просмотреть</button>
              <button @click="editDoctor(doctor.id)">Редактировать</button>
              <button @click="deleteDoctor(doctor.id)">Удалить</button>
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
        title: 'Доктора',
        doctors: [],
        currentPage: 1,
        itemsPerPage: 10
      };
    },
    computed: {
      pageCount() {
        return Math.ceil(this.doctors.length / this.itemsPerPage);
      },
      paginatedData() {
        const start = (this.currentPage - 1) * this.itemsPerPage;
        const end = start + this.itemsPerPage;
        return this.doctors.slice(start, end);
      }
    },
    methods: {
      getDoctors() {
        axios.get('http://localhost:3000/doctors')
          .then(response => {
            this.doctors = response.data;
          })
          .catch(error => {
            console.error(error);
          });
      },
      createDoctor() {
        this.$router.push('/doctors/create');
      },
      editDoctor(id) {
        this.$router.push('/doctors/edit/'+id);
      },
      viewDoctor(id) { 
      this.$router.push('/doctors/show/'+id);
    },

      async deleteDoctor(id) {
      try {
      await axios.delete('http://localhost:3000/doctors/'+id);
      alert('Успешно удален!');
        this.getDoctors();
        } catch (error) {
      console.error(error);
      alert('Произошла ошибка при удалении врача.');
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
      this.getDoctors();
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
  