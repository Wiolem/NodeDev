function Logout(container) {
    this.container = container;
    this.init()
}
Logout.Temp = `
    <li>
        <a href='javascript:;'>注销</a>
    </li>`;
$.extend(Logout.prototype, {
    init() {
        this.createBtn();
        this.bindEvent();
    },
    createBtn() {
        this.element = $(Logout.Temp);
        this.container.append(this.element);
    },
    bindEvent() {
        this.element.on("click", $.proxy(this.handleLogoutClick, this));
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