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
    <!-- <button @click="takeScreenShot">ss al</button>
    <canvas
            id="cnvs"
            style="
              background-color: blue;
              width: -webkit-fill-available;
              height: 240px;
            "
          ></canvas> -->
    <!-- <div class="buttonWrapper">
      <button class="btn btn-primary" type="button" @click="enterStream">
        Apply
      </button>
    </div> -->
  </div>
</template>

<script>
const isProduction = process.env.NODE_ENV === "production";

export default {
    // created: function (){
    //     this.$root.on('giveRef', () => {return this.$refs.videoPlayer.player})
    // },
    name: "Video",
  data() {
    return {
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
    // enterStream() {
    //   //this.playerOptions.sources[0].src = this.streams.hls;
    //   this.playerOptions.techOrder = ["html5"];
    //   this.playerOptions.sources[0].src = this.streams.rtmp;
    //   this.playerOptions.sources[1].src =this.streams.hls;
    //     "http://cdnapi.kaltura.com/p/1878761/sp/187876100/playManifest/entryId/1_usagz19w/flavorIds/1_5spqkazq,1_nslowvhp,1_boih5aji,1_qahc37ag/format/applehttp/protocol/http/a.m3u8";
    //   this.playerOptions.autoplay = true;
    // },
  },
  computed: {
    player() {
      return this.$refs.videoPlayer.player;
    },
  },
};
</script>

<style>
.vjs-custom-skin > .video-js { 
    height: 600px;
}
</style>
