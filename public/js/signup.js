function isEmail(email) {
    let regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
    return regex.test(email);
}

function signup(){
    let user = {
        user_name: $('#user_name').val(),
        user_password: $('#password').val(),
        user_email: $('#email').val()
    }
    let cfPassword = $('#comfirm-password').val();
    if(!isEmail(user.user_email)){
        $('#msg').html('Email không đúng');
    }
    else if(user.user_password !== cfPassword){
        $('#msg').html('Mật khẩu không khớp')
    }
    else{
        let newUser = JSON.stringify(user);
        console.log(newUser);
        $.ajax({    
            type: "POST",
            url: "/user/signup", 
            contentType: 'application/json',
            data:{ new_user: newUser },            
            success: function(data){   
                // $('#msg').html(data);
                console.log(data);
                // location.reload();
            }
        });
    }
    // console.log(user);
    
}