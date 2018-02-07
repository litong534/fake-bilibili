<template>
  <div ref="wrapper">
      <slot></slot>
  </div>
</template>

<script>
import BScroll from 'better-scroll';
export default {
    props: {
        probeType: {
            type: Number,
            default:2
        },
        click: {
            type: Boolean,
            default: true
        },
        data: {
            type: Array,
            default: null
        },
        listenScroll: {
            type: Boolean,
            default: false
        }
    },
    mounted() {
        setTimeout(() => {
            this._initScroll();
        },20)
    },
    methods: {
        _initScroll() {
            if(!this.$refs.wrapper) {
                return;
            }

            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click
            });

            if (this.listenScroll) {
                let me = this;
                this.scroll.on('scroll', pos => {
                    me.$emit('scroll', pos);
                });
            }
        },
        enable() {
            this.scroll && this.scroll.enable();
        },
        disable() {
            this.scroll && this.scroll.disable();
        },
        refresh() {
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    }
}
</script>

<style lang="stylus" scoped>

</style>
