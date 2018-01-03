function Page() {

}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
    },
    createHeader() {
        var headerContainer = $(".js-header");
        this.header = new Header(headerContainer, 0);
    }
})