function Login(container, modelContainer) {
    this.container = container;
    this.modelContainer = modelContainer;
    this.init();
}
Login.btnTemp = `
  <li>
    <a href='javascript:;' data-toggle='modal' data-target='.js-login-modal'>
      登陆
    </a>
  </li>`;
Login.modelTemp = `
  <div class="modal fade js-login-modal" role="dialog" aria-labelledby="LoginLabel">
    <div class="modal-dialog" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
          <h4 class="modal-title" id="LoginLabel">登陆</h4>
        </div>
        <div class="modal-body">
          <form>
            <div class="form-group">
              <label for="username">用户名</label>
              <input type="email" class="form-control js-user" id="username" placeholder="请输入用户名">
            </div>
            <div class="form-group">
              <label for="password">密码</label>
              <input type="password" class="form-control js-pwd" id="password" placeholder="请输入密码">
            </div>
          </form>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-primary js-submit">提交</button>
        </div>
        <div class="alert alert-success hide js-notice-success" role="alert" style="margin:0 20px 20px 20px;">
          恭喜您，登陆成功
        </div>
        <div class="alert alert-warning hide js-notice-error" role="alert" style="margin:0 20px 20px 20px;">
          对不起，用户名不存在
          <a href="javascript:;" class="alert-link" style="float:right;">去注册？</a>
        </div>
      </div>
    </div>
  </div>
`;
$.extend(Login.prototype, {
    init() {
        this.createBtn();
        this.createModel();
        this.bindEvent();
    },
    createBtn() {
        this.btn = $(Login.btnTemp);
        this.container.append(this.btn);
    },
    createModel() {
        this.model = $(Login.modelTemp);
        this.successNotice = this.model.find(".js-notice-success");
        this.errorNotice = this.model.find(".js-notice-error");
        this.modelContainer.append(this.model);
    },
    bindEvent() {
        var submitBtn = this.model.find(".js-submit");
        submitBtn.on("click", $.proxy(this.handleSubmitBtnClick, this));
    },
    handleSubmitBtnClick() {
        var username = this.model.find(".js-user").val(),
            password = this.model.find(".js-pwd").val();
        $.ajax({
            type: "POST",
            url: "/api/login",
            data: {
                username: username,
                password: password
            },
            success: $.proxy(this.handleLoginSuccess, this)
        })
    },
    handleLoginSuccess(res) {
        if (res && res.data && res.data.login) {
            this.successNotice.removeClass("hide");
            setTimeout($.proxy(this.handleModelFade, this), 3000)
        } else {
            this.errorNotice.removeClass("hide");
            setTimeout($.proxy(this.handleErrorFade, this), 3000)
        }
    },
    handleModelFade() {
        window.location.reload();
    },
    handleErrorFade() {
        this.errorNotice.addClass("hide");
    }
})