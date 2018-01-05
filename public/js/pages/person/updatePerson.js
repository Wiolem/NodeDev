function UpdatePerson(container) {
    this.container = container;
    this.init();
}
UpdatePerson.ModelTemp = `
    <div class="modal fade js-update-person-modal" role="dialog" aria-labelledby="UpdatePersonLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="UpdatePersonLabel">修改求职者信息</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="update-person-username">姓名</label>
              <input type="text" class="form-control js-username" id="update-person-username" placeholder="请输入姓名">
            </div>
            <div class="form-group">
              <label for="update-person-position">职位名称</label>
              <input type="text" class="form-control js-position" id="update-person-position" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
              <label for="update-person-salary">期望薪资</label>
              <select class="form-control js-salary" id="update-person-salary">
                <option>5k-8k</option>
                <option>8k-15k</option>
                <option>15k-20k</option>
                <option>20k-25k</option>
                <option>25k-35k</option>
                <option>35k+</option>
              </select>
            </div>
            <div class="form-group">
              <label for="update-person-address">期望地点</label>
              <input type="text" class="form-control js-address" id="update-person-address" placeholder="请输入办公地点">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary js-submit">提交</button>
          </div>
          <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
            修改成功
          </div>
          <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
            对不起，您所修改求职者信息失败
          </div>
        </div>
      </div>
    </div>
`
$.extend(UpdatePerson.prototype, {
    init() {
        this.createDom();
        this.bindEvents();
    },
    createDom() {
        this.element = $(UpdatePerson.ModelTemp);
        this.noticeSuccess = this.element.find(".js-succ-notice");
        this.usernameElement = this.element.find(".js-username");
        this.positionElement = this.element.find(".js-position");
        this.salaryElement = this.element.find(".js-salary");
        this.addressElement = this.element.find(".js-address");
        this.container.append(this.element);
    },
    showItem(id) {
        $.ajax({
            url:"/api/getPerson",
            data:{
                id:id
            },
            success:$.proxy(this.handleGetPersonSuccess,this)
        })
    },
    handleGetPersonSuccess(res){
        if (res && res.data && res.data.info) {
            var item = res.data.info;
            this.usernameElement.val(item.username);
            this.positionElement.val(item.position);
            this.salaryElement.val(item.salary);
            this.addressElement.val(item.address);
            this.id = item._id;
        }
    },
    bindEvents() {
        var submitBtn = this.element.find(".js-submit");
        submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
    },
    handleSubmitBtnClick() {
        var username = this.usernameElement.val(),
            position = this.positionElement.val(),
            salary = this.salaryElement.val(),
            address = this.addressElement.val();
        $.ajax({
            type: "post",
            url: "/api/updatePerson",
            data: {
                username: username,
                position: position,
                salary: salary,
                address: address,
                id:this.id
            },
            success: $.proxy(this.handleGetUpdatePerson, this)
        })
    },
    handleGetUpdatePerson(res) {
        if (res && res.data && res.data.update) {
            this.noticeSuccess.removeClass("hide");
            setTimeout($.proxy(this.handleModelFade, this), 3000)
        } else {
            this.noticeError.removeClass("hide");
            setTimeout($.proxy(this.handleModelErrorFade, this), 3000)
        }
    },
    handleModelFade() {
        this.noticeSuccess.addClass("hide");
        this.element.modal("hide");
        $(this).trigger("change");
    },
    handleModelErrorFade() {
        this.noticeError.addClass("hide");
    }
})