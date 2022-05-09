from django.shortcuts import render
from django.views import View

# Create your views here.
class HomeView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/schoolprofile.html', context={})
    
    
class DashboardView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/dashboard.html', context={})
    
    
class AttendanceView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/attendance.html', context={})

class MapView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/clustermap.html', context={})
    
    
class SchoolProfileView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/schoolprofile.html', context={})
    
    
class ConsolidationView(View):
    
    def get(self, request, *args, **kwargs):
        return render(request, 'dashboard/consolidated.html', context={})
