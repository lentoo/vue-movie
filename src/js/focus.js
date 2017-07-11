import Vue from 'vue'
var focus = {};
focus.install = function () {
    Vue.directive('focus', function (el, binding) {
        var server = binding.value.server;
        var aLink = el.children[0].href;        
        var link = /^((http)?:\/\/)[\w]+:+[\d]+\/\W+([\w]+)?\/\w/;
        var val = (aLink.match(link))[3];
        el.className = '';
        if (val == server) {
            el.className = 'active';
        }
    })
}
export default focus;