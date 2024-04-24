<template>
  <div class="doctors-create">
    <h1>Редактирование пациента</h1>
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
      id: this.$route.params.id, // добавляем id в данные
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
  async created() {
  try {
    const response = await axios.get(this.$server+'patient/' + this.id);
    if (response.data.length > 0) {
      const patient = response.data[0];
      // Преобразуем дату в формат YYYY-MM-DD
      patient.DateOfBirth = new Date(patient.DateOfBirth).toISOString().split('T')[0];
      this.patient = patient;
    }
  } catch (error) {
    console.error(error);
  }
},
  methods: {
    onFileChange(e) {
      this.patient.Photo = e.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();

      // Добавляем остальные поля в FormData
      Object.keys(this.patient).forEach(key => {
        if (key !== 'Photo') {
          formData.append(key, this.patient[key]);
        } else if (typeof this.patient.Photo !== 'string') {
          // Если Photo не является строкой, это означает, что это File объект
          formData.append('Photo', this.patient.Photo);
        }
      });

      // Отправляем данные формы на сервер
      try {
        await axios.put(this.$server+'patient/' + this.id, formData);
        alert('Пациент успешно обновлен!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при обновлении пациента.');
      }
    }
  }
}
</script>
