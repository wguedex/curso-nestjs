 
import { Vehicle } from './bases/03-classes';
import './style.css'
import typescriptLogo from './typescript.svg' 
 
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello ${new Vehicle('Model 3', 'Tesla', 'Electric', 2022) }!!!</h1>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>    
  </div>
`
 