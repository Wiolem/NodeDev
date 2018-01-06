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
            <div class="form-group">
              <label for="exampleInputFile">头像</label>
              <input type="file" class="js-avatar" id="exampleInputFile">
              <img style="width:150px;height:150px;margin:8px;" src="" alt="" class="img-circle js-avatar-img">
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
        this.usernameElement = this.model.find(".js-username");
        this.positionElement = this.model.find(".js-position");
        this.salaryElement = this.model.find(".js-salary");
        this.addressElement = this.model.find(".js-address");
        this.avatarElement = this.model.find(".js-avatar");
        this.noticeSuccess = this.model.find(".js-succ-notice");
        this.noticeError = this.model.find(".js-err-notice");
        this.container.append(this.addBtn);
        this.container.append(this.model);
    },
    bindEvents() {
        var fileBtn = this.model.find(".js-avatar");
        fileBtn.on("change", $.proxy(this.handleFileChange, this));
        this.addBtn.on("click",$.proxy(this.handleAddBtnClick,this));
        this.submitBtn = this.model.find(".js-submit");
        this.submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
    },
    handleAddBtnClick(){
        this.usernameElement.val("");
        this.positionElement.val("");
        this.addressElement.val("");
        this.noticeError.addClass("hide");
    },
    handleFileChange(e) {
        var fileThum = this.model.find(".js-avatar-img");
        var file = e.target.files[0];
        var reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = function(e) {
            fileThum.attr('src', e.target.result);
        };
    },
    handleSubmitBtnClick() {
        var username = this.usernameElement.val(),
            position = this.positionElement.val(),
            salary = this.salaryElement.val(),
            address = this.addressElement.val(),
            avatar = this.avatarElement[0].files[0];
        if (!(username && position && salary && address)) {
            this.noticeError.text("对不起，你输入有误")
            this.noticeError.removeClass("hide");
        } else {
            this.noticeError.text("对不起，您所添加的求职者已存在")
            this.submitBtn.attr("disabled", "disabled");
            this.noticeError.addClass("hide");
            var formData = new FormData();
            formData.append("username", username);
            formData.append("position", position);
            formData.append("salary", salary);
            formData.append("address", address);
            formData.append("avatar", avatar);
            $.ajax({
                type: "POST",
                url: "/api/addPerson",
                cache: false,
                processData: false,
                contentType: false,
                data: formData,
                success: $.proxy(this.handleGetAddPerson, this)
            })
        }
    },
    handleGetAddPerson(res) {
        if (res && res.data && res.data.inserted) {
            this.noticeSuccess.removeClass("hide");
            setTimeout($.proxy(this.handleModelFade, this), 1500)
        } else {
            this.noticeError.removeClass("hide");
            setTimeout($.proxy(this.handleModelErrorFade, this), 1500)
        }
    },
    handleModelFade() {
        this.noticeSuccess.addClass("hide");
        this.submitBtn.attr("disabled", "");
        this.model.modal("hide");
        $(this).trigger("change");
    },
    handleModelErrorFade() {
        this.noticeError.addClass("hide");
    }
})