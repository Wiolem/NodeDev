function Page() {

}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
        this.createAddPositionBtn();
        this.createPositionList();
        this.createPagination();
    },
    createHeader() {
        var headerContainer = $(".js-header");
        this.header = new Header(headerContainer, 1);
    },
    createAddPositionBtn() {
        var positonContainer = $(".js-container");
        this.addPositionBtn = new AddPosition(positonContainer);
        $(this.addPositionBtn).on("change",$.proxy(this.handleAddPositionChange,this))
    },
    createPositionList() {
        var positonContainer = $(".js-container");
        this.positionList = new PositionList(positonContainer);
        $(this.positionList).on("change",$.proxy(this.handlePositionListChange,this))
    },
    createPagination(){
        var paginationContainer = $(".js-container");
        this.pagination = new Pagination(paginationContainer);
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