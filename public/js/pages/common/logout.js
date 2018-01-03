function Logout(container,username) {
    this.container = container;
    this.username = username;
    this.init()
}
Logout.Temp = `
<li class="dropdown">
    <a href="#" class="dropdown-toggle js-username" data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false">
        <i style="font-style:normal;"></i>
        <span class="caret">
        </span>
    </a>
    <ul class="dropdown-menu">
        <li class="js-logout-btn"><a href="#">注销</a></li>
    </ul>
</li>
`;
$.extend(Logout.prototype, {
    init() {
        this.createBtn();
        this.bindEvent();
    },
    createBtn() {
        this.element = $(Logout.Temp);
        this.usernameInfo = this.element.find(".js-username i");
        this.usernameInfo.text(this.username);
        this.logoutBnt = this.element.find(".js-logout-btn");
        this.container.append(this.element);
    },
    bindEvent() {
        this.logoutBnt.on("click", $.proxy(this.handleLogoutClick, this));
    },
    handleLogoutClick() {
        $.ajax({
            url: "/api/logout",
            success: $.proxy(this.handleLogoutSuccess, this)
        })
    },
    handleLogoutSuccess(res) {
        if (res && res.data && res.data.logout) {
            window.location.reload();
        }
    }
})