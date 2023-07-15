class ActivitiesAdmin {
  get buttonCreateActivities () {
    return $('[data-testid="create-button-activities"]')
 }
 get  formActivities(){
     return $('#form');
 }
 get inputName() {
     return $('[data-testid="activities-input-name"] input');
 }
 get inputDescription() {
     return $('textarea');
 }
 get  cancelButtonAct(){
     return $('div button:nth-child(1)');
 }//'#form div > div.FormActivities_btnContainer__1hnR3 > div > button:nth-child(1)'
 get  resetButtonAct(){
     return $('div button:nth-child(2)');
 }//'#form > div > div.FormActivities_btnContainer__1hnR3 > div > button:nth-child(2)'
 get  saveButtonAct(){
     return $('[data-testid="activities-save-button"]');
 }
 get addButtonAct(){
     return $('[data-testid="activities-add-button"]');
 }
 get editButtonAct(){
  return $('tbody tr:last-child td:last-child a');
 }
 get deleteButtonAct(){
  return $('tbody tr:last-child td:last-child svg')
 }
 get errorMsgName(){
     return $('[data-testid="activities-input-name"] p');
 }
 get errorMsgDescription(){
     return $('[data-testid="activities-input-description"] p');
 }

 async createActClick() {
     await this.buttonCreateActivities.click();
 }
 async cancelActClick() {
     await this.cancelButtonAct.click();
 }
 async resetActClick() {
     await this.resetButtonAct.click();
 }
 async saveActClick() {
     await this.saveButtonAct.click();
 }
 async addActClick() {
     await this.addButtonAct.click();
 }
 async acceptActClick() {
  await this.acceptButtonAct.click();
}
async editActClick() {
  await this.editButtonAct.click();
}
async deleteActClick() {
  await this.deleteButtonAct.click();
}
 async fillName(name) {
  await this.inputName.setValue(name);
}
async fillDescription(description) {
  await this.inputDescription.setValue(description);
}
}

module.exports = new ActivitiesAdmin();
