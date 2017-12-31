// 全局常量
// URL 的根路径
var rootPath;

function to_page(pn) {
	$.ajax({
		url : rootPath+"emps",
		data : "pn=" + pn,
		type : "GET",
		success : function(result) {
			// 1、解析并显示员工数据
			build_emps_table(result);
			// 2、解析并显示分页信息
			build_page_info(result);
			// 3、解析显示分页条数据
			build_page_nav(result);
		},
		error : function() {

		},
		complete : function() {

		}
	});
}

// 解析并显示员工数据
function build_emps_table(result) {
	$("#emps_table tbody").empty();
	var emps = result.extend.pageInfo.list;
	$.each(emps,function(index, item) {
		var checkBoxTd = $("<td><input type='checkbox' class='check_item'/></td>");
		var empIdTd = $("<td></td>").append(item.empId);
		var empNameTd = $("<td></td>").append(item.empName);
		var genderTd = $("<td></td>").append(
				item.gender == 'M' ? "男" : "女");
		var emailTd = $("<td></td>").append(item.email);
		var deptNameTd = $("<td></td>").append(
				item.department.deptName);
		/*
		 * <button class="btn btn-primary btn-sm edit_btn"><span
		 * class="glyphicon glyphicon-pencil"
		 * aria-hidden="true"></span> 编辑 /button>
		 */
		var editBtn = $("<button></button>").addClass("btn btn-primary btn-sm edit_btn")
					.append($("<span></span>").addClass("glyphicon glyphicon-pencil")).append("编辑");
			//为编辑按钮添加一个自定义的属性，来表示当前员工id
			editBtn.attr("edit-id",item.empId);
		var delBtn =  $("<button></button>").addClass("btn btn-danger btn-sm delete_btn")
					.append($("<span></span>").addClass("glyphicon glyphicon-trash")).append("删除");
			//为删除按钮添加一个自定义的属性来表示当前删除的员工id
			delBtn.attr("del-id",item.empId);
		var btnTd = $("<td></td>").append(editBtn).append(" ").append(delBtn);
		$("<tr></tr>").append(checkBoxTd)
					 .append(empIdTd)
					 .append(empNameTd)
					 .append(genderTd)
					 .append(emailTd)
					 .append(deptNameTd)
					 .append(btnTd)
					 .appendTo("#emps_table tbody");
	});
}

// 解析并显示分页信息
function build_page_info(result) {
	$("#page_info_area").empty();
	$("#page_info_area").append("当前"+result.extend.pageInfo.pageNum+"页,总"+
			result.extend.pageInfo.pages+"页,总"+
			result.extend.pageInfo.total+"条记录");
	totalRecord = result.extend.pageInfo.total;
	currentPage = result.extend.pageInfo.pageNum;
}

//解析显示分页条，点击分页要能去下一页....
function build_page_nav(result){
	$("#page_nav_area").empty();
	var ul = $("<ul></ul>").addClass("pagination");
	
	//构建元素
	var firstPageLi = $("<li></li>").append($("<a></a>").append("首页").attr("href","#"));
	var prePageLi = $("<li></li>").append($("<a></a>").append("&laquo;"));
	if(result.extend.pageInfo.hasPreviousPage == false){
		firstPageLi.addClass("disabled");
		prePageLi.addClass("disabled");
	}else{
		//为元素添加点击翻页的事件
		firstPageLi.click(function(){
			to_page(1);
		});
		prePageLi.click(function(){
			to_page(result.extend.pageInfo.pageNum -1);
		});
	}
	
	var nextPageLi = $("<li></li>").append($("<a></a>").append("&raquo;"));
	var lastPageLi = $("<li></li>").append($("<a></a>").append("末页").attr("href","#"));
	if(result.extend.pageInfo.hasNextPage == false){
		nextPageLi.addClass("disabled");
		lastPageLi.addClass("disabled");
	}else{
		nextPageLi.click(function(){
			to_page(result.extend.pageInfo.pageNum +1);
		});
		lastPageLi.click(function(){
			to_page(result.extend.pageInfo.pages);
		});
	}
	
	//添加首页和前一页 的提示
	ul.append(firstPageLi).append(prePageLi);
	//1,2，3遍历给ul中添加页码提示
	$.each(result.extend.pageInfo.navigatepageNums,function(index,item){
		
		var numLi = $("<li></li>").append($("<a></a>").append(item));
		if(result.extend.pageInfo.pageNum == item){
			numLi.addClass("active");
		}
		numLi.click(function(){
			to_page(item);
		});
		ul.append(numLi);
	});
	//添加下一页和末页 的提示
	ul.append(nextPageLi).append(lastPageLi);
	
	//把ul加入到nav
	var navEle = $("<nav></nav>").append(ul);
	navEle.appendTo("#page_nav_area");
}

//点击新增按钮弹出模态框。
$("#emp_add_modal_btn1").click(function(){
	alert(1);
	//清除表单数据（表单完整重置（表单的数据，表单的样式））
	reset_form("#empAddModal form");
	//s$("")[0].reset();
	//发送ajax请求，查出部门信息，显示在下拉列表中
	getDepts("#empAddModal select");
	//弹出模态框
	$("#empAddModal").modal({
		backdrop:"static"
	});
});

//查出所有的部门信息并显示在下拉列表中
function getDepts(ele){
	//清空之前下拉列表的值
	$(ele).empty();
	$.ajax({
		url:rootPath+"depts",
		type:"GET",
		success:function(result){
			//{"code":100,"msg":"处理成功！",
				//"extend":{"depts":[{"deptId":1,"deptName":"开发部"},{"deptId":2,"deptName":"测试部"}]}}
			//console.log(result);
			//显示部门信息在下拉列表中
			//$("#empAddModal select").append("")
			$.each(result.extend.depts,function(){
				var optionEle = $("<option></option>").append(this.deptName).attr("value",this.deptId);
				optionEle.appendTo(ele);
			});
		}
	});
}

//清空表单样式及内容
function reset_form(ele){
	$(ele)[0].reset();
	//清空表单样式
	$(ele).find("*").removeClass("has-error has-success");
	$(ele).find(".help-block").text("");
}