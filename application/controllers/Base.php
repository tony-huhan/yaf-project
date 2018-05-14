<?php
/*
 * 基础类，用于完成公共函数
 */
abstract class BaseController extends Yaf_Controller_Abstract
{
	public function init()
	{
		if ($this->getRequest()->isXmlHttpRequest()) {
			Yaf_Dispatcher::getInstance()->autoRender(FALSE);
			header("Content-type:application/json;charset=utf-8");
//			Filter::$ajax = $this->getAjax();
//var_dump($this->getPost());
		}

		if (!session_id()) {
			Yaf_Session::getInstance()->start();
		}
	}

	public function getPost()
	{
		$data = file_get_contents("php://input");	
		$post = json_decode($data, true);
		return $post;
	}

}
