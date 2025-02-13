from django.contrib import admin
from .models import *

# Register your models here.
admin.site.register(CustomUser)
admin.site.register(Schedule)
admin.site.register(BookMark)
admin.site.register(Follow)
admin.site.register(Post)
admin.site.register(Comment)
admin.site.register(Tag)
admin.site.register(Group)
admin.site.register(Plan)
admin.site.register(Message)
admin.site.register(Search)
