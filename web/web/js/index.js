var client = {
    isIos: (function () {
        return navigator.userAgent.indexOf('iPhone') > -1;
    }())
};

String.prototype.Trim = function () {
    var whitespace = ' \n\r\t\f\x0b\xa0\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200a\u200b\u2028\u2029\u3000', str = this;
    for (var i = 0; i < str.length; i++) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(i);
            break;
        }
    }
    for (i = str.length - 1; i >= 0; i--) {
        if (whitespace.indexOf(str.charAt(i)) === -1) {
            str = str.substring(0, i + 1);
            break;
        }
    }
    return whitespace.indexOf(str.charAt(0)) === -1 ? str : '';
};
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
            this.getDom().style.background = "rgba(0, 0, 0, 0.8)";
        }

        var div = this.getDom().querySelector(".modal");

        if (div) {
            div.style.display = "block";
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

    var attentionModal = new modal("querstioning-alert");

    return {
        shareModal: shareModal,
        attentionModal: attentionModal
    }
};
var questioning = new function () {
    function showFrom() {
        document.getElementById("questioning-form").style.display = "block";
    }
    var ajaxStatus = true;
    function postQuestion() {
        var dom = document.getElementById("questioning-form-txt");
        var txt = dom.value || "";
        dom.blur();
        if (txt.Trim() === "") {
            alert("请输入提问内容");
            return;
        }
        if (ajaxStatus) {
            ajaxStatus = false;
            $.ajax({
                type: 'post',
                url: "/wap/create",
                data: { type: "Q", content: txt, uid: userInfo.uid },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data.result) {
                        console.log("提问成功！");
                        var txtdom = document.getElementById("questioning-form-txt");
                        txtdom.value = "";
                        txtdom.blur();
                        alerModal.attentionModal.show();
                        tohtml(data.question);
                    } else {
                        alert("提问失败");
                    }
                    ajaxStatus = true;

                },
                error: function () {
                    alerModal.attentionModal.show();
                    ajaxStatus = true;
                }
            });
        }
    }

    function tohtml(data) {
        //data = {
        //    imgHead: "/images/head.png",
        //    name: "张三",
        //    time: "2015/5/22 14:20",
        //    content: "如何理财？"
        //}
        var str =
        " <div class='content'>\
               <div class='media'>\
                   <div class='media-left'>\
                       <a href='#'>\
                           <span class='media-object' style='background: url("+ data.imgHead + ") no-repeat; background-size: contain;; '></span>\
                       </a>\
                   </div>\
                   <div class='media-body'>\
                       <div class='media-heading'>"+ data.name + "<span class='time'>" + data.time + "</span></div>\
                       <p><span class='begin'>问：</span>"+ data.content + "</p>\
                   </div>\
               </div>\
        </div>";

        document.getElementById("questioning-List").insertAdjacentHTML("afterBegin", str);
    }
    return {
        questioningClick: function (btn) {
            document.getElementById("questioning-footer").style.display = "none";
            document.getElementById("querstion-desccrion").style.display = "none";
            showFrom();
            window.scrollTo(0, 0);
            // querstion-desccrion

            document.getElementById("question-btngrop").style.marginBottom = "35px";
        },
        postQuestion: postQuestion,
        blur: function (dom) {
            window.scroll(0, 0);
            if (client.isIos) {

            } else {
                document.querySelector(".topdiv").style.position = "fixed";
            }

        },
        foucs: function () {
            if (client.isIos) {
            } else {
                document.querySelector(".topdiv").style.position = "absolute";
            }
        }
    }
};

var comment = new function () {
    var ajaxStatus = true;
    var pageIndex = 0, scrollStatus = true;
    var txtheight = 40;
    function postForm() {
        var txt = document.getElementById("comment-txt").value || "";
        if (txt.Trim() === "") {
            alert("请输入评论内容！");
            return;
        }
        if (ajaxStatus) {
            ajaxStatus = false;
            $.ajax({
                type: 'post',
                url: "/wap/create",
                data: { type: "C", content: txt, uid: userInfo.uid },
                cache: false,
                dataType: 'json',
                success: function (data) {
                    if (data) {
                        console.log("评论成功！");

                        var dom = document.getElementById("comment-txt");
                        dom.value = "";
                        toHtml(data.comment);


                    } else {
                        alert("评论失败");
                    }
                    ajaxStatus = true;
                },
                error: function () {
                    ajaxStatus = true;
                    alert("评论失败");
                    var dom = document.getElementById("comment-txt");
                    dom.value = "";
                    toHtml(data.comment);
                }

            });
        }

    }

    function toHtml(data) {

        var str = "<div class='item'>\
                <table>\
                    <tr>\
                        <td style=' width: 72px;'>\
                            <span class='media-object' style='background: url("+ data.imgHead + ") no-repeat; background-size: contain;; '></span>\
                        </td>\
                        <td>\
                            <div>"+ data.name + "</div>\
                            <div class='time'>"+ data.time + "</div>\
                        </td>\
                    </tr>\
                    <tr>\
                        <td colspan='2'>\
                            <div class='txt'>"+ data.content + "</div>\
                        </td>\
                    </tr>\
                </table>\
            </div>";

        document.getElementById("comment-List").insertAdjacentHTML("afterBegin", str);
    }

    var divHeight = null;

    return {
        click: function () {
            document.getElementById("comment-footer").style.display = "none";
            setTimeout(function () {
                document.getElementById("comment-form").style.display = "block";
            }, 300);

        },
        postForm: postForm,
        txtkeyUp: function (dom) {
            var form = document.getElementById("comment-form");
            if (divHeight === null) {
                divHeight = form.offsetHeight;
            }
            if (dom.scrollTop > 0) {
                dom.style.height = dom.offsetHeight + 15 + "px";

                form.style.height = form.style.offsetHeight + 15 + "px";
            }

            form.style.bottom = "0px";


        }

    }

};
var userpage = new function () {
    function selectItem(item) {
        item.classList.add("on");
    }

    return {
        selectItem: selectItem
    }
};
window.addEventListener("load", function () {


});