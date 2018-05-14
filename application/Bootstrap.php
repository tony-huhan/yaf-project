<?php

/**
 * 所有在Bootstrap类中, 以_init开头的方法, 都会被Yaf调用,
 * 这些方法, 都接受一个参数:Yaf_Dispatcher $dispatcher
 * 调用的次序, 和申明的次序相同
 */
class Bootstrap extends Yaf_Bootstrap_Abstract{

	public function _initConfig() {
		$file = APP_PATH . "/application/config/". APP .".config.ini";
		if (!file_exists($file)) {
			throw new Yaf_Exception("配置文件{$file}不存在");
		}
		$config = new Yaf_Config_Ini($file, APP);
		Yaf_Registry::set("config", $config);
		//Yaf_View_Simple->assign("staticurl", "http://yaf.hh.tonyhu.cn");
	}

	public function _initDefaultName(Yaf_Dispatcher $dispatcher) {
		$dispatcher->setDefaultModule("Index")->setDefaultController("Index")->setDefaultAction("index");
	}
}

