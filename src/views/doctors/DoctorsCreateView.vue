<template>
    <div class="doctors-create">
      <h1>Добавление врача</h1>
      <form @submit.prevent="submitForm">
        <input v-model="doctor.FirstName" placeholder="Имя" maxlength="255">
        <input v-model="doctor.LastName" placeholder="Фамилия" maxlength="255">
        <input v-model="doctor.Specialization" placeholder="Специализация" maxlength="255">
        <input v-model="doctor.PhoneNumber" placeholder="Номер телефона" maxlength="255">
        <input v-model="doctor.Email" placeholder="Email" type="email">
        <input v-model="doctor.ExperienceYears" placeholder="Опыт работы" type="number">
        <input v-model="doctor.WorkSchedule" placeholder="Рабочий график" maxlength="255">
        <input v-model="doctor.Adress" placeholder="Адрес" maxlength="255">
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
        doctor: {
          FirstName: '',
          LastName: '',
          Specialization: '',
          PhoneNumber: '',
          Email: '',
          ExperienceYears: '',
          WorkSchedule: '',
          Adress: '',
          Photo: null
        }
      }
    },
    methods: {
  onFileChange(e) {
    this.doctor.Photo = e.target.files[0];
  },
  async submitForm() {
    const formData = new FormData();

    try {

      // Когда файл загружен, добавляем его содержимое в FormData
      formData.append('Photo', this.doctor.Photo);

      // Добавляем остальные поля в FormData
      Object.keys(this.doctor).forEach(key => {
        if (key !== 'Photo') {
          formData.append(key, this.doctor[key]);
        }
      });

      // Отправляем данные формы на сервер
      await axios.post('http://localhost:3000/doctors', formData);
      alert('Врач успешно добавлен!');
    } catch (error) {
      console.error(error);
      alert('Произошла ошибка при добавлении врача.');
    }
  }
}

}
</script>
  