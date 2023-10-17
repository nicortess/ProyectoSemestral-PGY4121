signUp() {
    Parse.User.signUp(this.username, this.password).then((resp) => {
      console.log('Logged in successfully', resp);

      // Clears up the form
      this.username = '';
      this.password = '';

      this.toastCtrl.create({
        message: 'Account created successfully',
        duration: 2000
      }).present();
    }, err => {
      console.log('Error signing in', err);

      this.toastCtrl.create({
        message: err.message,
        duration: 2000
      }).present();
    });
  }