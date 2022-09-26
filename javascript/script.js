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
        
        $('a[href="#introduce"]').click(function () {
        
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
        $('a[href="#skills"]').click(function () {
        
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
        $('a[href="#work"]').click(function () {
        
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
        $('a[href="#contact"]').click(function () {
        
            if (isDisabled) {  //<-( 1 ) 수행가능여부 검사
              return false;
            } else {
              clickEvent(5);
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
                        if(page == 5) return;
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
                    }if(page==5){
                        page5Paral();
                    }
        });
        
        let bookMark=function(){
            let i=(page-1);
            /* $('.section').find('.bg-wrap>.wrap50>.bookMark>a').hover(function(){
                $(this).stop().animate({right:'-15px'},500)
            },function(){
                $(this).stop().animate({right:'0px'},500)
            }) */
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
            $('.head-body1').addClass('parall');
            $('.head-body2-left').addClass('parall');
            $('.head-body2-right').addClass('parall');
            $('.section').find('.bg-wrap>.wrap50>.bookMark').addClass('parall')
        }
        
        let page2Paral = function(){
            $('div').removeClass('parall');
            $('.ct-left').addClass('parall');
            $('.ct-right').addClass('parall');
            let titleBox=$('.content>.ct-left>.title-box');
            titleBox.find('span').animate({left:0,opacity:1},0);
            titleBox.find('span').animate({left:'100%',opacity:0},3000);
            let textTarget=$('.content>.ct-left>.title-box>h4');
            let text="I'm Lee Dong Hyun";
            let i=0;
            let typing = setInterval(function(){
                i++;
                if(i>text.length+1) {clearInterval(typing); return;}
                let h4TextSlice = text.slice(0, i);
                textTarget.text(h4TextSlice);
            },100)
        }
        let page3Paral = function(){
            $('div').removeClass('parall');
            $('.skill-title').addClass('parall');
            $('.skill-box').addClass('parall');
        }
        let page4Paral = function(){
            $('div').removeClass('parall');
            $('.work-content').addClass('parall');
            $('.clone-coding').addClass('parall');
        }
        let page5Paral = function(){
            $('div').removeClass('parall');
            $('.contact-text-wrap').addClass('parall');
        }
        
        let clickEvent=function(e){
            page=e;
            eval('page' + e + 'Paral()');
            posTop();
            bookMark();
        }
        
        $(function(){
            setInterval(function(){
                $('.head-body1-top>.img>img').attr('src','./img/icon/notebookicon-on-removebg-preview.png');
            },600);
            
            setInterval(function(){
                $('.head-body1-top>.img>img').attr('src','./img/icon/notebookicon-removebg-preview.png');
            },1000);
        });


        /* work btn event */
        let workH2 = $('#desktop #work .bg>h2');

        workH2.hover(function(){
            workH2.removeClass('on');
            $(this).addClass('on');
        });
        workH2.click(function(){
            let workTitle = $(this).attr('class');
            workH2.removeClass('on');
            $(this).addClass('on');
            
            if (workTitle == "firstWork on"){
                $('.myWork>div').removeClass('on')
                $('.ccw').addClass('on');
            }else if (workTitle == "secondWork on"){
                $('.myWork>div').removeClass('on')
                $('.jsProject').addClass('on');
            }else if (workTitle == "thirdWork on"){
                $('.myWork>div').removeClass('on')
                $('.ReactProject').addClass('on');
            }
            else{
                console.log('오류')
            }
        });

        const ccwBtnList=$('.ccw>.work-content>.slide-btn>li');
        ccwBtnList.on({click:function(){
            let i=$(this).index();
            ccwBtnList.removeClass('on')
            $(this).addClass('on')
            $('.ccw>.clone-coding>.aside').animate({opacity:0,zIndex:0});
            $('.ccw>.clone-coding>.aside').eq(i).animate({opacity:1,zIndex:9},300);
        }});

        const jsBtnList=$('.jsProject>.work-content>.slide-btn>li');
        jsBtnList.on({click:function(){
            let i=$(this).index();
            jsBtnList.removeClass('on')
            $(this).addClass('on')
            $('.jsProject>.clone-coding>.aside').animate({opacity:0,zIndex:0});
            $('.jsProject>.clone-coding>.aside').eq(i).animate({opacity:1,zIndex:9},300);
        }});

        const ReactBtnList=$('.ReactProject>.work-content>.slide-btn>li');
        ReactBtnList.on({click:function(){
            let i=$(this).index();
            ReactBtnList.removeClass('on')
            $(this).addClass('on')
            $('.ReactProject>.clone-coding>.aside').animate({opacity:0,zIndex:0});
            $('.ReactProject>.clone-coding>.aside').eq(i).animate({opacity:1,zIndex:9},300);
        }})
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
