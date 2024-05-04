import { name, age, isValid } from './bases/01-types';
import './style.css'
import typescriptLogo from './typescript.svg'
// import viteLogo from '/vite.svg'
import { setupCounter } from './counter.ts'
 
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello ${name} ${age} ${isValid}!!!</h1>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>    
  </div>
`

setupCounter(document.querySelector<HTMLButtonElement>('#counter')!)
