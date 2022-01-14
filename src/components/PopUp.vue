<template>
  <v-row class="position" justify="center">
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on, attrs }">
          <canvas
            id="cnvs"
            style="
              background-color: green;
              width: -webkit-fill-available;
              height: 240px;
            "
          ></canvas>
        <v-btn
          color="primary"
          dark
          v-bind="attrs"
          v-on="on"
          @click="takeScreenShot"
        >
          ScreenShot
        </v-btn>
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
</template>

<script>
// var fs = require("fs");


export default {
  data: () => ({
    dialog: false,
  }),
  methods: {
    takeScreenShot() {
      var canvas = document.getElementById("cnvs");
      console.log(this.$root);
      this.ctx = canvas.getContext("2d");
      //video componentinden player'ına erişeceğiz
      var vdi = this.$refs.videoPlayer.player;
      console.log(vdi);
      this.ctx.drawImage(vdi.children_[0], 0, 0, 300, 150);
    },

    //Kayıt

    saveimage() {
    //   const result = await fetch("http://localhost:3000/products", {
    //     method: "POST",
    //     body: JSON.stringify({ isim: "oguzhan" }),
    //     headers: { "Content-Type": "application/json" },
    //   });

    //   const newPhoto = await result.json();
    //   fs.writeFile("mynewfile3.txt", "newPhoto", function (err) {
    //     if (err) throw err;
    //     console.log("Saved!");
    //   });

      // indirmeden yeni sayfaya kaydedilecek
    //   window.location.href = document
    //     .getElementById("cnvs")
    //     .toDataURL("image/png")
    //     .replace("image/png", "image/octet-stream");
    console.log("Kaydedildi");
      this.dialog = false;
    },
  },
};
</script>

<style scoped>
.position {
  position: relative;
  top: 50px;
}
</style>
