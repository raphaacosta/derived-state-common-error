import { useEffect, useState } from 'react'

interface Repo {
  name: string;
  description: string;
}

function App() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [filteredRepos, setFilteredRepos] = useState<Repo[]>([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    fetch('https://api.github.com/users/raphaacosta/repos')
      .then(response => response.json())
      .then(data => setRepos(data))
  }, []);

  useEffect(() => {
    setFilteredRepos(repos.filter(repo => repo.name.includes(search)));
  }, [search])

  return (
    <div>
      <input
        name="search"
        type="text"
        placeholder="Buscar..."
        onChange={e => setSearch(e.target.value)}
        value={search}
      />

      {search.length > 0 ? (
        <ul>
          {filteredRepos.map(repo => {
            return (
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
      ) : (
        <ul>
          {repos.map(repo => {
            return (
              <li key={repo.name}>
                {repo.name}
              </li>
            )
          })}
        </ul>
      )}
    </div>
  )
}

export default App
