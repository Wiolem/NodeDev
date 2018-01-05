function AddPerson(container) {
    this.container = container;
    this.init();
}
AddPerson.BtnTemp =
    `<button type="button" class="btn btn-info js-add-btn" data-toggle='modal' data-target='.js-add-person-modal' style="margin-bottom:20px;">
        添加求职者
    </button>`;
AddPerson.ModelTemp = `
    <div class="modal fade js-add-person-modal" role="dialog" aria-labelledby="AddPersonLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="AddPersonLabel">新增求职者</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="add-person-username">姓名</label>
              <input type="text" class="form-control js-username" id="add-person-username" placeholder="请输入姓名">
            </div>
            <div class="form-group">
              <label for="add-person-position">职位名称</label>
              <input type="text" class="form-control js-position" id="add-person-position" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
              <label for="add-person-salary">期望薪资</label>
              <select class="form-control js-salary" id="add-person-salary">
                <option>5k-8k</option>
                <option>8k-15k</option>
                <option>15k-20k</option>
                <option>20k-25k</option>
                <option>25k-35k</option>
                <option>35k+</option>
              </select>
            </div>
            <div class="form-group">
              <label for="add-person-address">期望办公地点</label>
              <input type="text" class="form-control js-address" id="add-person-address" placeholder="请输入办公地点">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary js-submit">提交</button>
          </div>
          <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
            添加成功
          </div>
          <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
            对不起，您所添加的求职者已存在
          </div>
        </div>
      </div>
    </div>
`
$.extend(AddPerson.prototype, {
    init() {
        this.createDom();
        this.bindEvents();
    },
    createDom() {
        this.addBtn = $(AddPerson.BtnTemp);
        this.model = $(AddPerson.ModelTemp);
        this.noticeSuccess = this.model.find(".js-succ-notice");
        this.noticeError = this.model.find(".js-err-notice");
        this.container.append(this.addBtn);
        this.container.append(this.model);
    },
    bindEvents() {
        var submitBtn = this.model.find(".js-submit");
        submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
    },
    handleSubmitBtnClick() {
        var username = this.model.find(".js-username").val(),
            position = this.model.find(".js-position").val(),
            salary = this.model.find(".js-salary").val(),
            address = this.model.find(".js-address").val();
        console.log(username, position, salary, address);
        $.ajax({
            type: "post",
            url: "/api/addPerson",
            data: {
                username: username,
                position: position,
                salary: salary,
                address: address
            },
            success: $.proxy(this.handleGetAddPerson, this)
        })
    },
    handleGetAddPerson(res) {
        if (res && res.data && res.data.inserted) {
            this.noticeSuccess.removeClass("hide");
            setTimeout($.proxy(this.handleModelFade, this), 3000)
        } else {
            this.noticeError.removeClass("hide");
            setTimeout($.proxy(this.handleModelErrorFade, this), 3000)
        }
    },
    handleModelFade() {
        this.noticeSuccess.addClass("hide");
        this.model.modal("hide");
        $(this).trigger("change");
    },
    handleModelErrorFade() {
        this.noticeError.addClass("hide");
    }
})