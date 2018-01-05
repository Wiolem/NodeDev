function Page() {

}
$.extend(Page.prototype, {
    init() {
        this.createHeader();
        this.createAddPersonBtn();
        this.createPersonList();
        this.createPagination();
    },
    createHeader() {
        var headerContainer = $(".js-header");
        this.header = new Header(headerContainer, 2);
    },
    createAddPersonBtn() {
        var personContainer = $(".js-container");
        this.addPersonBtn = new AddPerson(personContainer);
        $(this.addPersonBtn).on("change",$.proxy(this.handleAddPersonChange,this))
    },
    createPersonList() {
        var personContainer = $(".js-container");
        this.personList = new PersonList(personContainer);
        $(this.personList).on("change",$.proxy(this.handlePersonListChange,this))
    },
    createPagination(){
        var paginationContainer = $(".js-container");
        this.pagination = new Pagination(paginationContainer);
        $(this.pagination).on("change",$.proxy(this.handlePaginationChange,this))
    },
    handlePersonListChange(e){
        this.pagination.setTotalPage(e.total);
    },
    handlePaginationChange(e){
        this.personList.changePage(e.page);
    },
    handleAddPersonChange(){
        this.personList.getListInfo();
    }
})