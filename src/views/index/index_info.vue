<template>
    <div class="index_info">
        <!-- Carousel -->
      <div v-show="showCarousel">
        <el-carousel
          class="carousel"
          :interval="4000"
          arrow="always"
          height="calc(100vh - 64px)"
          autoplay
        >
          <el-carousel-item v-for="(item, index) in carouselImages" :key="index">
            <img :src="item.src" :alt="item.alt" class="carousel-img">
          </el-carousel-item>
        </el-carousel>
      </div>

      <!-- Content -->
      <div class="content">
        <!-- 其他的信息，如公告文案、师资库示例展示等 -->
        最新新闻其他的信息，如公告文案、师资库示例展示等
      </div>
    </div>
</template>

<script>
export default {
  name: 'IndexInfo',

  data () {
    return {
      activeItem: '1',
      carouselImages: [
        { src: require('@/assets/index_pic/2.jpg'), alt: 'Image 1' },
        { src: require('@/assets/index_pic/3.jpg'), alt: 'Image 2' },
        { src: require('@/assets/index_pic/4.jpg'), alt: 'Image 3' },
        { src: require('@/assets/index_pic/5.jpg'), alt: 'Image 4' }
      ],
      showCarousel: true,
      showContent: false
    }
  },

  mounted () {
    window.addEventListener('scroll', this.checkScroll)
    this.checkScroll()
  },

  beforeDestroy () {
    window.removeEventListener('scroll', this.checkScroll)
  },

  methods: {
    handleSelect (key) {
      this.activeItem = key
    },
    checkScroll () {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      if (scrollTop > window.innerHeight) {
        this.showCarousel = false
        this.showContent = true
      } else {
        this.showCarousel = true
        this.showContent = false
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.carousel {
  position: absolute;
  width: 100%;
}

.carousel-img {
  object-fit: cover;
  width: 100%;
  height: 100%;
}

.content {
  position: absolute;
  top: calc(100vh);
  width: 100%;
  padding-top: 20px;
}

</style>
