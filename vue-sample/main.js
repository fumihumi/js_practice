function initial(){
    new Vue({
        el:"#msg",
        data:{
            message : 'this is vue script',
            text: ""
        },
        methods: {
            doaction: function(){
                var str = this.text;
                this.message = 'you typed: ' + str + '.';
            }
        }
    })
}