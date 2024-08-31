'use client'

import { useState, useEffect } from 'react'
import SubmissionForm from './components/SubmissionForm'
import ProjectsList from './components/ProjectsList'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function Home() {
  const [projects, setProjects] = useState([])
  const [selectedProject, setSelectedProject] = useState('All')

  useEffect(() => {
    fetchProjects()
  }, [])

  async function fetchProjects() {
    const { data, error } = await supabase
      .from('projects')
      .select('*')
    if (error) console.error('Error fetching projects:', error)
    else setProjects(data as any)
  }

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold mb-4">Student Projects Showcase</h1>
      <SubmissionForm onSubmit={fetchProjects} />
      <ProjectsList 
        projects={projects} 
        selectedProject={selectedProject}
        onProjectSelect={setSelectedProject}
      />
    </div>
  )
}
