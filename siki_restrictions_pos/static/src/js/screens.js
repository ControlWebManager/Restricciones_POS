odoo.define('siki_restrictions_pos.screens', function (require) {
"use strict";
var screens = require('point_of_sale.screens');
var gui = require('point_of_sale.gui');
var core = require('web.core');
var _t = core._t;


var LockButton = screens.ActionButtonWidget.extend({
    template: 'LockButton',

    button_click: function () {
	var self = this;


        this.gui.show_popup('hide-cancel',{
            'title': _t('Password?'),
            'confirm': function(val) {
            var result = self.validate_pwd(val);
            console.log(this.pos.config.disc_pwd);
            if (result == true){
                return true
            }else{
                self.button_click();
            }

            },

        });

    },

    validate_pwd: function(val){
        if (val == this.pos.config.disc_pwd){
            return true;
        }else{
            return false;
        }
    },


});


screens.NumpadWidget.include({

    start: function() {
	var self = this;
	this._super();

    },

    validate_pwd: function(val){
        if (val == this.pos.config.disc_pwd){
            return true;
        }else{
            return false;
        }
    },
});

screens.define_action_button({
    'name': 'lock',
    'widget': LockButton,
    'condition': function () {

	return true;
    },
});


});