(function($) {
	var ws = new WebSocket("wss://nh.cnstleader.com/websocket/u21");
	var ws2 = new WebSocket("wss://nh.cnstleader.com/websocket/gamescreen/1");
	// 建立 web socket 连接成功触发事件
	ws.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据')
	};
	ws2.onopen = function() {
		// 使用 send() 方法发送数据
		// ws.send("发送数据");
		console.log('发送数据2')
	};
	ws2.onmessage = function(evt) {
		console.log(evt + '++++++++++++++++++++++++++++++++++++++++++++++')
		let item = evt.data;
		if (item == "游戏胜利") {
			$('#restart').hide();
			$('#open').show();
			if (timer1) {
				window.clearInterval(timer1);
				timer1 = null
			};
			if (timer2) {
				window.clearInterval(timer2);
				timer2 = null
			};

		}
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
		ws.close();
		ws2.close();
		// 		$.ajax({
		// 			type: "GET",
		// 			url: "https://nh.cnstleader.com/game/clear",
		// 			// data: "name=garfield&age=18",
		// 			success: function(data) {
		// 				$('.game').html(``)
		// 			},
		// 			error: function() {}
		// 		});
	}

	$('#start').hide();
	$('#restart').hide();
	$('.good').hide();
	$('.numsss').hide()

	var timer1, timer2, timer3, timer4, timer5;
	var num = 65;
	$('#open').click(() => {
		timer4 = setInterval(() => {
			getNum()
		}, 500)
		$('#open').hide();
		$('#start').show();
		if (timer1) {
			window.clearInterval(timer1);
			timer1 = null
		};
		if (timer2) {
			window.clearInterval(timer2);
			timer2 = null
		};

		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/startcomein",
			success: (data) => {
				if (timer3) {
					window.clearInterval(timer3);
					timer3 = null;
					num = 65;
				};
			},
			error: function() {}
		});
	})
	var time = new Date().getTime();
	var arrrs = [];
	$('#start').click(() => {
		$('.person').hide();
		$('#start').hide();
		$('#restart').show();
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/userstart",
			success: (data) => {
				if (timer1) {
					window.clearInterval(timer1);
					timer1 = null
				};
				if (timer2) {
					window.clearInterval(timer2);
					timer2 = null
				};
				if (timer4) {
					window.clearInterval(timer4);
					timer4 = null
				};

				timer3 = setInterval(() => {
					num--;

					if (num == 0) {
						window.clearInterval(timer3);
						timer3 = null;
						num = 65;
						window.clearInterval(timer2);
						// setTimeout(()=>{},3000)
						timer2 = null;
						$.ajax({
							type: "GET",
							url: "https://nh.cnstleader.com/game/result",
							// url: "https://nh.cnstleader.com/game/winnerlist",
							success: (data4) => {

								//var arrss = data4.data.sort(compare('nowlocation')).reverse()
								//+++++++++++++++++++++++++++++++++++++++
								var arrss = arrrs.sort(compare('nowlocation')).reverse();
								$('.lis').html('');
								var str = '';
								var arrs = [];
								var arr = arrss.slice(0, 1);
								arr.forEach((v, i) => {
									console.log(v, i)
									arrs.push(v.openId)
									switch (i) {
										case 0:
											str +=
												`
	   <p>
	   	<strong>幸运儿</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 1:
											str +=
												`
	   <p>
	   	<strong>二</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 2:
											str +=
												`
	   <p>
	   	<strong>三</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 3:
											str +=
												`
	   <p>
	   	<strong>四</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 4:
											str +=
												`
	   <p>
	   	<strong>五</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
										case 5:
											str +=
												`
	   <p>
	   	<strong>六</strong>
	   	<img src="${v.photo}" alt="">
	   	<span>${v.name}</span>
	   </p>
	   `;
											break;
									}
								})
								$('.lis').append(str);
								let datas = {
									results: arrs.join(',')
								}
								// $.ajax({
								//         url:'https://nh.cnstleader.com/game/gameresult',
								//         type:'POST',
								//         contentType: 'application/json; charset=UTF-8',
								//       
								//         dataType:'json',
								//         data:JSON.stringify(datas),
								//         success: function (response) {
								//             console.log(response);
								//         }
								//     })								
								$.ajax({
									type: 'POST',
									url: "https://nh.cnstleader.com/game/gameresult",
									contentType: "application/json",
									// data: JSON.stringify(datas),
									data: JSON.stringify(datas),
									success: (e) => {
										console.log(e)
									}
								})

							}
						})

						$('.good').show();
					}

				}, 1000)
				timer2 = setInterval(() => {

					$.ajax({
						type: "GET",
						url: "https://nh.cnstleader.com/game/result",
						success: (data2) => {
							var nowTime = new Date().getTime();
							var chas = (new Date().getTime() - time) / 1000;

							time = nowTime;
							$('.game').html(``)
							var data3 = data2.data;

							//+++++++++++++++++++++++


							if (num <= 35) {
								console.log(data3 + '++++++++++++++++++++++1')

								if (arrrs.length) {
									data3.map(v => {
										var a = arrrs.filter(s => {
											return s.name === v.name
										});
										if (a.length > 0) {
											if ((v['nowlocation'] - a[0]['nowlocation']) / chas > 6) {
												return v['nowlocation'] = a[0]['nowlocation']
											}
										}
									})
								}
								console.log(data3 + '++++++++++++++++++++++2')
							}
							if (data3.length > 0) {
								data3.forEach((v, i) => {
									$('.game').append(
										`
													<div class="games">
														<h4>${v.name}${v.nowlocation}</h4>
														<img src="${v.photo}" alt="">
														<div></div>
													</div>
								`
									)
								})
								$('.games').each((index, ele) => {


									if (data3[index]) {
										// 										$(ele).animate({
										// 											height: data3[index]['nowlocation'] ? data3[index]['nowlocation'] + 90 + 'px' : '90px'
										// 										})

										$(ele).css("height", data3[index]['nowlocation'] ? data3[index]['nowlocation'] * 2 + 90 +
											'px' :
											'90px');


									}
								})
							} else {

							}
							arrrs = data3;
						},
						error: function() {}
					});
				}, 1000)
			},
			error: function() {}
		});
	})


	$('#restart').click(() => {
		$('.person').show();
		$('#restart').hide();
		$('.good').hide();
		$('.personshow').html('');
		$('.numsss').hide()
		$('#open').show();
		index = 0;
		if (timer1) {
			window.clearInterval(timer1);
			timer1 = null
		};
		if (timer2) {
			window.clearInterval(timer2);

			timer2 = null
		};
		if (timer3) {
			window.clearInterval(timer3);
			timer3 = null;
			num = 65;
		};
		if (timer4) {
			window.clearInterval(timer4);
			timer4 = null;

		};
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/clear",

			// data: "name=garfield&age=18",
			success: function(data) {
				$('.game').html(``)
				$('.nums').html(0)
			},
			error: function() {}
		});
	})
	let index = 0;

	function getNum() {
		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/num",
			success: (data) => {
				console.log(data)
				$('.nums').html(data.data);
				if (data.data == 15) {
					$('.numsss').show()
				}
			}
		})

		$.ajax({
			type: "GET",
			url: "https://nh.cnstleader.com/game/playerlist",
			dataType: "json",
			success: (data) => {
				console.log(data);
				let arr = data.data;
				let iLen = arr.length;
				if (iLen > index) {
					arr.slice(index).forEach((v, i) => {
						var ins = i + index + 1;
						$('.personshow').append(
							`
		        <div class="  animated flipInX">
						<span>${ins}</span>

		            <img class="img" src="${v.photo}" alt="">
		           
		            <strong>${v.name}</strong>
		        </div>
		                        `
						)
					})
					index = iLen;

				}
			}
		})
	}


	function sortBy(attr, rev) {
		if (rev == undefined) {
			rev = 1;
		} else {
			rev = (rev) ? 1 : -1;
		}
		return function(a, b) {
			a = a[attr];
			b = b[attr];
			if (a < b) {
				return rev * -1;
			}
			if (a > b) {
				return rev * 1;
			}
			return 0;
		}
	}

	function compare(property) {
		return function(a, b) {
			var value1 = a[property];
			var value2 = b[property];
			return value1 - value2;
		}
	}

	var a = {
		"code": 200,
		"msg": "提交成功",
		"data": [{
			"id": null,
			"name": "柏鹏",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5RosHM_BaZoZN60Kx50_G-w",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLoSU251icTClmmDxHibg58SlDcwK2IfFTMQ7aMBibfOG618z5ic6EaXU58ibseR1WxibXfVpwUDTR60spw/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 232,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "田欢难",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5RWfaj_OKGcgt70OohfHEUY",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/gQiaicJ5piboVY2jA6UgUt6jWEic96B2BESAMcmfoF2gdibA9qBpAlApJKTyml0iaysGMQuMoKQOAQDpHYHple00ls4w/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 235,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "褚首强",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5WhEh29lkSyMfJT06lR1eSs",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJfNhFhiaYNmEd6NLG05k46qhDCQHIMXgtic21icOjZJnuS7ZQic1H7hUrWyNwibYtj5tBzhC5xVTruwWQ/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 136,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "王子雄",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5SB0MIVhPFNDjRETtBC4yS4",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/DYAIOgq83ephnMcd19xl4TXLibslhRJkJ5ybEGQRPurSibicz386ZqcbFAiboBYnY4GW8ZHmymWia3xrnWwMlf2tyJQ/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 278,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "陈宏波",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5RgN1H79Ibsektrzajitxqw",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJzv3icibQrBNUkB8SuuWjfCJhGd1qicWRChgx2SwGpk6VwKfSibFibFgSEorcicNkic6t3LRSVvqMm57rlw/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 243,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "孙峰",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5Wv7NPUCxgcT2Kp5179x-yg",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTLmBYq5IkXzE5mGkmWU7zmzA78Nl5SPJaoFtGBdbpceFvIPLPMgPar3jo8ANUTjibgEfqzMQ6ukbbg/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 265,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "胡佳俊",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5SWcrnL8Puvi2p_0-VCAWyo",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTIL5Cib1tIU2iaDRKPl5wOqPoqW56kQeBZK1wgrzBPUyfDfLcMMGz4xlSS0OhpS1nTxRA2iao75rxtAA/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 249,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "陈晓雪",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5aocYIuX57PoI_12UX6C0M4",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/lJu6F9jibXaTCYy1kAZmhWOP9Lz0JQSqUQaYLXpuVIvISxRpjylOjXMSWicJLmHKIqwwr2HEq4Q4Y7PibJRjz8VoQ/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 264,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "刘浩冉",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5dvFNBxjVS54TdfiyVo79dM",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJX4ZU53F8hBH8d9fxNTgcic9HD540CcBSxHaD7ZDl8LrFodCHzXNibLRLtennHNSeo8nyzdffs0sow/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 199,
			"isWin": false,
			"rank": 0,
			"data": ""
		}, {
			"id": null,
			"name": "张韬",
			"gender": 0,
			"phone": null,
			"openId": "oXpou5b-o0BU-fbwfGy_iyZ01WXM",
			"depaId": null,
			"photo": "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTJlP2Rg9YnFIlWefaSf6FFdjzGczQFYdN83ic4rBkupJKbmOkJ5YibXdUwCUBAPwveozXakjZu9qCnA/132",
			"nickname": null,
			"depa": null,
			"code": null,
			"nowlocation": 221,
			"isWin": false,
			"rank": 0,
			"data": ""
		}]
	}

	console.log(a.data.sort(compare('nowlocation')).reverse())



})(jQuery)
