

$(function() {

  $('#form').bootstrapValidator({

    feedbackIcons: {
      valid: 'glyphicon glyphicon-heart',     // 校验成功
      invalid: 'glyphicon glyphicon-remove',  // 校验失败
      validating: 'glyphicon glyphicon-refresh'  // 校验中
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
          }
        }
      }
    }
  });




});
