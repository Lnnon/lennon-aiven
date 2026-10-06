import './style.css'
import { loadPortfolio, sendContactMessage } from './data.js'

const icon = (name, size = 18) => {
  const paths = {
    grid: '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/>',
    briefcase: '<rect x="3" y="7" width="18" height="14" rx="2"/><path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2M3 12h18m-11 0v2h4v-2"/>',
    layers: '<path d="m12 3 9 5-9 5-9-5 9-5Z"/><path d="m3 12 9 5 9-5M3 16l9 5 9-5"/>',
    spark: '<path d="m12 3 1.9 5.8L20 11l-6.1 2.2L12 19l-1.9-5.8L4 11l6.1-2.2L12 3Z"/><path d="m19 14 1.1 2.9L23 18l-2.9 1.1L19 22l-1.1-2.9L15 18l2.9-1.1L19 14Z"/>',
    mail: '<rect x="3" y="5" width="18" height="14" rx="2"/><path d="m3 7 9 6 9-6"/>',
    chart: '<path d="M3 3v18h18M8 15l4-4 4 3 5-7"/>',
    sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2m0 16v2M4.93 4.93l1.42 1.42m11.3 11.3 1.42 1.42M2 12h2m16 0h2M4.93 19.07l1.42-1.42m11.3-11.3 1.42-1.42"/>',
    moon: '<path d="M20.9 13A9 9 0 0 1 11 3.1 9 9 0 1 0 20.9 13Z"/>',
    arrow: '<path d="M7 17 17 7M7 7h10v10"/>',
    download: '<path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4m4-5 5 5 5-5m-5 5V3"/>',
    chevron: '<path d="m9 18 6-6-6-6"/>',
    menu: '<path d="M4 6h16M4 12h16M4 18h16"/>',
    close: '<path d="m18 6-12 12M6 6l12 12"/>',
    external: '<path d="M15 3h6v6m-11 5L21 3"/><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
    check: '<path d="m5 12 4 4L19 6"/>',
  }
  return `<svg width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.7" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${paths[name] || ''}</svg>`
}

const nav = [
  ['overview', 'Home', 'grid'], ['profile', 'Profile', 'grid'], ['experience', 'Experience', 'briefcase'],
  ['education', 'Education', 'layers'], ['skills', 'Skills', 'spark'], ['projects', 'Projects', 'layers'],
  ['social-links', 'Social', 'mail'], ['contact', 'Contact', 'mail'],
]
const projects = [
  { n: '01', category: 'PRODUCT DESIGN · 2025', title: 'Forma — a calmer way to work', image: 'photo-1497366754035-f200968a6e72', color: 'project-sage', description: 'A thoughtful workspace that helps small teams find focus in the everyday. Strategy, brand, and product design.' },
  { n: '02', category: 'BRAND & DIGITAL · 2024', title: 'Openhouse — room to grow', image: 'photo-1600210492486-724fe5c67fb0', color: 'project-sand', description: 'A new digital home for a new kind of real estate studio, built around good living and better design.' },
  { n: '03', category: 'WEB DESIGN · 2024', title: 'Terra — made to matter', image: 'photo-1472396961693-142e6e269027', color: 'project-lilac', description: 'Bringing nature and technology together for a new generation of conscious travelers.' },
]
const skills = ['Product design', 'Design systems', 'Creative direction', 'Prototyping', 'Figma', 'React & CSS', 'User research', 'Visual identity']
const app = document.querySelector('#app')

