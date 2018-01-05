function Pagination(container) {
    this.container = container;
    this.init();
}
Pagination.Temp = `
<nav aria-label="Page navigation" class="js-pagination">
  <ul class="pagination">
    <li class="js-previous">
      <a href="javascript:;" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
      </a>
    </li>
    <li class="js-next">
      <a href="javascript:;" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </li>
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
        this.prevBtn = this.element.find(".js-previous");
        for (var i = total; i > 0; i--) {
            this.prevBtn.after(`<li><a href="javascript:;">${i}</a></li>`);
        }
    }
})