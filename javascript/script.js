$(function(){
    var windowWidth = $(window).width();
    if(windowWidth>768){
        window.addEventListener("wheel", function(e){
            e.preventDefault();
        },{passive : false });
        
        var mHtml = $("html");
        var page = 1;   //섹션 번호
        
        var isDisabled = false;
        
        $(document).ready(function(){
            $('.section').eq(0).find('.bg-wrap>.wrap50>.bookMark>a').eq(0).css('display','none');
        });
        
        $('a[href="#header"]').click(function () {
            if (isDisabled) {  //<-( 1 ) 수행가능여부 검사
              return false;
            } else {
              clickEvent(1);
              isDisabled = true; //<-( 2 ) 실행 불가능하도록 flag 변경
              setTimeout(function(){
                isDisabled = false;
              },3000)
            }
        });

        $('a[href="#skills"]').click(function () {
        
            if (isDisabled) {  //<-( 1 ) 수행가능여부 검사
              return false;
            } else {
              clickEvent(2);
              isDisabled = true; //<-( 2 ) 실행 불가능하도록 flag 변경
              setTimeout(function(){
                isDisabled = false; 
              },3000)
            }
        });
        $('a[href="#work"]').click(function () {
        
            if (isDisabled) {  //<-( 1 ) 수행가능여부 검사
              return false;
            } else {
              clickEvent(3);
              isDisabled = true; //<-( 2 ) 실행 불가능하도록 flag 변경
              setTimeout(function(){
                isDisabled = false;
              },3000)
            }
        });
        $('a[href="#contact"]').click(function () {
        
            if (isDisabled) {  //<-( 1 ) 수행가능여부 검사
              return false;
            } else {
              clickEvent(4);
              isDisabled = true; //<-( 2 ) 실행 불가능하도록 flag 변경
              setTimeout(function(){
                isDisabled = false;
              },3000)
            }
        });
        
        /* 휠이벤트 */
        
        mHtml.animate({scrollTop : 0}, 2000);
        
        
        $(window).on("wheel", function(e) {
            if(mHtml.is(":animated")) return;
                    if(e.originalEvent.deltaY > 0) {
                        if(page == 4) return; // 수정이유 : introduce delete
                        page++;
                    } else if(e.originalEvent.deltaY < 0) {
                        if(page == 1) return;
                        page--;
                    }
                    
                    posTop();
                    bookMark();
                    /* section 패러독스 */
                    if(page==1){
                        page1Paral();
                    }if(page==2){                
                        page2Paral();
                    }if(page==3){
                        page3Paral();
                    }if(page==4){
                        page4Paral();
                    }/* if(page==5){        // 수정이유 : introduce delete
                        page5Paral();
                    } */
        });
        
        let bookMark=function(){
            let i=(page-1);
            $('.section').find('.bg-wrap>.wrap50>.bookMark').animate({right:'70px'},5);
            $('.section').find('.bg-wrap>.wrap50>.bookMark>a').delay(100).animate({display:'block'});
            $('.section').eq(i).find('.bg-wrap>.wrap50>.bookMark>a').eq(i).css('display','none');
            $('.section').find('.bg-wrap>.wrap50>.bookMark').delay(650).animate({right:0},650);
        }
        
        let posTop=function(){
            var posTop =(page-1) * $(window).height();
            mHtml.animate({scrollTop : posTop},1400);
        }
        
        let page1Paral = function(){
            $('div').removeClass('parall');
            $('.main-introduce').addClass('parall');
            $('.main-articles').children('.text-wrap').addClass('parall');
        }

        let page2Paral = function(){
            $('div').removeClass('parall');
            $('.frontend').addClass('parall');
            $('.version-control').addClass('parall');
            $('.communication').addClass('parall');
        }
        let page3Paral = function(){
            $('div').removeClass('parall');
            $('.work-content').addClass('parall');
            $('.clone-coding').addClass('parall');
        }

        let page4Paral = function(){
            $('div').removeClass('parall');
            $('.contact-text-wrap').addClass('parall');
        }
        
        let clickEvent=function(e){
            page=e;
            eval('page' + e + 'Paral()');
            posTop();
            bookMark();
        }
        
        /* 노트북 전원 이벤트 */
        $(function(){
            setInterval(function(){
                $('.greetings>.laptop-img').attr('src','./img/icon/notebookicon-on-removebg-preview.png');
            },600);
            
            setInterval(function(){
                $('.greetings>.laptop-img').attr('src','./img/icon/notebookicon-removebg-preview.png');
            },1000);
        });
    }
    /* 모바일 (768px~) 스크립트 */
    else{
        /* top버튼 fade in/out */
        $( window ).scroll( function() {
            if ( $( this ).scrollTop() > 500 ) {
                $( '.top-btn' ).fadeIn();
            } else {
                $( '.top-btn' ).fadeOut();
            }
        } );
        $( '.top-btn' ).click( function() {
            $( 'html, body' ).animate( { scrollTop : 0 }, 1000 );
            return false;
        } );

        /* 목록 show이벤트 */
        let list=$('#mobile #header>.list');
        let listCnt=0;
        list.on({click:function(){
            if (listCnt==0){
                list.addClass('on');
                $('#mobile>.click-menu').show(10);
                $('#mobile>.click-menu').addClass('on');
                listCnt=1;
            }else{
                list.removeClass('on');
                listCnt=0;
                $('#mobile>.click-menu').hide(10)
                $('#mobile>.click-menu').removeClass('on');
            }
        }})
    }
    /* window.onresize = function(){ document.location.reload(); }; */
})