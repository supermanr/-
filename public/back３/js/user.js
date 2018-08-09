$(function () {
  var currentId;
  var isDelete;
  var currentPage = 1;
  var pageSize = 5;

  render();

  function render() {
    $.ajax({
      url: "/user/queryUser", ///user/queryUser
      type: "get",
      data: {
        pageSize: pageSize,
        page: currentPage,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("tpl", info);
        $("tbody").html(htmlStr);

        $("#paginator").bootstrapPaginator({

          bootstrapMajorVersion: 3,
          currentPage: info.page,
          totalPages: Math.ceil(info.total / info.size),
          // size:"small",
          onPageClicked: function (a, b, c, page) {
            currentPage = page;
            render();
          }
        });
      }

    })
  };
  //事件委托
  $("tbody").on("click", ".btn", function () {
    $("#userModal").modal("show");
    currentId = $(this).parent().data("id");
    // console.log(currentId);
    isDelete = $(this).hasClass("btn-danger") ? 0 : 1;
  });
  $('#submitBtn').click(function() {

    console.log( "用户id:" + currentId );
    console.log( "用户状态变成:" + isDelete );

    // 发送 ajax
    $.ajax({
      type: "post",
      url: "/user/updateUser",
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: "json",
      success: function(info) {
        console.log( info )
        if ( info.success ) {
          // 1. 关闭模态框
          $('#userModal').modal("hide");
          // 2. 页面重新渲染
          render();
        }

      }
    })
  });


});
