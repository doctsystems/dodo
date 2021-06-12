from django.shortcuts import render
from django.views import generic
from django.core.mail import send_mail
from django.core.mail import EmailMessage
from django.shortcuts import redirect
from django.urls import reverse

from skills.models import Skill

# Create your views here.


class Home(generic.TemplateView):
    template_name = 'app/home.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['hard_skills'] = Skill.objects.filter(type_skill='h')
        context['soft_skills'] = Skill.objects.filter(type_skill='s')
        return context


def Contact(request):

    if request.method == "POST":
        name = request.POST.get('name', '')
        _replyto = request.POST.get('_replyto', '')
        content = request.POST.get('message', '')

        email_body = """\
		    <html>
				<head>
					<meta http-equiv="Content-Type" content="text/html; charset=iso-8859-=1">
					<style type="text/css">
						body {font-family:Calibri,Helvetica,sans-serif; font-size:12pt; color:rgb(0,0,0)}
						div{color:rgb(63,63,63); font-family:Arial; font-size:small}
						hr{display:inline-block;}
					</style>
				</head>
				<body dir="ltr" style="text-align: justify;">
					<div id="appendonsend"></div>
						<hr tabindex="-1">
					<div>
						<h2>De: %s</h2>
						<h3>Mensaje: %s</h3>
						<h5>Email de contacto: %s</h5>
					</div>
					<br>
				</body>
			</html>
		    """ % (name, content, _replyto)
        email = EmailMessage('A new email from diegoosvaldo.me', email_body, to=[
                             'd.cruz@outlook.com', 'info@diegoosvaldo.me'])
        email.content_subtype = "html"
        email.send()
    return redirect(reverse('app:home'))
