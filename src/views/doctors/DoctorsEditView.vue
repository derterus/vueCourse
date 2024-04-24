<template>
  <div class="doctors-create">
    <h1>Редактирование врача</h1>
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
      id: this.$route.params.id, // добавляем id в данные
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
  async created() {
    try {
      const response = await axios.get(this.$server+'doctors/' + this.id);
      if (response.data.length > 0) {
        this.doctor = response.data[0];
      }
    } catch (error) {
      console.error(error);
    }
  },
  methods: {
    onFileChange(e) {
      this.doctor.Photo = e.target.files[0];
    },
    async submitForm() {
      const formData = new FormData();

      // Добавляем остальные поля в FormData
      Object.keys(this.doctor).forEach(key => {
        if (key !== 'Photo') {
          formData.append(key, this.doctor[key]);
        } else if (typeof this.doctor.Photo !== 'string') {
          // Если Photo не является строкой, это означает, что это File объект
          formData.append('Photo', this.doctor.Photo);
        }
      });

      // Отправляем данные формы на сервер
      try {
        await axios.put(this.$server+'doctors/' + this.id, formData);
        alert('Доктор успешно обновлен!');
      } catch (error) {
        console.error(error);
        alert('Произошла ошибка при обновлении врача.');
      }
    }
  }
}
</script>