app.innerHTML = `
  <div class="shell">
    <aside class="sidebar" id="sidebar">
      <a href="#overview" class="brand" aria-label="Lennon home"><span class="brand-mark">l.</span><span>LENNON<span class="brand-dot">.</span></span></a>
      <div class="side-label">WORKSPACE</div>
      <nav class="side-nav" aria-label="Main navigation">${nav.map(([id, label, glyph], i) => `<a class="nav-link ${i === 0 ? 'active' : ''}" href="#${id}" data-section="${id}">${icon(glyph, 17)}<span>${label}</span>${i === 0 ? '<span class="nav-indicator"></span>' : ''}</a>`).join('')}</nav>
      <div class="sidebar-bottom"><div class="availability"><span class="pulse"></span><div><b>Available for work</b><small>Taking on projects for Q4</small></div></div><div class="side-profile"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces" alt="Portrait of Lennon"/><div><b>Lennon James</b><small>Designer & developer</small></div><button class="icon-button more-button" aria-label="Profile options">···</button></div></div>
    </aside>
    <main class="main">
      <header class="topbar"><button class="menu-button icon-button" id="menuToggle" aria-label="Open navigation">${icon('menu')}</button><div class="breadcrumb"><span>Workspace</span>${icon('chevron', 14)}<b id="currentPage">Overview</b></div><div class="top-actions"><span class="today">MONDAY, OCTOBER 07</span><button class="theme-toggle icon-button" id="themeToggle" aria-label="Switch color theme">${icon('moon', 18)}</button><a class="avatar-link" href="#contact" aria-label="Go to contact"><img src="https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=96&h=96&fit=crop&crop=faces" alt=""/></a></div></header>
      <div class="content">
        <section class="hero section-anchor" id="overview"><div class="hero-copy"><div class="eyebrow"><span class="eyebrow-line"></span> INDEPENDENT DESIGNER & DEVELOPER</div><h1>Good design<br/>makes room for <span class="serif-word">more.</span></h1><p class="hero-intro">I’m Lennon — a product designer and creative developer building thoughtful digital experiences for people and the planet.</p><div class="hero-actions"><a class="button button-primary" href="#contact">Let’s work together <span>${icon('arrow', 16)}</span></a><a class="button button-quiet" href="#projects">Explore my work <span>↓</span></a></div><div class="hero-stats"><div><b>08<span>+</span></b><small>YEARS EXPERIENCE</small></div><i></i><div><b>42</b><small>PROJECTS SHIPPED</small></div><i></i><div><b>16</b><small>HAPPY TEAMS</small></div></div></div><div class="hero-visual"><div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div><div class="visual-sun"></div><div class="visual-caption"><span class="caption-mark">✳</span><span>Designing with<br/>intention, always.</span></div><div class="visual-index">FIG. 01 — 2025</div></div></section>
        <div class="section-heading"><div><span class="section-kicker">A LITTLE ABOUT ME</span><h2>Designing for the <span class="serif-word">in-between.</span></h2></div><span class="heading-note">A few things I’m proud of</span></div>
        <section class="overview-grid section-anchor" id="profile"><article class="about-card panel"><div class="card-top"><span class="card-label">PROFILE OVERVIEW</span><span class="status-tag">PROFILE</span></div><p>I work at the intersection of <b>design, technology, and a little bit of optimism.</b> Over the last 8 years, I’ve helped ambitious teams turn complex problems into things that feel simple, useful, and human.</p><p>When I’m not at my desk, you’ll find me somewhere outside, probably collecting terrible film photos.</p><div class="profile-meta"><span>${icon('mail', 15)} <a href="mailto:hello@lennon.design">lennon@gmail.com</a></span><span><i class="location-dot"></i> Quezon, Philippines· Remote worldwide</span></div><div class="socials section-anchor" id="social-links" aria-label="Social links"><a href="https://linkedin.com" aria-label="LinkedIn">in</a><a href="https://instagram.com" aria-label="Instagram">◎</a><a href="https://github.com" aria-label="GitHub">⌘</a><a href="https://dribbble.com" aria-label="Dribbble">◉</a></div></article><article class="focus-card panel"><span class="card-label">CURRENTLY INTO</span><div class="focus-list"><div><span>01</span><b>Human-centered AI</b>${icon('arrow', 14)}</div><div><span>02</span><b>Digital wellbeing</b>${icon('arrow', 14)}</div><div><span>03</span><b>Climate-positive design</b>${icon('arrow', 14)}</div></div><div class="focus-note"><span class="note-spark">✳</span><span>Curious by nature.<br/>Thoughtful by design.</span></div></article></section>
        <section class="section-block section-anchor" id="experience"><div class="section-heading compact"><div><span class="section-kicker">THE JOURNEY SO FAR</span><h2>Experience<span class="title-period">.</span></h2></div><a href="#contact" class="text-link">Full résumé ${icon('arrow', 15)}</a></div><article class="timeline-card panel"><div class="timeline-item"><div class="timeline-date">2022 — NOW</div><div class="timeline-marker"><span></span></div><div class="timeline-details"><h3>Senior Product Designer</h3><div class="company">Northstar Studio <span>·</span> Quezon, Philippines</div><p>Leading product design across early-stage partnerships — shaping strategy, building systems, and making the complex feel clear.</p><div class="tags"><span>PRODUCT</span><span>DESIGN SYSTEMS</span><span>LEADERSHIP</span></div></div><span class="current-badge">CURRENT</span></div><div class="timeline-item"><div class="timeline-date">2019 — 2022</div><div class="timeline-marker"><span></span></div><div class="timeline-details"><h3>Product Designer</h3><div class="company">Goodside Digital <span>·</span> New York, NY</div><p>Worked alongside ambitious teams to launch useful digital products for a more considered world.</p><div class="tags"><span>UX DESIGN</span><span>PROTOTYPING</span></div></div></div><div class="timeline-item"><div class="timeline-date">2017 — 2019</div><div class="timeline-marker"><span></span></div><div class="timeline-details"><h3>Visual Designer</h3><div class="company">Common Practice <span>·</span> Portland, OR</div><p>Built visual identities and digital experiences for brands doing things a little differently.</p><div class="tags"><span>BRANDING</span><span>ART DIRECTION</span></div></div></div></article></section>
        <section class="section-block section-anchor" id="projects"><div class="section-heading compact"><div><span class="section-kicker">SELECTED PROJECTS · 2023—25</span><h2>Things made <span class="serif-word">with care.</span></h2></div><a href="#contact" class="text-link">All projects ${icon('arrow', 15)}</a></div><div class="projects-grid section-anchor" id="project-media">${projects.map(p => `<article class="project-card"><button class="project-image ${p.color}" data-project="${p.n}" aria-label="View project: ${p.title}"><img src="https://images.unsplash.com/${p.image}?w=1000&h=760&fit=crop" alt="${p.title} project preview" loading="lazy"/><span class="project-number">${p.n} / 03</span><span class="project-open">${icon('arrow', 18)}</span></button><div class="project-meta"><span>${p.category}</span><span>202${p.n === '01' ? '5' : '4'}</span></div><h3>${p.title}</h3><p class="project-description">${p.description}</p></article>`).join('')}</div></section>
        <section class="section-block section-anchor" id="skills"><div class="section-heading compact"><div><span class="section-kicker">WHAT I BRING TO THE TABLE</span><h2>Tools of the <span class="serif-word">trade.</span></h2></div><div class="skills-caption">The right tool for the right<br/>problem, every time.</div></div><article class="skills-panel panel"><div class="skill-chips">${skills.map((s, i) => `<span class="skill-chip"><i>0${i + 1}</i>${s}</span>`).join('')}</div><div class="education-row section-anchor" id="education"><div><span class="section-kicker">EDUCATION</span><b>BFA, Communication Design</b><span>Pacific Northwest College of Art <i>·</i> 2017</span></div><div class="education-mark">PN<span>✳</span>CA</div></div><div class="cert-row"><span class="cert-icon">✳</span><div><b>Google UX Design Certificate</b><small>Google · 2021</small></div><span class="verified">${icon('check', 13)} VERIFIED</span></div></article></section>
        <section class="section-block insight-block"><div class="section-heading compact"><div><span class="section-kicker">A LOOK BACK</span><h2>Small numbers, <span class="serif-word">big things.</span></h2></div></div><article class="analytics-panel panel"><div class="analytics-copy"><span class="card-label">PORTFOLIO REACH</span><b>2,846</b><span class="analytics-sub">Portfolio views this month <em>↗ 18.4%</em></span><div class="chart-legend"><i></i> THIS MONTH <span></span> LAST MONTH</div></div><div class="chart-wrap"><div class="chart-y"><span>800</span><span>600</span><span>400</span><span>200</span><span>0</span></div><div class="chart"><div class="chart-lines"><i></i><i></i><i></i><i></i><i></i></div><svg viewBox="0 0 600 160" preserveAspectRatio="none" aria-label="Portfolio views trending up over the past month"><defs><linearGradient id="chartFill" x1="0" x2="0" y1="0" y2="1"><stop offset="0" stop-color="#75a998" stop-opacity=".25"/><stop offset="1" stop-color="#75a998" stop-opacity="0"/></linearGradient></defs><path class="chart-area" d="M0 130 C45 126 44 105 95 112 S150 95 190 106 S230 77 278 91 S330 63 370 77 S414 60 462 65 S515 31 552 49 S576 19 600 16 V160 H0Z"/><path class="chart-line" d="M0 130 C45 126 44 105 95 112 S150 95 190 106 S230 77 278 91 S330 63 370 77 S414 60 462 65 S515 31 552 49 S576 19 600 16"/></svg><div class="chart-x"><span>SEP 08</span><span>SEP 15</span><span>SEP 22</span><span>SEP 29</span><span>OCT 07</span></div></div></div></article></section>
        <section class="testimonial panel"><div class="testimonial-mark">“</div><div class="testimonial-content"><span class="section-kicker">KIND WORDS, GOOD PEOPLE</span><blockquote>“Lennon has that rare ability to make a complicated thing feel obvious. Every team needs a person like that in the room.”</blockquote><div class="testimonial-person"><img src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=88&h=88&fit=crop&crop=faces" alt="Portrait of Maya Chen"/><div><b>Maya Chen</b><span>Founder, Forma Studio</span></div></div></div><div class="quote-controls"><span>01 <i>/ 03</i></span><button id="nextQuote" aria-label="Next testimonial">${icon('arrow', 17)}</button></div></section>
        <section class="contact-panel section-anchor" id="contact"><div class="contact-deco">✳</div><span class="section-kicker">HAVE A GOOD ONE IN MIND?</span><h2>Let’s make something<br/><span class="serif-word">matter.</span></h2><p>Have a project, a question, or just want to say hello? My inbox is always open.</p><form class="contact-form" id="contactForm"><label><span>Your name</span><input name="sender_name" autocomplete="name" required placeholder="Jane Smith" aria-label="Your name" /></label><label><span>Email address</span><input name="sender_email" type="email" autocomplete="email" required placeholder="jane@example.com" aria-label="Your email address" /></label><label class="subject-field"><span>Subject</span><input name="subject" required placeholder="A new project" aria-label="Message subject" /></label><label class="message-field"><span>Message</span><textarea name="message" required rows="3" placeholder="Tell me a little about what you have in mind…" aria-label="Your message"></textarea></label><div class="contact-actions"><button type="submit" class="button button-light">Send a message ${icon('arrow', 16)}</button><a class="button button-outline-light" href="data:text/plain;charset=utf-8,LENNON%20JAMES%20%E2%80%94%20Product%20Designer%20%26%20Creative%20Developer" download="Lennon-James-Resume.txt">${icon('download', 16)} Download résumé</a></div><p class="form-status" id="formStatus" role="status" aria-live="polite"></p></form><div class="contact-bottom"><span></span><span>© 2025 LENNON</span></div></section>
        <footer><span><span class="footer-spark">✳</span></span><a href="#overview">BACK TO TOP ↑</a></footer>
      </div>
    </main>
  </div>
  <div class="modal-backdrop" id="projectModal" aria-hidden="true"><div class="project-modal" role="dialog" aria-modal="true" aria-labelledby="modalTitle"><button class="modal-close icon-button" id="modalClose" aria-label="Close project details">${icon('close', 20)}</button><span class="section-kicker" id="modalCategory"></span><h2 id="modalTitle"></h2><p id="modalDescription"></p><div id="modalMedia" class="modal-media"></div><a class="text-link" id="modalContact" href="#contact">Discuss a similar project ${icon('arrow', 15)}</a></div></div>
`

