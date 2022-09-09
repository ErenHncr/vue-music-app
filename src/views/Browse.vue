<template>
  <section class="browse">
    <div class="browse-header">
      <h1 class="browse-header__title">Browse</h1>
    </div>
    <SongList title="New Music" :songs='songs' />
    <SongList title="New Music" :songs='songs' />
  </section>
</template>

<script>
import { songsCollection } from '@/includes/firebase';
import IconSecondary from '@/directives/icon-secondary';
import { SongList } from '@/components/partials/SongList';

export default {
  name: 'Browse',
  components: { SongList },
  directives: { 'icon-secondary': IconSecondary },
  data() {
    return {
      songs: [],
      maxPerPage: 10,
      pendingRequest: false,
    };
  },
  async created() {
    this.getSongs();

    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
  methods: {
    handleScroll() {
      const { scrollTop, offsetHeight } = document.documentElement;
      const { innerHeight } = window;
      const bottomOfWindow = Math.round(scrollTop) + innerHeight === offsetHeight;

      if (bottomOfWindow) {
        this.getSongs();
      }
    },
    async getSongs() {
      if (this.pendingRequest) {
        return;
      }
      this.pendingRequest = true;
      let snapshots = [];
      if (this.songs.length) {
        const lastIndex = this.songs?.[this.songs.length - 1]?.docID;
        const lastDoc = await songsCollection
          .doc(lastIndex)
          .get();
        snapshots = await songsCollection
          .orderBy('modified_name')
          .startAfter(lastDoc)
          .limit(this.maxPerPage)
          .get();
      } else {
        snapshots = await songsCollection
          .orderBy('modified_name')
          .limit(this.maxPerPage)
          .get();
      }

      snapshots.forEach((document) => {
        this.songs.push({
          docID: document.id,
          ...document.data(),
        });
      });

      this.pendingRequest = false;
    },
  },
};
</script>

<style lang="scss" scoped>
.browse {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 2rem 2.5rem 0;

  @include on-small {
    padding: 0rem 1rem 0;
  }

  &-header {
    &__title {
      font-size: 2.125rem;
      font-weight: 700;
      line-height: 1.17;
      color: $white-900;
      margin-bottom: 6px;
    }
  }
}
</style>
