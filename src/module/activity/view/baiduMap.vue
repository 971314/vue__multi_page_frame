<template>
  <div class="map-all-content">
    <common-nav id="navbarContent" :search="false" :message="false" :service="false" :goback="false"
                :gobackUrl="gobackUrl" class="pb-jgdx">
      <span slot="body">百度地图</span>
    </common-nav>
    <div id="pobo-baiduMap">
    </div>
  </div>
</template>

<script>
  export default{
    data() {
      return {
        gobackUrl: 'goBack',
        region: this.$route.params.region,
        address: this.$route.params.address,
      }
    },
    mounted() {
      document.getElementById('navbarContent').style.display = 'none';
      document.querySelector('body').style.background = '#ffffff';
      let winHeight;
      if (window.innerHeight)
        winHeight = window.innerHeight;
      else if ((document.body) && (document.body.clientHeight))
        winHeight = document.body.clientHeight;
      document.getElementById('pobo-baiduMap').style.height = `${winHeight - 44}px`;
      var map = new BMap.Map("pobo-baiduMap"); // 创建地图实例
      // 创建地址解析器实例
      var pointDefault = new BMap.Point(116.331398, 39.897445);
      map.centerAndZoom(pointDefault, 12);
      var myGeo = new BMap.Geocoder();
      // 将地址解析结果显示在地图上,并调整地图视野
      myGeo.getPoint(this.address, (point) => {
        if (point) {
          pointDefault = new BMap.Point(point.lng, point.lat);
          var marker = new BMap.Marker(point); // 创建标注
          map.centerAndZoom(point, 16);
          map.addOverlay(marker);
          var opts = {
            width: 100, // 信息窗口宽度
            height: 50, // 信息窗口高度
            title: this.region // 信息窗口标题
          }
          var infoWindow = new BMap.InfoWindow(this.address, opts); // 创建信息窗口对象
          map.openInfoWindow(infoWindow, map.getCenter());
          marker.addEventListener("click", function () {
            map.openInfoWindow(infoWindow, pointDefault); //开启信息窗口
          });
        } else {
          this.$toast("您选择地址没有查到结果！");
          myGeo.getPoint("", (point) => {
            pointDefault = new BMap.Point(point.lng, point.lat);
            var marker = new BMap.Marker(point); // 创建标注
            map.centerAndZoom(point, 16);
            map.addOverlay(marker);
            var opts = {
              width: 100, // 信息窗口宽度
              height: 50, // 信息窗口高度
              title: '上海' // 信息窗口标题
            }
            var infoWindow = new BMap.InfoWindow(this.address, opts); // 创建信息窗口对象
            map.openInfoWindow(infoWindow, map.getCenter());
            marker.addEventListener("click", function () {
              map.openInfoWindow(infoWindow, pointDefault); //开启信息窗口
            });
          });
        }
      }, this.region);
      map.addControl(new BMap.ScaleControl());
      map.addControl(new BMap.OverviewMapControl());
      map.addControl(new BMap.NavigationControl());
      map.addControl(new BMap.NavigationControl());
    }
  }
</script>
