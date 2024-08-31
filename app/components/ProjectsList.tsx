'use client'

import { useMemo } from 'react'

export default function ProjectsList({ projects, selectedProject, onProjectSelect }: { projects: any[], selectedProject: string, onProjectSelect: (project: string) => void }) {
  const projectTypes = useMemo(() => {
    return ['All', ...Array.from(new Set(projects.map((p: any) => p.project_name)))]
  }, [projects])

  const filteredProjects = useMemo(() => {
    if (selectedProject === 'All') return projects
    return projects.filter(p => p.project_name === selectedProject)
  }, [projects, selectedProject])

  return (
    <div>
      <div className="mb-4">
        <label htmlFor="projectSelect" className="mr-2">Filter by project:</label>
        <select
          id="projectSelect"
          value={selectedProject}
          onChange={(e) => onProjectSelect(e.target.value)}
          className="p-2 border rounded"
        >
          {projectTypes.map(type => (
            <option key={type} value={type}>{type}</option>
          ))}
        </select>
      </div>
      <div>
        {filteredProjects.map(project => (
          <div key={project.id} className="mb-4 p-4 border rounded">
            <h3 className="font-bold">{project.project_name}</h3>
            <p>By: {project.name}</p>
            <a href={project.github_link} target="_blank" rel="noopener noreferrer" className="text-blue-500">
              GitHub Link
            </a>
          </div>
        ))}
      </div>
    </div>
  )
}
