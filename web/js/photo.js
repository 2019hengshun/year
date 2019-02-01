(function($) {
	var ws = new WebSocket("wss://nh.cnstleader.com/websocket/h");

	// 建立 web socket 连接成功触发事件
	ws.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据')
	};
	// 接收服务端数据时触发事件
	ws.onmessage = function(evt) {
		let item = JSON.parse(evt.data);
		let items = {
			img: item.avatarUrl, //图片 
			info: item.data, //文字 
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
	let index = 0;
	setInterval(() => {
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/user/find_all_now",
			dataType: "json",
			success: (data) => {
				console.log(data);
				let arr = data.data;
				let iLen = arr.length;
				if (iLen > index) {
					arr.slice(index).forEach((v, i) => {
						var ins = i + index + 1;
						$('#main').prepend(
							`
        <div class="main-container  animated flipInX">
            <img class="img" src="${v.photo}" alt="">
            <span>${ins}</span>
            <strong>${v.name}</strong>
        </div>
                        `
						)
					})
					index = iLen;

				}
			}
		})
	}, 1000)

})(jQuery)
