<template>
    <div class="yi-image" style="border:1px solid red;width: 100px;height: 100px;">
        <slot v-if="loading" name="placeholder">
            <div class="yi-image__placeholder"></div>
        </slot>
        <slot v-else-if="error" name="error">
            <div class="yi-image__error">{{ t('el.image.error') }}</div>
        </slot>
        <img v-else
             class="yi-image__inner"
             v-bind="$attrs"
             v-on="$listeners"
             @click="clickHandler"
             :src="src"
             :style="imageStyle"
             :class="{ 'yi-image__inner--center': alignCenter, 'yi-image__preview': preview }"/>
        <template v-if="preview">
            <image-viewer :z-index="zIndex"
                          :initial-index="imageIndex"
                          v-show="showViewer"
                          :on-close="closeViewer"
                          :url-list="previewSrcList"/>
        </template>
    </div>
</template>

<script>
    import { isString, isHtmlElement } from '../../utils/types';
    import ImageViewer from './image-viewer';
    const isSupportObjectFit = () => document.documentElement.style.objectFit !== undefined;
    const ObjectFit = {
        NONE: 'none',
        CONTAIN: 'contain',
        COVER: 'cover',
        FILL: 'fill',
        SCALE_DOWN: 'scale-down'
    };
    let prevOverflow = '';
    export default {
        name: "YiImage",
        inheritAttrs: false,
        components: {
            ImageViewer
        },
        props:{
            src: String,
            fit: String,//fill / contain / cover / none / scale-down
            lazy: Boolean,
            scrollContainer: {},
            previewSrcList: {
                type: Array,
                default: () => []
            },
            zIndex: {
                type: Number,
                default: 2000
            }
        },
        data(){
            return{
                loading: true,
                error: false,
                show: !this.lazy,
                imageWidth: 0,
                imageHeight: 0,
                showViewer: false
            }
        },
        computed:{
            imageStyle(){
                const { fit } =this;
                if(!this.$isServer && fit){
                    return isSupportObjectFit()
                        ? {'object-fit': fit}
                        : this.getImageStyle(fit);
                }
                return {};
            },
            alignCenter() {
                return !this.$isServer && !isSupportObjectFit() && this.fit !== ObjectFit.FILL;
            },
            preview() {
                const { previewSrcList } = this;
                return Array.isArray(previewSrcList) && previewSrcList.length > 0;
            },
            imageIndex() {
                return this.previewSrcList.indexOf(this.src);
            }
        },
        watch:{
            src(val) {
                this.show && this.loadImage();
            },
            show(val) {
                val && this.loadImage();
            }
        },
        mounted(){
            if(this.lazy){
                this.addLazyLoadListener();
            }else{
                this.loadImage();
            }
            console.log(this)
        },
        beforeDestroy(){
            this.lazy && this.removeLazyLoadListener();
        },
        methods:{
            loadImage(){
                if(this.$isServer) return;
                this.loading = true
                this.error = false
                const  img = new Image()
                img.onload = e => this.handleLoad(e, img);
                img.onerror = this.handleError.bind(this);
                Object.keys(this.$attrs)
                    .forEach((key) => {
                        const value = this.$attrs[key];
                        img.setAttribute(key, value);
                    });
                img.src = this.src;
            },
            handleLoad(e, img){
                this.imageWidth = img.width;
                this.imageHeight = img.height;
                this.loading = false;
                this.$emit('load', e);
            },
            handleError(e){
                this.loading = false;
                this.error = true;
                this.$emit('error', e);
            },
            handleLazyLoad(){

            },
            addLazyLoadListener(){
                // if(this.$isServer) return;
                // const { scrollContainer} = this;
                // let _scrollContainer = null;
                // if (isHtmlElement(scrollContainer)) {
                //     _scrollContainer = scrollContainer;
                // } else if (isString(scrollContainer)) {
                //     _scrollContainer = document.querySelector(scrollContainer);
                // } else {
                //     _scrollContainer = getScrollContainer(this.$el);
                // }
            },
            removeLazyLoadListener(){

            },
            getImageStyle(fit){
                const { imageWidth, imageHeight } = this;
                const {
                    clientWidth: containerWidth,
                    clientHeight: containerHeight
                } = this.$el;
                if (!imageWidth || !imageHeight || !containerWidth || !containerHeight) return {};

                const vertical = imageWidth / imageHeight < 1;
                if (fit === ObjectFit.SCALE_DOWN) {
                    const isSmaller = imageWidth < containerWidth && imageHeight < containerHeight;
                    fit = isSmaller ? ObjectFit.NONE : ObjectFit.CONTAIN;
                }

                switch (fit) {
                    case ObjectFit.NONE:
                        return { width: 'auto', height: 'auto' };
                    case ObjectFit.CONTAIN:
                        return vertical ? { width: 'auto' } : { height: 'auto' };
                    case ObjectFit.COVER:
                        return vertical ? { height: 'auto' } : { width: 'auto' };
                    default:
                        return {};
                }
            },
            clickHandler(){
                prevOverflow = document.body.style.overflow;
                document.body.style.overflow = 'hidden';
                this.showViewer = true;
            },
            closeViewer(){
                document.body.style.overflow = prevOverflow;
                this.showViewer = false;
            }
        }
    }
</script>
