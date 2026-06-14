<template>
<svg width="256" height="256" viewBox="0 0 256 256" fill="none" xmlns="http://www.w3.org/2000/svg">
<g clip-path="url(#clip0_2702_147)">
<path d="M106.36 42.75C100.939 34.2409 93.4681 27.2384 84.6376 22.3885C75.8071 17.5386 65.901 14.9976 55.8333 15C51.355 22.766 48.669 31.4399 47.9728 40.3841C47.2765 49.3284 48.5878 58.3154 51.8101 66.6844C45.5015 76.0025 42.0877 86.9869 42 98.25V107.5C42 122.22 47.8297 136.336 58.2068 146.744C68.5838 157.153 82.658 163 97.3333 163H152.667C167.342 163 181.416 157.153 191.793 146.744C202.17 136.336 208 122.22 208 107.5V98.25C207.912 86.9869 204.499 76.0025 198.19 66.6844C201.412 58.3154 202.723 49.3284 202.027 40.3841C201.331 31.4399 198.645 22.766 194.167 15C184.099 14.9976 174.193 17.5386 165.362 22.3885C156.532 27.2384 149.061 34.2409 143.64 42.75H106.36Z" stroke="currentcolor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M88 246V199.889C88 190.105 91.8982 180.723 98.837 173.805C105.776 166.887 115.187 163 125 163C134.813 163 144.224 166.887 151.163 173.805C158.102 180.723 162 190.105 162 199.889V246" stroke="currentcolor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M88 208H61.3333C54.2609 208 47.4781 204.629 42.4772 198.627C37.4762 192.626 34.6667 184.487 34.6667 176C34.6667 167.513 31.8571 159.374 26.8562 153.373C21.8552 147.371 15.0724 144 8 144" stroke="currentcolor" stroke-width="16" stroke-linecap="round" stroke-linejoin="round"/>
<path d="M84 126C84.6481 127.301 87.2604 128.603 89.7204 129.178C92.8198 129.902 97.8958 131.695 106.39 132.764C109.126 133.108 113.26 134.806 119.15 134.968C121.842 135.041 127.809 135.785 136.399 135.946C141.825 136.048 146.016 136.117 150.592 135.058C158.917 133.131 159.617 130.897 159.941 130.163C162.229 129.591 163.869 128.29 164.603 127.311C165.013 126.978 165.499 126.978 166 126.978" stroke="currentcolor" class="blink" stroke-width="14" stroke-linecap="round"/>
<ellipse cx="92.5" cy="84.5" rx="21.5" ry="17.5" fill="currentcolor"class="blink" />
<ellipse cx="150.5" cy="87.5" rx="20.5" ry="16.5" fill="currentcolor"class="blink" />
</g>
<defs>
<clipPath id="clip0_2702_147">
<rect width="256" height="256" fill="white"/>
</clipPath>
</defs>
</svg>


</template>

<script lang="ts" setup>

</script>

<style scoped>

.blink {
  animation: blink-animation 1.5s steps(5, start) infinite;
}
@keyframes blink-animation {
0%{
  opacity: 1;
}
90%{
  opacity: 1;
}
  100% {
    /* visibility: hidden; */
    opacity: 0;
  }
}
</style>