
var app = {

// Application Constructor
    initialize: function () {

        $(document).ready(function () {

        });


//        var iisurl = "https://iiswebsrv.herokuapp.com/";
        var iisWebSession = "iisWebSession";
//        var custObj = 'custObj';
//        var accList = 'accList';

        var iisWebObjStr = window.localStorage.getItem(iisWebSession);
        var iisWebObj = JSON.parse(iisWebObjStr);
//        console.log(iisWebObj);
        var iisurlStr = iisWebObj.iisurlStr;
        iisurl = iisurlStr;
        
        var custObjStr = iisWebObj.custObjStr;
        if (custObjStr == null) {
            window.location.href = "index.html";
        }
        var custObj = JSON.parse(custObjStr);
        var accObjListStr = iisWebObj.accObjListStr;
        var accObjList = JSON.parse(accObjListStr);
        var accId = iisWebObj.accId;
        var accObj = null;
        for (i = 0; i < accObjList.length; i++) {
            var accObjTmp = accObjList[i];
            if (accObjTmp.id == accId) {
                accObj = accObjTmp;
                break;
            }
        }
        if (accObj == null) {
            window.location.href = "index.html";
        }

        var iisMsgSession = "iisMsgSession";
        var msgObjStr = window.localStorage.getItem(iisMsgSession);
//        msgObjStr ="This feature does not allow for GUEST account";
        if (msgObjStr !== "") {
            functionAlertConfirm(msgObjStr, function ok() {
            });
        }

        var physicalScreenWidth = window.screen.width * window.devicePixelRatio;
        var physicalScreenHeight = window.screen.height * window.devicePixelRatio;

        var stockObjListStr = iisWebObj.stockObjListStr;
        var stockObjList = JSON.parse(stockObjListStr);

        $("#accheader").html("Account " + accObj.accountname);

        var htmlhead = '<div class="ui-grid-d">';
        htmlhead += '<div class="ui-block-a" style="width:20%"><strong>Sym</strong></div>';
        htmlhead += '<div class="ui-block-b" style="text-align: center;width:20%">Sig</div>';
        htmlhead += '<div class="ui-block-c" style="text-align: center;width:20%">Trend</div>';
        htmlhead += '<div class="ui-block-d" style="text-align: center;width:20%">Daily %</div>';
        htmlhead += '<div class="ui-block-e" style="text-align: center;width:20%">NN1 %</div>';
        htmlhead += '</div>';
        htmlhead += '</div>';
        $("#myid").html('<li id="0" >' + htmlhead + '</li>');
        for (i = 0; i < stockObjList.length; i++) {
            var stockObj = stockObjList[i];
            console.log(stockObj);
//            var name = stockObj.symbol;
//            name += " TR:"+ stockObj.trsignal+" L:"+stockObj.longterm; 

//https://demos.jquerymobile.com/1.1.2/docs/content/content-grids.html
            var htmlName = '<div class="ui-grid-d">';
            var signal = "B";
            if (stockObj.trsignal == 1) {
                signal = "B";
                htmlName += '<div class="ui-block-a" style="color:green;width:20%"><strong>' + stockObj.symbol + '</strong></div>';
                htmlName += '<div class="ui-block-b" style="text-align: center;color:green;width:20%">:' + signal + '</div>';
            } else if (stockObj.trsignal == 2) {
                signal = "S";
                htmlName += '<div class="ui-block-a" style="color:red;width:20%"><strong>' + stockObj.symbol + '</strong></div>';
                htmlName += '<div class="ui-block-b" style="text-align: center;color:red;width:20%">:' + signal + '</div>';
            } else {
                signal = "E";
                htmlName += '<div class="ui-block-a" style="width:20%"><strong>' + stockObj.symbol + '</strong></div>';
                htmlName += '<div class="ui-block-b" style="text-align: center;width:20%">:' + signal + '</div>';
            }

            htmlName += '<div class="ui-block-c" style="text-align: center;width:20%">T:' + stockObj.longterm + '</div>';
            var percentSt = "";
            var perSt = "";
            var close = 0;
            var preClose = 0;
            if (stockObj.afstockInfo != null) {
                close = stockObj.afstockInfo.fclose;
                preClose = stockObj.prevClose;
                var percent = 100 * (close - preClose) / preClose;
                percentSt = percent.toFixed(1); // + '%';
                var perform = stockObj.perform;
                perSt = perform.toFixed(0); // + '%';

            }
            htmlName += '<div class="ui-block-d" style="text-align: center;width:20%">P:' + percentSt + ' </div>';
            htmlName += '<div class="ui-block-e" style="text-align: center;width:20%">:' + perSt + '</div>';
            htmlName += '</div>';

            var nameId = stockObj.id;
            $("#myid").append('<li id="' + nameId + '"><a href="#">' + htmlName + '</a></li>');
        }



        $("ul[id*=myid] li").click(function () {
//            alert($(this).html()); // gets innerHTML of clicked li
//            alert($(this).text()); // gets text contents of clicked li
            var nameId = $(this).attr('id');
            console.log(nameId);
            if (nameId == 0) {
//                alert(nameId);
                return;
            }
            var sockId = nameId;
            var stockObj = null;
            for (i = 0; i < stockObjList.length; i++) {
                var stockObjTmp = stockObjList[i];
                if (stockObjTmp.id == sockId) {
                    stockObj = stockObjTmp;
                    break;
                }
            }
            if (stockObj == null) {
                return;
            }
            if (stockObj.afstockInfo == null) {
                alert("Stock process not finished. Try again later");
                return;
            }

            var iisWebObj = {'custObjStr': custObjStr, 'iisurlStr': iisurlStr, 'accObjListStr': accObjListStr,
                'accId': accId, 'stockObjListStr': stockObjListStr, 'sockId': sockId};
            window.localStorage.setItem(iisWebSession, JSON.stringify(iisWebObj));
            window.location.href = "accountsttr_1.html";
        });


        $("#addsubmit").click(function () {
            var addsymbol = document.getElementById("addsymbol").value;
            if (addsymbol === "") {
                window.location.href = "accountst.html";
                return;
            }
            if (custObj.username.toUpperCase() === "GUEST") {
                msgObjStr = "This feature does not allow for GUEST account";
                window.localStorage.setItem(iisMsgSession, msgObjStr);
                window.location.href = "accountst.html";

//                alert("Not supproted feature for GUEST accont");
//                window.location.href = "accountst.html";
//                return;
            }
//          ("/cust/{username}/acc/{accountid}/st/add/{symbol}")
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/acc/" + accId + "/st/addsymbol?symbol=" + addsymbol,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator
            function handleResult(result) {
                //MAX_ALLOW_STOCK_ERROR = 100 ; NEW = 1; EXISTED = 2
                console.log(result);
                if (result == 1) {
                    window.location.href = "accountst_1.html";
                    return;
                }
                var msgObjStr = "Fail to add stock " + addsymbol;
                if (result == 2) {
                    msgObjStr += " : Stock alreday existed";

                }
                if (result == 100) {
                    msgObjStr += " : Max number of stock exceeded the user plan";                    
                }

                window.localStorage.setItem(iisMsgSession, msgObjStr);
                window.location.href = "accountst.html";
            }
        });



        $("#removesubmit").click(function () {
            var rsymbol = document.getElementById("removesymbol").value;
            if (rsymbol === "") {
                window.location.href = "accountst.html";
                return;
            }
            if (custObj.username.toUpperCase() === "GUEST") {
                msgObjStr = "This feature does not allow for GUEST account";
                window.localStorage.setItem(iisMsgSession, msgObjStr);
                window.location.href = "accountst.html";
//                alert("Not supproted feature for GUEST accont");
//                window.location.href = "accountst.html";
//                return;
            }
//          ("/cust/{username}/acc/{accountid}/st/remove/{symbol}")
            $.ajax({
                url: iisurl + "/cust/" + custObj.username + "/acc/" + accId + "/st/removesymbol?symbol=" + rsymbol,
                crossDomain: true,
                cache: false,
                success: handleResult
            }); // use promises

            // add cordova progress indicator https://www.npmjs.com/package/cordova-plugin-progress-indicator

            function handleResult(result) {
                console.log(result);
                if (result == 1) {
                    window.location.href = "accountst_1.html";
                    return;
                }
                var msgObjStr = "Fail to remove stock " + rsymbol;
                 //NOTEXISTED = 3;
                 if (result == 3) {
                    msgObjStr += " : Stock not found";

                }
                window.localStorage.setItem(iisMsgSession, msgObjStr);
                window.location.href = "accountst.html";
            }

        });

        function functionAlertConfirm(msg, myYes, myNo, myOk) {
            var confirmBox = $("#alertconfirm");
            confirmBox.find(".message").text(msg);
            confirmBox.find(".yes,.no,.ok").unbind().click(function () {
                confirmBox.hide();
                window.localStorage.setItem(iisMsgSession, "");
            });
            confirmBox.find(".yes").click(myYes);
            confirmBox.find(".no").click(myNo);
            confirmBox.find(".ok").click(myOk);
            confirmBox.show();
        }

// example        
//alert("AJAX request successfully completed");
//var jsonObj = JSON.parse(jsonStr);
//var jsonPretty = JSON.stringify(jsonObj, null, '\t');

    }
};
app.initialize();





