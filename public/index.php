<?php
define("APP", "yaf");
define("APP_PATH",  realpath(dirname(__FILE__) . '/../')); /* 指向public的上一级 */

/**
 * 开启调试
 * 开启调试下会加载DebugPlugin插件.
 */
//define('APP_DEBUG', true);
$app  = new Yaf_Application(APP_PATH . "/conf/application.ini");
//$app->run();
$app->bootstrap()->run();
//$response = $app->getDispatcher()->returnResponse(TRUE)->getApplication()->bootstrap()->run();
//if ($response) {
//	$response->response();
//}
