function AddPosition(container) {
    this.container = container;
    this.init();
}
AddPosition.BtnTemp =
    `<button type="button" class="btn btn-info js-add-btn"  data-toggle='modal' data-target='.js-addpos-modal' style="margin-bottom:20px;">
        添加职位
    </button>`;
AddPosition.ModelTemp = `
    <div class="modal fade js-addpos-modal" role="dialog" aria-labelledby="AddPositionLabel">
      <div class="modal-dialog" role="document">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
            <h4 class="modal-title" id="AddPositionLabel">新增职位</h4>
          </div>
          <div class="modal-body">
            <div class="form-group">
              <label for="addpos-company">公司名称</label>
              <input type="text" class="form-control js-company" id="addpos-company" placeholder="请输入公司名">
            </div>
            <div class="form-group">
              <label for="addpos-position">职位名称</label>
              <input type="text" class="form-control js-position" id="addpos-position" placeholder="请输入职位名称">
            </div>
            <div class="form-group">
              <label for="addpos-salary">薪资范围</label>
              <input type="text" class="form-control js-salary" id="addpos-salary" placeholder="请输入薪资范围">
            </div>
            <div class="form-group">
              <label for="addpos-address">办公地点</label>
              <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-primary js-submit">提交</button>
          </div>
          <div class="alert alert-success hide js-succ-notice" role="alert" style="margin:20px;">
            添加成功
          </div>
          <div class="alert alert-danger hide js-err-notice" role="alert" style="margin:20px;">
            对不起，您所添加的职位已存在
          </div>
        </div>
      </div>
    </div>
`
$.extend(AddPosition.prototype, {
    init() {
        this.createDom();
        this.bindEvents();
    },
    createDom() {
        this.addBtn = $(AddPosition.BtnTemp);
        this.model = $(AddPosition.ModelTemp);
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
        var company = this.model.find(".js-company").val(),
            position = this.model.find(".js-position").val(),
            salary = this.model.find(".js-salary").val(),
            address = this.model.find(".js-address").val();
        console.log(company, position, salary, address);
        $.ajax({
            type: "post",
            url: "/api/addPosition",
            data: {
                company: company,
                position: position,
                salary: salary,
                address: address
            },
            success: $.proxy(this.handleGetAddPositon, this)
        })
    },
    handleGetAddPositon(res) {
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
    },
    handleModelErrorFade() {
        this.noticeError.addClass("hide");
    }
})