<template>
  <div>
    <el-carousel :interval="5000" arrow="always" height="600px">
      <el-carousel-item v-for="item in images" :key="item.id" class="span-back" label="风景">
        <label></label>
      </el-carousel-item>
    </el-carousel>
  </div>
</template>
<script>
  export default {
    data () {
      return {
        images: [
          {
            id: 1,
            url: '../images/1.jpg'
          }
        ]
      }
    }
  }
</script>
<style scoped>
  .span-back{
    min-height: 200px;
    min-width: 500px;
    background-image: url("../images/1.jpg");
  }
</style>
