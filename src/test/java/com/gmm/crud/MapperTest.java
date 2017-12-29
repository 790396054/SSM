package com.gmm.crud;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import com.gmm.crud.bean.Department;
import com.gmm.crud.bean.Employee;
import com.gmm.crud.dao.DepartmentMapper;
import com.gmm.crud.dao.EmployeeMapper;

/**
 * 测试dao层的工作
 * Spring的项目就可以使用Spring的单元测试，可以自动注入我们需要的组件
 * 1、导入SpringTest模块
 * 2、@ContextConfiguration指定Spring配置文件的位置
 * 3、直接autowired要使用的组件即可
 * @author gmm
 * @date 2017年12月27日 下午11:34:24
 */
@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations={"classpath:applicationContext.xml"})
public class MapperTest {
	
	@Autowired
	DepartmentMapper departmentMapper;
	
	@Autowired
	EmployeeMapper employeeMapper;
	
	@Test
	public void testInsert() {
		/*	//1、创建SpringIOC容器
		ApplicationContext ioc = new ClassPathXmlApplicationContext("applicationContext.xml");
		//2、从容器中获取mapper
		DepartmentMapper bean = ioc.getBean(DepartmentMapper.class);*/
		System.out.println(departmentMapper);
		
		//1、插入几个部门
		departmentMapper.insertSelective(new Department(1, "开发部"));
		//departmentMapper.insertSelective(new Department(null, "测试部"));
		
	}
	
	@Test
	public void testInsertEmp() {
		employeeMapper.insertSelective(new Employee(null, "hh", "F", "hh@gmail.com", 2));
		employeeMapper.insertSelective(new Employee(null, "mm", "M", "m@gmail.com", 2));
	}
	
	@Test
	public void testSelectEmp() {
		Employee selectByPrimaryKey = employeeMapper.selectByPrimaryKey(1);
		System.out.println(selectByPrimaryKey);
		Employee selectByPrimaryKey2 = employeeMapper.selectByPrimaryKey(2);
		System.out.println(selectByPrimaryKey2);
	}
	
	@Test
	public void testSelect() {
		Department selectByPrimaryKey = departmentMapper.selectByPrimaryKey(1);
		System.out.println(selectByPrimaryKey);
	}
	
	@Test
	public void testUpdate() {
		int updateByPrimaryKey = departmentMapper.updateByPrimaryKey(new Department(1, "销售部"));
		System.out.println(updateByPrimaryKey);
	}
	
	@Test
	public void testDelete() {
		int deleteByPrimaryKey = departmentMapper.deleteByPrimaryKey(1);
		System.out.println(deleteByPrimaryKey);
	}
}
