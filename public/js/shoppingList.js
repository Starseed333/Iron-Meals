console.log('inside shoppinglist');

$(document).ready(function() {
    $("#shopping-list").on("click", function(event) {
        var thisId = localStorage.getItem("id");
            $.ajax({
                method: "GET",
                url: "/api/shoppinglist/" + thisId
            }).done(function(data) {
            console.log(data)
                var list = $("<ul>");
                list.addClass("browser-default")
                for (var i = 0; i < data.length; i++) {
                    var listItem = $("<li>");
                    var content = data[i].ingredient
                    listItem.append(content)
                    list.append(listItem)
                }
                $("#shoppingList").html(list)
            }).catch(function(err) {
                Materialize.toast('Please create a meal plan first.', 4000)
          });
    })

});
