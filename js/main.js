(() => {

    const hamburgerBtn = document.querySelector('.hamburger-btn'),
    navMenu = document.querySelector('.nav-menu'),
    closeNavBtn = navMenu.querySelector('.close-nav-menu');

    hamburgerBtn.addEventListener('click', showNavMenu);
    closeNavBtn.addEventListener('click', hideNavMenu);
    function showNavMenu(){
        navMenu.classList.add('open');
        bodyScrollingToggle();
    }
    function hideNavMenu(){
        navMenu.classList.remove('open');
        fadeOutEffect();
        bodyScrollingToggle();
    }
    function fadeOutEffect(){
        document.querySelector('.fade-out-effect').classList.add('active');
        setTimeout(() => {
            document.querySelector('.fade-out-effect').classList.remove('active');
        },300)
    }

    document.addEventListener('click', (event) => {
        if(event.target.classList.contains('link-item')){
            if(event.target.hash !==''){
                event.preventDefault();
                const hash = event.target.hash;
                


                document.querySelector('.section.active').classList.add('hide');
                document.querySelector('.section.active').classList.remove('active');
                document.querySelector(hash).classList.add('active');
                document.querySelector(hash).classList.remove('hide');

                navMenu.querySelector('.active').classList.add('outer-shadow', 'hover-in-shadow');
                navMenu.querySelector('.active').classList.remove('active', 'inner-shadow');

                if(navMenu.classList.contains('open')){
                    event.target.classList.add('active', 'inner-shadow');
                    event.target.classList.remove('outer-shadow', 'hover-in-shadow');
                    hideNavMenu();
                    console.log('clicked "link-item is contained within the navigation menu"')
                }
                else{
                    let navItems = navMenu.querySelectorAll('.link-item');
                    navItems.forEach((item) => {
                        if (hash === item.hash){
                            item.classList.add('active', 'inner-shadow');
                            item.classList.remove('outer-shadow', 'hover-in-shadow');
                        }
                    })

                    fadeOutEffect();
                }
                window.location.hash = hash;
            }
        }
    })

    
    
})();


// const btn = document.querySelector('.tab-item');
// const skills = document.querySelector('.tab-content');
// btn.addEventListener('click', () => {
//     skills.classList.toggle('active')
// });

    function bodyScrollingToggle() {
        document.body.classList.toggle('hidden-scrolling');
    }

