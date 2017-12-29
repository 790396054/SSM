package com.gmm.crud.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.gmm.crud.bean.Employee;
import com.gmm.crud.dao.EmployeeMapper;

@Service
public class EmployeeService {

	@Autowired
	EmployeeMapper employeeMapper;
	
	/**
	 * 查询所有员工的信息
	 * @return
	 */
	public List<Employee> getEmps(){
		return employeeMapper.selectByExample(null);
	}
}
