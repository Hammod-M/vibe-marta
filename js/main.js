(function () {
  var H = 'LandingHeader-module-scss-module__98Jocq__';
  var R = 'Reward-module-scss-module__EfY0Xq__';
  var F = 'FaqItem-module-scss-module__qeCKOa__';
  var S = 'School-module-scss-module__lYQ9KW__';

  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // --- Mobile menu --------------------------------------------------------
  var wrapper = document.querySelector('.' + H + 'burgerWrapper');
  var burger = wrapper.querySelector('button');
  var menu = wrapper.querySelector('.' + H + 'burgerMenu');
  var menuIcon = burger.innerHTML;
  var closeIcon =
    '<svg width="19" height="20" viewBox="0 0 19 20" fill="none" xmlns="http://www.w3.org/2000/svg">' +
    '<path d="M17.9998 1.51471L1.02919 18.4853" stroke="#fff" stroke-width="2"/>' +
    '<path d="M17.9988 18.4853L1.02822 1.5147" stroke="#fff" stroke-width="2"/></svg>';
  var menuOpen = false;

  function setMenu(open) {
    menuOpen = open;
    burger.className = open ? H + 'burgerButtonOpened' : H + 'burgerButton';
    burger.innerHTML = open ? closeIcon : menuIcon;
    menu.hidden = !open;
    var mobile = window.matchMedia('(max-width: 768px)').matches;
    document.body.style.overflow = open && mobile ? 'hidden' : '';
  }

  burger.addEventListener('click', function () { setMenu(!menuOpen); });
  document.addEventListener('mousedown', function (e) {
    if (menuOpen && !wrapper.contains(e.target)) setMenu(false);
  });
  menu.querySelectorAll('a').forEach(function (a) {
    a.addEventListener('click', function () { setMenu(false); });
  });

  // --- Scroll to "Стать партнёром VIBE" --------------------------------------
  var become = document.getElementById('become');
  document.querySelectorAll('[data-scroll-cta]').forEach(function (btn) {
    btn.addEventListener('click', function () {
      setMenu(false);
      ScrollTrigger.getAll().forEach(function (t) { t.disable(false); });
      gsap.to(window, {
        scrollTo: become,
        duration: 1.2,
        ease: 'power2.inOut',
        onComplete: function () {
          requestAnimationFrame(function () {
            ScrollTrigger.getAll().forEach(function (t) { t.enable(); });
            ScrollTrigger.refresh();
          });
        }
      });
    });
  });

  // --- "Личный кабинет" popup -------------------------------------------------
  var lkPopup = document.getElementById('lk-popup');
  var lkBox = lkPopup.firstElementChild;

  function setLkPopup(open) {
    lkPopup.hidden = !open;
    document.body.style.overflow = open ? 'hidden' : '';
    document.documentElement.style.overflow = open ? 'hidden' : '';
  }

  document.querySelectorAll('[data-lk-popup]').forEach(function (link) {
    link.addEventListener('click', function (e) {
      e.preventDefault();
      setLkPopup(true);
    });
  });
  lkPopup.querySelector('button').addEventListener('click', function () { setLkPopup(false); });
  lkPopup.addEventListener('mousedown', function (e) {
    if (!lkBox.contains(e.target)) setLkPopup(false);
  });
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape' && !lkPopup.hidden) setLkPopup(false);
  });

  // --- Reward cards ---------------------------------------------------------
  var plusIcon =
    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="19.5" stroke="#252526"></circle>' +
    '<path d="M12.5332 20H26.9332" stroke="#252526"></path><path d="M19.7334 12.8008L19.7334 27.2008" stroke="#252526"></path></svg>';
  var minusIcon =
    '<svg width="40" height="40" viewBox="0 0 40 40" fill="none"><circle cx="20" cy="20" r="20" fill="#252526"></circle>' +
    '<path d="M12.5332 20H26.9332" stroke="white"></path></svg>';
  var rewardDetails = [
    {
      cls: 'cardText',
      items: [
        ['Кэшбэк', ' за личные покупки'],
        ['Доход', ' уже с первого приглашения'],
        ['Нет обязательных закупок, сам', ' выбираешь свой статус'],
        ['Доступная активность:', ' 30 PV или 1 новый партнер']
      ]
    },
    {
      cls: 'cardTextCard2',
      items: [
        ['До 15 уровней выплат', ' и глубинный бонус без ограничений'],
        ['Всего 5 сильных веток', ' для максимальной квалификации'],
        ['Простая карьерная лестница:', ' 15 достижимых ступеней'],
        ['Наставники заинтересованы', ' в твоём росте'],
        ['С первого взгляда понятно', ', что делать для роста дохода']
      ]
    },
    {
      cls: 'cardText',
      items: [
        ['Юридическая защита дохода', ' по публичной оферте'],
        ['Нет «обрезаний» дохода', ' из-за квалификаций других'],
        ['Зарабатывают все', ', не только лидеры'],
        ['Всё прозрачно', ' — видно, откуда идут деньги'],
        ['Получаешь доход от абсолютно всех', ' покупок в твоей структуре']
      ]
    }
  ];

  document.querySelectorAll('.' + R + 'card').forEach(function (card, i) {
    var iconBox = card.querySelector('.' + R + 'cardHeader > div');
    var grey = card.querySelector('.' + R + 'greyText');
    var details = document.createElement('div');
    details.className = R + rewardDetails[i].cls;
    rewardDetails[i].items.forEach(function (item) {
      var row = document.createElement('div');
      var strong = document.createElement('strong');
      strong.textContent = item[0];
      row.appendChild(strong);
      row.appendChild(document.createTextNode(item[1]));
      details.appendChild(row);
    });
    var open = false;
    card.addEventListener('click', function () {
      open = !open;
      card.classList.toggle(R + 'openedCard', open);
      card.classList.toggle(R + 'closedCard', !open);
      iconBox.innerHTML = open ? minusIcon : plusIcon;
      card.replaceChild(open ? details : grey, open ? grey : details);
    });
  });

  // --- FAQ --------------------------------------------------------------------
  var faqAnswers = [
    'Нет. Чтобы получать доход, достаточно либо сделать покупку на&nbsp;30&nbsp;PV (от&nbsp;6000&nbsp;₽), либо пригласить одного нового партнёра в первый уровень.<br/> Вы сами выбираете, как вам комфортнее. Никакого давления.',
    'Старт от&nbsp;6000&nbsp;₽ (Партнёр) или от&nbsp;24&nbsp;000&nbsp;₽ (Партнёр Плюс, доступ ко всем бонусам). <br/>Активация проходит один раз, можно набрать сумму частями за расчётный период.',
    'Никаких складов и ручной логистики — всё работает автоматически. Вы просто оформляете заказ, остальное делает система.',
    'Вам не&nbsp;нужно уговаривать. У нас готовые инструменты, воронки, чаты, обучение и поддержка с&nbsp;первого дня. <br/> Делитесь опытом, а&nbsp;не&nbsp;«впариванием» — это работает.',
    'Уже с первого приглашённого партнёра. <br/> Все начисления прозрачны и официальны, выплаты идут по&nbsp;договору.',
    'Нет. У нас есть реальный продукт, прозрачный маркетинг и легальный договор.  <br /> Мы зарабатываем не на «входе», а на&nbsp;продаже качественного продукта.',
    'У каждого свой темп. Здесь нет давления и плана «выйти на миллион за&nbsp;неделю». Вы можете пробовать, расти, получать поддержку и идти в своём ритме. <br/> И даже просто пользоваться продуктом — уже быть частью комьюнити.'
  ];

  document.querySelectorAll('.Faq-module-scss-module___kfcqq__faqList > li').forEach(function (li, i) {
    var question = li.querySelector('div');
    var arrow = question.querySelector('svg');
    var answer = document.createElement('div');
    answer.className = F + 'answer';
    answer.innerHTML = '<div class="' + F + 'inner">' + faqAnswers[i] + '</div>';
    li.appendChild(answer);
    var open = false;
    li.addEventListener('click', function () {
      open = !open;
      li.classList.toggle('is-open', open);
      question.className = open ? F + 'questionOpened' : F + 'questionClosed';
      arrow.setAttribute('class', open ? F + 'rotateSvg' : F + 'normalSvg');
      if (open) {
        answer.style.height = answer.scrollHeight + 'px';
      } else {
        answer.style.height = answer.scrollHeight + 'px';
        answer.offsetHeight; // force reflow so the collapse animates
        answer.style.height = '0px';
      }
    });
    answer.addEventListener('transitionend', function () {
      if (open) answer.style.height = 'auto';
    });
  });

  // --- School animation ---------------------------------------------------------
  var school = document.querySelector('.' + S + 'school');
  var mm = gsap.matchMedia();

  mm.add('(min-width: 860px)', function () {
    var line = school.querySelector('.' + S + 'animation');
    var items = school.querySelectorAll('.' + S + 'contentItem');
    gsap.set(items, { opacity: 0.2 });
    var tl = gsap.timeline({
      scrollTrigger: {
        trigger: school,
        start: 'top top',
        end: '+=600',
        scrub: true,
        pin: true,
        anticipatePin: 1,
        onLeave: function (self) {
          self.kill();
          gsap.set(line, { width: '100%', WebkitMaskImage: 'none', maskImage: 'none' });
          gsap.set(items, { opacity: 1 });
        }
      }
    });
    tl.fromTo(line,
      {
        width: '0%',
        WebkitMaskImage: 'linear-gradient(to right, black 80%, transparent 100%)',
        maskImage: 'linear-gradient(to right, black 80%, transparent 100%)'
      },
      {
        width: '100%',
        ease: 'none',
        WebkitMaskImage: 'linear-gradient(to right, black 100%, transparent 100%)',
        maskImage: 'linear-gradient(to right, black 100%, transparent 100%)'
      }, 0)
      .to(items[0], { opacity: 1, duration: 0.1 }, 0)
      .to(items[1], { opacity: 1, duration: 0.1 }, 0.2)
      .to(items[2], { opacity: 1, duration: 0.1 }, 0.5);
  });

  mm.add('(max-width: 859px)', function () {
    var line = school.querySelector('.' + S + 'animationMobile');
    var items = school.querySelectorAll('.' + S + 'contentItemMobile');
    gsap.set(items, { opacity: 0.2 });
    var tl = gsap.timeline({
      scrollTrigger: { trigger: school, start: 'top 20%', end: '+=850', scrub: true, once: true }
    });
    tl.fromTo(line,
      {
        height: '0%',
        WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)'
      },
      {
        height: '100%',
        ease: 'none',
        WebkitMaskImage: 'linear-gradient(to bottom, black 100%, transparent 100%)',
        maskImage: 'linear-gradient(to bottom, black 100%, transparent 100%)'
      }, 0)
      .to(items[0], { opacity: 1, duration: 0.1 }, 0)
      .to(items[1], { opacity: 1, duration: 0.1 }, 0.2)
      .to(items[2], { opacity: 1, duration: 0.1 }, 0.5);
  });
})();
