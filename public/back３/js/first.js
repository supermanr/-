$(function () {
  var currentPage = 1;
  var Size = 5;
  vender();

  function vender() {
    $.ajax({
      url: "/category/queryTopCategoryPaging",
      type: "get",
      data: {
        page: currentPage,
        pageSize: Size,
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
            vender();
          }
        });

      }

    })
  }
  $(".container-fluid button").click(function () {
    $("#addModal").modal("show");
  })
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', // 校验成功
      invalid: 'glyphicon glyphicon-remove', // 校验失败
      validating: 'glyphicon glyphicon-refresh' // 校验中
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          },
        }
      }
    }
  });
  $("#form").on("success.form.bv",function(e){
    e.preventDefault();
    $.ajax({
      url:"/category/addTopCategory",
      type:"post",
      data:$("#form").serialize(),
      dataType:"json",
      success:function(info){
        console.log(info);
        if(info.success){
          $("#addModal").modal("hide");
          currentPage=1;
          vender();
          $("#form").data("bootstrapValidator").resetForm(true);
        }
      }
    })
  })
})