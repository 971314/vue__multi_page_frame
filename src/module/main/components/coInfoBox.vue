<template>
	<div class="content-box">
		<div class="info-title">
			<div class="info-header clearfix">
				<b>{{infoTitle}}</b>
				<a :href="moreInfo">
					更多
					<img class="more" src="../images/more.png" alt="更多">
				</a>
			</div>
			<div class="info-body">
				<a class="info-item clearfix" v-for="item in list" :href="item.url">
					<img :src="item.img">
					<div class="text-info">
						<h2>{{item.title}}</h2>
						<p>{{item.desc}}</p>
					</div>
				</a>
			</div>
		</div>
	</div>
</template>
<script>
	export default {
		props: {
			coInstance: {//组件应用实例
				type: String,
				default: ''
			}
		},
		data() {
			return {
				conf: {},
				list: [],
				webService: '',
				infoTitle: '',
				moreInfo: ''
			}
		},
		created() {
			var _this = this;
			console.log(1);
			if (pbE.isPoboApp) {
				var mainlist = pbE.SYS().readConfig(this.pbconfH5 + "main.json") ? JSON.parse(pbE.SYS().readConfig(this.pbconfH5 + "main.json")) : JSON.parse(pbE.SYS().readConfig(this.pbconfUrl + "main.json"));
				//console.log(mainlist);
				_this.conf = mainlist[_this.coInstance];
				//console.log(_this.conf);
				_this.webService = mainlist[_this.coInstance].webService;
				_this.infoTitle = mainlist[_this.coInstance].infoTitle;
				_this.moreInfo = mainlist[_this.coInstance].moreInfo;
			} else {
		 		_this.$axios.get(this.confUrl + 'main.json').then(function(data){
			 		var mainlist = data;
          console.log(mainlist);
          console.log(_this.coInstance);
			 		_this.conf = mainlist.data[_this.coInstance];
			 		_this.webService =mainlist.data[_this.coInstance].webService;
			 		_this.infoTitle = mainlist.data[_this.coInstance].infoTitle;
			 		_this.moreInfo = mainlist.data[_this.coInstance].moreInfo;
		      }).catch(function(err){
          _this.$axios.get("../"+ _this.pbconfUrl + 'main.json').then(function(data){
            var mainlist = data;
            console.log(mainlist);
            _this.conf = mainlist.data[_this.coInstance];
            _this.webService =mainlist.data[_this.coInstance].webService;
            _this.infoTitle = mainlist.data[_this.coInstance].infoTitle;
            _this.moreInfo = mainlist.data[_this.coInstance].moreInfo;
          });
		 		});
			}
		},
		watch: {
			'webService' : function () {
				var _this = this;
				_this.$axios.post(_this.webService).then(function (result) {
					//console.log('***result***')
					var CONTENTS = result.data;
					//console.log(result);
					//console.log(_this.conf);
					var tmpArr = _this.conf.data.name.split('.');
					for (var j = 0; j < tmpArr.length; j++) {
						//console.log(tmpArr[j]);
						CONTENTS = CONTENTS[tmpArr[j]];
					}
				    for (var i = 0; i < CONTENTS.length; i++) {
				    	var tempObj = {};
				    	tempObj['img'] = CONTENTS[i][_this.conf.data.img];
				    	tempObj['title'] = CONTENTS[i][_this.conf.data.title];
				    	tempObj['detail'] = CONTENTS[i][_this.conf.data.detail];
				    	tempObj['url'] = _this.conf.data.url + CONTENTS[i][_this.conf.data.id];
				    	_this.list.push(tempObj);
				    }

				    }).catch(function(err){
	              			console.log('服务器异常',err);
	          	});
			}
		},
		mounted() {
		},
		methods: {

		}
	}
</script>
