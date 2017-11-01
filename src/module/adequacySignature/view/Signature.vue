<template>
  <div class="signature">
    <div class="pb-common-nav">
      <div class="navbar common-nav navbar-fixed-top">
        <div class="navbar-header">
          <a href="goBack" class="back">
            <img src="../../../assets/images/back2xdefault.png">
          </a>
        </div>
        <div class="navbar-body">
          签名
        </div>
        <div class="navbar-footer">
          <a class="edit" @click="doConfirm">确定</a>
        </div>
      </div>
    </div>
    <div class="header-bung"></div>
    <canvas id="canvas-signature" class="canvas-signature"></canvas>
    <div class="popu">请在空白处留下您的签名</div>
  </div>
</template>

<script>
  import SignaturePad from 'signature_pad'

  export default {
    data () {
      return {}
    },
    mounted () {
      let canvas = document.getElementById('canvas-signature')
      this.signaturePad = new SignaturePad(canvas, {
        backgroundColor: 'rgba(255, 255, 255, 0)',
        penColor: 'rgb(0, 0, 0)'
      })

      window.addEventListener('resize', this.resizeCanvas)
      this.resizeCanvas()

      this.data = Object.assign({}, this.cfAdequacyJson, this.personalInfo, this.scoreResult)
    },
    methods: {
      doConfirm () {
        const signatureData = this.signaturePad.toDataURL('image/png')
        pbE.SYS().storePrivateData('adequacy_signature', signatureData)
        window.location.href = 'close'
      },
      resizeCanvas () {
        let canvas = document.getElementById('canvas-signature')
        let ratio = Math.max(window.devicePixelRatio || 1, 1)
        canvas.width = canvas.offsetWidth * ratio
        canvas.height = canvas.offsetHeight * ratio
        let context = canvas.getContext('2d')
        context.scale(ratio, ratio)
        context.fillStyle = '#fff'
        this.signaturePad.clear() // otherwise isEmpty() might return incorrect value
      }
    }
  }
</script>
