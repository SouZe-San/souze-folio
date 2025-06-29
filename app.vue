<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>
<script setup lang="ts">
import { OG_DESCRIPTION,AUTHOR,DOMAIN,OG_IMAGE,OG_TITLE,SITE_NAME } from '~/assets/seoContent';
useSeoMeta({
  title:"Soumyajit Mondal || Souze-san",
  description:OG_DESCRIPTION,
  author:AUTHOR,
  creator:AUTHOR,
  ogTitle:OG_TITLE,
  ogDescription:OG_DESCRIPTION,
  ogSiteName:SITE_NAME,
  ogUrl:DOMAIN,
  robots :{
    index:true,
    follow:true,
  },
  ogImage:{
    url:OG_IMAGE,
    alt: "deV Dev",
    width:'460',
    height:'460',
    type:'image/png'
  },
  ogType:'website',
  ogLocale:'en_US'
})
</script>

