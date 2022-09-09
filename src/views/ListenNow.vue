<template>
  <section class="listen-now">
    <div class="listen-now__personal-text">
      <img
        class="listen-now__personal-logo svg-white inline"
        :src="brandSVG"
        width="83"
        height="20"
        alt="icon"
      />
      <div class="listen-now__personal-head">
        {{ $t("views.listen-now.head") }}
      </div>
      <div class="listen-now__personal-subhead">
        {{ $t("views.listen-now.subhead") }}
      </div>
      <BaseButton class="listen-now__personal-actionButton" @click='onClickAction'>
        {{ $t("views.listen-now.actionButton") }}
      </BaseButton>
    </div>
    <picture class="listen-now__personal-artwork">
      <source
        media="(max-width: 359px)"
        srcset="
          /assets/img/listen-now/xsmall.webp    1x,
          /assets/img/listen-now/xsmall@2x.webp 2x
        "
        type="image/webp"
      />
      <source
        media="(min-width: 360px) and (max-width: 919px)"
        srcset="
          /assets/img/listen-now/small.webp    1x,
          /assets/img/listen-now/small@2x.webp 2x
        "
        type="image/webp"
      />
      <source
        media="(min-width: 920px) and (max-width: 1149px)"
        srcset="
          /assets/img/listen-now/medium.webp    1x,
          /assets/img/listen-now/medium@2x.webp 2x
        "
        type="image/webp"
      />
      <source
        media="(min-width: 1150px) and (max-width: 1579px)"
        srcset="
          /assets/img/listen-now/large.webp    1x,
          /assets/img/listen-now/large@2x.webp 2x
        "
        type="image/webp"
      />
      <source
        media="(min-width: 1580px)"
        srcset="
          /assets/img/listen-now/xlarge.webp    1x,
          /assets/img/listen-now/xlarge@2x.webp 2x
        "
        type="image/webp"
      />
      <source
        media="(max-width: 359px)"
        srcset="
          /assets/img/listen-now/xsmall.png    1x,
          /assets/img/listen-now/xsmall@2x.png 2x
        "
        type="image/png"
      />
      <source
        media="(min-width: 360px) and (max-width: 919px)"
        srcset="
          /assets/img/listen-now/small.png    1x,
          /assets/img/listen-now/small@2x.png 2x
        "
        type="image/png"
      />
      <source
        media="(min-width: 920px) and (max-width: 1149px)"
        srcset="
          /assets/img/listen-now/medium.png    1x,
          /assets/img/listen-now/medium@2x.png 2x
        "
        type="image/png"
      />
      <source
        media="(min-width: 1150px) and (max-width: 1579px)"
        srcset="
          /assets/img/listen-now/large.png    1x,
          /assets/img/listen-now/large@2x.png 2x
        "
        type="image/png"
      />
      <source
        media="(min-width: 1580px)"
        srcset="
          /assets/img/listen-now/xlarge.png 1x
          /assets/img/listen-now/xlarge@2x.png 2x"
        type="image/png"
      />
      <img
        src="/assets/img/listen-now/medium.webp"
        alt="apple music window on macbook screen"
      />
    </picture>
  </section>
</template>

<script>
import { mapMutations } from 'vuex';
import brandSVG from '@/assets/svg/brand.svg';

export default {
  name: 'ListenNow',
  methods: {
    ...mapMutations('auth', ['openAuthModal', 'updateAuthModal']),
    onClickAction() {
      this.updateAuthModal('register');
      this.openAuthModal();
    },
  },
  setup() {
    return { brandSVG };
  },
};
</script>

<style lang="scss" scoped>
.listen-now {
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  text-align: center;
  padding-top: 75px;
  margin: 0 auto;
  overflow: hidden;

  &__personal {
    &-text {
      max-width: 70%;
      margin: 0 auto;
    }
    &-logo {
      margin-bottom: 14px;
    }
    &-head {
      max-width: 440px;
      font-size: 2.5em;
      font-weight: 600;
      line-height: 44px;
      margin-bottom: 15px;
      line-height: 1.1;
    }
    &-subhead {
      max-width: 370px;
      font-size: 1.063em;
      font-weight: 400;
      margin: 0 35px 29px 35px;
      line-height: 1.4;
      letter-spacing: 0;
    }

    &-actionButton {
      min-width: 125px;
      letter-spacing: .022em;
    }

    &-artwork {
      & img {
        width: 100%;
        max-width: 1680px;
      }
    }
  }
}
</style>
