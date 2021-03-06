package com.gmm.crud.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;

import com.github.pagehelper.PageHelper;
import com.github.pagehelper.PageInfo;
import com.gmm.crud.bean.Employee;
import com.gmm.crud.bean.Msg;
import com.gmm.crud.service.EmployeeService;
import com.gmm.crud.util.ConstantUtil;

/**
 * 处理员工 CRUD 的控制器
 * 
 * @author gmm
 * @date 2017年12月28日 下午10:43:26
 */
@Controller
public class EmployeeController {

	@Autowired
	EmployeeService empService;

	/**
	 * 查询员工数据，分页查询，返回 json 数据
	 * @param pn
	 * @return
	 */
	@RequestMapping("/emps")
	@ResponseBody
	public Msg getEmpsWithJson(@RequestParam(value = "pn", defaultValue = "1") Integer pn) {
		// 引入 PageHelper 分页插件
		// 在查询之前只需调用,传入页码，以及每页的大小
		PageHelper.startPage(pn, ConstantUtil.PAGE_SIZE);
		// startPage 后面紧跟分页查询
		List<Employee> emps = empService.getEmps();
		// 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
		// 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
		PageInfo<Employee> pageInfo = new PageInfo<Employee>(emps, ConstantUtil.PAGE_SIZE);
		return Msg.success().add("pageInfo", pageInfo);
	}

	/**
	 * 查询员工数据 （分页查询）
	 * 
	 * @return
	 */
	//@RequestMapping("/emps")
	public String getEmps(@RequestParam(value = "pn", defaultValue = "10") Integer pn, Model model) {
		// 引入 PageHelper 分页插件
		// 在查询之前只需调用,传入页码，以及每页的大小
		PageHelper.startPage(pn, ConstantUtil.PAGE_SIZE);
		// startPage 后面紧跟分页查询
		List<Employee> emps = empService.getEmps();
		// 使用pageInfo包装查询后的结果，只需要将pageInfo交给页面就行了。
		// 封装了详细的分页信息,包括有我们查询出来的数据，传入连续显示的页数
		PageInfo<Employee> pageInfo = new PageInfo<Employee>(emps, ConstantUtil.PAGE_SIZE);
		model.addAttribute("pageInfo", pageInfo);
		return "list";
	}
}
