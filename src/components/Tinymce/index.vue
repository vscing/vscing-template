<template>
    <div>
        <editor :init="init" v-model="value"></editor>
    </div>
</template>

<script>
    // 引入基本文件
    import tinymce from 'tinymce/tinymce';
    import Editor from '@tinymce/tinymce-vue';
    import 'tinymce/themes/silver';
    import plugins from './plugins';
    import toolbar from './toolbar';

    // 引入你需要的插件
    import 'tinymce/icons/default/icons';
    import 'tinymce/plugins/emoticons/js/emojis'
    import 'tinymce/plugins/paste';
    import 'tinymce/plugins/link';
    import 'tinymce/plugins/print';
    import 'tinymce/plugins/preview';
    import 'tinymce/plugins/searchreplace';

    import 'tinymce/plugins/autolink';
    import 'tinymce/plugins/directionality';
    import 'tinymce/plugins/visualblocks';
    import 'tinymce/plugins/visualchars';

    import 'tinymce/plugins/image';

    import 'tinymce/plugins/media';
    import 'tinymce/plugins/fullscreen';
    import 'tinymce/plugins/template';
    import 'tinymce/plugins/code';
    import 'tinymce/plugins/codesample';
    import 'tinymce/plugins/table';
    import 'tinymce/plugins/charmap';
    import 'tinymce/plugins/hr';
    import 'tinymce/plugins/pagebreak';
    import 'tinymce/plugins/nonbreaking';
    import 'tinymce/plugins/anchor';
    import 'tinymce/plugins/insertdatetime';
    import 'tinymce/plugins/advlist';
    import 'tinymce/plugins/lists';
    import 'tinymce/plugins/wordcount';
    import 'tinymce/plugins/autoresize';
    import 'tinymce/plugins/emoticons';
    import 'tinymce/plugins/autosave';
    import 'tinymce/plugins/help';
    import 'tinymce/plugins/textpattern';
    import 'tinymce/plugins/imagetools';
    import '@/assets/tinymce/plugins/indent2em';
    import '@/assets/tinymce/plugins/lineheight';
    import '@/assets/tinymce/plugins/imageSelector';
    //import 'tinymce/plugins/bdmap';

    export default {
        name: "Tinymce",
        components: {
            Editor
        },
        props: {
            curValue: {
                type: String,
                default: ''
            },
        },
        data() {
            return {
                init: {
                    selector: '#tinymce',
                    skin_url: '/tinymce/skins/ui/oxide',// skin路径
                    //skin:'oxide-dark',
                    //language_url: '/tinymce/langs/zh_CN.js',// 语言包的路径
                    language_url: 'https://cdn.tiny.cloud/1/invalid-api-key/tinymce/5.4.2-90/langs/zh_CN.js',
                    language: 'zh_CN',//语言
                    height: 530, //编辑器高度
                    min_height: 500,//编辑器最小高度
                    max_width: 600,//编辑器最大宽度

                    menubar: true,//顶部菜单栏显示
                    branding: false,//是否禁用“Powered by TinyMCE”
                    elementpath: true,//左下角的当前标签路径显示
                    toolbar,
                    plugins,
                    /*content_css: [ //可设置编辑区内容展示的css，谨慎使用
                        '/static/reset.css',
                        '/static/ax.css',
                        '/static/css.css',
                    ],*/
                    link_list: [
                        // { title: '预置链接1', value: 'http://www.tinymce.com' },
                        // { title: '预置链接2', value: 'http://tinymce.ax-z.cn' }
                    ],
                    image_list: [
                        // { title: '预置图片1', value: 'https://www.tiny.cloud/images/glyph-tinymce@2x.png' },
                        // { title: '预置图片2', value: 'https://www.baidu.com/img/bd_logo1.png' }
                    ],
                    // image_class_list: [
                    //     { title: 'None', value: '' },
                    //     { title: 'Some class', value: 'class-name' }
                    // ],
                    forced_root_block: 'p', //根标签
                    paste_word_valid_elements: '*[*]',        // word需要它
                    paste_data_images: true,                  // 粘贴的同时能把内容里的图片自动上传，非常强力的功能

                    imageSelectorCallback: ()=>{
                        this.$emit('imageSelectorCallback')
                    },
                },
                value: this.curValue
            }
        },
        watch: {
            curValue(newValue) {
                this.value = newValue
            },
            value(newValue) {
                this.$emit('input', newValue)
            }
        }

    };
</script>

<style scoped lang="less">

</style>
