<template>
	<div class="navbar-spec">
		<with-status-bar @changeco="changeco">
	      <navbar id="indexNav">
          <!--<message-icon></message-icon>-->
          <div slot="body">{{bodyText}}</div>
          <div slot="footer">
            <a class="service" href="pobo:uncheck=1&pageId=801003">
              <img src="../../../assets/images/title-search.png">
            </a>
          </div>
	      </navbar>
	    </with-status-bar>
	</div>
</template>

<script>
	export default {
		name: 'navbarspec',
		data() {
			return {
        bodyText:''
			}
		},
		methods: {
      changeco(val) {
          this.bodyText = val;
      }
		}
	}
</script>
