function PersonList(container) {
    this.container = container;
    this.page = 1;
    this.size = 10;
    this.init();
}
PersonList.Temp = `
    <table class="table table-striped">
        <thead class="js-thead">
            <th>编号</th>
            <th>姓名</th>
            <th>职位名称</th>
            <th>期望薪资</th>
            <th>期望城市</th>
            <th>头像</th>
            <th>操作</th>
        </thead>
        <tbody class="js-tbody">
        </tbody>
    </table>
`;
$.extend(PersonList.prototype, {
    init() {
        this.createDom();
        this.getListInfo();
        this.createUpdatePerson();
        this.createSalaryList();
        this.bindEvents();
    },
    createSalaryList() {
        this.salaryList = new SalaryList(this.container);
    },
    createUpdatePerson() {
        this.updatePerson = new UpdatePerson(this.container);
        $(this.updatePerson).on("change", $.proxy(this.getListInfo, this))
    },
    bindEvents() {
        this.container.on("click", $.proxy(this.handleTableClick, this))
    },
    handleTableClick(e) {
        var target = $(e.target),
            isDeleteClick = target.hasClass("js-delete"),
            isUpdateClick = target.hasClass("js-update"),
            isSalaryClick = target.hasClass("js-salary-btn");
        if (isDeleteClick) {
            this.deleteItem(target.data("id"));
        }
        if (isUpdateClick) {
            this.updatePerson.showItem(target.data("id"));
        }
        if (isSalaryClick) {
            this.salaryList.showItems(target.data("salary"));
        }
    },
    deleteItem(id) {
        $.ajax({
            url: "/api/deletePerson",
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
        this.element = $(PersonList.Temp);
        this.tbodyElement = this.element.find(".js-tbody");
        this.container.append(this.element);
    },
    getListInfo() {
        $.ajax({
            type: "POST",
            url: "/api/getPersonListInfo",
            data: {
                size: this.size,
                page: this.page
            },
            success: $.proxy(this.handleGetPersonListInfo, this)
        })
    },
    handleGetPersonListInfo(res) {
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
                var filename = value.filename ? value.filename : "1515133831595Tamara Bellis  2017-04-11 03-35-52 .jpg"
                str += `
                <tr class="position-item">
                  <td>${index + 1}</td>
                  <td>${value.username}</td>
                  <td>${value.position}</td>
                  <td>${value.salary}&nbsp;&nbsp;&nbsp;&nbsp;<button class="btn btn-default js-salary-btn"  data-toggle="modal" data-target=".js-salary-modal" data-salary="${value.salary}">可选</button></td>
                  <td>${value.address}</td>
                  <td><img style="width:30px;height:30px;" alt="" class="img-circle" src="/uploads/${filename}" alt="" /></td>
                  <td>
                    <div class="btn-group" role="group" aria-label="...">
                      <button type="button" data-toggle="modal" data-target=".js-update-person-modal" class="btn btn-warning js-update" data-id="${value._id}">修改</button>
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