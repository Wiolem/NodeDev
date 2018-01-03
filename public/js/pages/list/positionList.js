function PositionList(container) {
    this.container = container;
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
$.extend(PositionList.prototype, {
    init() {
        this.createDom();
        this.getListInfo();
    },
    createDom() {
        this.element = $(PositionList.Temp);
        this.container.append(this.element);
    },
    getListInfo() {
        $.ajax({
            type: "POST",
            url: "/api/getListInfo",
            data: {
                size: 10,
                page: 1
            },
            success: $.proxy(this.handleGetListInfo, this)
        })
    },
    handleGetListInfo(res) {
        console.log(res);
    }
})