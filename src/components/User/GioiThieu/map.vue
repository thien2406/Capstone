<template>
  <div class="w-full my-4 text-center">
    <iframe
      title="Bản đồ Đà Nẵng"
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d245366.64980383108!2d107.97614133640236!3d16.072088229352024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219c792252a13%3A0x1df0cb4b86727e06!2zxJDJoCBO4bq1bmcsIFZp4buHdCBOYW1!5e0!3m2!1svi!2s!4v1730081234567!15sChDEkMOgIE7hurVuZywgVmnhu4d0IE5hbSIaDiIkw4AgTuG6tW5nLCBWaeG7h3QgTmFtkgEKEGNvdHlfcGx1c19wb3N0YWxfY29kZQ"
      class="w-full h-[2000px]"
      allowfullscreen
      loading="lazy"
      referrerpolicy="no-referrer-when-downgrade"
    ></iframe>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.w-full {
  width: 100%;
  max-width: 100vw;
  height: 100%;
  max-height: 100vw;
}

iframe {
  display: block;
  border-radius: 2px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.15);
  max-height: none;
}
</style>
