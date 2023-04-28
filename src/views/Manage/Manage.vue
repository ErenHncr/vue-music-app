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
          <!-- TODO: update image url with song cover -->
          <img
            tabindex="-1"
            src='https://picsum.photos/42'
            class='list-item__cover'
          />
          <span class='list-item__name'>{{ song?.modified_name }}</span>
          <BaseDropdown
            class='list-item__options'
            type='secondary'
            :options='[
              {
                key: "edit",
                label: "Edit",
              },
              {
                key: "delete",
                label: "Delete",
              },
            ]'
             @onItemClick='(key) => onDropdownItemClick(key, index)'
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
  <BaseModal :visible="modal?.key === 'edit'" @onCancel='onCancel'>
    <SongForm :pending="pending" title="Edit Song" :hideInputs="['song_file']" />
  </BaseModal>
  <BaseModal :visible="modal?.key === 'delete'" @onCancel='onCancel'>
    <div class='text-lg ml-6 mb-4'>
      {{ $t("views.manage.deleteSong.content") }}
    </div>
    <div class='flex flex-row gap-x-2 justify-end absolute bottom-6 right-8'>
      <BaseButton
        :disabled='pending'
        class='delete-modal__btn'
        color='text'
        @onClick='onCancel'
        >
         {{ $t("globals.cancel") }}
      </BaseButton>
      <BaseButton
        :disabled='pending'
        class='delete-modal__btn'
        color='delete'
        @onClick='onDeleteSong'
        >
        {{ $t("globals.delete") }}
      </BaseButton>
    </div>
  </BaseModal>
</template>

<script>
import {
  songsCollection, auth, storage,
} from '@/includes/firebase';
import SongForm from '@/components/partials/Forms/Song.vue';
import playSVG from '@/assets/svg/play.svg';
import linkSVG from '@/assets/svg/link.svg';
import moreSVG from '@/assets/svg/more.svg';

export default {
  name: 'Manage',
  components: { SongForm },
  data() {
    return {
      pending: false,
      modal: {
        key: '',
        index: null,
      },
      songs: [],
      unsavedFlag: false,
      playSVG,
      linkSVG,
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
    onCancel() {
      this.modal = {
        key: '',
        index: null,
      };
    },
    onDropdownItemClick(key, index) {
      this.modal = {
        key,
        index,
      };
    },
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
    async onDeleteSong() {
      this.pending = true;
      const song = this.songs?.[this.modal?.index];
      const songIndex = this.modal?.index;
      const storageRef = storage.ref();
      const songRef = storageRef.child(`songs/${song?.original_name}`);
      // delete song from storage
      await songRef.delete();
      // delete song from document
      await songsCollection.doc(song?.docID).delete();
      // remove song from array
      this.removeSong(songIndex);
      this.onCancel();
      this.pending = false;
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
    gap: 0.75rem;
    font-size: 1rem;
    background-color: rgba(255, 255, 255, 0.1);
    border-radius: $default-border-radius;
    padding: 0.5rem 0.75rem 0.5rem 0.5rem;
    transition: background-color 0.25s;
    cursor: pointer;

    &:hover {
      background: rgba(255, 255, 255, 0.15);
    }

    &__cover {
      border-radius: $default-border-radius;
    }

    &__options {
      margin-left: auto;
    }
  }

  &__header {
    font-size: 17px;
    font-weight: 700;
    letter-spacing: .6px;
    padding-bottom: 13px;
  }
}

.delete-modal {
    &__btn {
      font-size: 1rem;
      &:hover {
        background: rgba(255, 255, 255, 0.1);
      }
    }
  }
</style>
