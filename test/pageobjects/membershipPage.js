class MembershipPage {
  get classicMember() {
    return $('[data-testid="memberships-container-page"] a:nth-child(2)');
  }
  get modal() {
    return $('[data-testid="modal-success"]');
  }
  get acceptBtn() {
    return $('[data-testid="modal-success"] > button');
  }
}
module.exports = new MembershipPage();

