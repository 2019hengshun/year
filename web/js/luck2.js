$('.good').hide()
var ws = new WebSocket("wss://nh.cnstleader.com/websocket/d");

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
var xinm = [];
var phone = [];
var id = [];
var arr = [];
$.ajax({
	//url: "https://nh.cnstleader.com/prize/noprize",
	url: "https://nh.cnstleader.com/prize/noprizeforoneandtwo",

	success: (data) => {

		xinm = data.map(v => v.name)
		phone = data.map(v => {
			return v.phone.substring(0, 3) + '****' + v.phone.substring(7)
		})
		console.log(phone);
		id = data.map(v => v.openId)
		pcount = xinm.length - 1; //参加人数
	}
});
var codetxt = $('.code');
var pcount; //参加人数
var runing = true;
var td = 2; //，共6个名额
var num = 0;
var t, c1, c2, c3;
var ids = [];
var arr = [];

function start() {
	if (td <= 0) {
		return;
	}
	if (runing) {
		runing = false;
		$('#btntxt').removeClass('start').addClass('stop');
		$('#btntxt').html('停止');
		startNum();
	} else {
		runing = true;
		$('#btntxt').removeClass('stop').addClass('start');
		$('#btntxt').html('开始');
		stop();
		zd(1); //
		startNum();
		stop();
		zd(2); //
		// startNum();
		// stop();
		// zd(3);//
		$('.c1').html(c1);
		$('.c2').html(c2);
		// $('.c3').html(c3);
	}
}

function startNum() {
	num = Math.floor(Math.random() * pcount);
	codetxt.html(xinm[num] + phone[num]);
	t = setTimeout(startNum, 0);
}
//停止跳动
function stop() {
	pcount = xinm.length - 1;
	clearInterval(t);
	t = 0;
}

//打印列表
function zd(i) {
	//打印中奖者名单
	if (td <= 0) {
		alert("抽奖结束");
	} else {
		switch (i) {
			case 1:
				c2 = xinm[num] + phone[num];
				break;
			case 2:
				c1 = xinm[num] + phone[num];
				break;
				// case 3:
				//     c1 = xinm[num]+phone[num];
				//     break;
		}
		ids.push(id[num]);
		console.log(ids);
		if (i == 2) {
			$.ajax({
				type: 'POST',
				url: "https://nh.cnstleader.com/prize/prize",
				contentType: "application/json",
				data: JSON.stringify({
					openIds: ids.join(","),
					prize: "二等奖"
				}),
				success: (data) => {
					//
					// xinm =   data.map(v=>v.name)
					// phone = data.map(v=>v.phone)
					// pcount = xinm.length-1;//参加人数
				}
			});
		}
		$('.lis').prepend("<p>" + ' ' + xinm[num] + "</p>" + "<p>" + phone[num] + "</p>");
		//将已中奖者从数组中"删除",防止二次中奖
		xinm.splice($.inArray(xinm[num], xinm), 1);
		phone.splice($.inArray(phone[num], phone), 1);
		id.splice($.inArray(id[num], id), 1);
	}
	td = td - 1;
	if (td <= 0) {
		$('#btntxt').html('恭喜');
	}
	$('.good').show()

}
