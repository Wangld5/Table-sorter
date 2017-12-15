function tableSort(){
    var last = -1, asc = -1;
    return function(){
        var $now_click = $(this), col_num = $now_click.parent().children().index($now_click);
        var $father = $now_click.parents("table"), $trs = $father.find("tbody").children();
        if(last!==col_num) asc = -1;
        else asc *= -1;
        filterHead($father);
        sortTable($trs, col_num, asc);
        updateTable($now_click, $trs, $father, asc);
        last = col_num;
    }
}
function filterHead($father){
    var trsExceptHead = $father.find("tbody").children();
    trsExceptHead.remove();
}
function sortTable($trs, col_num, asc){
    Array.prototype.sort.call($trs, function(first, second){
        var first = $(first).children().eq(col_num).text();
        var second = $(second).children().eq(col_num).text();
        if(first>second){
            return -asc;
        }
        else if(first<second){
            return asc;
        }
        else{
            return 0;
        }
    });
}
function updateTable(now, trs, father, asc){
    trs.removeClass("alternate").filter(":odd").addClass("alternate");
    father.append(trs).find(".active").removeClass("active").find(".caret").removeClass("ascend descend");
    now.addClass("active").find(".caret").addClass(asc === -1? "ascend": "descend");
}
$(function(){
    $("th").click(tableSort());
    if($("th").find(".caret").length == 0){
        $("th").append("<span class = caret></span>");
    }
})
