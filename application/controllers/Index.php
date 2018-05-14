<?php
class IndexController extends BaseController {
	public function indexAction()
	{//默认Action
		$this->getView()->assign("content", "Hello World");

		$this->getView()->assign("staticurl", "http://yaf.hh.tonyhu.cn");
		$this->getView()->assign("bodyId", "login");
		$this->getView()->assign("title", "HH");

		$method = $this->getRequest()->getMethod();
	}
	
	/*
	 * 使用http内置的用户验证方式， 安全性低
	 */
	public function forceAuthenticationAction()
	{
		Yaf_Dispatcher::getInstance()->disableView();

		if (isset($_SERVER['PHP_AUTH_USER'])) {
			var_dump($_SERVER['PHP_AUTH_USER']);
			error_log(111);
			return 1;
		}
		header('WWW-Authenticate: Basic realm="' . 'hello'.'"');
		header('HTTP/1.1 401 Unauthorized');
		var_dump($_SERVER['PHP_AUTH_USER']);
		die('111');
	}

	/*
	 * 测试Memcached连接
	 */
	 public function MemcachedAction()
	 {
		Yaf_Dispatcher::getInstance()->disableView();

		var_dump(Yaf_Session::getInstance()->start());
		$sessionId = session_id();
		var_dump($sessionId);
		$adminid = 1;
		Yaf_Session::getInstance()->set('adminid', $adminid);
		//$res = Memc::getInstance()->set('test', '12');// 测试
		//Memc::getInstance() = Memc::getInstance();
		$res = Memc::getInstance()->get('test');
		var_dump(Memc::getInstance()->getStats());
		//var_dump($res);

	 }

	 public function testAction()
	 {
		 Yaf_Dispatcher::getInstance()->disableView();
		 var_dump($this->getRequest()->isXmlHttpRequest());
		 //setcookie('123jlkdslfxlkmvf', time()+86400);
		 var_dump($this->getRequest()->isPost());
		 var_dump($this->getRequest()->isGet());
		 var_export($this->getRequest()->getServer());
		 var_dump($_COOKIE);
		          $res = Memc::getInstance()->get('test');
		 $data = ['code' => 2001, 'msg' => 'hello'];
	 	 $this->getResponse()->setBody(json_encode($data));
	 }
}
?>
