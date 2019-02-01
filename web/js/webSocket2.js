(function($) {
	var ws = new WebSocket("wss://nh.cnstleader.com/websocket/a");

	// 建立 web socket 连接成功触发事件
	ws.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据')
	};
	// 接收服务端数据时触发事件
	ws.onmessage = function(evt) {
		let item = JSON.parse(evt.data);
		let  items = {
			img: item.avatarUrl, //图片 
			info: item.data ,//文字 
			speed: 6, //延迟,单位秒,默认6 
			// bottom: 70, //距离底部高度,单位px,默认随机 
			color: item.color, //颜色,默认白色 
			old_ie_color: '#000000', //ie低版兼容色,不能与网页背景相同,默认黑色 
		}
		$('body').barrager(items);
	};

	// 断开 web socket 连接成功触发事件
	ws.onclose = function() {
		alert("连接已关闭...");
	};

	window.onbeforeunload = function(event) {
		ws.close()
	}



})(jQuery)
