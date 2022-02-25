import Vue from 'vue'

/**
 * 首字母大写
 * @param str
 */

Vue.filter('uppercaseFirst', function (str) {
    return str.charAt(0).toUpperCase() + str.slice(1)
})
