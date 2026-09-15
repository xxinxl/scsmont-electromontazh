import { useEffect, useRef, useState } from 'react';

const projectImage = (name: string) => `${import.meta.env.BASE_URL}images/projects/${name}`;

const SERVICES = [
  {
    num: '01',
    title: 'Электромонтажные работы',
    desc: 'Состав и объём электромонтажных работ уточняются по проекту, техническому заданию и условиям объекта.',
    img: projectImage('service-electrical.webp'),
    position: '50% 62%',
  },
  {
    num: '02',
    title: 'Прокладка кабеля',
    desc: 'Прокладка кабельных линий. Способ и маршрут согласовываются для каждого объекта.',
    img: projectImage('service-cable-route.webp'),
    position: '50% 66%',
  },
  {
    num: '03',
    title: 'Установка муфт',
    desc: 'Установка кабельных муфт с подбором решения под конкретную задачу и исходные данные.',
    img: projectImage('service-joints.webp'),
    position: '50% 68%',
  },
  {
    num: '04',
    title: 'Монтаж подстанций',
    desc: 'Монтаж подстанций в составе согласованного объёма работ по объекту.',
    img: projectImage('service-substation.webp'),
    position: '50% 44%',
  },
  {
    num: '05',
    title: 'Благоустройство',
    desc: 'Благоустройство и восстановление территории после выполнения работ.',
    img: projectImage('service-earthworks.webp'),
    position: '54% 56%',
  },
];

const COOPERATION = [
  { num: '01', title: 'Генподрядчикам', desc: 'Обсудим состав работ, требования к документации и формат участия в проекте.' },
  { num: '02', title: 'Строительным компаниям', desc: 'Рассмотрим задачи по электромонтажу, кабельным линиям, подстанциям и благоустройству.' },
  { num: '03', title: 'Заказчикам объектов', desc: 'Уточним исходные данные и подготовим предложение под конкретный объём работ.' },
  { num: '04', title: 'Поставщикам и партнёрам', desc: 'Открыты к обсуждению сотрудничества по профильным проектам в регионе.' },
];

const PROCESS = [
  { num: '01', title: 'Задача', desc: 'Вы направляете описание объекта, проект или техническое задание.' },
  { num: '02', title: 'Уточнение', desc: 'Сверяем исходные данные и вопросы, которые влияют на объём работ.' },
  { num: '03', title: 'Согласование', desc: 'Фиксируем состав работ и условия по конкретному объекту.' },
  { num: '04', title: 'Реализация', desc: 'Приступаем к работам после согласования всех вводных.' },
];

const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'О компании', href: '#about' },
  { label: 'Сотрудничество', href: '#cooperation' },
  { label: 'Контакты', href: '#contact' },
];

function useInView(threshold = 0.1) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element || typeof IntersectionObserver === 'undefined') {
      setVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { threshold },
    );

    observer.observe(element);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, visible };
}

