exports.index = function(req, res){
  res.render('layout');
};

app.get('/partials/:name', function (req, res) {
  var name = req.params.name;
  res.render('partials/' + name);
});