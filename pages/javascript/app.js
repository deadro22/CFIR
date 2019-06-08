$(function(){
  //chat
  //web work

  $(window).scroll(function () {
if ($(window).scrollTop() >= 50) {
$('#mn_menu').css('box-shadow','2px 2px 2px 1px #63a85a');
$('#mn_menu').css('border-bottom','5px #63a85a solid');
} else {
$('#mn_menu').css('box-shadow','');
$('#mn_menu').css('border-bottom','');
}
});

     $("#clb-nav").click(function(){
       $("#clb-nav").css("opacity","0.6");
     });
     
  var clickIndex = 0;
$("#resize-click").click(function(){
   clickIndex++;
   if(clickIndex == 1){
     $('#mn_menu').css('border-bottom','5px #63a85a solid');
     $('#mn_menu').css('box-shadow','2px 2px 2px 1px #63a85a');
   }else{
     $('#mn_menu').css('box-shadow','');
     $('#mn_menu').css('border-bottom','');
     clickIndex = 0;
   }
})

  function generateThumb(src,alt){
    var innerMContent = '<div class="carousel-item">'+
      '<div class="view">'+
        '<img class="d-block w-100" id="mainThumbImage" src='+ src +' alt='+alt+'>'
        '<div class="mask rgba-black-light"></div>'+
      '</div>'+
    '</div>'
    $("#use-gen").append(innerMContent);
  }
  function generateVideoMain(src,desc,thumb){
    var innerMContent = '<div class="col-sm-6 col-md-4">'+
        '<div class="thumbnail">'+
            src +
            '<div class="caption" style="margin-top:20px;">'+
                '<h2>'+thumb+'</h2>'+
                '<p style="font-size:20px;">'+desc+'</p>'+
            '</div>'+
        '</div>'+
    '</div>'
    $("#videoHolder").append(innerMContent);
  }
  function generateActivities(AttachId,ctext1,ctext2,lecturee,src){
         var innerMContent = '<div class="col-sm-6 col-md-4">'+
           '<div class="card" style="margin-bottom:4%;height:550px;">'+
            '<div class="card-body" style="box-shadow: 0 4px 2px -2px #63a85a;background-color:white;border-bottom:5px #63a85a solid;">'+
              '<img src='+src+' alt="" style="width:100%;box-shadow:2px 2px 3px 1px #63a85a;;border-radius:5px;margin-bottom:1%;height:350px;">'+
              '<p class="card-text" style="font-size:1.3rem;">'+ctext1+'</p>'+
              '<p class="card-text" style="font-size:1.3rem;">'+ctext2+'</p>'+
              '<p class="card-text"><small class="text-muted" style="font-size:1.3rem;">'+lecturee+'</small></p>'+
            '</div>'+
          '</div>'+
        '</div>'
        $(AttachId).append(innerMContent);
  }
  //main page image rep generation
  generateThumb("/images/1.jpg","1");
  generateThumb("/images/3.jpg","3");
  generateThumb("/images/4.jpg","4");
  generateThumb("/images/5.jpg","5");
  generateThumb("/images/6.jpg","6");
  generateThumb("/images/12.jpg","7");
  //main page video rep generation
  generateVideoMain('<div class="fb-video" id="fb_vd" data-href="https://www.facebook.com/1499129853717755/videos/662052270915064/" data-width="500" data-show-text="false"><blockquote cite="https://developers.facebook.com/1499129853717755/videos/662052270915064/" class="fb-xfbml-parse-ignore"><a href="https://developers.facebook.com/1499129853717755/videos/662052270915064/">سمعت قبل بالمضاربة ؟؟</a><p></p>Publiée par ‎<a href="https://www.facebook.com/&#x646;&#x627;&#x62f;&#x64a;-&#x627;&#x644;&#x645;&#x627;&#x644;&#x64a;&#x629;-&#x627;&#x644;&#x625;&#x633;&#x644;&#x627;&#x645;&#x64a;&#x629;-&#x628;&#x627;&#x644;&#x645;&#x639;&#x647;&#x62f;-&#x627;&#x644;&#x639;&#x627;&#x644;&#x64a;-&#x644;&#x644;&#x62f;&#x631;&#x627;&#x633;&#x627;&#x62a;-&#x627;&#x644;&#x62a;&#x643;&#x646;&#x648;&#x644;&#x648;&#x62c;&#x64a;&#x629;-&#x628;&#x631;&#x627;&#x62f;&#x633;-1499129853717755/">نادي المالية الإسلامية بالمعهد العالي للدراسات التكنولوجية برادس</a>‎ sur Jeudi 18 avril 2019</blockquote></div>',"في هذا الفيديو سنتحدث عن المضاربة: تعريفها، انواعها و اركانها و كيفتها من خلال نموذج","ماهي المضاربة");
  generateVideoMain('<div class="fb-video" id="fb_vd" data-href="https://www.facebook.com/1499129853717755/videos/340416179926003/" data-width="500" data-show-text="false"><blockquote cite="https://developers.facebook.com/1499129853717755/videos/340416179926003/" class="fb-xfbml-parse-ignore"><a href="https://developers.facebook.com/1499129853717755/videos/340416179926003/">شنيا التأمين التكافلي</a><p></p>Publiée par ‎<a href="https://www.facebook.com/&#x646;&#x627;&#x62f;&#x64a;-&#x627;&#x644;&#x645;&#x627;&#x644;&#x64a;&#x629;-&#x627;&#x644;&#x625;&#x633;&#x644;&#x627;&#x645;&#x64a;&#x629;-&#x628;&#x627;&#x644;&#x645;&#x639;&#x647;&#x62f;-&#x627;&#x644;&#x639;&#x627;&#x644;&#x64a;-&#x644;&#x644;&#x62f;&#x631;&#x627;&#x633;&#x627;&#x62a;-&#x627;&#x644;&#x62a;&#x643;&#x646;&#x648;&#x644;&#x648;&#x62c;&#x64a;&#x629;-&#x628;&#x631;&#x627;&#x62f;&#x633;-1499129853717755/">نادي المالية الإسلامية بالمعهد العالي للدراسات التكنولوجية برادس</a>‎ sur Mercredi 27 mars 2019</blockquote></div>',"في هذا الفيديو سنتحدث عن التأمين التكافلي: تعريفه، نشأته و كيفيته","ماهو التأمين التكافلي")
  generateVideoMain('<div class="fb-video" id="fb_vd" data-href="https://www.facebook.com/1499129853717755/videos/519059765241722/" data-width="500" data-show-text="false"><blockquote cite="https://developers.facebook.com/1499129853717755/videos/519059765241722/" class="fb-xfbml-parse-ignore"><a href="https://developers.facebook.com/1499129853717755/videos/519059765241722/">شنوة معناها بنك إسلامي؟</a><p></p>Publiée par ‎<a href="https://www.facebook.com/&#x646;&#x627;&#x62f;&#x64a;-&#x627;&#x644;&#x645;&#x627;&#x644;&#x64a;&#x629;-&#x627;&#x644;&#x625;&#x633;&#x644;&#x627;&#x645;&#x64a;&#x629;-&#x628;&#x627;&#x644;&#x645;&#x639;&#x647;&#x62f;-&#x627;&#x644;&#x639;&#x627;&#x644;&#x64a;-&#x644;&#x644;&#x62f;&#x631;&#x627;&#x633;&#x627;&#x62a;-&#x627;&#x644;&#x62a;&#x643;&#x646;&#x648;&#x644;&#x648;&#x62c;&#x64a;&#x629;-&#x628;&#x631;&#x627;&#x62f;&#x633;-1499129853717755/">نادي المالية الإسلامية بالمعهد العالي للدراسات التكنولوجية برادس</a>‎ sur Samedi 22 décembre 2018</blockquote></div>',"في هذا الفيديو سنتحدث عن البنك الإسلامي: تعريفه و تاريخه","ماذا يعني بنك إسلامي");
  //activities generation
  generateActivities("#prholder","الأسس العلمية للاقتصاد الاسلامي","","المحاضر الدكتور محمد النوري","/images/pr1.jpg");
  generateActivities("#prholder"," محاضرة في التنمية البشري","","المحاضر فادي حمزة","/images/pr2.jpg");
  generateActivities("#prholder","محاضرة تحت عنوان الصكوك الإسلامية","","المحاضرين محفوض الباروني ,وديع مزيد","/images/pr3.JPG");
  generateActivities("#prholder","مدخل الي المعاملات المالية الإسلامية","","المحاضر الدكتور اشرف دوابه","/images/pr4.jpg");
  generateActivities("#prholder","محاضرة حول قانون المالية لسنة 2016","","المحاضر الستاذ نبيل الكسراوي","/images/pr5.jpg");
  generateActivities("#prholder","الهندسة المالية الاسلامية :شهادات الزيتونة ","","المحاضر الدكتور عز الدين خوجة","/images/pr6.jpg");
  generateActivities("#prholder","التنمية الاقتصادية بين الاقتصاد التقليدي و الاقتصاد الاسلامي","","المحاضرون د.الحبيب غربال د.محمد النوري","/images/pr7.JPG");
  generateActivities("#prholder","محاضرة في التنمية البشرية","","المحاضر المدرب علي العليمي","/images/pr8.JPG");
  generateActivities("#prholder","التمويل الاجتماعي","","المحاضرون السيد زياد إسحاق ,أشرف بن محمد هاشم","/images/pr9.JPG");
  generateActivities("#prholder","لماذا يهتم الغرب بتدريس المالية الإسلامية","","الدكتور محمد النوري","/images/pr10.JPG");
  generateActivities("#prholder","الرقابة الشرعية في المؤسسات المالية الاسلامية",""," المحاضرون السيد محمد علي البحروني,السيد مصعب الرباحي","/images/pr11.JPG");
  generateActivities("#prholder","الترفيع في نسبة الفائدة المديرية  :الأسباب و الآثار","","الدكتور رضا شكندالي","/images/pr12.JPG");
  generateActivities("#prholder","أولمبياد الطالب المحاضر","","نادي المالية الإسلامية","/images/pr13.jpg");
  //trainings
  generateActivities("#trholder","ورشة زكاة التجارة وتطبيقاتها المحاسبية","","الجمعية التونسية لعلوم الزكاة","/images/tr1.jpg");
  generateActivities("#trholder","ورشة صناديق الإستثمار","","د.محمد صالح فراد","/images/tr2.jpg");
  generateActivities("#trholder"," ورشة عمل حول التأمين التكافلي","","عز الدين غلام الله","/images/tr3.JPG");
  generateActivities("#trholder","ورشة عمل السياسات النقدية","","نادي المالية الإسلامية","/images/tr4.jpg");

});
