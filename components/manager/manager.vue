<template>
  <section class="mt-5">
    <div class="container mb-4">
      <div class="row">
        <div class="col-md-12">
          <div class="card" v-if="addState">
            <div class="card-body">
              <div class="card-title mb-4">
                <h4>Add Music</h4>
              </div>
              <form @submit.prevent="addNewMusic()" enctype="multipart/form-data">
                <div class="form-group">
                  <label for="title">Title</label>
                  <input type="text" v-model="musicDetails.title" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="artist">Artist</label>
                  <input type="text" v-model="musicDetails.artist" class="form-control" />
                </div>
                <div class="form-group">
                  <label for="artist">Music</label>
                  <div class="custom-file">
                    <input type="file"  
                            class="custom-file-input" 
                            id="customFile"
                            ref="file"
                            v-on:change="handleFileUpload()" />
                    <label class="custom-file-label" for="customFile">{{!isDisabled? uploadLabel :'Choose file'}}</label>
                  </div>
                </div>
                <div class="form-group">
                  <button class="btn btn-primary" :disabled="isDisabled">
                  <span class="spinner-border spinner-border-sm" v-if="addLoading" role="status" arial-hidden="true"></span>
                  Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="container">
      <div class="row">
        <div class="col-md-12">
          <div class="card bg-light p-1 showdow-sm">
            <div class="card-title">
              <button class="btn btn-info m-3" @click="initForm">{{addState?'Cancel':'Add Music'}}</button>
            </div>
            <div class="card-body">
              <table class="table" >
                <thead>
                  <tr>
                    <th scope="col">#</th>
                    <th scope="col">Title</th>
                    <th scope="col">Artist</th>
                    <th scope="col">Date created</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <div
                v-if="musicLoading"
                class="spinner-border"
                style="width: 3rem; height: 3rem;"
                role="status"
              >
                <span class="sr-only">Loading...</span>
              </div>
                <tbody v-if="allmusic.length >0">
                    <tr v-for="(music, index) in allmusic" :key="index" >
                      <td>{{index+1}}</td>
                      <td>{{music.title}}</td>
                      <td>{{music.artist}}</td>
                      <td>{{musicCreatedAt(music.created)}}</td>
                      <td>
                        <button class="btn btn-info" @click="deleteMusic(music._id)">Delete</button>
                      </td>
                    </tr> 
                </tbody> 
                <tbody v-else>
                  <tr>No record found. And new record :)</tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>
<script>
// import swal from 'sweetalert'
export default {
    data(){
        return {
            musicDetails:{
                title:'',
                artist: '',
                music:''
            },
            allmusic:[],
            musicLoading: false,
            isValid:false,
            addLoading:false,
            addState:false,
            uploadLabel:'',
        }
    },
    created(){
        this.getAllMusics();
    },
    computed:{
        isDisabled(){
            if(
                this.musicDetails.title === '' ||
                this.musicDetails.artist === '' ||
                this.musicDetails.music === ''
            ){
                return !this.isValid;
            }
        },
        
    },
    methods: {
        async getAllMusics(){
            this.musicLoading = true;
            try{
                let data = await this.$axios.$get('/music');
                this.allmusic = data;
                // console.log(this.$swal)
                this.musicLoading = false;
                swal("Music Lover",'All tracks fetched and refreshed successfully','success');
            }catch(err){
                this.musicLoading = false;
                swal("Error", 'Error fetching musics', 'error');
            }
        },
        musicCreatedAt(val){
            return this.$moment(val).format('MMM DD YYYY')
        },
       deleteMusic(id){
           swal({
               title:'Are you sure?',
               text: 'Once deleted, you will not be able to recover this music!',
               icon:'warning',
               buttons:true,
               dangerMode:true
           }).then(willDelete => {
               if(willDelete){
                  this.$axios
                        .$delete('/music/'+id)
                        .then(res => {
                            this.getAllMusics()
                            swal('Poof! Your music file has been deleted!', {icon:'success'})
                        })
                        .catch(err => {
                            swal('Error', 'Something went wrong', 'error')
                        }); 
               }else{
                   swal('Your music file was not deleted.')
               }
           })
           
        },
        handleFileUpload(){
            this.musicDetails.music = this.$refs.file.files[0];
            this.uploadLabel = this.musicDetails.music.name;

        },
        addNewMusic(){
            let type = /(\.|\/)(mp3|mp4|ogg|wav|3gpp|Smpe?g)$/i;

            if(
                type.test(this.musicDetails.music.type) ||
                type.test(this.musicDetails.music.name)
            ){
                let formData = new FormData();
                formData.append('title', this.musicDetails.title);
                formData.append('artist', this.musicDetails.artist);
                formData.append('music', this.musicDetails.music);
                this.addLoading = true;
               
                this.$axios.$post('/music', formData)
                            .then(res => {
                                // console.log(res);
                                // this.isDisabled = true;
                                this.addLoading = false;
                                this.musicDetails = {};
                                this.getAllMusics();
                                swal('Success', 'New Music Added', 'success')
                            })
                            .catch(err => {
                                this.addLoading = false;
                                swal('Error', 'Something Went wrong', 'error')
                            })
            }else{
                swal('Error','Invalid file type','Error')
                return !this.isValid
            }
        },
        initForm(){
            this.addState = !this.addState;
        }
    },
}
</script>