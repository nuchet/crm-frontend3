<template>
  <v-layout row wrap>
    <NavBar ref="navbar"></NavBar>
    <HeaderNavigation
      @toggle-drawer="$refs.navbar.drawer = !$refs.navbar.drawer"
    ></HeaderNavigation>
    <div class="body-content">
      <div class="title">
        <div class="title-in">
          <div class="step-row">
            <div class="step">
              <img src="@/assets/step-active.png" v-if="currentStep == 1">
              <img src="@/assets/step-non-active.png" v-else>
            </div>
            <div class="step">
              <img src="@/assets/step-active.png" v-if="currentStep == 2">
              <img src="@/assets/step-non-active.png" v-else>
            </div>
            <div class="step">
              <img src="@/assets/step-active.png" v-if="currentStep == 3">
              <img src="@/assets/step-non-active.png" v-else>
            </div>
            <div class="step">
              <img src="@/assets/step-active.png" v-if="currentStep == 4">
              <img src="@/assets/step-non-active.png" v-else>
            </div>
            <!-- <div class="step">
              <img src="@/assets/step-active.png" v-if="currentStep == 5">
              <img src="@/assets/step-non-active.png" v-else>
            </div>-->
          </div>
          <div id="step-title">
            <b-container class="bv-example-row" v-if="currentStep == 1">
              <div class="title-number">
                <span>1</span>
              </div>
              <div class="title-content">
                <span>กรุณาถ่ายรูปบัตรสมาชิก/บุ๊คเซอร์วิส</span>
              </div>
            </b-container>
            <b-container class="bv-example-row" v-if="currentStep == 2">
              <div class="title-number">
                <span>2</span>
              </div>
              <div class="title-content">
                <span>กรุณาถ่ายรูปบัตรประชาชน</span>
              </div>
            </b-container>
            <b-container class="bv-example-row" v-if="currentStep == 3">
              <div class="title-number">
                <span>3</span>
              </div>
              <div class="title-content">
                <span>กรุณาถ่ายสำเนาทะเบียนรถ</span>
              </div>
            </b-container>
            <b-container class="bv-example-row" v-if="currentStep == 4">
              <div class="title-number">
                <span>4</span>
              </div>
              <div class="title-content">
                <span>เงื่อนไขการรับประกันจากดีลเลอร์</span>
              </div>
            </b-container>

            <!-- <b-container class="bv-example-row" v-if="currentStep == 5">
              <div class="title-number">
                <span>5</span>
              </div>
              <div class="title-content">
                <span>กรุณากรอกหมายเลข การ์ด/บุ๊คเซอร์วิส</span>
              </div>
            </b-container> -->
          </div>
        </div>
        <div v-if="currentStep == 1" style="display: flex;justify-content: center;margin-top:-10px">
          <div class="segment-step" :optionsSelected="step1.optionsSelected == '1'" @click="onSelect('1')">บัตรสมาชิก</div>
          <div class="segment-step" :optionsSelected="step1.optionsSelected == '2'" @click="onSelect('2')">บุ๊คเซอร์วิส</div>
        </div>
      </div>
      <div class="bg-content">
        <div id="step1" v-if="currentStep == 1">
          <div>
            <b-modal id="bv-modal-upload1" size="xl" hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <template #modal-title>
                ปรับแต่งรูปภาพก่อน upload
              </template>
              <div class="d-block text-center">
                <div>
                  <Cropper
                    @change="change"
                    :src="step1.imgSelectUpload"
                    class="cropper"
                    image-class="cropper__image"
                    :stencil-props="{
                      class: 'cropper-stencil',
                      previewClass: 'cropper-stencil__preview',
                      draggingClass: 'cropper-stencil--dragging',
                      handlersClasses: {
                        default: 'cropper-handler',
                        eastNorth: 'cropper-handler--east-north',
                        westNorth: 'cropper-handler--west-north',
                        eastSouth: 'cropper-handler--east-south',
                        westSouth: 'cropper-handler--west-south',
                      },
                      handlersWrappersClasses: {
                        default: 'cropper-handler-wrapper',
                        eastNorth: 'cropper-handler-wrapper--east-north',
                        westNorth: 'cropper-handler-wrapper--west-north',
                        eastSouth: 'cropper-handler-wrapper--east-south',
                        westSouth: 'cropper-handler-wrapper--west-south',
                      },
                    }"
                  />
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px"  @click="closeModalUpload()">ปิด</b-button>
                <b-button class="mt-3" variant="success" @click="cropImageSuccess()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>

          <div>
            <b-modal id="bv-modal-camera1" size="xl" hide-header hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <div class="d-block text-center">
                <div class="web-camera-container">
                  <div class="camera-button">
                      <b-button variant="success" v-if="!step1.isCameraOpen" @click="toggleCamera">
                        <span>Open Camera</span>
                      </b-button>
                      <b-button variant="danger" v-else @click="toggleCamera">
                        <span>Close Camera</span>
                      </b-button>
                  </div>
                  <div v-show="step1.isCameraOpen && step1.isLoading" class="camera-loading">
                    <ul class="loader-circle">
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div v-if="step1.isCameraOpen" v-show="!step1.isLoading" class="camera-box" :class="{ 'flash' : step1.isShotPhoto }">
                    <div class="camera-shutter" :class="{'flash' : step1.isShotPhoto}"></div>
                    <video v-show="!step1.isPhotoTaken" class="video" ref="camera1" :height="337.5" autoplay></video>
                    <canvas v-show="step1.isPhotoTaken" id="photoTaken" ref="canvas1" style="width:100%;"></canvas>
                  </div>
                  <div v-if="step1.isCameraOpen && !step1.isLoading" class="camera-shoot">
                    <button type="button" class="button" @click="takePhoto">
                      <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                    </button>
                  </div>
                  <div v-if="step1.isPhotoTaken && step1.isCameraOpen" class="camera-download">
                    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px" @click="closeModalCamera()">ปิด</b-button>
                <b-button class="mt-3" v-if="step1.isPhotoTaken && step1.isCameraOpen" variant="success" @click="confirmTakePhoto()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>
          <div class="content">
            <v-form ref="form1" v-model="valid" lazy-validation>
              <v-row>
                  <v-col md="12" sm="12" cols="12">
                  <v-card  class="mx-auto" style="">
                    <div class="image-card">
                      <img class="image-cf"
                        v-if="step1.dataRequest.imgConfirm != ''"
                        :src="step1.dataRequest.imgConfirm"/>
                      <img v-else src="@/assets/icon-01.jpg" alt="">
                      <v-text-field tag="image-input" name="imageMember" type="text" hidden  v-model="step1.dataRequest.imgConfirm" required :rules="imageRules"></v-text-field>
                    </div>
                      <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$bvModal.show('bv-modal-camera1')">
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                    <input id="fileUpload1" accept="image/*" type="file" hidden @change="selectImage($event)">
                      <v-btn icon @click="chooseFiles()">
                      <v-icon>mdi-image</v-icon>
                    </v-btn>
                  </v-card-actions>
                  </v-card>
                </v-col>
                <v-col md="12" sm="12" cols="12" v-show="step1.optionsSelected == '1'">
                  <span>
                    เลขบัตรสมาชิก
                  </span>
                </v-col>
                <v-col md="12" sm="12" cols="12" v-show="step1.optionsSelected == '2'">
                  <span>
                    บุ๊คเซอร์วิช
                  </span>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <v-text-field type="text" solo name="memberNumber" v-model="step1.dataRequest.memberNumber" required :rules="dataRules" ></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
        <div id="step2" v-if="currentStep == 2">
          <div>
            <b-modal id="bv-modal-upload2" size="xl" hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <template #modal-title>
                ปรับแต่งรูปภาพก่อน upload
              </template>
              <div class="d-block text-center">
                <div>
                  <Cropper
                    @change="change"
                    :src="step2.imgSelectUpload"
                    class="cropper"
                    image-class="cropper__image"
                    :stencil-props="{
                      class: 'cropper-stencil',
                      previewClass: 'cropper-stencil__preview',
                      draggingClass: 'cropper-stencil--dragging',
                      handlersClasses: {
                        default: 'cropper-handler',
                        eastNorth: 'cropper-handler--east-north',
                        westNorth: 'cropper-handler--west-north',
                        eastSouth: 'cropper-handler--east-south',
                        westSouth: 'cropper-handler--west-south',
                      },
                      handlersWrappersClasses: {
                        default: 'cropper-handler-wrapper',
                        eastNorth: 'cropper-handler-wrapper--east-north',
                        westNorth: 'cropper-handler-wrapper--west-north',
                        eastSouth: 'cropper-handler-wrapper--east-south',
                        westSouth: 'cropper-handler-wrapper--west-south',
                      },
                    }"
                  />
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px"  @click="closeModalUpload()">ปิด</b-button>
                <b-button class="mt-3" variant="success" @click="cropImageSuccess()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>

          <div>
            <b-modal id="bv-modal-camera2" size="xl" hide-header hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <div class="d-block text-center">
                <div class="web-camera-container">
                  <div class="camera-button">
                      <b-button variant="success" v-if="!step2.isCameraOpen" @click="toggleCamera">
                        <span>Open Camera</span>
                      </b-button>
                      <b-button variant="danger" v-else @click="toggleCamera">
                        <span>Close Camera</span>
                      </b-button>
                  </div>
                  <div v-show="step2.isCameraOpen && step2.isLoading" class="camera-loading">
                    <ul class="loader-circle">
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div v-if="step2.isCameraOpen" v-show="!step2.isLoading" class="camera-box" :class="{ 'flash' : step2.isShotPhoto }">
                    <div class="camera-shutter" :class="{'flash' : step2.isShotPhoto}"></div>
                    <video v-show="!step2.isPhotoTaken" class="video" ref="camera2" :height="337.5" autoplay></video>
                    <canvas v-show="step2.isPhotoTaken" id="photoTaken" ref="canvas2" style="width:100%;"></canvas>
                  </div>
                  <div v-if="step2.isCameraOpen && !step2.isLoading" class="camera-shoot">
                    <button type="button" class="button" @click="takePhoto">
                      <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                    </button>
                  </div>
                  <div v-if="step2.isPhotoTaken && step2.isCameraOpen" class="camera-download">
                    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px" @click="closeModalCamera()">ปิด</b-button>
                <b-button v-if="step2.isPhotoTaken && step2.isCameraOpen" class="mt-3" variant="success" @click="confirmTakePhoto()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>
          <div class="content">
            <v-form ref="form2" v-model="valid" lazy-validation>
              <v-row>
                  <v-col md="12" sm="12" cols="12">
                  <v-card  class="mx-auto" style="">
                    <div class="image-card">
                      <img class="image-cf"
                        v-if="step2.dataRequest.imgConfirm != ''"
                        :src="step2.dataRequest.imgConfirm"/>
                      <img v-else src="@/assets/identification.png" alt="">
                      <v-text-field name="imageIden" tag="image-input" type="text" hidden  v-model="step1.dataRequest.imgConfirm" required :rules="imageRules"></v-text-field>
                    </div>
                      <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$bvModal.show('bv-modal-camera2')">
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                    <input id="fileUpload2" accept="image/*" type="file" hidden @change="selectImage($event)">
                      <v-btn icon @click="chooseFiles()">
                      <v-icon>mdi-image</v-icon>
                    </v-btn>
                  </v-card-actions>
                  </v-card>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <span>
                    เลขบัตรประชาชน
                  </span>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <v-text-field v-text-field type="text" solo></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <span>
                    ชื่อ
                  </span>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <v-text-field v-text-field type="text" solo></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">
                  <span>
                    วัน/เดือน/ปี
                  </span>
                </v-col>
                <v-col md="4" sm="4" cols="4"> <v-select label="Solo field" solo></v-select></v-col>
                <v-col md="4" sm="4" cols="4"> <v-select label="Solo field" solo></v-select></v-col>
                <v-col md="4" sm="4" cols="4"> <v-select label="Solo field" solo></v-select></v-col>
              </v-row>
            </v-form>
          </div>
        </div>
        <div id="step3" v-if="currentStep == 3">
          <div>
            <b-modal id="bv-modal-upload3" size="xl" hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <template #modal-title>
                ปรับแต่งรูปภาพก่อน upload
              </template>
              <div class="d-block text-center">
                <div>
                  <Cropper
                    @change="change"
                    :src="step3.imgSelectUpload"
                    class="cropper"
                    image-class="cropper__image"
                    :stencil-props="{
                      class: 'cropper-stencil',
                      previewClass: 'cropper-stencil__preview',
                      draggingClass: 'cropper-stencil--dragging',
                      handlersClasses: {
                        default: 'cropper-handler',
                        eastNorth: 'cropper-handler--east-north',
                        westNorth: 'cropper-handler--west-north',
                        eastSouth: 'cropper-handler--east-south',
                        westSouth: 'cropper-handler--west-south',
                      },
                      handlersWrappersClasses: {
                        default: 'cropper-handler-wrapper',
                        eastNorth: 'cropper-handler-wrapper--east-north',
                        westNorth: 'cropper-handler-wrapper--west-north',
                        eastSouth: 'cropper-handler-wrapper--east-south',
                        westSouth: 'cropper-handler-wrapper--west-south',
                      },
                    }"
                  />
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px"  @click="closeModalUpload()">ปิด</b-button>
                <b-button class="mt-3" variant="success" @click="cropImageSuccess()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>

          <div>
            <b-modal id="bv-modal-camera3" size="xl" hide-header hide-footer hide-header-close no-close-on-esc no-close-on-backdrop>
              <div class="d-block text-center">
                <div class="web-camera-container">
                  <div class="camera-button">
                      <b-button variant="success" v-if="!step3.isCameraOpen" @click="toggleCamera">
                        <span>Open Camera</span>
                      </b-button>
                      <b-button variant="danger" v-else @click="toggleCamera">
                        <span>Close Camera</span>
                      </b-button>
                  </div>
                  <div v-show="step3.isCameraOpen && step3.isLoading" class="camera-loading">
                    <ul class="loader-circle">
                      <li></li>
                      <li></li>
                      <li></li>
                    </ul>
                  </div>
                  <div v-if="step3.isCameraOpen" v-show="!step3.isLoading" class="camera-box" :class="{ 'flash' : step3.isShotPhoto }">
                    <div class="camera-shutter" :class="{'flash' : step3.isShotPhoto}"></div>
                    <video v-show="!step3.isPhotoTaken" class="video" ref="camera3" :height="337.5" autoplay></video>
                    <canvas v-show="step3.isPhotoTaken" id="photoTaken" ref="canvas3" style="width:100%;"></canvas>
                  </div>
                  <div v-if="step3.isCameraOpen && !step3.isLoading" class="camera-shoot">
                    <button type="button" class="button" @click="takePhoto">
                      <img src="https://img.icons8.com/material-outlined/50/000000/camera--v2.png">
                    </button>
                  </div>
                  <div v-if="step3.isPhotoTaken && step3.isCameraOpen" class="camera-download">
                    <a id="downloadPhoto" download="my-photo.jpg" class="button" role="button" @click="downloadImage">
                      Download
                    </a>
                  </div>
                </div>
              </div>
              <div style="float: right;">
                <b-button class="mt-3" style="margin-right:10px" @click="closeModalCamera()">ปิด</b-button>
                <b-button v-if="step3.isPhotoTaken && step3.isCameraOpen" class="mt-3" variant="success" @click="confirmTakePhoto()">ยืนยัน</b-button>
              </div>
            </b-modal>
          </div>
          <div class="content">
            <v-form>
              <v-row>
                  <v-col md="12" sm="12" cols="12">
                  <v-card  class="mx-auto" style="">
                    <div class="image-card">
                      <img class="image-cf"
                        v-if="step3.dataRequest.imgConfirm != ''"
                        :src="step3.dataRequest.imgConfirm"/>
                      <img v-else src="@/assets/vehicleRegis.png" alt="">
                    </div>
                      <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon @click="$bvModal.show('bv-modal-camera3')">
                      <v-icon>mdi-camera</v-icon>
                    </v-btn>
                    <input id="fileUpload3" accept="image/*" type="file" hidden @change="selectImage($event)">
                      <v-btn icon @click="chooseFiles()">
                      <v-icon>mdi-image</v-icon>
                    </v-btn>
                  </v-card-actions>
                  </v-card>
                </v-col>
                <v-col md="12" sm="12" cols="12">ยี่ห้อ</v-col>
                <v-col md="12" sm="12" cols="12">
                <v-select :items="this.carBrand" name="name" item-text="name" label="เลือกยี่ห้อรถ" dense solo> </v-select>
                </v-col>
                <v-col md="12" sm="12" cols="12">รุ่น</v-col>
                <v-col md="12" sm="12" cols="12">
                <v-select :items="this.carModel" dense solo name="name" item-text="name"> </v-select>
                </v-col>
                <v-col md="12" sm="12" cols="12">ปี</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">ทะเบียน</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">จังหวัดที่ลงทะเบียน</v-col>
                <v-col md="12" sm="12" cols="12">
                <v-select :items="this.province"  dense solo name="name_th" item-text="name_th"> </v-select>
                </v-col>
                <v-col md="12" sm="12" cols="12">เลขตัวถัง</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">สีรถ</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">วันที่ออกรถ</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">เลขไมล์</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">เบอร์</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
                <v-col md="12" sm="12" cols="12">ชื่อเชลล์</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-text-field type="text" solo name="membership" id="membership"></v-text-field>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
        <div id="step4" v-if="currentStep == 4">
          <b-modal id="bv-modal-cf" size="xl" hide-footer>
            <template #modal-title>
              ยืนยันการเปิดความคุ้มครอง
            </template>
            <div class="d-block text-center">
              <div>
                <b-form-textarea
                  id="textarea-rows"
                  placeholder="หมายเหตุ"
                  rows="8"
                ></b-form-textarea>
              </div>
            </div>
            <div style="text-align: center;">
              <b-button pill class="btn-step" to="/policyDetails" style="width:30%;margin-top:20px">ตกลง</b-button>
            </div>
          </b-modal>
          <div class="content">
            <v-form>
              <v-row>
                <v-col md="12" sm="12" cols="12">ประเภทแพ็กเกจ</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-select :items="items" dense solo label="-- โปรดเลือก --"> </v-select>
                </v-col>
                <v-col md="12" sm="12" cols="12">วันที่ซื้อแพ็กเกจ</v-col>
                <v-col md="12" sm="12" cols="12">

                </v-col>

                <v-col md="12" sm="12" cols="12">ระยะความคุ้มครอง (เดือน)</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-select :items="items" dense solo label="-- โปรดเลือก --"> </v-select>
                </v-col>

                <v-col md="12" sm="12" cols="12">ระยะความคุ้มครอง (กิโลเมตร)</v-col>
                <v-col md="12" sm="12" cols="12">
                    <v-select :items="items" dense solo label="-- โปรดเลือก --"> </v-select>
                </v-col>
              </v-row>
            </v-form>
          </div>
        </div>
        <v-row>
          <v-col md="6" sm="6" cols="6" class="text-center">
            <b-button pill class="btn-step" @click="backStep()">ย้อนกลับ</b-button>
          </v-col>
          <v-col md="6" sm="6" cols="6" class="text-center">
            <b-button pill class="btn-step" @click="nextStep()">{{ currentStep == '4' ? "ยืนยันการเปิดความคุ้มครอง":"ถัดไป"}}</b-button>
          </v-col>
        </v-row>
      </div>
    </div>
  </v-layout>
