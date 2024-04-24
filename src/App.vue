<script setup>
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <div id="app">
      <nav class="navbar">
        <div class="left-nav-bar">
              <li class="nav-item">
                <RouterLink class="navbar-brand" to="/">Городская больница</RouterLink>
              </li>
              <li class="nav-item">
                <RouterLink to="/">Главная</RouterLink>
              </li>
        </div>
        <div class="center-nav-bar">
          <li class="nav-item">
            <RouterLink to="/doctors">Доктора</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/patient">Пациенты</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/contact">Контакты</RouterLink>
          </li>
          <li class="nav-item">
            <RouterLink to="/about">О нас</RouterLink>
          </li>
        </div>
      </nav>
    </div>
  </header>

  <RouterView />
  <footer>
  <div id="footer" class="navbar">
    <div class="left-nav-bar">
      <li class="nav-item">
        <RouterLink to="/privacy">Политика конфиденциальности</RouterLink>
      </li>
      <li class="nav-item">
        <RouterLink to="/terms">Условия использования</RouterLink>
      </li>
    </div>
    <div class="right-nav-bar">
      <li class="nav-item">
        Поликлиника
      </li>
      <li class="nav-item">
        @Сделано Derter
      </li>
    </div>
  </div>
</footer>
</template>