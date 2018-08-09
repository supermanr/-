$(function () {
  var currentPage = 1;
  var Size = 5;
  vender();

  function vender() {
    $.ajax({
      url: "/category/querySecondCategoryPaging",
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
  };
  //2. 点击添加分类按钮, 显示添加模态框
  $(".container-fluid button").click(function () {
    $("#addModal").modal("show");
    $.ajax({
      url: "/category/querySecondCategoryPaging",
      type: "get",
      data: {
        page: 1,
        pageSize: 100,
      },
      dataType: "json",
      success: function (info) {
        console.log(info);
        var htmlStr = template("dropdownTpl", info);
        $(".dropdown-menu").html(htmlStr);
      }

    });

  })
  $("#form").bootstrapValidator({
    feedbackIcons: {
      valid: 'glyphicon glyphicon-ok', 
      invalid: 'glyphicon glyphicon-remove', 
      validating: 'glyphicon glyphicon-refresh' 
    },
    fields: {
      categoryName: {
        validators: {
          notEmpty: {
            message: "一级分类不能为空"
          },
        }
      },
      brandName: {
        validators: {
          notEmpty: {
            message: "请输入二级分类"
          }
        }
      },
      brandLogo: {
        validators: {
          notEmpty: {
            message: "请选择图片"
          }
        }
      }
    }
  });
  $("#form").on("success.form.bv", function (e) {
    e.preventDefault();
    $.ajax({
      url: "/category/addTopCategory",
      type: "post",
      data: $("#form").serialize(),
      dataType: "json",
      success: function (info) {
        console.log(info);
        if (info.success) {
          $("#addModal").modal("hide");
          currentPage = 1;
          vender();
          $("#form").data("bootstrapValidator").resetForm(true);

        }
      }
    })
  })
})