const projectModal = document.querySelector('#projectModal')
const closeModal = () => { projectModal.classList.remove('open'); projectModal.setAttribute('aria-hidden', 'true') }
document.querySelector('.projects-grid').addEventListener('click', event => {
  const button = event.target.closest('[data-project]')
  if (!button) return
  const project = projects.find(item => item.n === button.dataset.project)
  if (!project) return
  document.querySelector('#modalTitle').textContent = project.title
  document.querySelector('#modalCategory').textContent = project.category
  document.querySelector('#modalDescription').textContent = project.description
  const gallery = project.media_items || (project.media_url ? [{ media_url: project.media_url, caption: project.media_caption, media_type: 'image' }] : [])
  document.querySelector('#modalMedia').innerHTML = gallery.map(media => {
    const url = safeWebUrl(media.media_url)
    const label = escapeHtml(media.caption || project.title)
    if (media.media_type === 'video') return `<video controls preload="metadata" src="${url}" aria-label="${label}"></video>`
    if (media.media_type === 'audio') return `<figure><figcaption>${label}</figcaption><audio controls preload="metadata" src="${url}"></audio></figure>`
    return `<figure><img src="${url}" alt="${label}"/><figcaption>${label}</figcaption></figure>`
  }).join('')
  document.querySelector('#modalLinks').innerHTML = [project.demo_url && `<a href="${safeWebUrl(project.demo_url)}" target="_blank" rel="noopener noreferrer">Live project ${icon('external', 14)}</a>`, project.github_url && `<a href="${safeWebUrl(project.github_url)}" target="_blank" rel="noopener noreferrer">Source code ${icon('external', 14)}</a>`].filter(Boolean).join('')
  projectModal.classList.add('open'); projectModal.setAttribute('aria-hidden', 'false'); document.querySelector('#modalClose').focus()
})
document.querySelector('#modalClose').addEventListener('click', closeModal)
projectModal.addEventListener('click', event => { if (event.target === projectModal) closeModal() })
document.addEventListener('keydown', event => { if (event.key === 'Escape') closeModal() })
document.querySelector('#modalContact').addEventListener('click', closeModal)

