import { Component } from '@angular/core';
import { NavController, LoadingController, AlertController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators} from '@angular/forms';

import { ProfilePage } from '../profile/profile';
import { SignupPage } from '../signup/signup';

import { ValidatorsCustom } from '../../validators/validators';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  email: string = '';
  password: string = '';

  credentialsForm: FormGroup;

  constructor(public navCtrl: NavController, public loadingCtrl: LoadingController, public alertCtrl: AlertController, private formBuilder: FormBuilder) {

    this.credentialsForm = this.formBuilder.group({
      email: ['', Validators.compose([Validators.required, ValidatorsCustom.isValid])],
      password: ['', Validators.compose([Validators.minLength(8), Validators.required])]
    });

  }

  signin(){

    if(this.email ==='' || this.password === ''){
      let alert = this.alertCtrl.create({
        title: 'Login error',
        subTitle: 'All fields are required',
        buttons: ['OK']
      });
      alert.present();
      return;
    }

  	console.log('navigating to sign in page');
  	this.navCtrl.push(ProfilePage);
  }

  signup(){
    let loading = this.loadingCtrl.create({
      spinner: 'hide',
      content: 'Loading Please Wait...'
    });

    loading.present();

    setTimeout(() => {
      this.navCtrl.push(SignupPage);
    }, 500);

    setTimeout(() => {
      loading.dismiss();
    }, 500);
  }
}
