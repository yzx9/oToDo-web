<template>
  <router-view #default="{ Component }">
    <transition name="fade">
      <component :is="Component" />
    </transition>
  </router-view>
</template>

<style>
@import "./style.css";
</style>