document.querySelector('#contactForm').addEventListener('submit', async event => {
  event.preventDefault()
  const form = event.currentTarget
  const status = document.querySelector('#formStatus')
  const values = Object.fromEntries(new FormData(form))
  try {
    await sendContactMessage({ ...values, profile_id: window.lennonPortfolio?.profile?.[0]?.profile_id })
    status.textContent = 'Thanks — your message has been sent.'
    form.reset()
  } catch (error) {
    status.textContent = error.message.includes('not configured') ? 'Message form is ready to connect. Add your Supabase settings to enable submissions.' : 'Sorry, your message could not be sent right now. Please try again later.'
  }
})

const themeToggle = document.querySelector('#themeToggle')
const setTheme = theme => { document.documentElement.dataset.theme = theme; localStorage.setItem('lennon-theme', theme); themeToggle.innerHTML = icon(theme === 'dark' ? 'sun' : 'moon', 18); themeToggle.setAttribute('aria-label', `Switch to ${theme === 'dark' ? 'light' : 'dark'} theme`) }
setTheme(localStorage.getItem('lennon-theme') || 'light')
themeToggle.addEventListener('click', () => setTheme(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'))

const sidebar = document.querySelector('#sidebar')
document.querySelector('#menuToggle').addEventListener('click', () => { const open = sidebar.classList.toggle('mobile-open'); document.querySelector('#menuToggle').setAttribute('aria-expanded', String(open)) })
document.querySelectorAll('.nav-link').forEach(link => link.addEventListener('click', () => { document.querySelectorAll('.nav-link').forEach(item => { item.classList.remove('active'); item.querySelector('.nav-indicator')?.remove() }); link.classList.add('active'); link.insertAdjacentHTML('beforeend', '<span class="nav-indicator"></span>'); document.querySelector('#currentPage').textContent = link.querySelector('span').textContent; sidebar.classList.remove('mobile-open') }))

const quotes = [
  ['“Lennon has that rare ability to make a complicated thing feel obvious. Every team needs a person like that in the room.”', 'Maya Chen', 'Founder, Forma Studio', 'photo-1534528741775-53994a69daeb'],
  ['“From the first workshop to launch day, Lennon brought clarity, craft, and an infectious sense of possibility.”', 'Andre Wallace', 'CEO, Northstar Studio', 'photo-1506794778202-cad84cf45f1d'],
  ['“A rare creative partner who cares as much about how it works as how it feels. We couldn’t have built this without them.”', 'Sophie Laurent', 'Product Lead, Openhouse', 'photo-1544005313-94ddf0286df2'],
]
let quoteIndex = 0
document.querySelector('#nextQuote').addEventListener('click', () => { quoteIndex = (quoteIndex + 1) % quotes.length; const q = quotes[quoteIndex]; document.querySelector('.testimonial blockquote').textContent = q[0]; document.querySelector('.testimonial-person img').src = `https://images.unsplash.com/${q[3]}?w=88&h=88&fit=crop&crop=faces`; document.querySelector('.testimonial-person img').alt = `Portrait of ${q[1]}`; document.querySelector('.testimonial-person b').textContent = q[1]; document.querySelector('.testimonial-person span').textContent = q[2]; document.querySelector('.quote-controls > span').innerHTML = `0${quoteIndex + 1} <i>/ 03</i>` })

const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { const link = document.querySelector(`[data-section="${entry.target.id}"]`); if (link) { document.querySelectorAll('.nav-link').forEach(item => { item.classList.remove('active'); item.querySelector('.nav-indicator')?.remove() }); link.classList.add('active'); link.insertAdjacentHTML('beforeend', '<span class="nav-indicator"></span>'); document.querySelector('#currentPage').textContent = link.querySelector('span').textContent } } }), { rootMargin: '-25% 0px -60% 0px' })
document.querySelectorAll('.section-anchor').forEach(section => observer.observe(section))

