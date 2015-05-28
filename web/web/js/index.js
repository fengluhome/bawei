var alerModal = new function () {
    var startTime = new Date();

    function modal(domId) {
        var dom = null, id = domId;
        this.getDom = function () {
            if (dom === null) {
                dom = document.getElementById(id);

            }
            return dom;
        }
    }

    modal.prototype.show = function () {
        if (event) {
            event.preventDefault();
        }
        startTime = new Date();
        if (this.getDom().style.background === "none") {
            this.getDom().style.background = "rgba(0, 0, 0, 0.6)";
        }

        var div = this.getDom().querySelector(".modal");

        if (div) {
            div.style.display = "bolck";
        }

        if (this.getDom().style.display !== "table") {
            this.getDom().style.display = "table";
        }

    }
    modal.prototype.hide = function () {
        if (event) {
            event.preventDefault();
        }
        this.getDom().style.background = "none";
        this.getDom().querySelector(".modal").style.display = "none";
        setTimeout(function (_this) {
            if (_this.getDom().style.display !== "none") {
                _this.getDom().style.display = "none";
            }
        }, 700, this);

    }
    modal.prototype.bgHide = function () {
        if (event) {
            event.preventDefault();
        }
        if (new Date() - startTime > 750) {
            console.log(event.target.tagName);
            if (event.target.tagName === "TD") {
                this.getDom().style.display = "none";
            }
        }
    }
    var shareModal = new modal("divShare");

    return {
        shareModal: shareModal
    }
};