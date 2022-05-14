<template>
  <div>
    <video-player
      class="vjs-custom-skin"
      ref="videoPlayer"
      id="vidiplayer"
      :options="playerOptions"
      @pause="onPlayerPause($event)"
      @ended="onPlayerEnded($event)"
      @loadeddata="onPlayerLoadeddata($event)"
      @ready="onPlayerReadied"
      @timeupdate="onTimeupdate"
    >
    </video-player>
  <v-row class="position" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="takeScreenShot"
        >
          ScreenShot
        </v-btn>
        <canvas
            id="cnvs"
            style="
              background-color: green;
              width: -webkit-fill-available;
              height: 240px;
            "
          ></canvas>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">Info</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Name" required></v-text-field>
              </v-col>
              <v-col cols="12" sm="6" md="4">
                <v-text-field label="Location"></v-text-field>
              </v-col>
            </v-row>
          </v-container>
          <!-- EKRAN GÖRÜNTÜSÜ -->

          <!-- <canvas
            id="cnvs"
            style="
              background-color: green;
              width: -webkit-fill-available;
              height: 240px;
            "
          ></canvas> -->
          
          <!-- ------------------------- -->
          <br />
          <!-- kare koordinatları -->
          <h3>karenin koordinatları buraya gelecek</h3>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <!-- kaydet fonksiyonu buraya gelecek -->
          <v-btn color="blue darken-1" text @click="saveimage"> Save </v-btn>
          <!-- ---------------------------- -->
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
  </div>
</template>

<script>
const isProduction = process.env.NODE_ENV === "production";

export default {
    name: "Video",
  data() {
    return {
      dialog: false,
      initialized: false,
      currentTech: "HLS",
      streams: {
        rtmp: "rtmp://fms.12E5.edgecastcdn.net/0012E5/mp4:videos/8Juv1MVa-485.mp4",
        hls: "http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8",
      },
      playerOptions: {
        overNative: false,
        autoplay: false,
        controls: true,
        techOrder: ["flash", "html5"],
        sourceOrder: false,
        flash: {
          hls: { withCredentials: false },
          swf: isProduction
            ? "/vue-videojs-demo_mine/static/media/video-js.swf"
            : "/static/media/video-js.swf",
        },
        html5: { hls: { withCredentials: false } },
        sources: [
          {
            type: "rtmp/mp4",
            src: "rtmp://184.72.239.149/vod/&mp4:BigBuckBunny_115k.mov"
          },
          {
            withCredentials: false,
            type: "application/x-mpegURL",
            src:
              "http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8"
          }
        ],
      },
    };
  },
  methods: {
    takeScreenShot() {
      var canvas = document.getElementById("cnvs");
      console.log(this.$root);
      this.ctx = canvas.getContext("2d");
      //video componentinden player'ına erişeceğiz
      var vdi = this.$refs.videoPlayer.player;
      console.log(vdi);
      this.ctx.drawImage(vdi.children_[0], 0, 0, 300, 150);

      initDraw(canvas, this.ctx);
    },
    onPlayerReadied() {
      if (!this.initialized) {
        this.initialized = true;
        this.currentTech = this.player.techName_;
      }
    },
    onPlayerPause(player) {
      console.log("player pause!", player);
    },
    onPlayerLoadeddata(player) {
      console.log("player Loadeddata!", player);
    },
    onTimeupdate(e) {
      console.log("currentTime", e.cache_.currentTime);
    },
    saveimage() {

      // indirmeden yeni sayfaya kaydedilecek
      window.location.href = document
        .getElementById("cnvs")
        .toDataURL("image/png")
        .replace("image/png", "image/octet-stream");
    console.log("Kaydedildi");
      this.dialog = false;
    },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
};
const $ = require('jquery');
window.$ = $;

//Kare

function initDraw(canvas, ctx) {
  var canvasx = $(canvas).offset().left;
  var canvasy = $(canvas).offset().top;
  var last_mousex = 0;
  var last_mousey = 0;
  var mousex = 0;
  var mousey = 0;
  var mousedown = false;

  //Mousedown
  $(canvas).on("mousedown", function(e) {
    last_mousex = parseInt(e.clientX - canvasx);
    last_mousey = parseInt(e.clientY - canvasy);
    //x ve y koordinatları fotoğrafın sol üst köşesi 0 olacak şekilde belirlenmiştir.
    console.log("X:",last_mousex," ","Y:",last_mousey);
    // mousedown = true;
    mousex = parseInt(e.clientX - canvasx);
    mousey = parseInt(e.clientY - canvasy);
    console.log(mousex,"",mousey);
    ctx.beginPath();
    var width = 25;
    var height = 25;
    ctx.rect(mousex, mousey, width, height);
    ctx.strokeStyle = "red";
    ctx.lineWidth = 3;
    ctx.stroke();
  });

  //Mouseup
  $(canvas).on("mouseup", function() {
    mousedown = false;
  });

  //Mousemove
  $(canvas).on("mousemove", function(e) {
    mousex = parseInt(e.clientX - canvasx);
    mousey = parseInt(e.clientY - canvasy);
    if (mousedown) {
      ctx.beginPath();
      var width = 25;
      var height = 25;
      ctx.rect(mousex, mousey, width, height);
      ctx.strokeStyle = "red";
      ctx.lineWidth = 3;
      ctx.stroke();
    }
  });
}
</script>

<style>
.position {
  position: relative;
  top: 50px;
}
.vjs-custom-skin > .video-js { 
    height: 600px;
}

</style>