</template>

<script>
import NavBar from '@/components/NavBar'
import HeaderNavigation from '@/components/HeaderNavigation'
import { Cropper } from 'vue-advanced-cropper'
import 'vue-advanced-cropper/dist/style.css'

export default {
  data () {
    return {
      dataRules: [(v) => !!v || 'กรุณากรอกข้อมูลให้สมบูรณ์'],
      imageRules: [(v) => !!v || 'กรุณาอัพโหลดรูป'],
      valid: true,
      row: null,
      currentStep: 1,
      step1: {
        imgDataUrl: '',
        imgCrop: '',
        imgSelectUpload: '',
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        canvasWidth: 0,
        canvasHeight: 0,
        optionsSelected: '1',
        dataRequest: {
          imgConfirm: '',
          memberNumber: ''
        }
      },
      step2: {
        imgDataUrl: '',
        imgCrop: '',
        imgSelectUpload: '',
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        canvasWidth: 0,
        canvasHeight: 0,
        dataRequest: {
          imgConfirm: ''
        }
      },
      step3: {
        imgDataUrl: '',
        imgCrop: '',
        imgSelectUpload: '',
        isCameraOpen: false,
        isPhotoTaken: false,
        isShotPhoto: false,
        isLoading: false,
        canvasWidth: 0,
        canvasHeight: 0,
        dataRequest: {
          imgConfirm: ''
        }
      }
    }
  },
  computed: {
    dataAll () {
      return [this.step1, this.step2, this.step3]
    }
  },
  components: {
    NavBar,
    HeaderNavigation,
    Cropper
  },
  mounted: function () {
    this.$nextTick(function () {
      const withProperty = []
      const els = document.getElementsByTagName('input')
      let i = 0
      for (i = 0; i < els.length; i++) {
        if (els[i].hasAttribute('tag')) {
          withProperty.push(els[i])
        }
      }

      for (i = 0; i < withProperty.length; i++) {
        console.log(withProperty)
        withProperty[0].parentElement.parentElement.style.display = 'none'
      }
    })
  },
  // components () {
  //   return {
  //     navbar: NavBar,
  //     'app-header': HeaderNavigation,
  //     cropper: Cropper
  //   }
  // },
  methods: {
    scrollToTop () {
      window.scrollTo(0, 0)
    },
    nextStep () {
      if (this.currentStep === 4) {
        this.$bvModal.show('bv-modal-cf')
      } else {
        this.validateStep(this.currentStep)
      }
    },
    validateStep (step) {
      if (step === 1) {
        if (this.$refs.form1.validate()) {
          this.currentStep += 1
          this.scrollToTop()
          console.log(this.$refs.form1)
        }
      }
    },
    backStep () {
      if (this.currentStep === 1) {
        this.$router.go(-1)
      } else {
        this.currentStep -= 1
        this.scrollToTop()
      }
    },
    onSelect (optionsSelected) {
      this.step1.optionsSelected = optionsSelected
      this.step1.dataRequest.memberNumber = ''
    },
    change ({ coordinates, canvas }) {
      console.log('changed!')
      if (this.currentStep === 1) {
        this.step1.imgCrop = canvas.toDataURL()
      } else if (this.currentStep === 2) {
        this.step2.imgCrop = canvas.toDataURL()
      } else {
        this.step3.imgCrop = canvas.toDataURL()
      }
      console.log(coordinates, canvas)
    },
    toggleShow () {
      console.log('-------- crop success --------')
      if (this.currentStep === 1) {
        this.step1.dataRequest.imgConfirm = this.step1.imgCrop
      } else if (this.currentStep === 2) {
        this.step2.dataRequest.imgConfirm = this.step2.imgCrop
      } else {
        this.step3.dataRequest.imgConfirm = this.step3.imgCrop
      }
    },
    chooseFiles () {
      if (this.currentStep === 1) {
        document.getElementById('fileUpload1').click()
      } else if (this.currentStep === 2) {
        document.getElementById('fileUpload2').click()
      } else {
        document.getElementById('fileUpload3').click()
      }
    },
    selectImage (e) {
      const file = e.target.files[0]
      if (this.currentStep === 1) {
        this.step1.imgSelectUpload = URL.createObjectURL(file)
        this.$bvModal.show('bv-modal-upload1')
      } else if (this.currentStep === 2) {
        this.step2.imgSelectUpload = URL.createObjectURL(file)
        this.$bvModal.show('bv-modal-upload2')
      } else {
        this.step3.imgSelectUpload = URL.createObjectURL(file)
        this.$bvModal.show('bv-modal-upload3')
      }
      console.log(e.target.files)
    // console.log(file)
    },
    closeModalUpload () {
      if (this.currentStep === 1) {
        document.getElementById('fileUpload1').value = null
        this.$bvModal.hide('bv-modal-upload1')
      } else if (this.currentStep === 2) {
        document.getElementById('fileUpload2').value = null
        this.$bvModal.hide('bv-modal-upload2')
      } else {
        document.getElementById('fileUpload3').value = null
        this.$bvModal.hide('bv-modal-upload3')
      }
      // console.log(this.$refs["fileupload"]);
    },
    closeModalCamera () {
      if (this.currentStep === 1) {
        this.step1.isCameraOpen = false
        this.step1.isPhotoTaken = false
        this.step1.isShotPhoto = false
        this.$bvModal.hide('bv-modal-camera1')
      } else if (this.currentStep === 2) {
        this.step2.isCameraOpen = false
        this.step2.isPhotoTaken = false
        this.step2.isShotPhoto = false
        this.$bvModal.hide('bv-modal-camera2')
      } else {
        this.step3.isCameraOpen = false
        this.step3.isPhotoTaken = false
        this.step3.isShotPhoto = false
        this.$bvModal.hide('bv-modal-camera3')
      }
      this.stopCameraStream()
    },
    cropImageSuccess () {
      if (this.currentStep === 1) {
        this.step1.dataRequest.imgConfirm = this.step1.imgCrop
      } else if (this.currentStep === 2) {
        this.step2.dataRequest.imgConfirm = this.step2.imgCrop
      } else {
        this.step3.dataRequest.imgConfirm = this.step3.imgCrop
      }
      this.closeModalUpload()
    },
    toggleCamera () {
      if (this.currentStep === 1) {
        if (this.step1.isCameraOpen) {
          this.step1.isCameraOpen = false
          this.step1.isPhotoTaken = false
          this.step1.isShotPhoto = false
          this.stopCameraStream()
        } else {
          this.step1.isCameraOpen = true
          this.createCameraElement()
        }
      } else if (this.currentStep === 2) {
        if (this.step2.isCameraOpen) {
          this.step2.isCameraOpen = false
          this.step2.isPhotoTaken = false
          this.step2.isShotPhoto = false
          this.stopCameraStream()
        } else {
          this.step2.isCameraOpen = true
          this.createCameraElement()
        }
      } else {
        if (this.step3.isCameraOpen) {
          this.step3.isCameraOpen = false
          this.step3.isPhotoTaken = false
          this.step3.isShotPhoto = false
          this.stopCameraStream()
        } else {
          this.step3.isCameraOpen = true
          this.createCameraElement()
        }
      }
    },

    createCameraElement () {
      if (this.currentStep === 1) {
        this.step1.isLoading = true
      } else if (this.currentStep === 2) {
        this.step2.isLoading = true
      } else {
        this.step3.isLoading = true
      }
      const constraints = (window.constraints = {
        audio: false,
        video: true
      })
      navigator.mediaDevices
        .getUserMedia(constraints)
        .then(stream => {
          if (this.currentStep === 1) {
            this.step1.isLoading = false
            this.$refs.camera1.srcObject = stream
          } else if (this.currentStep === 2) {
            this.step2.isLoading = false
            this.$refs.camera2.srcObject = stream
          } else {
            this.step3.isLoading = false
            this.$refs.camera3.srcObject = stream
          }
        })
        .catch(error => {
          this.step1.isLoading = false
          this.step2.isLoading = false
          this.step3.isLoading = false
          alert(error)
        })
    },

    stopCameraStream () {
      if (this.currentStep === 1) {
        const tracks = this.$refs.camera1.srcObject.getTracks()
        tracks.forEach(track => {
          track.stop()
        })
      } else if (this.currentStep === 2) {
        const tracks = this.$refs.camera2.srcObject.getTracks()
        tracks.forEach(track => {
          track.stop()
        })
      } else {
        const tracks = this.$refs.camera3.srcObject.getTracks()
        tracks.forEach(track => {
          track.stop()
        })
      }
    },

    takePhoto () {
      if (this.currentStep === 1) {
        if (!this.step1.isPhotoTaken) {
          this.step1.isShotPhoto = true
          const FLASH_TIMEOUT = 50
          setTimeout(() => {
            this.step1.isShotPhoto = false
          }, FLASH_TIMEOUT)
        }
        this.step1.isPhotoTaken = !this.step1.isPhotoTaken
        this.$refs.canvas1.width = this.$refs.camera1.videoWidth
        this.$refs.canvas1.height = this.$refs.camera1.videoHeight
        const context = this.$refs.canvas1.getContext('2d')
        console.log(this.$refs.camera1.videoWidth)
        context.drawImage(this.$refs.camera1, 0, 0, this.$refs.camera1.videoWidth, this.$refs.camera1.videoHeight)
      } else if (this.currentStep === 2) {
        if (!this.step2.isPhotoTaken) {
          this.step2.isShotPhoto = true
          const FLASH_TIMEOUT = 50
          setTimeout(() => {
            this.step2.isShotPhoto = false
          }, FLASH_TIMEOUT)
        }
        this.step2.isPhotoTaken = !this.step2.isPhotoTaken
        this.$refs.canvas2.width = this.$refs.camera2.videoWidth
        this.$refs.canvas2.height = this.$refs.camera2.videoHeight
        const context = this.$refs.canvas2.getContext('2d')
        console.log(this.$refs.camera2.videoWidth)
        context.drawImage(this.$refs.camera2, 0, 0, this.$refs.camera2.videoWidth, this.$refs.camera2.videoHeight)
      } else {
        if (!this.step3.isPhotoTaken) {
          this.step3.isShotPhoto = true
          const FLASH_TIMEOUT = 50
          setTimeout(() => {
            this.step3.isShotPhoto = false
          }, FLASH_TIMEOUT)
        }
        this.step3.isPhotoTaken = !this.step3.isPhotoTaken
        this.$refs.canvas3.width = this.$refs.camera3.videoWidth
        this.$refs.canvas3.height = this.$refs.camera3.videoHeight
        const context = this.$refs.canvas3.getContext('2d')
        console.log(this.$refs.camera3.videoWidth)
        context.drawImage(this.$refs.camera3, 0, 0, this.$refs.camera3.videoWidth, this.$refs.camera3.videoHeight)
      }
    },

    downloadImage () {
      const download = document.getElementById('downloadPhoto')
      const canvas = document.getElementById('photoTaken').toDataURL('image/jpeg').replace('image/jpeg', 'image/octet-stream')
      download.setAttribute('href', canvas)
    },

    confirmTakePhoto () {
      if (this.currentStep === 1) {
        this.step1.dataRequest.imgConfirm = this.$refs.canvas1.toDataURL()
      } else if (this.currentStep === 2) {
        this.step2.dataRequest.imgConfirm = this.$refs.canvas2.toDataURL()
      } else {
        this.step3.dataRequest.imgConfirm = this.$refs.canvas3.toDataURL()
      }
      this.closeModalCamera()
    }
  }
}
</script>

