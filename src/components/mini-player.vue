<!--  -->
<template>
  <div class="miniplayer">
    <div class="mini_song">
      <template v-if="hasCurrentSong">

      </template>
    </div>
    <div class="mini_control"></div>
    <div class="mini_mode"></div>
    <div class="mini_progress"></div>
    <audio></audio>
  </div>
</template>

<script>
export default {
  data () {
    return {
    };
  },

  components: {},

  computed: {
    hasCurrentSong(){
      // return isDef()
    }
  },

  mounted () {},

  methods: {},

  created () {}

}

</script>
<style lang='scss' scoped>
</style>