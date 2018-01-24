import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController} from 'ionic-angular';
import { FormBuilder, FormGroup,Validators } from '@angular/forms';
import { Camera, CameraOptions } from '@ionic-native/camera';
import { Auth, User, UserDetails, IDetailedError } from '@ionic/cloud-angular';

import { ProfilePage } from '../profile/profile';
import { HomePage } from '../home/home';

import { ValidatorsCustom } from '../../validators/validators';

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {

  imageURL:any;

  userDetailsForm: FormGroup;

  constructor(public navCtrl: NavController, public navParams: NavParams, private camera: Camera, public loadingCtrl: LoadingController, public toastCtrl: ToastController, private formBuilder: FormBuilder) {
    
    this.userDetailsForm = this.formBuilder.group({
      photo: '',
      name: ['', Validators.required],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])],
      confirmPassword: ['', Validators.compose([Validators.minLength(8), Validators.required])], 
      email: ['', Validators.compose([Validators.required, ValidatorsCustom.isValid])],
      telephone: ['', Validators.compose([Validators.minLength(10), Validators.required])],
      description: ['']
    }, {
      validator: ValidatorsCustom.matchingPasswords
    });  
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SignupPage');
  }

  AddPicture(){
    const options: CameraOptions = {
    quality: 100,
    destinationType: this.camera.DestinationType.FILE_URI,
    sourceType: this.camera.PictureSourceType.PHOTOLIBRARY
  }

    this.camera.getPicture(options).then((imageData) => {
      this.imageURL = imageData;
    }, (err) => {
      console.log(err);
      this.presentToast(err);
    });
  }


  doSignup(){
  	let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: ' Please wait, Creating Account...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(ProfilePage);
    }, 500);

    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }

  doLogin(){
  	this.navCtrl.push(HomePage);
  }

}
