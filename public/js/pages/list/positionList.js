function PositionList(container) {
    this.container = container;
    this.page = 1;
    this.size = 10;
    this.init();
}
PositionList.Temp = `
    <table class="table table-striped">
        <thead class="js-thead">
            <th>编号</th>
            <th>公司名称</th>
            <th>职位名称</th>
            <th>薪资</th>
            <th>办公地点</th>
            <th>LOGO</th>
            <th>操作</th>
        </thead>
        <tbody class="js-tbody">
        </tbody>
    </table>
`;
$.extend(PositionList.prototype, {
    init() {
        this.createDom();
        this.getListInfo();
        this.createUpdatePosition();
        this.bindEvents();
    },
    createUpdatePosition() {
        this.updatePosition = new UpdatePosition(this.container);
        $(this.updatePosition).on("change", $.proxy(this.getListInfo, this))
    },
    bindEvents() {
        this.container.on("click", $.proxy(this.handleTableClick, this))
    },
    handleTableClick(e) {
        var target = $(e.target),
            isDeleteClick = target.hasClass("js-delete"),
            isUpdateClick = target.hasClass("js-update");
        if (isDeleteClick) {
            this.deleteItem(target.data("id"));
        }
        if (isUpdateClick) {
            this.updatePosition.showItem(target.data("id"));
        }
    },
    deleteItem(id) {
        $.ajax({
            url: "/api/deletePosition",
            data: {
                id: id
            },
            success: $.proxy(this.handleDeletePositionSuccess, this)
        })
    },
    handleDeletePositionSuccess(res) {
        if (res && res.data && res.data.delete) {
            this.getListInfo();
        }
    },
    createDom() {
        this.element = $(PositionList.Temp);
        this.tbodyElement = this.element.find(".js-tbody");
        this.container.append(this.element);
    },
    getListInfo() {
        $.ajax({
            type: "POST",
            url: "/api/getListInfo",
            data: {
                size: this.size,
                page: this.page
            },
            success: $.proxy(this.handleGetListInfo, this)
        })
    },
    handleGetListInfo(res) {
        var items = res.data.list;
        this.createItems(items);
        var totalPage = res.data.totalPage;
        if (this.page > totalPage) {
            this.page = totalPage;
            this.getListInfo();
        } else {
            $(this).trigger(new $.Event("change", {
                total: totalPage
            }));
        }
    },
    createItems(items) {
        var str = "";
        if (items) {
            items.forEach(function(value, index) {
                var filename = value.filename ? value.filename :"1515130457220preview.png";
                str += `
                <tr class="position-item">
                  <td>${index + 1}</td>
                  <td>${value.company}</td>
                  <td>${value.position}</td>
                  <td>${value.salary}</td>
                  <td>${value.address}</td>
                  <td><img style="width:30px;height:30px;" alt="" class="img-rounded" src="/uploads/${filename}" alt="" /></td>
                  <td>
                    <div class="btn-group" role="group" aria-label="...">
                      <button type="button" data-toggle="modal" data-target=".js-updatepos-modal" class="btn btn-warning js-update" data-id="${value._id}">修改</button>
                      <button type="button" class="btn btn-danger js-delete" data-id="${value._id}">删除</button>
                    </div>
                  </td>
                </tr>`;
            });
            this.tbodyElement.html(str);
        }
    },
    changePage(page) {
        this.page = page;
        this.getListInfo();
    }
})