<template>
  <!-- Main Content -->
  <section class="container mx-auto mt-6">
    <div class="md:grid md:grid-cols-3 md:gap-4">
      <AppUpload ref="upload" />
      <div class="col-span-2">
        <div class="bg-white rounded border border-gray-200 relative flex flex-col">
          <div class="px-6 pt-6 pb-5 font-bold border-b border-gray-200">
            <span class="card-title">My Songs</span>
            <i class="fa fa-compact-disc float-right text-green-400 text-2xl"></i>
          </div>
          <div class="p-6">
            <!-- Composition Items -->
            <CompositionItem
              v-for="(song, index) in songs"
              :key="song.docID"
              :song="song"
              :index="index"
              :updateSong="updateSong"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
// import store from '@/store';
import { songsCollection, auth } from '@/includes/firebase';
import AppUpload from '@/components/Upload.vue';
import CompositionItem from '@/components/CompositionItem.vue';

export default {
  name: 'Manage',
  components: {
    AppUpload,
    CompositionItem,
  },
  data() {
    return { songs: [] };
  },
  async created() {
    const snapshot = await songsCollection
      .where('uid', '==', auth?.currentUser?.uid)
      .get();

    snapshot.forEach((doc) => {
      const song = {
        docID: doc.id,
        ...doc.data(),
      };
      this.songs.push(song);
    });
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values?.modified_name;
      this.songs[index].genre = values?.genre;
    },
  },
  // beforeRouteLeave(to, from, next) {
  //   this.$refs.upload.cancelUploads();
  //   next();
  // },
  // beforeRouteEnter(to, from, next) {
  //   if (store.state.userLoggedIn) next();
  //   else next({ name: 'home' });
  // },
};
</script>
