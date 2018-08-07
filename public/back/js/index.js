
if ( location.href.indexOf("login.html") === -1 ) {
  // 不是 login.html, 进行登陆拦截判断
  $.ajax({
    type: "get",
    url: "/employee/checkRootLogin",
    dataType: "json",
    success: function( info ) {
      console.log( info )
      if ( info.success ) {
        console.log( "已登陆" );
      }

      if ( info.error === 400 ) {
        // 未登录, 拦截到登陆页
        location.href = "login.html";
      }
    }
  })
}

$(document).ajaxStart(function() {
  // 开启进度条
  NProgress.start();
})

// 在最后一个ajax请求回来时, 关闭进度条
$(document).ajaxStop(function() {

  // 模拟网络延迟
  setTimeout(function() {
    // 关闭进度条
    NProgress.done();
  }, 500);

});

$(function(){
  $(".lt-aside .category").click(function(){
    $(".lt-aside .child").stop().slideToggle();
  })
  $('.icon_menu').click(function() {
    $('.lt_aside').toggleClass("hidemenu");
    $('.lt_topbar').toggleClass("hidemenu");
    $('.lt_main').toggleClass("hidemenu");
  })


  // 3. 点击退出菜单, 显示退出模态框
  $('.icon_logout').click(function() {
    // 显示模态框
    $('#logoutModal').modal("show");
  });

  // 4. 点击退出按钮, 实现用户退出
  $('#logoutBtn').click(function() {
    // 退出需要发送ajax请求, 让服务器端退出, 销毁该用户的登陆状态
    $.ajax({
      type: "get",
      url: "/employee/employeeLogout",
      dataType: "json",
      success: function( info ) {
        if ( info.success ) {
          // 退出成功, 跳转到登陆页
          location.href = "login.html";
        }
      }
    })
  })


})

})