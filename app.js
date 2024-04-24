import express from 'express';
import db from './db.js';
import path from 'path';
import cors from 'cors';
import { fileURLToPath } from 'url';
import fileUpload from 'express-fileupload';

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(cors());
app.use(express.static(path.join(__dirname, '/dist')));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// Получение всех 
app.get('/patient', function(req, res) {
  db.query("SELECT * FROM patient", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});
app.get('/doctors', function(req, res) {
  db.query("SELECT * FROM doctors", function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

//Получение одного по id
app.get('/patient/:id', function(req, res) {
  const id = req.params.id;
  db.query("SELECT * FROM patient WHERE id = ?", [id], function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

app.get('/doctors/:id', function(req, res) {
  const id = req.params.id;
  db.query("SELECT * FROM doctors WHERE id = ?", [id], function (err, result, fields) {
    if (err) throw err;
    res.send(result);
  });
});

// Удаление по id
app.delete('/patient/:id', function(req, res) {
  const id = req.params.id;
  db.query("DELETE FROM patient WHERE id = ?", [id], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.send(`Пациент с ID ${id} был успешно удален`);
    }
  });
});
app.delete('/doctors/:id', function(req, res) {
  const id = req.params.id;
  db.query("DELETE FROM doctors WHERE id = ?", [id], function (err, result) {
    if (err) {
      console.error(err);
      res.status(500).send('Ошибка на сервере');
    } else {
      res.send(`Врач с ID ${id} был успешно удален`);
    }
  });
});

// Создание доктора
app.post('/doctors', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Имя файла
  let Photo = req.files.Photo;
  let uploadPath = __dirname + '/uploads/doctors/' + Photo.name;

  // Используйте метод mv() для перемещения файла в указанную директорию
  Photo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    const { FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress } = req.body;

    db.query("INSERT INTO doctors (FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress, Photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress, '/uploads/doctors/' + Photo.name], function (err, result) {
      if (err) throw err;
      res.send('Доктор успешно добавлен');
    });
  });
});

// Обновление доктора по id
app.put('/doctors/:id', function(req, res) {
  const id = req.params.id;
  const { FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress } = req.body;

  if (req.files && Object.keys(req.files).length > 0) {
    // Если новый файл был загружен, обновляем фото
    let Photo = req.files.Photo;
    let uploadPath = __dirname + '/uploads/doctors/' + Photo.name;

    // Используйте метод mv() для перемещения файла в указанную директорию
    Photo.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
    });

    Photo = '/uploads/doctors/' + Photo.name; // Обновляем путь к фото

    // Обновляем все поля, включая фото
    db.query("UPDATE doctors SET FirstName = ?, LastName = ?, Specialization = ?, PhoneNumber = ?, Email = ?, ExperienceYears = ?, WorkSchedule = ?, Adress = ?, Photo = ? WHERE id = ?", 
    [FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress, Photo, id], function (err, result) {
      if (err) throw err;
      res.send(`Доктор с ID ${id} был успешно обновлен`);
    });
  } else {
    // Если новый файл не был загружен, обновляем только другие поля
    db.query("UPDATE doctors SET FirstName = ?, LastName = ?, Specialization = ?, PhoneNumber = ?, Email = ?, ExperienceYears = ?, WorkSchedule = ?, Adress = ? WHERE id = ?", 
    [FirstName, LastName, Specialization, PhoneNumber, Email, ExperienceYears, WorkSchedule, Adress, id], function (err, result) {
      if (err) throw err;
      res.send(`Доктор с ID ${id} был успешно обновлен`);
    });
  }
});



// Создание пациента
app.post('/patient', function(req, res) {
  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // Имя файла
  let Photo = req.files.Photo;
  let uploadPath = __dirname + '/uploads/patient/' + Photo.name;

  // Используйте метод mv() для перемещения файла в указанную директорию
  Photo.mv(uploadPath, function(err) {
    if (err)
      return res.status(500).send(err);

    const { FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress } = req.body;

    db.query("INSERT INTO patient (FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress, Photo) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)", 
    [FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress, '/uploads/patient/' + Photo.name], function (err, result) {
      if (err) throw err;
      res.send('Пациент успешно добавлен');
    });
  });
});

// Обновление пациента по id
app.put('/patient/:id', function(req, res) {
  const id = req.params.id;
  const { FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress } = req.body;

  if (req.files && Object.keys(req.files).length > 0) {
    // Если новый файл был загружен, обновляем фото
    let Photo = req.files.Photo;
    let uploadPath = __dirname + '/uploads/patient/' + Photo.name;

    // Используйте метод mv() для перемещения файла в указанную директорию
    Photo.mv(uploadPath, function(err) {
      if (err)
        return res.status(500).send(err);
    });

    Photo = '/uploads/patient/' + Photo.name; // Обновляем путь к фото

    // Обновляем все поля, включая фото
    db.query("UPDATE patient SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, PhoneNumber = ?, Email = ?, Diagnosis = ?, Adress = ?, Photo = ? WHERE id = ?", 
    [FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress, Photo, id], function (err, result) {
      if (err) throw err;
      res.send(`Пациент с ID ${id} был успешно обновлен`);
    });
  } else {
    // Если новый файл не был загружен, обновляем только другие поля
    db.query("UPDATE patient SET FirstName = ?, LastName = ?, DateOfBirth = ?, Gender = ?, PhoneNumber = ?, Email = ?, Diagnosis = ?, Adress = ? WHERE id = ?", 
    [FirstName, LastName, DateOfBirth, Gender, PhoneNumber, Email, Diagnosis, Adress, id], function (err, result) {
      if (err) throw err;
      res.send(`Пациент с ID ${id} был успешно обновлен`);
    });
  }
});
// Запускаем сервер
app.listen(3000, () => {
  console.log('Сервер запущен на порту 3000');
});