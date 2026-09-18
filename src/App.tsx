import { useEffect, useRef, useState } from 'react';

const projectImage = (name: string) => `${import.meta.env.BASE_URL}images/projects/${name}`;

const SERVICES = [
  {
    title: 'Электромонтажные работы',
    desc: 'Выполняем электромонтажные работы по проекту и техническому заданию.',
    img: projectImage('service-electrical.webp'),
    position: '50% 62%',
  },
  {
    title: 'Прокладка кабеля',
    desc: 'Прокладываем кабельные линии на строительных и промышленных объектах.',
    img: projectImage('service-cable-route.webp'),
    position: '50% 66%',
  },
  {
    title: 'Установка муфт',
    desc: 'Устанавливаем кабельные муфты для надёжного соединения и оконцевания линий.',
    img: projectImage('service-joints.webp'),
    position: '50% 68%',
  },
  {
    title: 'Монтаж подстанций',
    desc: 'Выполняем монтаж подстанций на подготовленных объектах.',
    img: projectImage('service-substation.webp'),
    position: '50% 44%',
  },
  {
    title: 'Благоустройство',
    desc: 'Восстанавливаем территорию после прокладки кабеля и завершения монтажных работ.',
    img: projectImage('service-landscaping-night.webp'),
    position: '50% 67%',
  },
];

const COOPERATION = [
  { title: 'Для генподрядчиков', desc: 'Подключаемся к проектам в качестве подрядчика по электромонтажным и кабельным работам.' },
  { title: 'Для строительных компаний', desc: 'Выполняем электромонтаж, прокладку кабеля, монтаж подстанций и благоустройство.' },
  { title: 'Для промышленных предприятий', desc: 'Выполняем электромонтажные и кабельные работы на промышленных объектах по согласованному заданию.' },
  { title: 'Долгосрочное сотрудничество', desc: 'Рассматриваем регулярные проекты и предложения о сотрудничестве по профильным работам.' },
];

const PROJECT_PHOTOS = [
  { name: 'gallery-cable-trench.webp', title: 'Прокладка кабельной линии', alt: 'Кабели в траншее на строительном объекте', position: '50% 62%' },
  { name: 'gallery-trench-prepared.jpg', title: 'Подготовка кабельной трассы', alt: 'Подготовленная траншея для прокладки кабеля', position: '50% 55%' },
  { name: 'gallery-paving-day.webp', title: 'Восстановление покрытия', alt: 'Тротуар с уложенной плиткой после работ', position: '50% 68%' },
  { name: 'service-landscaping-night.webp', title: 'Ночные работы', alt: 'Работы на городском объекте в ночное время', position: '50% 68%' },
  { name: 'gallery-cable-terminations.webp', title: 'Монтаж оборудования', alt: 'Кабельные подключения внутри электрооборудования', position: '50% 48%' },
  { name: 'gallery-substation-setup.jpg', title: 'Монтаж подстанции', alt: 'Подстанция на подготовленной площадке', position: '50% 52%' },
  { name: 'gallery-mini-excavator.webp', title: 'Земляные работы', alt: 'Экскаватор на участке земляных работ', position: '50% 50%' },
  { name: 'gallery-excavation-city.jpg', title: 'Работа техники на объекте', alt: 'Экскаватор на строительном объекте', position: '50% 50%' },
  { name: 'gallery-conduits.webp', title: 'Подготовка кабельной трассы', alt: 'Трубы для прокладки кабеля на объекте', position: '50% 60%' },
  { name: 'gallery-cable-ducts-site.jpg', title: 'Кабельные линии на объекте', alt: 'Подготовка трассы для кабельных линий на стройплощадке', position: '50% 60%' },
  { name: 'gallery-conduits-assembly.jpg', title: 'Подготовка защитных труб', alt: 'Красные защитные трубы перед укладкой', position: '50% 56%' },
  { name: 'gallery-landscaped-path.webp', title: 'Благоустройство территории', alt: 'Дорожка и газон на благоустроенной территории', position: '50% 56%' },
  { name: 'gallery-pavement-wet.webp', title: 'Работы с покрытием', alt: 'Обновлённое покрытие пешеходной зоны', position: '50% 65%' },
  { name: 'gallery-path-rebuilt.jpg', title: 'Восстановление пешеходной дорожки', alt: 'Обновлённая пешеходная дорожка вдоль дороги', position: '50% 60%' },
  { name: 'gallery-landscaping-green.webp', title: 'Озеленение', alt: 'Газон и посадки вдоль дороги', position: '50% 60%' },
  { name: 'gallery-urban-site.webp', title: 'Городской объект', alt: 'Ограждённая рабочая зона рядом с городской дорогой', position: '50% 50%' },
];

