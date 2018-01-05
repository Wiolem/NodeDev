function AddPosition(container) {
    this.container = container;
    this.init();
}
AddPosition.BtnTemp =
    `<button type="button" class="btn btn-info js-add-btn" data-toggle='modal' data-target='.js-addpos-modal' style="margin-bottom:20px;">
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
              <select class="form-control js-salary" id="addpos-salary">
                <option>5k-8k</option>
                <option>8k-15k</option>
                <option>15k-20k</option>
                <option>20k-25k</option>
                <option>25k-35k</option>
                <option>35k+</option>
              </select>
            </div>
            <div class="form-group">
              <label for="addpos-address">办公地点</label>
              <input type="text" class="form-control js-address" id="addpos-address" placeholder="请输入办公地点">
            </div>
            <div class="form-group">
              <label for="exampleInputFile">公司LOGO</label>
              <input type="file" class="js-logo" id="exampleInputFile">
              <img style="width:150px;height:150px;margin:8px;" src="" alt="" class="img-thumbnail js-logo-img">
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
        var fileBtn = this.model.find(".js-logo");
        fileBtn.on("change", $.proxy(this.handleFileChange, this))
        var submitBtn = this.model.find(".js-submit");
        submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
    },
    handleFileChange(e) {
        var fileThum = this.model.find(".js-logo-img");
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            fileThum.attr('src', e.target.result);
        };
    },
    handleSubmitBtnClick() {
        var company = this.model.find(".js-company").val(),
            position = this.model.find(".js-position").val(),
            salary = this.model.find(".js-salary").val(),
            address = this.model.find(".js-address").val(),
            logo = this.model.find(".js-logo")[0].files[0];

        var formData = new FormData();
        formData.append("company", company);
        formData.append("position", position);
        formData.append("salary", salary);
        formData.append("address", address);
        formData.append("logo", logo);

        $.ajax({
            type: "POST",
            url: "/api/addPosition",
            cache: false,
            processData: false,
            contentType: false,
            data: formData,
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
        $(this).trigger("change");
    },
    handleModelErrorFade() {
        this.noticeError.addClass("hide");
    }
})