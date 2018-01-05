function Page() {
    this.headerContainer = $(".js-header");
    this.mainContainer = $(".js-container");
}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
    },
    createHeader() {
        this.header = new Header(this.headerContainer, 2);
        $(this.header).on("logout", $.proxy(this.handleLogoutEvent, this));
        $(this.header).on("login", $.proxy(this.handleLoginEvent, this));
    },
    handleLoginEvent() {
        this.createAddPersonBtn();
        this.createPersonList();
        this.createPagination();
    },
    handleLogoutEvent() {
        this.mainContainer.html(`<div class="well">你还没有登录</div>`);
    },
    createAddPersonBtn() {
        this.addPersonBtn = new AddPerson(this.mainContainer);
        $(this.addPersonBtn).on("change", $.proxy(this.handleAddPersonChange, this))
    },
    createPersonList() {
        this.personList = new PersonList(this.mainContainer);
        $(this.personList).on("change", $.proxy(this.handlePersonListChange, this))
    },
    createPagination() {
        this.pagination = new Pagination(this.mainContainer);
        $(this.pagination).on("change", $.proxy(this.handlePaginationChange, this))
    },
    handlePersonListChange(e) {
        this.pagination.setTotalPage(e.total);
    },
    handlePaginationChange(e) {
        this.personList.changePage(e.page);
    },
    handleAddPersonChange() {
        this.personList.getListInfo();
    }
})