//どうやら単位数によって重み付けがなされるらしい(？)ので対応のために情報を持っておく
var Course=function(arr){
    
    this.declaration_num=arr[0];    //申告番号
    this.name=arr[1];               //科目名
    this.teacher=arr[2];            //教員名
    //合計単位数の計算
    var creditarr=arr[3].split("-");
    this.creditnum=0;
    for(var i=0;i<creditarr.length;i++){
        this.creditnum+=Number(creditarr[i]);
    }
    this.score=Number(arr[4]);      //点数
    this.q=arr[5]                   //クォーター
    this.time=arr[6];               //修得時期
}



$(function(){
	//window.alert("hoge");
    var array=[];
    //成績の表全部について回す
    $(".tableSet01 div table").each(
        function(index,element){
            rows = element.rows;
            //列をeachで回す
            jQuery.each(rows,function(i){
                var cells=rows[i].cells;
                //はじめの行は読み飛ばす
                if(i==0) return true;
                //行をeachで回す
                var course_status=[];
                jQuery.each(cells,function(i,elem){
                    if(i!=0) course_status.push($(elem).text());
                });
                var new_course=new Course(course_status);
                array.push(new_course);
            });
            
        }
    );
    var sum=0;
    var count=0;
    var nancount=0;
    for(var i in array){
        if(Number.isNaN(array[i].score)) {
            nancount++;
            continue;
        }
        if(array[i].score<60) continue;
        count++;
        nancount++;
        sum+=array[i].score;
    }
    console.log(sum);
    console.log(count);
    console.log(array.length);
    console.log(sum/count);
    var battle_score=sum/count+count*0.2;
    var battle_score2=sum/count+nancount*0.2;
    $(".heikinTbl tbody").append("<tr>"+"<td>"+"戦闘力"+"</td>"+'<td class="tani">'+battle_score.toFixed(2)+"</td>"+"</tr>");
    $(".heikinTbl tbody").append("<tr>"+"<td>"+"戦闘力(結果未報告単位を全部取得した場合)"+"</td>"+'<td class="tani">'+battle_score2.toFixed(2)+"</td>"+"</tr>");
	
});