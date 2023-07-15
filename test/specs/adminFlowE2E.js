const headerLogo = require ('../pageobjects/headerTest.js')
const homePage = require('../pageobjects/homePage.js');
const Login = require ('../pageobjects/loginTest.js')
const ActivitiesAdmin = require('../pageobjects/actAdminPage.js');
const NavBarAdmin = require('../pageobjects/menuAdminPage.js');
const ModalsAdmin = require('../pageobjects/modalsPage.js');
const ClassesAdmin = require('../pageobjects/classAdminPage.js');
const MemberAdmin = require('../pageobjects/membAdminPage.js');
const TrainerAdmin = require('../pageobjects/trainAdminPage.js');


describe('Check Login application for "Admins_User"', () => {

    beforeAll('open browser', () => {
        browser.setWindowSize(1900, 900);
        browser.url('https://joaco-megarocket-app.vercel.app');
    });
    it('Display elements for home', async () => {
      await expect(headerLogo.logo).toBeDisplayed();
      await expect(homePage.sidebarHome).toBeDisplayed();
      await expect(homePage.loginButton).toBeDisplayed();
      await expect(homePage.loginButton).toBeClickable();
      await homePage.loginClick();
    });
    it('Display elements login & login flow', async () => {
      await expect(Login.loginForm).toBeDisplayed();
      await expect(Login.labelEmail).toBeDisplayed();
      await expect(Login.emailInput).toBeDisplayed();
      await expect(Login.labelPassword).toBeDisplayed();
      await expect(Login.passwordInput).toBeDisplayed();
      await expect(Login.cancelButton).toBeDisplayed();
      await expect(Login.loginButton).toBeDisplayed();
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
    it('Display elements for menu in Admin', async () => {
        await expect(NavBarAdmin.activitiesButton).toBeDisplayed();
        await expect(NavBarAdmin.activitiesButton).toBeClickable();
        await expect(NavBarAdmin.classesButton).toBeDisplayed();
        await expect(NavBarAdmin.classesButton).toBeClickable();
        await expect(NavBarAdmin.membersButton).toBeDisplayed();
        await expect(NavBarAdmin.membersButton).toBeClickable();
        await expect(NavBarAdmin.subscriptionButton).toBeDisplayed();
        await expect(NavBarAdmin.subscriptionButton).toBeClickable();
        await expect(NavBarAdmin.trainersButton).toBeDisplayed();
        await expect(NavBarAdmin.trainersButton).toBeClickable();
    });
    it('Activities create & edit flow', async () => {
      await NavBarAdmin.activityClick();
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.buttonCreateActivities).toBeClickable();
      await ActivitiesAdmin.createActClick();
      await expect(ActivitiesAdmin.formActivities).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputName).toBeDisplayed();
      await expect(ActivitiesAdmin.containerInputDescription).toBeDisplayed();
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
      await expect(ActivitiesAdmin.inputName).toBeDisplayed();
      await expect(ActivitiesAdmin.inputDescription).toBeDisplayed();
      await expect(ActivitiesAdmin.cancelButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.resetButtonAct).toBeDisplayed();
      await expect(ActivitiesAdmin.saveButtonAct).toBeDisplayed();
      ActivitiesAdmin.inputName.clearValue();
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
      await expect(MemberAdmin.editButtonMember).toBeDisplayed();
      await MemberAdmin.editMemberClick();
      await expect(MemberAdmin.formMember).toBeDisplayed();
      await expect(MemberAdmin.labelFirstName).toBeDisplayed();
      await expect(MemberAdmin.inputFirstName).toBeDisplayed();
      await expect(MemberAdmin.labelLastName).toBeDisplayed();
      await expect(MemberAdmin.inputLastName).toBeDisplayed();
      await expect(MemberAdmin.labelEmail).toBeDisplayed();
      await expect(MemberAdmin.inputEmail).toBeDisplayed();
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
      await expect(MemberAdmin.labelSelectMembership).toBeDisplayed();
      await expect(MemberAdmin.inputSelectMembership).toBeDisplayed();
      await expect(MemberAdmin.cancelButtonMember).toBeDisplayed();
      await expect(MemberAdmin.resetButtonMember).toBeDisplayed();
      await expect(MemberAdmin.confirmButtonMember).toBeDisplayed();
      await MemberAdmin.fillInputFirstName('Testing');
      await MemberAdmin.fillInputLastName('Testing');
      await expect(MemberAdmin.confirmButtonMember).toBeDisplayed();
      await MemberAdmin.confirmButtonMember();
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
      await expect(TrainerAdmin.buttonCreateTrainer).toBeDisplayed();
      await expect(TrainerAdmin.buttonCreateTrainer).toBeClickable();
      await TrainerAdmin.createTrainerClick();
      await expect(TrainerAdmin.formTrainers).toBeDisplayed();
      await expect(TrainerAdmin.labelFirstNameT).toBeDisplayed();
      await expect(TrainerAdmin.labelLastNameT).toBeDisplayed();
      await expect(TrainerAdmin.labelEmailT).toBeDisplayed();
      await expect(TrainerAdmin.labelDniT).toBeDisplayed();
      await expect(TrainerAdmin.labelPhoneT).toBeDisplayed();
      await expect(TrainerAdmin.labelCityT).toBeDisplayed();
      await expect(TrainerAdmin.labelPasswordT).toBeDisplayed();
      await expect(TrainerAdmin.labelSalaryT).toBeDisplayed();
      await expect(TrainerAdmin.inputFirstNameT).toBeDisplayed();
      await expect(TrainerAdmin.inputLastNameT).toBeDisplayed();
      await expect(TrainerAdmin.inputEmailT).toBeDisplayed();
      await expect(TrainerAdmin.inputDniT).toBeDisplayed();
      await expect(TrainerAdmin.inputPhoneT).toBeDisplayed();
      await expect(TrainerAdmin.inputCityT).toBeDisplayed();
      await expect(TrainerAdmin.inputPasswordT).toBeDisplayed();
      await expect(TrainerAdmin.inputSalaryT).toBeDisplayed();
      await expect(TrainerAdmin.cancelButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.resetButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.addButtonTrainer).toBeDisplayed();
      await TrainerAdmin.fillInputNameT('Te');
      await TrainerAdmin.fillInputLNameT('Te');
      await TrainerAdmin.fillInputEmailT('Te');
      await TrainerAdmin.fillInputDniT('Te');
      await TrainerAdmin.fillInputPhoneT('Te');
      await TrainerAdmin.fillInputCityT('Te');
      await TrainerAdmin.fillInputPasswordT('Te');
      await TrainerAdmin.fillInputSalaryT('');
      await TrainerAdmin.addTrainerClick();
      await expect(TrainerAdmin.errorMsgNameT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgLNameT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgDniT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgPhoneT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgEmailT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgCityT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgPasswordT).toBeDisplayed();
      await expect(TrainerAdmin.errorMsgSalaryT).toBeDisplayed();
      await TrainerAdmin.fillInputNameT('Test');
      await TrainerAdmin.fillInputLNameT('Test');
      await TrainerAdmin.fillInputEmailT('test@test.cm');
      await TrainerAdmin.fillInputDniT('12345600');
      await TrainerAdmin.fillInputPhoneT('1123456789');
      await TrainerAdmin.fillInputCityT('Test');
      await TrainerAdmin.fillInputPasswordT('Tetera20');
      await TrainerAdmin.fillInputSalaryT('222');
      await TrainerAdmin.addTrainerClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
      await expect(TrainerAdmin.editButtonTrainer).toBeDisplayed();
      await TrainerAdmin.editTrainerClick();
      await expect(TrainerAdmin.formTrainers).toBeDisplayed();
      await expect(TrainerAdmin.inputFirstNameT).toBeDisplayed();
      await expect(TrainerAdmin.inputLastNameT).toBeDisplayed();
      await expect(TrainerAdmin.inputEmailT).toBeDisplayed();
      await expect(TrainerAdmin.inputDniT).toBeDisplayed();
      await expect(TrainerAdmin.inputPhoneT).toBeDisplayed();
      await expect(TrainerAdmin.inputCityT).toBeDisplayed();
      await expect(TrainerAdmin.inputPasswordT).toBeDisplayed();
      await expect(TrainerAdmin.inputSalaryT).toBeDisplayed();
      await expect(TrainerAdmin.cancelButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.resetButtonTrainer).toBeDisplayed();
      await expect(TrainerAdmin.saveButtonTrainer).toBeDisplayed();
      TrainerAdmin.inputSalaryT.clearValue();
      await TrainerAdmin.fillInputSalaryT('444');
      await TrainerAdmin.saveTrainerClick();
      await expect(ModalsAdmin.modalSuccess).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toBeDisplayed();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await expect(ModalsAdmin.modalSuccessTitle).toHaveTextContaining('Success!');
      await ModalsAdmin.acceptModalClick();
    });
    it('Subscription delete flow', async () => {
      await NavBarAdmin.classesClick();
      await expect(ClassesAdmin.deleteButtonClass).toBeDisplayed();
      await ClassesAdmin.deleteClassClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
    });
    it('Classes delete flow', async () => {
      await NavBarAdmin.classesClick();
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
      await expect(ActivitiesAdmin.deleteButtonAct).toBeDisplayed();
      await ActivitiesAdmin.deleteActClick();
      await expect(ModalsAdmin.modalConfirm).toBeDisplayed();
      await expect(ModalsAdmin.confirmButtonModal).toBeDisplayed();
      await ModalsAdmin.confirmModalClick();
      await expect(ModalsAdmin.acceptButtonModal).toBeDisplayed();
      await ModalsAdmin.acceptModalClick();
    });
    it ('Home flow Admin', async ()=> {
    });
    it ('Log out Admin', async ()=> {
    });
});