<style lang="scss">

.v-input__slot:has(div):has(input[name="imageMember"]){
  display: none;
}

.bg-content{
  background-image: url('~@/assets/content.png');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center center;
  height: 100%;
}

.content{
  width: 100%;
  height: auto;
  padding: 30px 11% !important;
  background-image:inherit
}

.body-content{
  padding: 0 !important;
}

.container{
  max-width: none !important;
  padding: 0 !important;
}

.bv-example-row{
  display: flex;
  padding: 0px 11% !important;
}

.title-number{
  background-color: white;
  padding: 10px 0;
  width: 10%;
}

.title-content{
  background: linear-gradient(to right, #041427, #092d4a, #041427);
  color: white;
  padding: 10px 0;
  width: 90%;
}

.title {
  height: auto;
}

.title-in {
  padding: 20px 0px;
  padding-bottom: 60px;
}

.step-row {
  display: flex;
  justify-content: center;
  margin-bottom: 20px;
}

.step {
  margin: 0 1.5%;
}

.step > img{
  width: 20px
}

.modal-header{
  color: white;
  background: linear-gradient(to right, #041427, #092d4a, #041427);
}

.btn-step{
  border-color: white !important;
  border-width: 5px !important;
  background: linear-gradient(to right, #041427, #092d4a, #041427);box-shadow: 0px 3px 4px 0px #ab9f9f;
  width: 60%;
}

.segment-step{
  font-weight: bold;
  background: linear-gradient(#737476,#8c8d90, #c2c2c4);
  width: 44%;
  margin: 0 2%;
  text-align: center;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  padding: 10px 0;
  color: white;
}

.segment-step[optionsSelected=true]{
  background: linear-gradient(to right, #041427, #092d4a, #041427);
}

.image-card{
    padding: 20px;
    padding: 30px 20px;
    text-align: center;
  }

  .image-card>img{
    width: 90%;
  }

  @media only screen and (max-width: 500px) {
      .image-card>.image-cf{
        height: 250px;
      }
  }

  @media only screen and (min-width: 500px) {
    .image-card>.image-cf{
        height: 350px;
      }
  }

  @media only screen and (min-width: 650px) {
    .image-card>.image-cf{
        height: 450px;
      }
  }

  @media only screen and (min-width: 900px) {
    .image-card>.image-cf{
        height: 500px;
      }
  }

  @media only screen and (min-width: 1200px) {
    .image-card>.image-cf{
        height: 600px;
      }
  }

.cropper-stencil {
  &__preview {
    &:after,
    &:before {
      content: "";
      opacity: 0;
      transition: opacity 0.25s;
      position: absolute;
      pointer-events: none;
      z-index: 1;
    }

    &:after {
      border-left: solid 1px white;
      border-right: solid 1px white;
      width: 33%;
      height: 100%;
      transform: translateX(-50%);
      left: 50%;
      top: 0;
    }

    &:before {
      border-top: solid 1px white;
      border-bottom: solid 1px white;
      height: 33%;
      width: 100%;
      transform: translateY(-50%);
      top: 50%;
      left: 0;
    }
  }

  &--dragging {
    .cropper-stencil__preview {
      &:after,
      &:before {
        opacity: 0.7;
      }
    }
  }
}

.cropper-line {
  border-color: rgba(white, 0.8);
}

.cropper-handler-wrapper {
  width: 24px;
  height: 24px;
  &--west-north {
    transform: translate(0, 0);
  }
  &--east-south {
    transform: translate(-100%, -100%);
  }
  &--west-south {
    transform: translate(0, -100%);
  }
  &--east-north {
    transform: translate(-100%, 0);
  }
}

.cropper-handler {
  display: block;
  position: relative;
  flex-shrink: 0;
  transition: opacity 0.5s;
  border: none;
  background: white;
  height: 4px;
  width: 4px;
  opacity: 0;
  top: auto;
  left: auto;

  &--west-north,
  &--east-south,
  &--west-south,
  &--east-north {
    display: block;
    height: 16px;
    width: 16px;
    background: none;
    opacity: 0.7;
  }

  &--west-north {
    border-left: solid 2px white;
    border-top: solid 2px white;
  }

  &--east-south {
    border-right: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--west-south {
    border-left: solid 2px white;
    border-bottom: solid 2px white;
  }

  &--east-north {
    border-right: solid 2px white;
    border-top: solid 2px white;
  }

  &--hover {
    opacity: 1;
  }
}

.web-camera-container {
  margin-top: 2rem;
  margin-bottom: 2rem;
  padding: 2rem;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border: 1px solid #ccc;
  border-radius: 4px;
  width: 100%;

  .camera-button {
    margin-bottom: 2rem;
  }

  .video,.camera-box{
    width: 100%;
  }

  .camera-box {
    .camera-shutter {
      opacity: 0;
      width: 100%;
      height: 337.5px;
      background-color: #fff;
      position: absolute;
      &.flash {
        opacity: 1;
      }
    }
  }

  .camera-shoot {
    margin: 1rem 0;

    button {
      height: 60px;
      width: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-radius: 100%;

      img {
        height: 35px;
        object-fit: cover;
      }
    }
  }

  .camera-loading {
    overflow: hidden;
    height: 100%;
    position: absolute;
    width: 100%;
    min-height: 150px;
    margin: 3rem 0 0 -1.2rem;

    ul {
      height: 100%;
      position: absolute;
      width: 100%;
      z-index: 999999;
      margin: 0;
    }

    .loader-circle {
      display: block;
      height: 14px;
      margin: 0 auto;
      top: 50%;
      left: 100%;
      transform: translateY(-50%);
      transform: translateX(-50%);
      position: absolute;
      width: 100%;
      padding: 0;

      li {
        display: block;
        float: left;
        width: 10px;
        height: 10px;
        line-height: 10px;
        padding: 0;
        position: relative;
        margin: 0 0 0 4px;
        background: #999;
        animation: preload 1s infinite;
        top: -50%;
        border-radius: 100%;

        &:nth-child(2) {
          animation-delay: .2s;
        }

        &:nth-child(3) {
          animation-delay: .4s;
        }
      }
    }
  }

  @keyframes preload {
    0% {
      opacity: 1
    }
    50% {
      opacity: .4
    }
    100% {
      opacity: 1
    }
  }
}
</style>