(() => {

    const filterContainer = document.querySelector('.portfolio-filter'),
    portfolioItemsContainer = document.querySelector('.portfolio-items'),
    portfolioItems = document.querySelectorAll('.portfolio-item'),
    popup = document.querySelector('.portfolio-popup'),
    prevBtn = popup.querySelector('.pp-prev'),
    nextBtn = popup.querySelector('.pp-next'),
    closeBtn = popup.querySelector('.pp-close'),
    projectDetailsContainer = popup.querySelector('.pp-details'),
    projectDetailsBtn = popup.querySelector('.pp-project-details-btn');
    let itemIndex, slideIndex, screenshots;


    filterContainer.addEventListener('click', (event) => {
        if(event.target.classList.contains('filter-item') &&
        !event.target.classList.contains('active')){
        
        filterContainer.querySelector('.active').classList.remove('outer-shadow', 'active');

        event.target.classList.add('active', 'outer-shadow');
        const target = event.target.getAttribute('data-target');
        portfolioItems.forEach((item) => {
            if(target === item.getAttribute('data-category')|| target === 'all'){
                item.classList.remove('hide');
                item.classList.add('show');
            }
            else{
                item.classList.remove('show');
                item.classList.add('hide');
            }
        })
        }
    })
    portfolioItemsContainer.addEventListener('click', (event) =>{
        if(event.target.closest('.portfolio-item-inner')){
            const portfolioItem = event.target.closest('.portfolio-item-inner').
                parentElement;
            

            itemIndex = Array.from(portfolioItem.parentElement.children).indexOf(portfolioItem);
            screenshots = portfolioItems [itemIndex].querySelector('.portfolio-item-img img').
            getAttribute('data-screenshots');
            console.log(screenshots);

            screenshots = screenshots.split(',');
            if(screenshots.length === 1){
                prevBtn.style.display = 'none';
                nextBtn.style.display = 'none';
            }
            else{
                prevBtn.style.display = 'block';
                nextBtn.style.display = 'block';
            }
            slideIndex = 0;
            popupToggle();
            popupSlideshow();
            popupDetails();
        }
    })

    closeBtn.addEventListener('click', () => {
        popupToggle();
        if(projectDetailsContainer.classList.contains('active')){
            popupDetailsToggle();
        }
    })

    function popupToggle() {
        popup.classList.toggle('open');
        bodyScrollingToggle();
    }

    function popupSlideshow(){
        const imgSrc = screenshots[slideIndex];
        const popupImg = popup.querySelector('.pp-img');
        popup.querySelector('.pp-loader').classList.add('active');
        popupImg.src = imgSrc;
        popupImg.onLoad = () => {
            
            popup.querySelector('.pp-loader').classList.remove('active');
        }
        popup.querySelector('.pp-counter').innerHTML = (slideIndex+1) + "of" + screenshots.length;
    }

    nextBtn.addEventListener('click', () => {
        if(slideIndex === screenshots.length-1){
            slideIndex = 0;
        }
        else{
            slideIndex++;
        }
        popupSlideshow();
        
    })
    prevBtn.addEventListener('click', () => {
        if(slideIndex === 0){
            slideIndex = screenshots.length-1
        }
        else{
            slideIndex--;
        }
        popupSlideshow();
        
    })

    function popupDetails(){

        if(!portfolioItems[itemIndex].querySelector('.portfolio-item-details')){
            projectDetailsBtn.style.display='none';
            return;
        }
        projectDetailsBtn.style.display='block';

        const details = portfolioItems[itemIndex].querySelector('.portfolio-item-details').innerHTML;
        popup.querySelector('.pp-project-details').innerHTML = details;
        const title= portfolioItems[itemIndex].querySelector('.portfolio-item-title').innerHTML;
        popup.querySelector('.pp-title h2').innerHTML = title;
        const category = portfolioItems [itemIndex].getAttribute('data-category');
        popup.querySelector('.pp-project-category').innerHTML = category.split('-').join(' ');

    }

    projectDetailsBtn.addEventListener('click', () => {
        popupDetailsToggle();
    })

    function popupDetailsToggle(){
        if(projectDetailsContainer.classList.contains('active')){
            projectDetailsBtn.querySelector('i').classList.remove('fa-minus');
            projectDetailsBtn.querySelector('i').classList.add('fa-plus');
            projectDetailsContainer.classList.remove('active');
            projectDetailsContainer.style.maxHeight = 0 + 'px'
            
        }
        else{
            projectDetailsBtn.querySelector('i').classList.remove('fa-plus');
            projectDetailsBtn.querySelector('i').classList.add('fa-minus');
            projectDetailsContainer.classList.add('active');
            projectDetailsContainer.style.maxHeight = projectDetailsContainer.scrollHeight + 'px';
            popup.scrollTo(0,projectDetailsContainer.offsetTop);
        }
    }

})();

(() => {

    const sections = document.querySelectorAll('.section');
    sections.forEach((section) =>{
        if(!section.classList.contains('active')){
            section.classList.add('hide');
        }
    })

})();


window.addEventListener('load', () => {
    document.querySelector('.preloader').classList.add('fade-out');
    setTimeout(() => {
        document.querySelector('.preloader').style.display='none';
    },600)
})

// document.addEventListener('DOMContentLoaded', function(){
//     const form = document.getElementById('form');
//     form.addEventListener('submit', formSend);

//     async function formSend(e){
//         e.preventDefault();

//         let error = formValidate(form);

//         let formData = new FormData(form);
//         if(error === 0){
//             form.classList.add('_sending');

//             let response = await fetch('sendmail.php', {
//                 method: 'POST',
//                 body: formData
//             });
//             if(response.ok){
//                 let result = await response.json();
//                 alert(result.message);
//                 form.reset();
//             }else{
//                 alert("помилка")
//             }
//         }
//     }


//     function formValidate(form){
//         let error = 0;
//         let formReq = document.querySelectorAll('._req');

//         for (let index = 0; index < formReq.length; index++){
//             const input = formReq[index];
//             formRemoveError(input);

//             if(input.classList.contains('_email')){
//                 if(emailTest(input)){
//                     formAddError(input);
//                     error++;
//                 }
//             }else{
//                 if(input.value=== ''){
//                     formAddError(input);
//                     error++;
//                 }
//             }   
//         }
//     }

//     function formAddError(input){
//         input.parentElement.classList.add('_error');
//         input.classList.add('_error');
//     }
//     function formRemoveError(input){
//         input.parentElement.classList.remove('_error');
//         input.classList.remove('_error');
//     }
//     function emailTest(input){
//         return !/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,8})+$/.test(input.value);
//     }
// });

$(document).ready(function() {

	//E-mail Ajax Send
	$("form").submit(function() { //Change
		var th = $(this);
		$.ajax({
			type: "POST",
			url: "mail.php", //Change
			data: th.serialize()
		}).done(function() {
			alert("Thank you!");
			setTimeout(function() {
				// Done Functions
				th.trigger("reset");
			}, 1000);
		});
		return false;
	});

});