function Nav({ scrolled }: { scrolled: boolean }) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  return (
    <>
      <nav className={'site-nav ' + (scrolled || open ? 'site-nav--solid' : '')} aria-label="Основная навигация">
        <div className="site-nav__inner">
          <a href="#top" className="brand" aria-label="СКСМонт — в начало страницы">
            <span className="brand__mark" aria-hidden="true">С</span>
            <span>СКСМонт</span>
          </a>

          <div className="site-nav__links">
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
            <a href="#contact" className="button button--small">Связаться</a>
          </div>

          <button
            type="button"
            className={'menu-button ' + (open ? 'menu-button--open' : '')}
            onClick={() => setOpen((value) => !value)}
            aria-expanded={open}
            aria-controls="mobile-menu"
            aria-label={open ? 'Закрыть меню' : 'Открыть меню'}
          >
            <span />
            <span />
          </button>
        </div>
      </nav>

      <div id="mobile-menu" className={'mobile-menu ' + (open ? 'mobile-menu--open' : '')} aria-hidden={!open}>
        <div className="mobile-menu__links">
          {NAV_LINKS.map((link, index) => (
            <a key={link.href} href={link.href} onClick={() => setOpen(false)}>
              <span>0{index + 1}</span>{link.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="button" onClick={() => setOpen(false)}>Обсудить сотрудничество <span>→</span></a>
      </div>
    </>
  );
}

function CableRoute() {
  return (
    <svg className="cable-route" viewBox="0 0 1440 900" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <path className="cable-route__main" d="M1450 118H1180V310H1015V560H830V920" />
      <path className="cable-route__branch cable-route__branch--one" d="M1180 118H800" />
      <path className="cable-route__branch cable-route__branch--two" d="M1015 310H1450" />
      <path className="cable-route__branch cable-route__branch--three" d="M830 560H1450" />
      <circle cx="1180" cy="118" r="4" />
      <circle cx="1015" cy="310" r="4" />
      <circle cx="830" cy="560" r="4" />
    </svg>
  );
}

function Hero() {
  return (
    <header id="top" className="hero">
      <div className="hero__media" aria-hidden="true">
        <img src={projectImage('hero-substation.webp')} alt="" />
      </div>
      <div className="hero__grid" aria-hidden="true" />
      <CableRoute />

      <div className="hero__content shell">
        <div className="hero__eyebrow reveal reveal--one">
          <span /> ООО «СКСМонт» <b>СПб / Ленобласть</b>
        </div>
        <h1 className="hero__title reveal reveal--two">Монтаж.<br />Кабель.<br /><em>Подстанции.</em></h1>
        <div className="hero__bottom reveal reveal--three">
          <p>Электромонтажные работы, прокладка кабеля, установка муфт, монтаж подстанций и благоустройство.</p>
          <div className="hero__actions">
            <a href="#contact" className="button">Обсудить объект <span>→</span></a>
            <a href="#services" className="button button--ghost">Смотреть услуги</a>
          </div>
        </div>
        <div className="hero__facts reveal reveal--four">
          <div><span>Регион работ</span><strong>Санкт-Петербург и Ленинградская область</strong></div>
          <div><span>Статус</span><strong>Открыты к предложениям о сотрудничестве</strong></div>
          <a href="#services" aria-label="Перейти к услугам">Листать ↓</a>
        </div>
      </div>
    </header>
  );
}

function SectionHeading({ kicker, children, light = false }: { kicker: string; children: React.ReactNode; light?: boolean }) {
  return (
    <div className={'section-heading ' + (light ? 'section-heading--light' : '')}>
      <span>{kicker}</span>
      <h2>{children}</h2>
    </div>
  );
}

function Services() {
  const [active, setActive] = useState(0);
  const { ref, visible } = useInView();

  return (
    <section id="services" className="section section--dark">
      <div ref={ref} className={'shell inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="section-intro">
          <SectionHeading kicker="01 — Услуги" light>Пять направлений.<br />Один подрядчик.</SectionHeading>
          <p>Точный состав работ определим после получения исходных данных по объекту.</p>
        </div>

        <div className="services-layout">
          <div className="services-list" role="list">
            {SERVICES.map((service, index) => {
              const isActive = active === index;
              return (
                <article className={'service ' + (isActive ? 'service--active' : '')} key={service.num} role="listitem">
                  <button type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-expanded={isActive}>
                    <span className="service__number">{service.num}</span>
                    <span className="service__copy">
                      <strong>{service.title}</strong>
                      <span className="service__description">{service.desc}</span>
                    </span>
                    <span className="service__plus" aria-hidden="true">{isActive ? '−' : '+'}</span>
                  </button>
                  <div className="service__mobile-media" aria-hidden={!isActive}>
                    <img src={service.img} style={{ objectPosition: service.position }} alt={'Фото с объекта: ' + service.title} loading="lazy" />
                    <span>Фото с объекта</span>
                  </div>
                </article>
              );
            })}
          </div>

          <div className="services-media" aria-live="polite">
            {SERVICES.map((service, index) => (
              <figure className={active === index ? 'is-active' : ''} key={service.num}>
                <img src={service.img} style={{ objectPosition: service.position }} alt={'Фото с объекта: ' + service.title} loading={index === 0 ? 'eager' : 'lazy'} />
                <figcaption><span>{service.num} / 05</span> Реальный объект</figcaption>
              </figure>
            ))}
          </div>
        </div>

        <div className="services-mobile" aria-label="Галерея услуг">
          <div className="services-mobile__track" tabIndex={0}>
            {SERVICES.map((service) => (
              <article className="services-mobile__card" key={service.num}>
                <figure>
                  <img src={service.img} style={{ objectPosition: service.position }} alt={'Фото с объекта: ' + service.title} loading="lazy" />
                  <figcaption><span>{service.num} / 05</span> Реальный объект</figcaption>
                </figure>
                <div className="services-mobile__copy">
                  <span>{service.num}</span>
                  <h3>{service.title}</h3>
                  <p>{service.desc}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="services-mobile__hint" aria-hidden="true">
            <span>Свайп</span><i /><b>→</b>
          </div>
        </div>
      </div>
    </section>
  );
}

function About() {
  const { ref, visible } = useInView();
  const details = [
    ['Компания', 'ООО «СКСМонт»'],
    ['ИНН', '7810649251'],
    ['ОГРН', '1177847041932'],
    ['География', 'Санкт-Петербург и Ленинградская область'],
  ];

  return (
    <section id="about" className="section section--warm">
      <div ref={ref} className={'shell about inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="about__visual">
          <div className="about__photo">
            <img src={projectImage('about-cable.webp')} alt="Кабель на барабане на объекте" loading="lazy" />
            <span>Фото с объекта</span>
          </div>
          <div className="about__index" aria-hidden="true">02</div>
        </div>

        <div className="about__content">
          <SectionHeading kicker="02 — О компании">Только<br />проверенные<br />данные.</SectionHeading>
          <p className="about__lead">ООО «СКСМонт» выполняет электромонтажные и сопутствующие работы в Санкт-Петербурге и Ленинградской области.</p>
          <p className="about__note">На сайте представлены реальные фотографии с объектов. Дополнительные сведения и документы предоставим после согласования.</p>
          <dl className="company-details">
            {details.map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}
          </dl>
        </div>
      </div>
    </section>
  );
}

function Cooperation() {
  const { ref, visible } = useInView();

  return (
    <section id="cooperation" className="section section--navy">
      <div ref={ref} className={'shell inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="section-intro section-intro--cooperation">
          <SectionHeading kicker="03 — Сотрудничество" light>Обсудим<br />ваш формат.</SectionHeading>
          <p>Объём, сроки, документацию и условия согласуем по конкретному запросу.</p>
        </div>
        <div className="cooperation-grid">
          {COOPERATION.map((item) => (
            <article key={item.num}>
              <span>{item.num}</span><h3>{item.title}</h3><p>{item.desc}</p><div aria-hidden="true">↗</div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { ref, visible } = useInView();

  return (
    <section className="section section--warm">
      <div ref={ref} className={'shell inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="process-heading">
          <SectionHeading kicker="04 — Начало работы">От запроса<br />к объекту.</SectionHeading>
          <p>Последовательность уточняется в зависимости от задачи.</p>
        </div>
        <div className="process-grid">
          {PROCESS.map((step) => (
            <article key={step.num}>
              <div><span />{step.num}</div><h3>{step.title}</h3><p>{step.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

function Contact() {
  const { ref, visible } = useInView();

  return (
    <section id="contact" className="contact">
      <div className="contact__grid" aria-hidden="true" />
      <div ref={ref} className={'shell contact__content inview-group ' + (visible ? 'is-visible' : '')}>
        <span className="contact__kicker">05 — Контакты</span>
        <h2>Давайте<br /><em>обсудим</em><br />объект.</h2>
        <div className="contact__bottom">
          <div className="contact__info">
            <p>Контактные данные будут добавлены после подтверждения.</p>
            <dl>
              <div><dt>Телефон</dt><dd>Добавим перед публикацией</dd></div>
              <div><dt>E-mail</dt><dd>Добавим перед публикацией</dd></div>
              <div><dt>Мессенджер</dt><dd>Добавим перед публикацией</dd></div>
              <div><dt>Регион</dt><dd>Санкт-Петербург и Ленинградская область</dd></div>
            </dl>
          </div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()} aria-describedby="form-status">
            <div className="contact-form__row">
              <label>Ваше имя<input type="text" name="name" placeholder="Имя и фамилия" disabled /></label>
              <label>Компания<input type="text" name="company" placeholder="Название организации" disabled /></label>
            </div>
            <label>Телефон<input type="tel" name="phone" placeholder="+7 (___) ___-__-__" disabled /></label>
            <label>Задача<textarea name="message" rows={3} placeholder="Кратко опишите объект или вид работ" disabled /></label>
            <button type="submit" className="button" disabled>Форма подключается</button>
            <p id="form-status">Форма станет активной, когда появится подтверждённый способ связи.</p>
          </form>
        </div>
      </div>
    </section>
  );
}

function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="shell">
        <div className="footer__main">
          <div>
            <a href="#top" className="brand"><span className="brand__mark" aria-hidden="true">С</span><span>СКСМонт</span></a>
            <p>Электромонтажные работы в Санкт-Петербурге и Ленинградской области.</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <span>Разделы</span>
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="footer__details">
            <span>Реквизиты</span><p>ООО «СКСМонт»</p><p>ИНН 7810649251</p><p>ОГРН 1177847041932</p>
          </div>
        </div>
        <div className="footer__bottom"><span>© {year} ООО «СКСМонт»</span><span>Санкт-Петербург · Ленинградская область</span></div>
      </div>
    </footer>
  );
}

export default function App() {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="site">
      <Nav scrolled={scrollY > 60} />
      <main><Hero /><Services /><About /><Cooperation /><Process /><Contact /></main>
      <Footer />
      <div className={'mobile-cta ' + (scrollY > 520 ? 'mobile-cta--visible' : '')}>
        <a href="#contact" className="button">Обсудить объект <span>→</span></a>
      </div>
    </div>
  );
}
