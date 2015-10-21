erpagWeather.service('cityService', function(){
    this.city="Pancevo1,Serbia"

});

erpagWeather.service('API', ['$http', function ($http) {
return {
uploadLogo: function(logo) {
var formData = new FormData();
formData.append("file", logo);
return $http.post('/api/uploads', formData, {
headers: {'Content-Type': undefined},
transformRequest: angular.identity
});
}
};
}]);