const PROCESS = [
  { title: 'Заявка', desc: 'Вы направляете описание объекта, проект или техническое задание.' },
  { title: 'Расчёт', desc: 'Определяем состав, объём и стоимость работ.' },
  { title: 'Договор', desc: 'Фиксируем условия и сроки выполнения работ.' },
  { title: 'Работы', desc: 'Выходим на объект и выполняем согласованный объём.' },
];

const NAV_LINKS = [
  { label: 'Услуги', href: '#services' },
  { label: 'О компании', href: '#about' },
  { label: 'Сотрудничество', href: '#cooperation' },
  { label: 'Фото работ', href: '#projects' },
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
          <span /> ООО «СКСМонт»
        </div>
        <h1 className="hero__title hero__title--long reveal reveal--two">
          <span>Монтаж</span>
          <span>кабельных линий</span>
          <em>подстанций</em>
        </h1>
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
          <SectionHeading kicker="Услуги" light>Пять направлений<br />Один подрядчик</SectionHeading>
          <p>Электромонтаж, кабельные линии, подстанции и восстановление территории в рамках одного проекта.</p>
        </div>

        <div className="services-layout">
          <div className="services-list" role="list">
            {SERVICES.map((service, index) => {
              const isActive = active === index;
              return (
                <article className={'service ' + (isActive ? 'service--active' : '')} key={service.title} role="listitem">
                  <button type="button" onClick={() => setActive(index)} onMouseEnter={() => setActive(index)} aria-expanded={isActive}>
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
              <figure className={active === index ? 'is-active' : ''} key={service.title}>
                <img src={service.img} style={{ objectPosition: service.position }} alt={'Фото с объекта: ' + service.title} loading={index === 0 ? 'eager' : 'lazy'} />
              </figure>
            ))}
          </div>
        </div>

        <div className="services-mobile" aria-label="Галерея услуг">
          <div className="services-mobile__track" tabIndex={0}>
            {SERVICES.map((service) => (
              <article className="services-mobile__card" key={service.title}>
                <figure>
                  <img src={service.img} style={{ objectPosition: service.position }} alt={'Фото с объекта: ' + service.title} loading="lazy" />
                </figure>
                <div className="services-mobile__copy">
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
  ];

  return (
    <section id="about" className="section section--warm">
      <div ref={ref} className={'shell about inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="about__visual">
          <div className="about__photo">
            <img src={projectImage('about-cable.webp')} alt="Кабель на барабане на объекте" loading="lazy" />
          </div>
        </div>

        <div className="about__content">
          <SectionHeading kicker="О компании">Электромонтаж<br />для объектов<br />региона</SectionHeading>
          <p className="about__lead">ООО «СКСМонт» выполняет электромонтажные и кабельные работы для строительных и промышленных объектов.</p>
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
    <section id="cooperation" className="section section--warm cooperation">
      <div ref={ref} className={'shell inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="section-intro section-intro--cooperation">
          <SectionHeading kicker="Сотрудничество">С кем<br />мы работаем</SectionHeading>
          <p>Формат работ и условия сотрудничества обсуждаем под задачи объекта.</p>
        </div>
        <div className="cooperation-list">
          {COOPERATION.map((item, index) => (
            <article key={item.title}>
              <span className="cooperation-list__number" aria-hidden="true">{String(index + 1).padStart(2, '0')}</span>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
        <a href="#contact" className="button cooperation__cta">Обсудить сотрудничество <span aria-hidden="true">→</span></a>
      </div>
    </section>
  );
}

function Projects() {
  const track = useRef<HTMLDivElement>(null);
  const { ref, visible } = useInView();

  const scrollPhotos = (direction: -1 | 1) => {
    const element = track.current;
    if (!element) return;
    element.scrollBy({ left: direction * element.clientWidth * 0.85, behavior: 'smooth' });
  };

  return (
    <section id="projects" className="section section--dark projects">
      <div ref={ref} className={'shell inview-group ' + (visible ? 'is-visible' : '')}>
        <div className="section-intro projects__intro">
          <SectionHeading kicker="Фото с объектов" light>Работа в деталях</SectionHeading>
          <div className="projects__controls" aria-label="Управление галереей">
            <span>{PROJECT_PHOTOS.length} фотографий</span>
            <button type="button" onClick={() => scrollPhotos(-1)} aria-label="Предыдущие фотографии">←</button>
            <button type="button" onClick={() => scrollPhotos(1)} aria-label="Следующие фотографии">→</button>
          </div>
        </div>
        <div className="projects__track" ref={track} tabIndex={0} aria-label="Фотографии работ. Листайте в стороны">
          {PROJECT_PHOTOS.map((photo, index) => (
            <a className="projects__card" href={projectImage(photo.name)} target="_blank" rel="noopener noreferrer" key={photo.name} aria-label={'Открыть фото: ' + photo.title}>
              <div className="projects__image">
                <img src={projectImage(photo.name)} alt={photo.alt} style={{ objectPosition: photo.position }} loading="lazy" />
              </div>
              <div className="projects__caption">
                <span>{String(index + 1).padStart(2, '0')} / {PROJECT_PHOTOS.length}</span>
                <strong>{photo.title}</strong>
                <span aria-hidden="true">↗</span>
              </div>
            </a>
          ))}
        </div>
        <p className="projects__hint">Листайте галерею свайпом или стрелками. Нажмите на фото, чтобы открыть его целиком.</p>
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
          <SectionHeading kicker="Начало работы">От заявки<br />к объекту</SectionHeading>
        </div>
        <div className="process-grid">
          {PROCESS.map((step, index) => (
            <article key={step.title}>
              <div className="process-grid__indicator" aria-hidden="true">
                <span className="process-grid__marker"><span /></span>
                <span className="process-grid__number">{String(index + 1).padStart(2, '0')}</span>
              </div>
              <h3>{step.title}</h3><p>{step.desc}</p>
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
        <span className="contact__kicker">Контакты</span>
        <h2>Давайте<br /><em>обсудим</em><br />объект</h2>
        <div className="contact__bottom">
          <div className="contact__info">
            <p>Опишите объект, объём работ или задачу, которую хотите обсудить.</p>
          </div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()} aria-describedby="form-status">
            <div className="contact-form__row">
              <label>Ваше имя<input type="text" name="name" autoComplete="name" placeholder="Имя и фамилия" /></label>
              <label>Компания<input type="text" name="company" autoComplete="organization" placeholder="Название организации" /></label>
            </div>
            <label>Телефон<input type="tel" name="phone" autoComplete="tel" placeholder="+7 (___) ___-__-__" /></label>
            <label>Задача<textarea name="message" rows={3} placeholder="Кратко опишите объект или вид работ" /></label>
            <button type="submit" className="button" disabled>Отправить заявку</button>
            <p id="form-status">Онлайн-заявки будут доступны после подключения CRM.</p>
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
            <p>Электромонтажные, кабельные и сопутствующие работы.</p>
          </div>
          <nav aria-label="Навигация в подвале">
            <span>Разделы</span>
            {NAV_LINKS.map((link) => <a key={link.href} href={link.href}>{link.label}</a>)}
          </nav>
          <div className="footer__details">
            <span>Реквизиты</span><p>ООО «СКСМонт»</p><p>ИНН 7810649251</p><p>ОГРН 1177847041932</p>
          </div>
        </div>
        <div className="footer__bottom"><span>© {year} ООО «СКСМонт»</span><span>Санкт-Петербург и Ленинградская область</span></div>
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
      <main><Hero /><Services /><About /><Cooperation /><Process /><Projects /><Contact /></main>
      <Footer />
      <div className={'mobile-cta ' + (scrollY > 520 ? 'mobile-cta--visible' : '')}>
        <a href="#contact" className="button">Обсудить объект <span>→</span></a>
      </div>
    </div>
  );
}
