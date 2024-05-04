// import { name, age, isValid } from './bases/01-types';
import { car } from './bases/02-object';
import './style.css'
import typescriptLogo from './typescript.svg' 
 
document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <h1>Hello ${car.forEach((element) => console.log(element)) }!!!</h1>
    <a href="https://www.typescriptlang.org/" target="_blank">
      <img src="${typescriptLogo}" class="logo vanilla" alt="TypeScript logo" />
    </a>    
  </div>
`
 