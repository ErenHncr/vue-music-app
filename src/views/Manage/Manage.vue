<template>
  <section class='manage'>
    <h1 class='manage-header'>Manage</h1>
    <!-- Song List -->
    <div>
      <h1 class='list__header'>My Songs</h1>
      <ul class='list'>
        <li
          v-for='(song, index) in songs'
          :key='index'
          class='list-item'
        >
          <span class='list-item__name'>{{ song?.modified_name }}</span>
          <BaseDropdown
            type='secondary'
            :options='[
              {
                key: "edit",
                label: "Edit",
              },
            ]'
          >
            <img
              class='svg-white'
              :src='moreSVG'
              width='30'
              height='30'
            />
          </BaseDropdown>
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { songsCollection, auth } from '@/includes/firebase';
import moreSVG from '@/assets/svg/more.svg';

export default {
  name: 'Manage',
  components: {},
  data() {
    return {
      songs: [],
      unsavedFlag: false,
      moreSVG,
    };
  },
  async created() {
    const snapshot = await songsCollection
      .where('uid', '==', auth?.currentUser?.uid)
      .get();

    snapshot.forEach(this.addSong);
  },
  methods: {
    updateSong(index, values) {
      this.songs[index].modified_name = values?.modified_name;
      this.songs[index].genre = values?.genre;
    },
    removeSong(index) {
      this.songs.splice(index, 1);
    },
    addSong(doc) {
      if (typeof doc?.data === 'function') {
        const song = {
          docID: doc.id,
          ...doc.data(),
        };
        this.songs.push(song);
      }
    },
    updateUnsavedFlag(value) {
      this.unsavedFlag = value;
    },
  },
  beforeRouteLeave(to, from, next) {
    if (!this.unsavedFlag) {
      next();
    } else {
      // eslint-disable-next-line no-alert, no-restricted-globals
      const leave = confirm('You have unsaved changes. Are you sure you want to leave?');
      next(leave);
    }
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

<style lang='scss' scoped>
.manage {
  width: 100%;
  max-width: 1680px;
  margin: 0 auto;
  padding: 2rem 2.5rem 0;

  &-header {
    font-size: 2.125rem;
    font-weight: 700;
    line-height: 1.17;
    color: $white-900;
    padding-bottom: 6px;
    margin-bottom: 1rem;
    border-bottom: 0.5px solid rgba(255, 255, 255, 0.1);
  }

  @include on-small {
    padding: 0rem 1rem 0;
  }
}

.list {
  display: flex;
  flex-direction: column;
  row-gap: 0.45rem;

  &-item {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: $default-border-radius;
    padding: 0.5rem 0.75rem 0.5rem 1rem;
    transition: background-color 0.25s;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }
  }

  &__header {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: .6px;
    padding-bottom: 13px;
  }
}
</style>