$('#ukrain').on('click', () => {
    if($('#ukrain').hasClass('active1')){
        return
    }else{
        $('#ukrain').toggleClass('active1');
        $('#english').removeClass('active1');
    }
   
});

$('#english').on('click', () => {
    if($('#english').hasClass('active1')){
        return
    }else{
        $('#english').toggleClass('active1');
        $('#ukrain').removeClass('active1');
    }
    
});


var arrLang = {
    'ua': {
        'home' : 'Головна',
        'about' : 'Про себе',
        'portfolio' : 'Портфоліо',
        'contact' : 'Контакти',
        'hello' : 'Привіт',
        'eduard' : 'мене звати Едуард',
        'dew' : 'я веб-розробник',
        'more' : 'Більше Про Себе' ,
        'main info' : 'головна інформація',
        'about me' : 'ПРО МЕНЕ',
        'my name' : 'Привіт, мене звати Едуард. Я починаючий веб-розробник. Шукаю свою першу роботу в it сфері. Хочу отримувати досвід та розвиватись. Дисциплінований та цілеспрямований. ',
        'cv' : 'Завантажи CV',
        'works' : 'Останні Роботи',
        'all' : 'Всі',
        'aplication' : 'веб додаток',
        'photoshop' : 'фотошоп',
        'mobile' : 'мобільний додаток',
        'commerce' : 'е-комерція',
        'proj' : 'дивитись проект',
        'window' : 'лендінг компанії по установці вікон',
        'window-brief' : 'опис проекту',
        'data-window' : 'рік-2022',
        'tools-window' : 'інструменти-html, css, javascript',
        'proj2' : 'дивитись проект',
        'mobile-application-land' : 'лендінг мобільного додатку',
        'wash-brief' : 'опис проекту',
        'date-wash' : 'рік-2022',
        'tolls-wash' : 'інструменти-html, css, javascript',
        'vet-proj' : 'дивитись проект',
        'vet-name' : 'лендінг ветеринарної клініки',
        'vet-breaf' : 'опис проекту',
        'vet-date' : 'рік-2022',
        'vet-tools' : 'інструменти-html, css, javascript',
        'details' : 'деталі проекту',
        'contacts' : 'контакти',
        'phone' : 'телефон',
        'input-name' : 'ім`я',
        'send message' : 'відправити повідомлення',
        'details' : 'деталі',
        'message-text' : 'повідомлення',
        } ,
    'en': {
        'home' : 'Home',
        'about' : 'About',
        'portfolio' : 'Portfolio',
        'contact' : 'Contact',
        'hello' : 'Hello',
        'eduard' : 'i`m Eduard',
        'dew' : 'Web Developer',
        'more' : 'More About Me',
        'main info' : 'main info',
        'about me' : 'ABOUT ME',
        'my name' : 'Hi, my name is Eduard, I am a beginner web developer.  Looking for my first job in the IT field.  I want to grow and develop.  Disciplined, proactive, reliable, motivated, purposeful and obligatory.',
        'cv' : 'Download CV',
        'works' : 'latest works',
        'all' : 'All',
        'aplication' : 'web aplication',
        'photoshop' : 'photoshop',
        'mobile' : 'mobile app',
        'commerce' : 'e-commerce',
        'proj' : 'view-project',
        'window' : 'window glazing landing page',
        'window-brief' : 'project brief',
        'data-window' : 'date-2022',
        'tools-window' : 'tools-html, css, javascript',
        'proj2' : 'view-project',
        'mobile-application-land' : 'mobile application landing page',
        'wash-brief' : 'project brief',
        'date-wash' : 'date-2022',
        'tolls-wash' : 'tools-html, css, javascript',
        'vet-proj' : 'view-project',
        'vet-name' : 'veterinary clinic landing page',
        'vet-breaf' : 'project brief',
        'vet-date' : 'date-2022',
        'vet-tools' : 'tools-html, css, javascript',
        'details' : 'project details',
        'contacts' : 'contact me',
        'phone' : 'phone',
        'input-name' : 'name',
        'send message' : 'send message',
        'details' : 'project details',
        'message-text' : 'message',
    } 
}

$(function(){
    $('.translate').click(function(){
        var lang = $(this).attr('id');

        $('.lang').each(function(index, item){
            if(!$(this).attr("data-text")){
                $(this).text(arrLang[lang][$(this).attr('key')]);
            }
            
            
            $("#name").attr('placeholder', arrLang[lang][$('#name').attr('key')]);
            $("#textarea").attr('placeholder', arrLang[lang][$('#textarea').attr('key')]);
        });
        
    });
});