const escapeHtml = value => String(value ?? '').replace(/[&<>"']/g, character => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[character])
const safeWebUrl = value => /^https?:\/\//i.test(String(value || '')) ? escapeHtml(value) : '#'

function renderPortfolio(records) {
  const profile = records.profile[0]
  const user = records.users[0]
  const fullName = [profile.fname, profile.mname, profile.lname].filter(Boolean).join(' ')
  if (fullName) document.querySelector('.content > .section-heading h2').textContent = `About ${fullName}`
  if (profile.profile_picture) document.querySelectorAll('.side-profile img,.avatar-link img').forEach(image => { image.src = profile.profile_picture })
  if (fullName) document.querySelector('.side-profile b').textContent = fullName
  const about = document.querySelector('.about-card')
  if (profile.bio) about.querySelectorAll(':scope > p').forEach((paragraph, index) => { if (index === 0) paragraph.textContent = profile.bio; else paragraph.remove() })
  const email = user?.email
  const contactEmail = about.querySelector('.profile-meta a[href^="mailto:"]')
  if (contactEmail && email) { contactEmail.href = `mailto:${encodeURIComponent(email)}`; contactEmail.textContent = email }
  const location = [profile.address, profile.phone].filter(Boolean).join(' · ')
  const locationNode = about.querySelector('.profile-meta > span:last-child')
  if (locationNode && location) locationNode.innerHTML = `<i class="location-dot"></i> ${escapeHtml(location)}`
  if (Array.isArray(records.social_links)) {
    const socials = about.querySelector('.socials')
    socials.innerHTML = records.social_links.map(link => `<a href="${safeWebUrl(link.url)}" aria-label="${escapeHtml(link.platform)}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.platform?.slice(0, 2) || '↗')}</a>`).join('')
  }
  document.querySelector('.timeline-card').innerHTML = records.experience.length ? records.experience.map(job => `<div class="timeline-item"><div class="timeline-date">${escapeHtml(job.start_date)} — ${escapeHtml(job.is_current ? 'NOW' : job.end_date || '')}</div><div class="timeline-marker"><span></span></div><div class="timeline-details"><h3>${escapeHtml(job.job_title)}</h3><div class="company">${escapeHtml(job.company_name)}${job.location ? ` <span>·</span> ${escapeHtml(job.location)}` : ''}</div><p>${escapeHtml(job.description)}</p></div>${job.is_current ? '<span class="current-badge">CURRENT</span>' : ''}</div>`).join('') : '<p class="empty-state">Experience details will appear here.</p>'
  document.querySelector('.skill-chips').innerHTML = records.skills.length ? records.skills.map((skill, index) => `<span class="skill-chip"><i>${String(index + 1).padStart(2, '0')}</i>${escapeHtml(skill.skill_name)}${skill.category ? ` · ${escapeHtml(skill.category)}` : ''}${skill.proficiency ? ` · ${escapeHtml(skill.proficiency)}` : ''}</span>`).join('') : '<p class="empty-state">Skills will appear here.</p>'
  if (records.education.length) {
    const education = records.education.map(item => `<div class="education-record"><b>${escapeHtml([item.degree, item.field_of_study].filter(Boolean).join(', '))}</b><span>${escapeHtml(item.school_name)} · ${escapeHtml(item.start_year)}–${escapeHtml(item.end_year)}</span>${item.description ? `<small>${escapeHtml(item.description)}</small>` : ''}</div>`).join('')
    document.querySelector('.education-row > div:first-child').innerHTML = `<span class="section-kicker">EDUCATION</span>${education}`
  }
  if (records.certifications.length) {
    document.querySelector('.cert-row').outerHTML = `<div class="certification-list"><span class="section-kicker">CERTIFICATIONS</span>${records.certifications.map(certificate => `<div class="cert-row"><span class="cert-icon">✳</span><div><b>${escapeHtml(certificate.certification_name)}</b><small>${escapeHtml(certificate.issuing_organization)} · ${escapeHtml(certificate.issue_date)}</small></div>${certificate.credential_url ? `<a class="verified" href="${safeWebUrl(certificate.credential_url)}" target="_blank" rel="noopener noreferrer">${icon('external', 13)} CREDENTIAL</a>` : ''}</div>`).join('')}</div>`
  }
  if (records.projects.length) {
    projects.splice(0, projects.length, ...records.projects.map((project, index) => {
      const media = records.project_media.filter(item => item.project_id === project.project_id).sort((a, b) => a.display_order - b.display_order)[0]
      return { ...project, n: String(index + 1).padStart(2, '0'), category: project.technologies || 'SELECTED PROJECT', title: project.title, description: project.description, media_url: media?.media_url, media_caption: media?.caption }
    }))
    document.querySelector('.projects-grid').innerHTML = projects.map(project => `<article class="project-card"><button class="project-image" data-project="${escapeHtml(project.n)}" aria-label="View project: ${escapeHtml(project.title)}">${project.media_url ? `<img src="${safeWebUrl(project.media_url)}" alt="${escapeHtml(project.media_caption || project.title)}" loading="lazy"/>` : ''}<span class="project-number">${project.n} / ${String(projects.length).padStart(2, '0')}</span><span class="project-open">${icon('arrow', 18)}</span></button><div class="project-meta"><span>${escapeHtml(project.category)}</span><span>${project.is_featured ? 'FEATURED' : ''}</span></div><h3>${escapeHtml(project.title)}</h3><p class="project-description">${escapeHtml(project.description)}</p></article>`).join('')
  }
  if (records.testimonials.length) {
    const showTestimonial = index => {
      const review = records.testimonials[index]
      document.querySelector('.testimonial blockquote').textContent = `“${review.testimonial_text}”`
      document.querySelector('.testimonial-person b').textContent = review.reviewer_name
      document.querySelector('.testimonial-person span').textContent = [review.reviewer_title, review.rating ? `${review.rating} / 5` : ''].filter(Boolean).join(' · ')
      document.querySelector('.quote-controls > span').innerHTML = `${String(index + 1).padStart(2, '0')} <i>/ ${String(records.testimonials.length).padStart(2, '0')}</i>`
    }
    document.querySelector('.testimonial-person img').hidden = true
    showTestimonial(0)
    const nextButton = document.querySelector('#nextQuote')
    nextButton.addEventListener('click', event => {
      event.stopImmediatePropagation()
      const current = Number(document.querySelector('.quote-controls > span').textContent.match(/^\d+/)?.[0] || '1') - 1
      showTestimonial((current + 1) % records.testimonials.length)
    }, true)
    if (records.testimonials.length < 2) nextButton.hidden = true
  }
  const views = records.analytics.reduce((total, row) => total + Number(row.views_count || 0), 0)
  document.querySelector('.analytics-copy>b').textContent = views.toLocaleString()
  if (records.analytics[0]?.visited_at) document.querySelector('.analytics-sub').textContent = `Latest visit ${new Date(records.analytics[0].visited_at).toLocaleDateString()}`
  const stats = document.querySelectorAll('.hero-stats > div')
  const counts = [records.experience.length, records.projects.length, records.testimonials.length]
  const labels = ['CAREER ROLES', 'PROJECTS', 'APPROVED REVIEWS']
  stats.forEach((stat, index) => { stat.querySelector('b').textContent = String(counts[index]).padStart(2, '0'); stat.querySelector('small').textContent = labels[index] })
  window.lennonPortfolio = records
}

// Use only the public profile and its related records. The users query in
// data.js explicitly excludes password.
loadPortfolio()
  .then(renderPortfolio)
  .catch(error => { console.info('Portfolio database not connected; showing sample content.', error.message) })
