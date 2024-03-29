const headerLogo = require ('../pageobjects/headerTest.js');
const Footer = require ('../pageobjects/footerTest.js');
const homePage = require('../pageobjects/homePage.js');
const Login = require ('../pageobjects/loginTest.js');
const ActivitiesAdmin = require('../pageobjects/actAdminPage.js');
const NavBarAdmin = require('../pageobjects/menuAdminPage.js');
const ModalsAdmin = require('../pageobjects/modalsPage.js');
const ClassesAdmin = require('../pageobjects/classAdminPage.js');
const MemberAdmin = require('../pageobjects/membAdminPage.js');
const TrainerAdmin = require('../pageobjects/trainAdminPage.js');
const subscriptionAdmin = require('../pageobjects/subsAdminPage.js');


describe('Check complete flow application for "Admins_User"', () => {
    beforeAll('open browser', () => {
        browser.setWindowSize(1900, 900);
        browser.url('https://joaco-megarocket-app.vercel.app');
    });
    it('Display elements for home', async () => {
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
      await expect(headerLogo.logo).toBeDisplayed();
      await expect(headerLogo.logo).toHaveAttribute('alt', 'Mega Rocket Header Logo');
      await expect(headerLogo.logo).toHaveAttribute('src', '/assets/images/logo-header2.png');
      await expect(homePage.sidebarHome).toBeDisplayed();
      await expect(homePage.loginButton).toBeDisplayed();
      await expect(homePage.loginButton).toBeClickable();
      await expect(homePage.loginButton).toHaveHref('/auth/login');
      await expect(homePage.signUpButton).toBeDisplayed();
      await expect(homePage.signUpButton).toBeClickable();
      await expect(homePage.signUpButton).toHaveHref('/signUp');
      await expect(homePage.homeButton).toBeDisplayed();
      await expect(homePage.homeButton).toBeClickable();
      await expect(homePage.homeButton).toHaveHref('/');
      await expect(homePage.activitiesButton).toBeDisplayed();
      await expect(homePage.activitiesButton).toBeClickable();
      await expect(homePage.activitiesButton).toHaveHref('/activities');
      await expect(homePage.scheduleButton).toBeDisplayed();
      await expect(homePage.scheduleButton).toBeClickable();
      await expect(homePage.scheduleButton).toHaveHref('/schedule');
      await expect(homePage.membershipsButton).toBeDisplayed();
      await expect(homePage.membershipsButton).toBeClickable();
      await expect(homePage.membershipsButton).toHaveHref('/membership');
      await expect(homePage.contactButton).toBeDisplayed();
      await expect(homePage.contactButton).toBeClickable();
      await expect(homePage.contactButton).toHaveHref('/contact');
      await Footer.footer.scrollIntoView();
      await expect(Footer.logo).toBeDisplayed();
      await expect(Footer.logo).toHaveAttribute('alt', 'Mega Rocket Footer Logo');
      await expect(Footer.logo).toHaveAttribute('src', '/assets/images/logo-footer2.png');
      await expect(Footer.facebookIcon).toBeDisplayed();
      await expect(Footer.facebookLink).toBeDisplayed();
      await expect(Footer.facebookLink).toBeClickable();
      await expect(Footer.facebookLink).toHaveHref('https://www.facebook.com/radiumrocket');
      await expect(Footer.facebookIcon).toHaveAttribute('alt', 'Facebook Logo');
      await expect(Footer.facebookIcon).toHaveAttribute('src', '/assets/images/facebook.svg');
      await expect(Footer.instagramIcon).toBeDisplayed();
      await expect(Footer.instagramLink).toBeDisplayed();
      await expect(Footer.instagramLink).toBeClickable();
      await expect(Footer.instagramLink).toHaveHref('https://www.instagram.com/radium.rocket/');
      await expect(Footer.instagramIcon).toHaveAttribute('alt', 'Instagram Logo');
      await expect(Footer.instagramIcon).toHaveAttribute('src', '/assets/images/instagram.svg');
      await expect(Footer.twitterIcon).toBeDisplayed();
      await expect(Footer.twitterLink).toBeDisplayed();
      await expect(Footer.twitterLink).toBeClickable();
      await expect(Footer.twitterLink).toHaveHref('https://twitter.com/radiumrocket');
      await expect(Footer.twitterIcon).toHaveAttribute('alt', 'Twitter Logo');
      await expect(Footer.twitterIcon).toHaveAttribute('src', '/assets/images/twitter.svg');
      await expect(Footer.copyRight).toHaveTextContaining('Copyright © 2023 MegaRocket SA. All rights reserved.');
      await homePage.loginClick();
    });
    it('Display elements login & login flow', async () => {
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/auth/login');
      await expect(Login.loginForm).toBeDisplayed();
      await expect(Login.labelEmail).toBeDisplayed();
      await expect(Login.emailInput).toBeDisplayed();
      await expect(Login.labelPassword).toBeDisplayed();
      await expect(Login.passwordInput).toBeDisplayed();
      await expect(Login.cancelButton).toBeDisplayed();
      await expect(Login.loginButton).toBeDisplayed();
      await expect(Login.firstCard).toBeDisplayed();
      await expect(Login.firstCard).toBeClickable();
      await expect(Login.firstCard).toHaveHref('/signUp?membership=Only Classes Membership');
      await expect(Login.firstCardTittle).toHaveTextContaining('ONLY CLASSES');
      await expect(Login.secondCard).toBeDisplayed();
      await expect(Login.secondCard).toBeClickable();
      await expect(Login.secondCard).toHaveHref('/signUp?membership=Classic Membership');
      await expect(Login.secondCardTittle).toHaveTextContaining('CLASSIC');
      await expect(Login.thirdCard).toBeDisplayed();
      await expect(Login.thirdCard).toBeClickable();
      await expect(Login.thirdCard).toHaveHref('/signUp?membership=Black Membership');
      await expect(Login.thirdCardTittle).toHaveTextContaining('BLACK');
      await Login.logIn('Te@test', 'Test');
      await expect(Login.errorMail).toBeDisplayed();
      await expect(Login.errorPassword).toBeDisplayed();
      await Login.logIn('admin@gmail.com', 'Admin123');
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    it('Display elements for header, menu & footer in Admin', async () => {
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/activities');
      await expect(headerLogo.logo).toBeDisplayed();
      await expect(headerLogo.logo).toHaveAttribute('alt', 'Mega Rocket Header Logo');
      await expect(headerLogo.logo).toHaveAttribute('src', '/assets/images/logo-header2.png');
      await expect(NavBarAdmin.homeButton).toBeDisplayed();
      await expect(NavBarAdmin.homeButton).toBeClickable();
      await expect(NavBarAdmin.homeButton).toHaveHref('/');
      await expect(NavBarAdmin.logOutButton).toBeDisplayed();
      await expect(NavBarAdmin.logOutButton).toBeClickable();
      await expect(NavBarAdmin.activitiesButton).toBeDisplayed();
      await expect(NavBarAdmin.activitiesButton).toBeClickable();
      await expect(NavBarAdmin.activitiesButton).toHaveHref('/admins/activities');
      await expect(NavBarAdmin.classesButton).toBeDisplayed();
      await expect(NavBarAdmin.classesButton).toBeClickable();
      await expect(NavBarAdmin.classesButton).toHaveHref('/admins/classes');
      await expect(NavBarAdmin.membersButton).toBeDisplayed();
      await expect(NavBarAdmin.membersButton).toBeClickable();
      await expect(NavBarAdmin.membersButton).toHaveHref('/admins/members');
      await expect(NavBarAdmin.subscriptionButton).toBeDisplayed();
      await expect(NavBarAdmin.subscriptionButton).toBeClickable();
      await expect(NavBarAdmin.subscriptionButton).toHaveHref('/admins/subscriptions');
      await expect(NavBarAdmin.trainersButton).toBeDisplayed();
      await expect(NavBarAdmin.trainersButton).toBeClickable();
      await expect(NavBarAdmin.trainersButton).toHaveHref('/admins/trainers');
      await expect(Footer.logo).toBeDisplayed();
      await expect(Footer.logo).toHaveAttribute('alt', 'Mega Rocket Footer Logo');
      await expect(Footer.logo).toHaveAttribute('src', '/assets/images/logo-footer2.png');
      await expect(Footer.facebookIcon).toBeDisplayed();
      await expect(Footer.facebookLink).toBeDisplayed();
      await expect(Footer.facebookLink).toBeClickable();
      await expect(Footer.facebookLink).toHaveHref('https://www.facebook.com/radiumrocket');
      await expect(Footer.facebookIcon).toHaveAttribute('alt', 'Facebook Logo');
      await expect(Footer.facebookIcon).toHaveAttribute('src', '/assets/images/facebook.svg');
      await expect(Footer.instagramIcon).toBeDisplayed();
      await expect(Footer.instagramLink).toBeDisplayed();
      await expect(Footer.instagramLink).toBeClickable();
      await expect(Footer.instagramLink).toHaveHref('https://www.instagram.com/radium.rocket/');
      await expect(Footer.instagramIcon).toHaveAttribute('alt', 'Instagram Logo');
      await expect(Footer.instagramIcon).toHaveAttribute('src', '/assets/images/instagram.svg');
      await expect(Footer.twitterIcon).toBeDisplayed();
      await expect(Footer.twitterLink).toBeDisplayed();
      await expect(Footer.twitterLink).toBeClickable();
      await expect(Footer.twitterLink).toHaveHref('https://twitter.com/radiumrocket');
      await expect(Footer.twitterIcon).toHaveAttribute('alt', 'Twitter Logo');
      await expect(Footer.twitterIcon).toHaveAttribute('src', '/assets/images/twitter.svg');
      await expect(Footer.copyRight).toHaveTextContaining('Copyright © 2023 MegaRocket SA. All rights reserved.');
    });
    it('Activities create & edit flow', async () => {
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeClickable();
      await ActivitiesAdmin.createActClick();
      await expect(ActivitiesAdmin.formActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.labelName).toBeDisplayed();
      await expect(ActivitiesAdmin.labelName).toHaveText('Name');
      await expect(ActivitiesAdmin.labelDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.labelDescription).toHaveText('Description');
      await expect(ActivitiesAdmin.inputName).toBeDisplayed();
      await expect(ActivitiesAdmin.inputDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.cancelButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.resetButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.addButtonAct).toBeDisplayed();
      await ActivitiesAdmin.fillName('Te');
      await ActivitiesAdmin.fillDescription('Test');
      await ActivitiesAdmin.addActClick();
      await expect(ActivitiesAdmin.errorMsgName).toBeDisplayed();
      await expect(ActivitiesAdmin.errorMsgDescription).toBeDisplayed();
      await ActivitiesAdmin.fillName('Test');
      await ActivitiesAdmin.fillDescription('TestTestTestTestTestTestTestTestTestTestTestTestTest');
      await ActivitiesAdmin.addActClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
      await expect(ActivitiesAdmin.editButtonAct).toBeDisplayed();
      await ActivitiesAdmin.editActClick();
      await expect(ActivitiesAdmin.formActivities).toBeDisplayed();
      ActivitiesAdmin.inputName.clearValue();
      await expect(ActivitiesAdmin.labelName).toBeDisplayed();
      await expect(ActivitiesAdmin.labelName).toHaveText('Name');
      await expect(ActivitiesAdmin.labelDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.labelDescription).toHaveText('Description');
      await expect(ActivitiesAdmin.inputName).toBeDisplayed();
      await expect(ActivitiesAdmin.inputDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.cancelButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.resetButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.saveButtonAct).toBeDisplayed();
      await ActivitiesAdmin.fillName('Testing');
      await ActivitiesAdmin.saveActClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    it('Classes create & edit flow', async () => {
      await expect(NavBarAdmin.classesButton).toBeDisplayed();
      await expect(NavBarAdmin.classesButton).toBeClickable();
      await NavBarAdmin.classesClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/classes');
      await expect(ClassesAdmin.buttonCreateClasses).toBeDisplayed();
      await expect(ClassesAdmin.buttonCreateClasses).toBeClickable();
      await ClassesAdmin.createClassesClick();
      await expect(ClassesAdmin.formClasses).toBeDisplayed();
      await expect(ClassesAdmin.selectDay).toBeDisplayed();
      await expect(ClassesAdmin.selectHour).toBeDisplayed();
      await expect(ClassesAdmin.selectTrainer).toBeDisplayed();
      await expect(ClassesAdmin.selectActivity).toBeDisplayed();
      await expect(ClassesAdmin.selectSlots).toBeDisplayed();
      await ClassesAdmin.selectionDayClass();
      await ClassesAdmin.selectionHourClass();
      await ClassesAdmin.selectionTrainerClass();
      await ClassesAdmin.selectionActivityClass();
      await ClassesAdmin.fillSlotsClass(4);
      await expect(ClassesAdmin.addButtonClass).toBeDisplayed();
      await expect(ClassesAdmin.addButtonClass).toBeClickable();
      await ClassesAdmin.addClassClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
      await ClassesAdmin.editButtonClass.scrollIntoView()
      await expect(ClassesAdmin.editButtonClass).toBeDisplayed();
      await ClassesAdmin.editClassClick();
      await expect(ClassesAdmin.formClasses).toBeDisplayed();
      await expect(ClassesAdmin.selectDay).toBeDisplayed();
      await expect(ClassesAdmin.selectHour).toBeDisplayed();
      await expect(ClassesAdmin.selectTrainer).toBeDisplayed();
      await expect(ClassesAdmin.selectActivity).toBeDisplayed();
      await expect(ClassesAdmin.selectSlots).toBeDisplayed();
      ClassesAdmin.selectSlots.clearValue();
      await ClassesAdmin.fillSlotsClass(6);
      await expect(ClassesAdmin.cancelButtonClass).toBeDisplayed();
      await expect(ClassesAdmin.resetButtonClass).toBeDisplayed();
      await expect(ClassesAdmin.saveButtonClass).toBeDisplayed();
      await ClassesAdmin.saveClassClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    it('Members edit flow', async () => {
      await expect(NavBarAdmin.membersButton).toBeDisplayed();
      await expect(NavBarAdmin.membersButton).toBeClickable();
      await NavBarAdmin.membersClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/members');
      await MemberAdmin.editButtonMember.scrollIntoView();
      await expect(MemberAdmin.editButtonMember).toBeDisplayed();
      await MemberAdmin.editMemberClick();
      await expect(MemberAdmin.formMember).toBeDisplayed();
      await expect(MemberAdmin.labelFirstName).toBeDisplayed();
      await expect(MemberAdmin.inputFirstName).toBeDisplayed();
      await expect(MemberAdmin.labelLastName).toBeDisplayed();
      await expect(MemberAdmin.inputLastName).toBeDisplayed();
      await expect(MemberAdmin.labelDni).toBeDisplayed();
      await expect(MemberAdmin.inputDni).toBeDisplayed();
      await expect(MemberAdmin.labelPhone).toBeDisplayed();
      await expect(MemberAdmin.inputPhone).toBeDisplayed();
      await expect(MemberAdmin.labelCity).toBeDisplayed();
      await expect(MemberAdmin.inputCity).toBeDisplayed();
      await expect(MemberAdmin.labelPostalCode).toBeDisplayed();
      await expect(MemberAdmin.inputPostalCode).toBeDisplayed();
      await expect(MemberAdmin.labelBirthDay).toBeDisplayed();
      await expect(MemberAdmin.inputBirthDay).toBeDisplayed();
      await expect(MemberAdmin.labelMembership).toBeDisplayed();
      await expect(MemberAdmin.inputMembership).toBeDisplayed();
      await expect(MemberAdmin.cancelButtonMember).toBeDisplayed();
      await expect(MemberAdmin.resetButtonMember).toBeDisplayed();
      await expect(MemberAdmin.saveButtonMember).toBeDisplayed();
      await MemberAdmin.fillFirstName('Testing');
      await MemberAdmin.fillLastName('Testing');
      await MemberAdmin.saveMemberClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    it('Trainer create & edit flow', async () => {
      await expect(NavBarAdmin.trainersButton).toBeDisplayed();
      await expect(NavBarAdmin.trainersButton).toBeClickable();
      await NavBarAdmin.trainersClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/trainers');
      await expect(TrainerAdmin.buttonCreateTrainer).toBeDisplayed();
      await expect(TrainerAdmin.buttonCreateTrainer).toBeClickable();
      await TrainerAdmin.createTrainerClick();
      await expect(TrainerAdmin.formTrainers).toBeDisplayed();
      await expect(TrainerAdmin.labelFirstName).toBeDisplayed();
      await expect(TrainerAdmin.labelLastName).toBeDisplayed();
      await expect(TrainerAdmin.labelEmail).toBeDisplayed();
      await expect(TrainerAdmin.labelDni).toBeDisplayed();
      await expect(TrainerAdmin.labelPhone).toBeDisplayed();
      await expect(TrainerAdmin.labelCity).toBeDisplayed();
      await expect(TrainerAdmin.labelPassword).toBeDisplayed();
      await expect(TrainerAdmin.labelSalary).toBeDisplayed();
      await expect(TrainerAdmin.inputFirstName).toBeDisplayed();
      await expect(TrainerAdmin.inputLastName).toBeDisplayed();
      await expect(TrainerAdmin.inputEmail).toBeDisplayed();
      await expect(TrainerAdmin.inputDni).toBeDisplayed();
      await expect(TrainerAdmin.inputPhone).toBeDisplayed();
      await expect(TrainerAdmin.inputCity).toBeDisplayed();
      await expect(TrainerAdmin.inputPassword).toBeDisplayed();
      await expect(TrainerAdmin.inputSalary).toBeDisplayed();
      await expect(TrainerAdmin.cancelButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.resetButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.addButtonTrainer).toBeDisplayed();
      await TrainerAdmin.fillInputName('Te');
      await TrainerAdmin.fillInputLName('Te');
      await TrainerAdmin.fillInputEmail('Te');
      await TrainerAdmin.fillInputDni('Te');
      await TrainerAdmin.fillInputPhone('Te');
      await TrainerAdmin.fillInputCity('Te');
      await TrainerAdmin.fillInputPassword('Te');
      await TrainerAdmin.fillInputSalary('');
      await TrainerAdmin.addTrainerClick();
      await expect(TrainerAdmin.errorMsgName).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgLName).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgDni).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgPhone).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgEmail).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgCity).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgPassword).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgSalary).toBeDisplayed();
      await TrainerAdmin.fillInputName('Test');
      await TrainerAdmin.fillInputLName('Test');
      await TrainerAdmin.fillInputEmail('test@test.cm');
      await TrainerAdmin.fillInputDni('12345600');
      await TrainerAdmin.fillInputPhone('1123456789');
      await TrainerAdmin.fillInputCity('Test');
      await TrainerAdmin.fillInputPassword('Tetera20');
      await TrainerAdmin.fillInputSalary('222');
      await TrainerAdmin.addTrainerClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
      await expect(TrainerAdmin.editButtonTrainer).toBeDisplayed();
      await TrainerAdmin.editTrainerClick();
      await expect(TrainerAdmin.formTrainers).toBeDisplayed();
      await expect(TrainerAdmin.inputFirstName).toBeDisplayed();
      await expect(TrainerAdmin.inputLastName).toBeDisplayed();
      await expect(TrainerAdmin.inputDni).toBeDisplayed();
      await expect(TrainerAdmin.inputPhone).toBeDisplayed();
      await expect(TrainerAdmin.inputCity).toBeDisplayed();
      await expect(TrainerAdmin.inputSalary).toBeDisplayed();
      await expect(TrainerAdmin.cancelButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.resetButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.saveButtonTrainer).toBeDisplayed();
      TrainerAdmin.inputSalary.clearValue();
      await TrainerAdmin.fillInputSalary('444');
      await TrainerAdmin.saveTrainerClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    // it('Subscription delete flow', async () => {
    //   await NavBarAdmin.subscriptionClick();
    //   const currentUrl = await browser.getUrl();
    //   expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/subscriptions');
    //   await subscriptionAdmin.deleteSubscription.scrollIntoView()
    //   await expect(subscriptionAdmin.deleteSubscription).toBeDisplayed();
    //   await subscriptionAdmin.deleteSubsClick();
    //   await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
    //   await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
    //   await ModalsAdmin.confirmModalClick();
    //   await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
    //   await ModalsAdmin.acceptModalClick();
    // });
    // it('Member delete flow', async () => {
    //   await NavBarAdmin.membersClick();
    //   const currentUrl = await browser.getUrl();
    //   expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/members');
    //   await MemberAdmin.deleteButtonMember.scrollIntoView();
    //   await expect(MemberAdmin.deleteButtonMember).toBeDisplayed();
    //   await MemberAdmin.deleteMemberClick();
    //   await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
    //   await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
    //   await ModalsAdmin.confirmModalClick();
    //   await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
    //   await ModalsAdmin.acceptModalClick();
    // });
    it('Classes delete flow', async () => {
      await NavBarAdmin.classesClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/classes');
      await ClassesAdmin.deleteButtonClass.scrollIntoView();
      await expect(ClassesAdmin.deleteButtonClass).toBeDisplayed();
      await ClassesAdmin.deleteClassClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
    });
    it('Trainer delete flow', async () => {
      await NavBarAdmin.trainersClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/trainers');
      await expect(TrainerAdmin.deleteButtonTrainer).toBeDisplayed();
      await TrainerAdmin.deleteTrainerClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
    });
    it('Activity delete flow', async () => {
      await NavBarAdmin.activityClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/activities');
      await expect(ActivitiesAdmin.deleteButtonAct).toBeDisplayed();
      await ActivitiesAdmin.deleteActClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
    });
    it ('Home flow Admin', async ()=> {
      await expect(NavBarAdmin.homeButton).toBeDisplayed();
      await expect(NavBarAdmin.homeButton).toBeClickable();
      await NavBarAdmin.homeClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
      await expect(headerLogo.logo).toBeDisplayed();
      await expect(homePage.sidebarHome).toBeDisplayed();
      await expect(NavBarAdmin.managementButton).toBeDisplayed();
      await expect(NavBarAdmin.managementButton).toBeClickable();
      await expect(NavBarAdmin.managementButton).toHaveHref('/admins/activities');
      await expect(NavBarAdmin.logOutButtonHome).toBeDisplayed();
      await expect(NavBarAdmin.logOutButtonHome).toBeClickable();
      await Footer.footer.scrollIntoView();
      await expect(Footer.footer).toBeDisplayed();
      await NavBarAdmin.managementClick();
      const backUrl = await browser.getUrl();
      expect(backUrl).toEqual('https://joaco-megarocket-app.vercel.app/admins/activities');
    });
    it ('Log out Admin', async ()=> {
      await expect(NavBarAdmin.logOutButton).toBeDisplayed();
      await expect(NavBarAdmin.logOutButton).toBeClickable();
      await NavBarAdmin.logOutClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      const currentUrl = await browser.getUrl();
      expect(currentUrl).toEqual('https://joaco-megarocket-app.vercel.app/');
      await expect(headerLogo.logo).toBeDisplayed();
      await expect(homePage.sidebarHome).toBeDisplayed();
      await expect(homePage.loginButton).toBeDisplayed();
      await expect(homePage.loginButton).toBeClickable();
      await expect(homePage.signUpButton).toBeDisplayed();
      await expect(homePage.signUpButton).toBeClickable();
      await expect(homePage.homeButton).toBeDisplayed();
      await expect(homePage.homeButton).toBeClickable();
      await expect(homePage.activitiesButton).toBeDisplayed();
      await expect(homePage.activitiesButton).toBeClickable();
      await expect(homePage.scheduleButton).toBeDisplayed();
      await expect(homePage.scheduleButton).toBeClickable();
      await expect(homePage.membershipsButton).toBeDisplayed();
      await expect(homePage.membershipsButton).toBeClickable();
      await expect(homePage.contactButton).toBeDisplayed();
      await expect(homePage.contactButton).toBeClickable();
      await Footer.footer.scrollIntoView();
      await expect(Footer.footer).toBeDisplayed();
    });
});