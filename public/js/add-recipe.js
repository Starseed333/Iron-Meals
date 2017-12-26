console.log('inside add-recipe.js');
// under construction

(function(){
	$('#add-recipe').on('click', function(){
		var url = $('#recipe-url').val();
		$.post({
			url: '/api/scrape/',
			data: {
				url: url,
				meal: $('#mealdrop').val(),
				tags: $('#recipe-tags').val().split(' '),
				vegetarian: $('#vegetarian-check').prop('checked'),
				vegan: $('#vegan-check').prop('checked')
			}
		}).done(function(response){
			Materialize.toast('Recipe added!', 4000);
			clearAll();
		});
	});

	function clearAll(){
		$('#recipe-url').val('');
		$('#recipe-tags').val('');
		$('#vegetarian-check').prop('checked', false);
		$('#vegan-check').prop('checked', false);
	}

})();