function Pagination(container) {
    this.container = container;
    this.init();
}
Pagination.Temp = `
<nav aria-label="Page navigation">
  <ul class="pagination js-pagination">
  </ul>
</nav>
`
$.extend(Pagination.prototype, {
    init() {
        this.createDom();
        this.bindEvents();
    },
    bindEvents() {
        this.element.on("click",$.proxy(this.handleClick,this));
    },
    handleClick(e){
        var target = $(e.target),
            page = parseInt(target.text());
        $(this).trigger(new $.Event("change", {
            page: page
        }));
    },
    createDom() {
        this.element = $(Pagination.Temp);
        this.container.append(this.element);
    },
    setTotalPage(total) {
        this.element.html(Pagination.Temp);
        var pagination = this.element.find(".js-pagination");
        var str = ""
        for (var i = 1; i <= total; i++) {
            str += `<li><a href="javascript:;">${i}</a></li>`;
        }
        pagination.html(str);
    }
})