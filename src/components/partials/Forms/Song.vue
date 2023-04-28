<template>
  <div class="form-song-wrapper">
    <VeeForm
      v-slot="{ meta: { valid } }"
      class="form-song"
      :initial-values="song"
      :validation-schema="validationSchema"
      @submit="onSubmit"
    >
      <h1 class="form-song__title">{{ title }}</h1>
      <div class="input-row" v-show="hideInputs.includes['song_file']">
        <input
          accept="audio/mpeg, audio/mp3"
          class="hidden"
          ref="songFile"
          type="file"
          name="song_file"
          :label="$t('views.manage.editSong.songFile.label')"
          :placeholder="$t('views.manage.editSong.songFile.placeholder')"
          @change="onSongFileChange($event)"
        />
        <label class="inline-block mb-2">{{ $t("views.manage.editSong.songFile.label") }}</label>
        <div
          class="w-full px-4 py-1.5 rounded text-center cursor-pointer border
            border-dashed border-gray-400 text-gray-400 transition duration-500
            hover:text-white hover:bg-zinc-950 hover:border-solid flex"
          :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="onSongFileChange($event)"
          @click.prevent.stop="$refs.songFile.click()"
        >
          <h5>{{
            getFileName(payload?.song_file)
            || $t('views.manage.editSong.songFile.placeholder')}}</h5>
        </div>
        <VeeErrorMessage class="text-red-500 text-xs mt-2" name="song_file" />
      </div>
      <div class="input-row">
        <input
          accept="image/jpeg, image/jpg, image/svg+xml, image/png"
          class="hidden"
          ref="coverFile"
          type="file"
          name="cover_file"
          :label="$t('views.manage.editSong.coverFile.label')"
          :placeholder="$t('views.manage.editSong.coverFile.placeholder')"
          @change="onSongFileChange($event)"
        />
        <label class="inline-block mb-2">{{ $t("views.manage.editSong.coverFile.label") }}</label>
        <img
          v-if="cover_file"
          :src="cover_file"
          class="object-contain w-full h-auto mt-2 mb-6"
        />
        <div
          class="w-full px-4 py-1.5 rounded text-center cursor-pointer border
            border-dashed border-gray-400 text-gray-400 transition duration-500
            hover:text-white hover:bg-zinc-950 hover:border-solid flex"
          :class="{ 'bg-green-400 border-green-400 border-solid': is_dragover }"
          @drag.prevent.stop=""
          @dragstart.prevent.stop=""
          @dragend.prevent.stop="is_dragover = false"
          @dragover.prevent.stop="is_dragover = true"
          @dragenter.prevent.stop="is_dragover = true"
          @dragleave.prevent.stop="is_dragover = false"
          @drop.prevent.stop="onSongFileChange($event)"
          @click.prevent.stop="$refs.coverFile.click()"
        >
          <h5>{{
            getFileName(payload?.cover_file)
            || $t('views.manage.editSong.coverFile.placeholder')}}</h5>
        </div>
        <VeeErrorMessage class="text-red-500 text-xs mt-2" name="song_file" />
      </div>
      <div class="input-row">
        <label class="inline-block mb-2">{{ $t("views.manage.editSong.songTitle.label") }}</label>
        <BaseInput
          tabindex="1"
          :disabled="pending"
          name="modified_name"
          :label="$t('views.manage.editSong.songTitle.label')"
          type="text"
          :placeholder="$t('views.manage.editSong.songTitle.placeholder')"
          v-model="payload.modified_name"
        />
        <VeeErrorMessage class="text-red-500 text-xs mt-2" name="modified_name" />
      </div>
      <div class="input-row">
        <label class="inline-block mb-2">{{ $t("views.manage.editSong.genre.label") }}</label>
        <BaseInput
          tabindex="1"
          :disabled="pending"
          name="genre"
          :label="$t('views.manage.editSong.genre.label')"
          type="text"
          :placeholder="$t('views.manage.editSong.genre.placeholder')"
          v-model="payload.genre"
        />
        <VeeErrorMessage class="text-red-500 text-xs mt-2" name="genre" />
      </div>
      <div class="input-row">
        <label class="inline-block mb-2">{{ $t("views.manage.editSong.artistName.label") }}</label>
        <BaseInput
          tabindex="1"
          :disabled="pending"
          name="artist_name"
          :label="$t('views.manage.editSong.artistName.label')"
          type="text"
          :placeholder="$t('views.manage.editSong.artistName.placeholder')"
          v-model="payload.artist_name"
        />
        <VeeErrorMessage class="text-red-500 text-xs mt-2" name="artist_name" />
      </div>
      <BaseButton
        tabindex="5"
        :disabled="pending || !valid || !isFormFilesValid"
        type="submit"
        color="secondary"
        class="submit-btn"
      >
        <BaseLoading v-show="pending" class="loading" />
        <span v-show="!pending">
          {{ submitText }}
        </span>
      </BaseButton>
    </VeeForm>
  </div>
</template>

<script>
export default {
  name: 'SongForm',
  props: {
    pending: {
      type: Boolean,
      required: false,
    },
    hideInputs: {
      type: Array,
      required: false,
      default: () => [],
    },
    submitText: {
      type: String,
      required: false,
      default: 'Submit',
    },
    title: {
      type: String,
      required: false,
    },
    song: {
      type: Object,
      required: true,
    },
    index: {
      type: Number,
      required: true,
    },
    updateSong: {
      type: Function,
      required: true,
    },
    removeSong: {
      type: Function,
      required: true,
    },
    updateUnsavedFlag: { type: Function },
    onSubmit: {
      type: Function,
      required: true,
    },
  },
  data() {
    return {
      showForm: false,
      cover_file: null,
      song_file: null,
      payload: {
        cover_file: null,
        song_file: null,
        modified_name: '',
        genre: '',
        artist_name: '',
      },
      validationSchema: {
        modified_name: 'required',
        genre: 'required',
        artist_name: 'required',
      },
    };
  },
  methods: {
    onSongFileChange(e) {
      let file = null;
      if (e?.dataTransfer) {
        file = e?.dataTransfer?.files?.[0];
      } else {
        file = e?.target?.files?.[0];
      }

      const { target: { name } } = e;

      if (name && file) {
        const reader = new FileReader();
        reader.onload = (r) => {
          this[name] = r.target.result;
        };
        reader.readAsDataURL(file);
        this.payload = {
          ...this.payload,
          [name]: file,
        };
      }
    },
    getFileName(file) {
      const fileName = file?.name;
      if (typeof fileName === 'string') {
        return fileName.slice(0, fileName.lastIndexOf('.'));
      }
      return '';
    },
  },
  computed: {
    isFormFilesValid() {
      if (this.payload.cover_file && this.payload.song_file) {
        return true;
      }
      return false;
    },
  },
  watch: {
    payload: {
      handler(newValue) {
        this.payload.modified_name = this.getFileName(newValue?.song_file);
      },
      deep: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.form-song {
  max-width: min(400px, 100%);
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
  text-align: center;

  &__title {
    font-size: 1.25rem;
    font-weight: 600;
    text-align: start;
    color: rgba($color: #fff, $alpha: 0.85);
  }

  &-wrapper {
    display: flex;
    flex-direction: column;
    align-items: center;
  }

  & > .input-row {
    width: inherit;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }

  .submit-btn {
    height: 36px;
    font-size: 1rem;
    font-weight: 400;
    margin-top: 1rem;

    .loading {
      transform: scale(0.8);
    }
  }
}
</style>
