from django.db import models
import uuid
from django.contrib.auth.models import AbstractUser

# Create your models here.
class CustomUser(AbstractUser):
    icon = models.ImageField(
        upload_to="user/",
        default="misc/722e64ef8f12418691bf75c04b83ebbe.png",
        null=True,
        blank=False,
    )
    introduction = models.TextField(max_length=500, blank=True, null=True)

    def __str__(self):
        return self.username

class Schedule(models.Model):
    title = models.CharField(max_length=200)
    todo = models.TextField(blank=True, null=True)
    start = models.DateTimeField()
    end = models.DateTimeField()
    created_by = models.ForeignKey(CustomUser, related_name='schedule', on_delete=models.CASCADE)

    def __str__(self):
        return self.title

class BookMark(models.Model):
    name = models.CharField(max_length=200)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='bookmark')
    posts = models.ManyToManyField('Post', related_name='bookmark')

class Follow(models.Model):
    follower = models.ForeignKey(CustomUser, related_name='follower', on_delete=models.CASCADE)
    following = models.ForeignKey(CustomUser, related_name='following', on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.follower.username} → {self.following.username}"

class Post(models.Model):
    content = models.FileField(upload_to="post/")
    explanation = models.TextField(max_length=300, blank=True, null=True)
    views = models.PositiveIntegerField(default=0)
    like = models.ManyToManyField(CustomUser, related_name='movie_like', blank=True, null=True)
    location = models.CharField(null=True, blank=True, max_length=300)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='post')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.explanation

class Comment(models.Model):
    content = models.TextField(max_length=1000)
    commented_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='comment')
    commented_at = models.DateTimeField(auto_now_add=True)
    commented_on = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='comment')

    def __str__(self):
        return f"{self.content} (by: {self.commented_by.username})"

class Tag(models.Model):
    GENRE_LIST = [
        ("animals", "動物"),
        ("food", "食べ物"),
        ("locations", "場所"),
        ("anime", "アニメ"),
        ("movies", "映画"),
        ("gaming", "ゲーム"),
        ("electronic_equipment", "電子機器"),
        ("sports", "スポーツ"),
        ("music", "音楽"),
        ("art", "アート"),
        ("culture", "文化"),
        ("science", "科学"),
        ("history", "歴史"),
        ("literature", "文学"),
        ("fashion", "ファッション"),
        ("person", "人物"),
        ("health", "健康"),
        ("education", "教育"),
        ("business", "ビジネス"),
        ("politics", "政治"),
        ("social_issues", "社会問題"),
        ("nature", "自然"),
        ("events", "イベント"),
        ("feeling", "感覚"),
        ("misc", "その他"),
    ]

    name = models.CharField(max_length=128)
    genre = models.CharField(max_length=128, choices=GENRE_LIST)
    used = models.PositiveIntegerField(default=0)
    created_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.name}({self.genre})"

class Group(models.Model):
    host = models.ForeignKey(CustomUser, on_delete=models.CASCADE, related_name='host_group')
    name = models.CharField(max_length=50)
    uuid = models.UUIDField(primary_key=True, default=uuid.uuid4)
    description = models.TextField(max_length=1000, blank=True, null=True)
    tags = models.ManyToManyField(Tag, related_name='tags', blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)
    budget = models.PositiveIntegerField(blank=True, null=True)
    icon = models.ImageField(
        upload_to="group/",
        default="misc/722e64ef8f12418691bf75c04b83ebbe.png",
        null=True,
        blank=False,
    )
    favorite = models.ManyToManyField(CustomUser, related_name='group_favorite', blank=True, null=True)
    participants = models.ManyToManyField(CustomUser, related_name='group', blank=True, null=True)
    album = models.ImageField(
        upload_to="group/",
        null=True,
        blank=True,
    )

    def is_host(self, user=None):
        return user is not None and self.host.pk == user.pk

    def is_participant(self, user=None):
        if user is None:
            return False
        if self.is_host(user):
            return True
        return self.participants.filter(pk=user.pk).exists()

    def __str__(self):
        return self.name

class Plan(models.Model):
    content = models.TextField(max_length=5000)
    location = models.CharField(blank=True, null=True, max_length=300)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='plans')
    start = models.DateTimeField(blank=True, null=True)
    end = models.DateTimeField(blank=True, null=True)

class Message(models.Model):
    content = models.TextField(max_length=5000)
    sender = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    group = models.ForeignKey(Group, on_delete=models.CASCADE, related_name='messages')
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.group} (by: {self.sender.username})"

class Search(models.Model):
    content = models.TextField(max_length=500)
    searched_by = models.ForeignKey(CustomUser, on_delete=models.CASCADE)
    searched_at = models.DateTimeField(auto_now_add=True)
