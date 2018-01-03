function PositionList(container) {
    this.container = container;
    this.page = 1;
    this.size = 100;
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
            <th>操作</th>
        </thead>
        <tbody class="js-tbody">
        </tbody>
    </table>
`;
PositionList.ItemTemp = `
    <tr>
      <td class="js-id"></td>
      <td class="js-company"></td>
      <td class="js-position"></td>
      <td class="js-salary"></td>
      <td class="js-address"></td>
      <td>
        <button type="button" class="btn btn-danger">
            删除
        </button>
      </td>
    </tr>
`;
$.extend(PositionList.prototype, {
    init() {
        this.createDom();
        this.getListInfo();
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
        if (res.data.list) {
            res.data.list.forEach(function(value,index){
                this.itemElement = $(PositionList.ItemTemp);
                this.tbodyElement.append(this.itemElement);
                this.itemElement.find(".js-id").text(value._id);
                this.itemElement.find(".js-company").text(value.company);
                this.itemElement.find(".js-position").text(value.position);
                this.itemElement.find(".js-salary").text(value.salary);
                this.itemElement.find(".js-address").text(value.address);
            }.bind(this))
        }
    }
})