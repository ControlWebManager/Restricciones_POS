# -*- coding: utf-8 -*-
from openerp import http

# class ../v9BsRepo/bsPos(http.Controller):
#     @http.route('/../v9_bs_repo/bs_pos/../v9_bs_repo/bs_pos/', auth='public')
#     def index(self, **kw):
#         return "Hello, world"

#     @http.route('/../v9_bs_repo/bs_pos/../v9_bs_repo/bs_pos/objects/', auth='public')
#     def list(self, **kw):
#         return http.request.render('../v9_bs_repo/bs_pos.listing', {
#             'root': '/../v9_bs_repo/bs_pos/../v9_bs_repo/bs_pos',
#             'objects': http.request.env['../v9_bs_repo/bs_pos.../v9_bs_repo/bs_pos'].search([]),
#         })

#     @http.route('/../v9_bs_repo/bs_pos/../v9_bs_repo/bs_pos/objects/<model("../v9_bs_repo/bs_pos.../v9_bs_repo/bs_pos"):obj>/', auth='public')
#     def object(self, obj, **kw):
#         return http.request.render('../v9_bs_repo/bs_pos.object', {
#             'object': obj
#         })