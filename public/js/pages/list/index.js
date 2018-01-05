function Page() {
    this.headerContainer = $(".js-header");
    this.mainContainer = $(".js-container");
}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
    },
    createHeader() {
        this.header = new Header(this.headerContainer, 1);
        $(this.header).on("logout",$.proxy(this.handleLogoutEvent,this))
        $(this.header).on("login",$.proxy(this.handleLoginEvent,this))
    },
    handleLoginEvent(){
        this.createAddPositionBtn();
        this.createPositionList();
        this.createPagination();
    },
    handleLogoutEvent(){
        this.mainContainer.html(`<div class="well">你还没有登录</div>`)
    },
    createAddPositionBtn() {
        this.addPositionBtn = new AddPosition(this.mainContainer);
        $(this.addPositionBtn).on("change",$.proxy(this.handleAddPositionChange,this))
    },
    createPositionList() {
        this.positionList = new PositionList(this.mainContainer);
        $(this.positionList).on("change",$.proxy(this.handlePositionListChange,this))
    },
    createPagination(){
        this.pagination = new Pagination(this.mainContainer);
        $(this.pagination).on("change",$.proxy(this.handlePaginationChange,this))
    },
    handlePositionListChange(e){
        this.pagination.setTotalPage(e.total);
    },
    handlePaginationChange(e){
        this.positionList.changePage(e.page);
    },
    handleAddPositionChange(){
        this.positionList.getListInfo();
    }
})