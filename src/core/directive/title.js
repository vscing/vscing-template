Vue.directive('title',(el, bindings) => {
    document.title = bindings.value
})
