from user.models import Admin

class AdminService:

    def save(self, username, password):
        u = Admin(username=username, password=password)
        u.save()

    def list(self):
        return Admin.objects.all()

    def findByUsername(self, username):
        rlist = Admin.objects.filter(username=username)
        if len(rlist) < 1:
            return None
        else:
            return rlist[0]




