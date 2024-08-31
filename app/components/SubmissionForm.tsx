'use client'

import { useState } from 'react'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)

export default function SubmissionForm({ onSubmit }: { onSubmit: () => void }) {
  const [name, setName] = useState('')
  const [projectName, setProjectName] = useState('')
  const [githubLink, setGithubLink] = useState('')

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const { error } = await supabase
      .from('projects')
      .insert({ name, project_name: projectName, github_link: githubLink })
    if (error) console.error('Error inserting project:', error)
    else {
      setName('')
      setProjectName('')
      setGithubLink('')
      onSubmit()
    }
  }

  return (
    <form onSubmit={handleSubmit} className="mb-8">
      <input
        type="text"
        placeholder="Your Name"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-2 p-2 border rounded"
        required
      />
      <input
        type="text"
        placeholder="Project Name"
        value={projectName}
        onChange={(e) => setProjectName(e.target.value)}
        className="mb-2 p-2 border rounded"
        required
      />
      <input
        type="url"
        placeholder="GitHub Link"
        value={githubLink}
        onChange={(e) => setGithubLink(e.target.value)}
        className="mb-2 p-2 border rounded"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 rounded">
        Submit Project
      </button>
    </form>
  )
}
