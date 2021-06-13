document.getElementById("ingredient-list").style.display = "none";
    var cart = [];
    function searchIngredient() {
        var input, filter, ul, li, a, i, txtValue;
        input = document.getElementById("search-input");
        filter = input.value.toUpperCase();
        ul = document.getElementById("ingredient-list");
        li = ul.getElementsByTagName("li");
        if(filter === ''){
            ul.style.display = "none";
        }
        else {
            ul.style.display = "";
        }
        for (i = 0; i < li.length; i++) {
            a = li[i].getElementsByTagName("p")[0];
            txtValue = a.textContent || a.innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                li[i].style.display = "";
            } else {
                li[i].style.display = "none";
            }
        }
    }

    function addIngredient(id, name){
        if(cart.indexOf(id) === -1){
            cart.push(id);
            $('.cart_list').append(`<div class="cart_item cart_item${id}"> <span>${name}</span> <span class="remove remove${id}" onclick="deteleIngredient(${id})"><i class="fas fa-times"></i></span> </div>`);
        }
        console.log(cart);
    }

    function deteleIngredient(id){
        let index = cart.indexOf(id)
        cart = cart.filter(item => item !== id);
        console.log(cart);
        $(`.cart_item${id}`).remove();
    }

    function suggestion(){
        $.ajax({    
            type: "POST",
            url: "/recipe/getRecipeByIngredient", 
            data:{ ingredientList: cart },            
            success: function(data){   
                console.log(data);
                location.reload();
            }
        });
    }