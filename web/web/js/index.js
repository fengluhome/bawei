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
        var txt = document.getElementById("questioning-form-txt").value || "";

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
                        tohtml(data.question);
                        alerModal.attentionModal.show();
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
                           <span class='media-object' style='background: url("+ data.imgHead + ") no-repeat; background-size: cover; '></span>\
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
            showFrom();
            window.scrollTo(0, 0);

        },
        postQuestion: postQuestion
    }
};

var comment = new function () {
    var ajaxStatus = true;
    var pageIndex = 0, scrollStatus = true;

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
                        document.getElementById("comment-form").style.display = "block";
                    } else {
                        alert("评论失败");
                    }
                    ajaxStatus = true;
                },
                error: function () {
                    ajaxStatus = true;
                    alert("评论失败");
                }

            });
        }

    }

    function srcoll() {
        document.body.onscroll = function () {
            var _this = this;
            var clientHeight = _this.innerHeight;
            if (_this.scrollY + clientHeight > (document.body.scrollHeight - 10)) {
                nextPage();
            }
        }
        nextPage();
    }

    function nextPage() {
        if (scrollStatus) {
            scrollStatus = false;
            pageIndex++;
            $.ajax({
                type: 'get',
                url: "/wap/comment",
                data: { id: userInfo.classId, page: pageIndex },
                cache: false,
                dataType: 'json',
                success: function (str) {
                    scrollStatus = true;
                    if (str) {
                        document.getElementById("comment-List").insertAdjacentHTML("beforeend", str);
                    }
                },
                error: function () {

                    scrollStatus = true;
                }

            });
        }

    }

    return {
        click: function () {
            document.getElementById("comment-footer").style.display = "none";
            setTimeout(function () {
                document.getElementById("comment-form").style.display = "block";
            }, 300);

        },
        postForm: postForm,
        srcoll: srcoll
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
    if (document.getElementById("comment-List")) {
        comment.srcoll();
    }

});