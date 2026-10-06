const baseUrl = import.meta.env.VITE_SUPABASE_URL?.replace(/\/$/, '')
const apiKey = import.meta.env.VITE_SUPABASE_ANON_KEY
export const databaseReady = Boolean(baseUrl && apiKey)

async function request(table, query = '', options = {}) {
  if (!databaseReady) throw new Error('Database is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to .env.local.')
  const response = await fetch(`${baseUrl}/rest/v1/${table}${query ? `?${query}` : ''}`, {
    ...options,
    headers: { apikey: apiKey, Authorization: `Bearer ${apiKey}`, 'Content-Type': 'application/json', ...(options.headers || {}) },
  })
  if (!response.ok) throw new Error(`Database request failed for ${table} (${response.status}).`)
  return response.status === 204 ? null : response.json()
}

export async function loadPortfolio() {
  const profiles = await request('profile', 'select=*&is_public=eq.true&order=profile_id.asc&limit=1')
  const profile = profiles?.[0]
  if (!profile) throw new Error('No public profile was found. Set profile.is_public to true.')
  const id = `profile_id=eq.${encodeURIComponent(profile.profile_id)}`
  const userQuery = `select=user_id,email,role,created_at&user_id=eq.${encodeURIComponent(profile.user_id)}&limit=1`
  const columns = {
    experience: 'experience_id,job_title,company_name,location,start_date,end_date,is_current,description',
    education: 'education_id,school_name,degree,field_of_study,start_year,end_year,description',
    skills: 'skill_id,skill_name,category,proficiency,year_acquired',
    certifications: 'certification_id,certification_name,issuing_organization,issue_date,expiration_date,credential_id,credential_url',
    projects: 'project_id,title,description,technologies,demo_url,github_url,is_featured,display_order',
    testimonials: 'testimonial_id,reviewer_name,reviewer_title,testimonial_text,rating,created_at,is_approved',
    social_links: 'social_id,platform,username,url',
    analytics: 'views_count,visited_at',
  }
  const names = Object.keys(columns)
  const [userRows, ...related] = await Promise.all([
    request('users', userQuery),
    ...names.map(table => request(table, `${id}&select=${columns[table]}${table === 'projects' ? '&order=display_order.asc' : table === 'experience' ? '&order=start_date.desc' : table === 'testimonials' ? '&is_approved=eq.true' : table === 'analytics' ? '&order=visited_at.desc' : ''}`)),
  ])
  const projects = related[names.indexOf('projects')]
  const projectIds = projects.map(row => row.project_id).filter(Boolean)
  const media = projectIds.length
    ? await request('project_media', `select=*&project_id=in.(${projectIds.join(',')})&order=display_order.asc`)
    : []
  return Object.fromEntries([
    ['users', userRows], ['profile', [profile]], ...names.map((name, index) => [name, related[index]]), ['project_media', media],
  ])
}

export async function sendContactMessage({ sender_name, sender_email, subject, message, profile_id }) {
  if (!profile_id) throw new Error('Contact submission needs the selected public profile.')
  return request('contact_messages', '', {
    method: 'POST',
    headers: { Prefer: 'return=minimal' },
    body: JSON.stringify({ profile_id, sender_name, sender_email, subject, message }),
  })
}
