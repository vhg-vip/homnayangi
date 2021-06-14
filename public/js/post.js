function removeFavoriteRecipe(recipeId, userId){
    console.log(recipeId, userId);
    $(`#dislike${recipeId}`). hide();
    $(`#like${recipeId}`).show();
    $.ajax({    
        type: "POST",
        url: "/user/delete-favorite", 
        data:{ recipe_id: recipeId, user_id: userId },            
        success: function(data){   
            console.log(data);
            location.reload();
        }
    });
    location.reload();
}

function addFavoriteRecipe(recipeId, userId){
    console.log(recipeId, userId);
    $(`#dislike${recipeId}`).show();
    $(`#like${recipeId}`).hide();
    $.ajax({    
        type: "POST",
        url: "/user/add-favorite", 
        data:{ recipe_id: recipeId, user_id: userId },            
        success: function(data){   
            console.log(data);
            location.reload();
        }
    });
    // location.reload();
}