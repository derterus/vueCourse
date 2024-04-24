<template>
  <div class="doctors-create">
    <h1>Добавление пациента</h1>
    <form @submit.prevent="submitForm">
      <input v-model="patient.FirstName" placeholder="Имя" maxlength="255">
      <input v-model="patient.LastName" placeholder="Фамилия" maxlength="255">
      <input v-model="patient.DateOfBirth" placeholder="Дата рождения" type="date">
      <input v-model="patient.Gender" placeholder="Пол" maxlength="255">
      <input v-model="patient.PhoneNumber" placeholder="Номер телефона" maxlength="255">
      <input v-model="patient.Email" placeholder="Email" type="email">
      <input v-model="patient.Diagnosis" placeholder="Диагноз" maxlength="255">
      <input v-model="patient.Adress" placeholder="Адрес" maxlength="255">
      <input type="file" @change="onFileChange">
      <button type="submit" class="btn btn-success">Сохранить</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      patient: {
        FirstName: '',
        LastName: '',
        DateOfBirth: '',
        Gender: '',
        PhoneNumber: '',
        Email: '',
        Diagnosis: '',
        Adress: '',
        Photo: null
      }
    }
  },
  methods: {
    onFileChange(e) {
      this.patient.Photo = e.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();

      try {
        // Когда файл загружен, добавляем его содержимое в FormData
        formData.append('Photo', this.patient.Photo);

        // Добавляем остальные поля в FormData
        Object.keys(this.patient).forEach(key => {
          if (key !== 'Photo') {
            formData.append(key, this.patient[key]);
          }
        });

        // Отправляем данные формы на сервер
        await axios.post(this.$server+'patient', formData);
        alert('Пациент успешно добавлен!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при добавлении пациента.');
      }
    }
  }
}
</script>

