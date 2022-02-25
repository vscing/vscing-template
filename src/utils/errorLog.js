import Vue from 'vue'
import store from '@/store'
import { env } from '@/config'

Vue.config.errorHandler = function (err, vm, info) {
    // Don't ask me why I use Vue.nextTick, it just a hack.
    // detail see https://forum.vuejs.org/t/dispatch-in-vue-config-errorhandler-has-some-problem/23500
    if(env.errorLog){
        Vue.nextTick(() => {
            store.dispatch('errorLog/addErrorLog', {
                err,
                vm,
                info,
                url: window.location.href
            })
            console.error(err, info)
        })
    }
}
