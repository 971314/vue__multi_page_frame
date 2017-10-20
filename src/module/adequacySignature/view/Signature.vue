<template>
  <div class="signature">
    <common-nav :search="false" :message="false" :service="false" :goback="false" :gobackcom="true">
      <div slot="body">
        签名
      </div>
      <div slot="footer">
        <a class="edit" @click="doConfirm">确定</a>
      </div>
    </common-nav>
    <div class="header-bung"></div>
    <canvas id="canvas-signature" class="canvas-signature"></canvas>
    <div class="popu">请在空白处留下您的签名</div>
  </div>
</template>

<script>
  import SignaturePad from 'signature_pad'

  export default {
    data() {
      return {}
    },
    mounted() {
      let canvas = document.getElementById('canvas-signature')
      this.signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
      })

      window.addEventListener("resize", this.resizeCanvas);
      this.resizeCanvas();

      this.data = Object.assign({}, this.cfAdequacyJson, this.personalInfo, this.scoreResult)
    },
    methods: {
      doConfirm() {
        const signatureData = this.signaturePad.toDataURL('image/png')
        pbE.SYS().storePrivateData('adequacy_signature', signatureData)
        window.location.href = 'close'
      },
      resizeCanvas() {
        let canvas = document.getElementById('canvas-signature')
        let ratio = Math.max(window.devicePixelRatio || 1, 1);
        canvas.width = canvas.offsetWidth * ratio;
        canvas.height = canvas.offsetHeight * ratio;
        let context = canvas.getContext("2d")
        context.scale(ratio, ratio);
        context.fillStyle = '#fff'
        this.signaturePad.clear(); // otherwise isEmpty() might return incorrect value
      }
    }
  }
</script>
