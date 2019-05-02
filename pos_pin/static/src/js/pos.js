odoo.define('pos_pin.pos', function (require) {
    "use strict";

    var gui = require('point_of_sale.gui');
    var screens = require('point_of_sale.screens'); // llamado de la clase screens

    var core = require('web.core');
    var Model = require('web.DataModel');
    var formats = require('web.formats');
    var session = require('web.session');

    var _t = core._t;

    // Llamada a la clase  donde se encuentra funciones del teclado Point Sale
    var change = new screens.NumpadWidget();

    gui.Gui.include({
        //Nuevo metodo para habilitar y deshabilitar ventana emergente de contrasena supervisor
        ask_password_discount: function(password) {
            var self = this;
            var ret = new $.Deferred();
            //funcion para resetear boton de descuanto y regresar al de cantidad
            function reset_boton(){
                var newmode = 'quantity';
                    $('.selected-mode').removeClass('selected-mode');
                    $(_.str.sprintf('.mode-button[data-mode="%s"]', newmode), self.$el).addClass('selected-mode');
                    $("[data-mode='quantity']").trigger("click");
                    return change.state.changeMode(newmode);
            }

            if (password) {
                this.show_popup('password',{
                    'title': _t('Password?'),
                    'cancel':  function(){
                        reset_boton()
                     },
                    confirm: function(pw) {
                        if (pw !== password) {
                            self.show_popup('error',_t('Incorrect Password'));
                            reset_boton();
                            ret.reject();
                        } else {
                            ret.resolve();
                        }
                    },
                });
            } else {
                reset_boton();
                ret.resolve();
            }
            return ret;
        },
        sudo_custom: function(options) {
            var user = options.user || this.pos.get_cashier();

            if ($.inArray(options.special_group, user.groups_id) >= 0) {
                return new $.Deferred().resolve(user);
            } else {

            //llamada a la funcion select_user_custom; pos_pin/static/src/js/pos.js line 80
                if(options.action == 'discount' || options.action == 'price'){
                    return this.select_user_discount({
                        'security': true,
                        'current_user': this.pos.get_cashier(),
                        'title': options.title,
                        'special_group': options.special_group,
                        'action': options.action // click keyword for Point Sale
                    });

                }else{
                    return this.select_user_custom({
                        'security': true,
                        'current_user': this.pos.get_cashier(),
                        'title': options.title,
                        'special_group': options.special_group,
                    });

                }

            }
        },
        select_user_custom: function(options){
            options = options || {};

            var self = this;
            var def  = new $.Deferred();

            var list = [];
            for (var i = 0; i < this.pos.users.length; i++) {
                var user = this.pos.users[i];
                if ($.inArray(options.special_group, user.groups_id) >= 0) {
                    list.push({
                        'label': user.name,
                        'item':  user
                    });
                }
            }

            this.show_popup('selection',{
                'title': options.title || _t('Select User'),
                'list': list,
                'confirm': function(user){ def.resolve(user); },
                'cancel':  function(){ def.reject(); }
            });

            return def.then(function(user){
                if (options.security && user !== options.current_user && user.pos_security_pin) {
                    return self.ask_password(user.pos_security_pin).then(function(){

                        return user;
                    });
                } else {

                    return user;
                }
            });
        },
        select_user_discount: function(options){
            options = options || {};

            var self = this;
            var def  = new $.Deferred();

            var list = [];
            for (var i = 0; i < this.pos.users.length; i++) {
                var user = this.pos.users[i];
                if ($.inArray(options.special_group, user.groups_id) >= 0) {
                    list.push({
                        'label': user.name,
                        'item':  user
                    });
                }
            }
            //Seleccion del usuario autorizado
            this.show_popup('selection',{
                'title': options.title || _t('Select User'),
                'list': list,
                'confirm': function(user){
                    def.resolve(user); },
                'cancel':  function(){
                    var newmode = 'quantity';
                    $('.selected-mode').removeClass('selected-mode');
                    $(_.str.sprintf('.mode-button[data-mode="%s"]', newmode), self.$el).addClass('selected-mode');
                    $("[data-mode='quantity']").trigger("click");
                    //Return fuction changemode in boton quantity
                    return change.state.changeMode(newmode);
                 }
            });

            return def.then(function(user){


                if (options.security && user !== options.current_user && user.pos_security_pin) {

                    //AQui debe pasar la MAGIA , Obtener valor del DEFERRED()
                    self.ask_password_discount(user.pos_security_pin).then(function(){
                       // console.log(user.pos_security_pin)
                        return user;
                    });
                } else {

                    return user;
                }
            });
        }
    });

    screens.NumpadWidget.include({

        changedMode: function() {
        var self = this;
        this._super();
        var mode = this.state.get('mode');

            if (mode === 'discount' || mode === 'price'){
                //function call in pos_pin/static/src/js/pos.js line 51
                self.gui.sudo_custom({
                    'title': _t('Necesitas la Aprobación de un Supervisor'),
                    'special_group': this.pos.config.negative_order_group_id[0],
                    'action': mode // action click , captura el stado o mode del boton
                    })
            }
        },
    });
});