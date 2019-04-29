# -*- coding: utf-8 -*-
{
    'name': 'Extra Restrictions POS',
    'summary': 'Restrictions for POS and session POS',
    'version': '1.2',
    'depends': [
        'base',
        'point_of_sale'
    ],
    'author' : 'SIKI SAS, Developer Ing Henry Vivas',
	'website' : 'www.sikisoftware.com',
    "support": "controlwebmanager@gmail.com",
    'category': 'Point Of Sale',
    'description': """
This module exted security the POS session
==========================================

List of modifications:
----------------------
    * V.-1.1 Module Asdaptation of app mt_pos
    * V.-2.0 View Field Pos pin security hide format password
    
 """,
    'data': [
        'views/views.xml',
        'views/templates.xml',
        'views/res_users_view.xml',
    ],
    'qweb': [
        'static/src/xml/pos.xml',
    ],
    'installable': True,
    'application': False,
}