<template>
  <section >
    <div class="container" v-if="allMusic">
      <div class="row mb-5">
        <div class="col-md-12">
          <h3 class="text-center">Player</h3>
        </div>
      </div>
      <div class="row mt-5">
        <div class="col-md-6">
          <img
            src="https://images.pexels.com/photos/3624281/pexels-photo-3624281.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500"
            class="image"
          />
            <!--    <av-circle
            :outline-width="0"
            :progress-width="5"
            :outline-meter-space="5"
            :playtime="true"
            playtime-font="18px Monaco"
            :audio-src="player.src"
          ></av-circle>
          -->
          <div class="card player_card">
            <div class="card-body">
              <h6 class="card-title">
                <b>{{this.current.title}} - {{this.current.artist}}</b>
              </h6>
              <div>
                <font-awesome-icon icon="backward" style="padding:2px;" @click="prev()"/>
                <font-awesome-icon icon="play" style="padding:2px; margin:0px 2px 0px 2px; font-size: 27px;" v-if="!isPlaying" @click="playToggle()"/>
                <font-awesome-icon icon="pause" style="padding:2px; margin:0px 2px 0px 2px; font-size: 27px;" @click="playToggle()" v-else/>
                <font-awesome-icon icon="forward" style="padding:2px;" @click="next()"/>
              </div>
            </div>
          </div>
        </div>
        
        <div class="col-md-6">
          <div class="card shadow">
            <table class="table">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">Title</th>
                  <th scope="col">Artist</th>
                  <th scope="col">Action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="(music, index) in allMusic" :key="index">
                  <th scope="row">{{index + 1}}</th>
                  <td>{{music.title}}</td>
                  <td><b>{{music.artist}}</b></td>
                  <td>
                    <button class="btn btn-primary" @click="play(music)">Play</button>
                  </td>
                </tr>
              </tbody>
            </table>       
          </div>
        </div>
      </div>
    </div>
    <div class="container m-10" v-else>No music on the list <nuxt-link to="/manager">add new song.</nuxt-link> </div>
  </section>
  
</template>

<script>
export default {
  data() {
    return {
        current: {
            title: '',
            artist: '',

        },
        song:true,
        isPlaying:false,
        allMusic: null,
        index:0,
        player:'',
        isPlaying:false

    }
  },
 
  methods: {
      async initPlayer(){
          if(this.allMusic !== []){
              
              this.current = await this.allMusic[this.index]
              this.player.src = `/api/${this.current.music.path}`;
              // this.player.play();
          }else{
              this.song = true
          }
      },
      async getAllSongs(){
          try{
              let response = await this.$axios.$get('/music')
            //   console.log('Responses from get all songs ' +response)
              if(response === []){
                  this.song = true
                  this.current = null
              }else{
                  this.song = false
                  this.allMusic = response
              }
              await this.initPlayer();
          }catch(err){
              this.current = null;
          }
      },
      play(song){ 
          if(song){
              this.current = song;
              this.player.src = `/api/${this.current.music.path}`;
              this.player.play();              
              this.isPlaying = true;
          }
      },
      playToggle(){
          if(this.player.play()){
          this.isPlaying = false;
          this.player.pause();
          }else{
              this.player.play();
              this.isPlaying = true;
          }
      },
      next(){
          this.index++
          if(this.index > this.allMusic.length -1){
              this.index = 0;
          }else{
              this.current = this.allMusic[this.index]
              this.play(this.current)
          }
      },
      prev(){
          this.index--
          if(this.index < 0){
              this.index = this.allMusic.length - 1;
          }else{
              this.current = this.allMusic[this.index]
              this.play(this.current)
          }
      }
  }, 
  created(){
      if(process.client){
          this.player = new Audio()
        //   this.player.muted = false;
        //   this.player.autoplay=""
      }
      this.getAllSongs()
  },
}
</script>

<style  scoped>
.image {
  border-radius: 5px !important;
  position: relative;
  height: 300px;
  width: 100%;
}
.player_card {
  text-align: center;
  bottom: 20px;
  margin: 0px 40px;
}
.text-muted {
  font-size: 15px;
}
.play {
  font-size: 40px;
}
.control {
  font-size: 25px;
}
</style>


