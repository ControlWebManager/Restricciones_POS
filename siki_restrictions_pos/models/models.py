# -*- coding: utf-8 -*-

from openerp import models, fields, api


class PosConfig(models.Model):
    _inherit='pos.config'
    
    disc_pwd = fields.Integer(string='Password',size=64)
