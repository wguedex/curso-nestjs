 
import { charmander } from './bases/04-injection';
import './style.css'
import typescriptLogo from './typescript.svg' 
 
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
  <h1>Hello ${ charmander.name } ${ charmander.id }!</h1>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>    
  </div>
`
 