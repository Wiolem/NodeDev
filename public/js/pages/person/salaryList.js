function SalaryList(container) {
    this.container = container;
    this.init();
}
SalaryList.Temp = `
<div class="modal fade js-salary-modal" tabindex="-1" role="dialog" aria-labelledby="SalaryLabel">
  <div class="modal-dialog" role="document">
    <div class="modal-content">
      <div class="modal-header">
        <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
        <h4 class="modal-title" id="SalaryLabel">薪资可选公司</h4>
      </div>
      <div class="modal-body">
        <table class="table table-striped">
          <thead class="js-thead">
              <th>编号</th>
              <th>公司名称</th>
              <th>职位名称</th>
              <th>薪资</th>
              <th>办公地点</th>
              <th>LOGO</th>
          </thead>
          <tbody class="js-tbody">
          </tbody>
        </table>
      </div>
      <div class="modal-footer">
        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
      </div>
    </div>
  </div>
</div>
`
$.extend(SalaryList.prototype, {
    init() {
        this.createDom();
    },
    createDom() {
        this.element = $(SalaryList.Temp);
        this.tbodyElement = this.element.find(".js-tbody");
        this.container.append(this.element);
    },
    showItems(salary,position) {
        $.ajax({
            url:"/api/getPositionListBySalary",
            data:{
                salary:salary,
                position:position
            },
            success: $.proxy(this.handleGetSalaryList,this)
        })
    },
    handleGetSalaryList(res){
        var items = res.data.list;
        this.createItems(items);
    },
    createItems(items){
        if (items) {
            var str = "";
            if (items) {
                var filename = items.filename ? items.filename :"1515130457220preview.png";
                items.forEach(function(value, index) {
                    str += `
                    <tr class="position-item">
                      <td>${index + 1}</td>
                      <td>${value.company}</td>
                      <td>${value.position}</td>
                      <td>${value.salary}</td>
                      <td>${value.address}</td>
                      <td><img style="width:30px;height:30px;" alt="" class="img-rounded" src="/uploads/${filename}" alt="" /></td>
                    </tr>`;
                });
                this.tbodyElement.html(str);
            }
        }
    }
})