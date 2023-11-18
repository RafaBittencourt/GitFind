import { useState } from "react";
import { Header } from "../../components/header";
import backgraund from '../../assets/gitbackground.png';
import ItemList from "../../components/itemList";
import './styles.css';;

function App() {
  const [user, setUser] = useState('')
  const [currentUser, setCurrentUser] = useState(null)
  const [repos, setRepos] = useState(null)


  const handleGetData = async () => {
    const userData = await fetch(`https://api.github.com/users/${user}`)
    const newUser = await userData.json()

    if (newUser.name){
      const {avatar_url, name, bio, login} = newUser

      setCurrentUser({avatar_url, name, bio, login})

      const repoData = await fetch(`https://api.github.com/users/${user}/repos`)
      const newRepos = await repoData.json()
      
      if (newRepos.length){
        setRepos(newRepos)
      }
    }
  }

  return (
    <div className="App">
      <Header title="GitFind"/>
      <div className="conteudo">
        <img src={backgraund} className="background" alt="backgraund app"/>
        <div className="info">
          <div>
            <input name="usuario" value={user} onChange={event => setUser(event.target.value)} placeholder={"@username"}></input>
            <button onClick={handleGetData}>Buscar</button>
          </div>
          {currentUser?.name ? (<>
            <div className="perfil">
            <img 
            src={currentUser.avatar_url} 
            className="profile" 
            alt="image prefil"/>
            <div>
              <h3>{currentUser.name}</h3>
              <span>@{currentUser.login}</span>
              <p>{currentUser.bio}</p>
            </div>
          </div>
          <hr />
          </>
          ) : null}
          {repos?.length ? (
            <div>
              <h4 className="repositorio">Repositorios</h4>
              {repos.map(repo => (
                <ItemList title={repo.name} description={repo.description} url_repo={repo.html_url} />              
              ))}
            </div>
          ) : null}
        </div>
      </div>
    </div>
  );
}

export default App;
