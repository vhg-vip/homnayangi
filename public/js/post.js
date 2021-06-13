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

$('.voted-star').hide();
$('.disable-star').hide();

function voteStar(point, recipeId){
    console.log(point, recipeId);
    for(let i=1; i<=point; i++){
        $(`.voted-star${i}${recipeId}`).show();
        $(`.unvoted-star${i}${recipeId}`).hide();
    }
    for(let i = point+1; i<=5; i++){
        $(`.disable-star${i}${recipeId}`).show();
        $(`.unvoted-star${i}${recipeId}`).hide();
    }
    $.ajax({    
        type: "POST",
        url: "/recipe/voteStar", 
        data:{ recipe_id: recipeId, points: point },            
        success: function(data){   
            console.log(data);
            // location.reload();
        }
    });
}