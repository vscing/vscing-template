<template>
    <div class="statistic">
        <div class="statistic-title">{{title}}</div>
        <div class="statistic-content">
            <slot name="prefix"></slot>
            <span class="statistic-content-value">
                <span class="statistic-content-value-int">{{value}}</span>
            </span>
            <span v-if="suffix" class="statistic-content-suffix">{{suffix}}</span>
            <slot name="suffix"></slot>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Statistic",
        props: {
            title: String,
            value: {
                type: Number,
                default: 0
            },
            suffix: String
        }
    };
</script>

<style scoped lang="less">
    .statistic {
        -webkit-box-sizing: border-box;
        box-sizing: border-box;
        margin: 0;
        padding: 0;
        color: rgba(0,0,0,.65);
        font-size: 14px;
        font-variant: tabular-nums;
        line-height: 1.5;
        list-style: none;
        -webkit-font-feature-settings: "tnum";
        font-feature-settings: "tnum";
        .statistic-title {
            margin-bottom: 4px;
            color: rgba(0,0,0,.45);
            font-size: 14px;
        }
        .statistic-content {
            color: rgba(0,0,0,.85);
            font-size: 24px;
        }
    }
</style>
