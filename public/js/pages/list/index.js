function Page() {

}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
        this.createAddPositionBtn();
        this.createPositionList();
    },
    createHeader() {
        var headerContainer = $(".js-header");
        this.header = new Header(headerContainer, 1);
    },
    createAddPositionBtn() {
        var positonContainer = $(".js-container");
        this.addPositionBtn = new AddPosition(positonContainer);
    },
    createPositionList() {
        var positonContainer = $(".js-container");
        this.positionList = new PositionList(positonContainer);
    }
})