$(function () {

  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },

    fields: {
      username: {
        // 校验规则
        validators: {
          // 非空校验
          notEmpty: {
            // 配置提示信息
            message: "亲,用户名不能为空哦"
          },
          // 长度校验
          stringLength: {
            min: 2,
            max: 6,
            message: "亲,用户名长度必须是2-6位哦!"
          },
          callback:{
            message:"亲,用户名错误哦"
          }
        }
      },
      password: {
        validators: {
          // 非空校验
          notEmpty: {
            message: "亲,密码不能为空!"
          },
          // 长度校验
          stringLength: {
            min: 6,
            max: 12,
            message: "亲,密码长度必须是6-12位哦!"
          },
          callback:{
            message:"亲,密码错误哦"
          }

        }
      }
    }
  });

  $('#form').on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/employee/employeeLogin",
      type: "post",
      dataType: "json",
      data: $("#form").serialize(),
      success: function (info) {
        // console.log(info);
        if(info.success){
          location.href="index.html"
        }
        if(info.error===1001){
        $("#form").data("bootstrapValidator").updateStatus("password","INVALID" ,"callback")
        }
        if(info.error===1000){
        $("#form").data("bootstrapValidator").updateStatus("username","INVALID","callback")
        }
      }

    })
  });
  $('[type="reset"]').click(function(){
    $("#form").data("bootstrapValidator").resetForm();
  })


});