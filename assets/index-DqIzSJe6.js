(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))s(a);new MutationObserver(a=>{for(const o of a)if(o.type==="childList")for(const l of o.addedNodes)l.tagName==="LINK"&&l.rel==="modulepreload"&&s(l)}).observe(document,{childList:!0,subtree:!0});function e(a){const o={};return a.integrity&&(o.integrity=a.integrity),a.referrerPolicy&&(o.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?o.credentials="include":a.crossOrigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function s(a){if(a.ep)return;a.ep=!0;const o=e(a);fetch(a.href,o)}})();const g=n=>Object.fromEntries(Object.entries(n).map(([t,e])=>[t,e?.toString()])),k="https://tasks-service-maks1394.amvera.io",_=k+"/tasks";class b{constructor(t){this._apiUrl=t}async fetch({path:t="",errorMsg:e,config:s={}}){const a=await fetch(`${this._apiUrl}${t}`,s);if(a.ok)return await a.json();throw{error:`${e} ${a.statusText}`}}}class T{constructor(t){this._agent=t}async createTask(t){return await this._agent.fetch({errorMsg:"Ошибка при создании задачи",config:{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify(t)}})}async getAllTasks(t){const e=t?"?"+new URLSearchParams(g(t)):"";return await this._agent.fetch({path:e,errorMsg:"Ошибка при получении всех задач"})}async getTaskById(t){return await this._agent.fetch({path:`/${t.id}`,errorMsg:`Ошибка при получении задачи с id = ${t.id}`})}async updateTaskById(t,e){return await this._agent.fetch({path:`/${t.id}`,errorMsg:`Ошибка при обновлении задачи с id = ${t.id}`,config:{method:"PATCH",headers:{"Content-Type":"application/json"},body:JSON.stringify(e)}})}async deleteTaskById(t){return await this._agent.fetch({path:`/${t.id}`,errorMsg:`Ошибка при удалении задачи с id = ${t.id}`,config:{method:"DELETE"}})}}const w=new b(_),I=new T(w);class E{constructor(t){this._taskAgent=t}async createTask(t){try{const e=await this._taskAgent.createTask(t);return console.log("созданная задача",e),e}catch(e){return console.error(e),null}}async getAllTasks(t){try{const e=await this._taskAgent.getAllTasks(t);return console.log("все задачи",e),e}catch(e){return console.error(e),[]}}async getTaskById(t){try{const e=await this._taskAgent.getTaskById(t);return console.log(`задача с id ${t.id}`,e),e}catch(e){return console.error(e),null}}async updateTaskById(t,e){try{const s=await this._taskAgent.updateTaskById(t,e);return console.log(`обновленная задача с id ${t.id}`,s),s}catch(s){return console.error(s),null}}async deleteTaskById(t){try{const e=await this._taskAgent.deleteTaskById(t);return console.log(`удаленная задача с id ${t.id}`,e),e}catch(e){return console.error(e),null}}}const i=new E(I),h=(n,t)=>{n.preventDefault();const e=new FormData(t),s=e.get("name"),a=e.get("info"),o=e.get("isImportant");return{name:s?s.toString():"",info:a?a.toString():"",isImportant:!!o,isCompleted:!1}},L=()=>{const n=document.createElement("form");n.className="edit-panel__form",n.id="create-form",n.innerHTML=`
            <h2>Создание</h2>
            <label for="name">
                Название задачи *
                <input type="text" id="name" name="name" required/>
            </label>

            <label for="info">Описание задачи
                <textarea id="info" name="info"></textarea>
            </label>

            <label for="isImportant" class="checkbox">
                <input type="checkbox" name="isImportant" id="isImportant">
                Очень важно
            </label>

            <button type="submit">
                Создать
            </button>
    `,n?.addEventListener("submit",y);const t=document.getElementById("edit-panel");t&&(t.innerHTML=""),t?.appendChild(n)},v=n=>{const t=document.createElement("form");t.className="edit-panel__form",t.id="edit-form",t.innerHTML=`
            <h2>Редактирование</h2>

        <label for="name">
            Название задачи *
            <input type="text" id="name" name="name" required value="${n.name}"/>
        </label>

        <label for="info">Описание задачи
            <textarea id="info" name="info">${n.info||""}</textarea>
        </label>

        <label for="isImportant" class="checkbox">
            <input type="checkbox" name="isImportant" id="isImportant"  ${n.isImportant?"checked":""}/>
            Очень важно
        </label>

        <button type="submit">
            Сохранить изменения
        </button>
    `,t?.addEventListener("submit",async s=>{await P(s,t,n),L()});const e=document.getElementById("edit-panel");e&&(e.innerHTML=""),e?.appendChild(t)},B=n=>{const t=document.createElement("div");t.className="task",t.innerHTML=`
        <div class="task__head-info">
            <span class="task__id">${n.id}</span>
            <div>
                 ${n.isCompleted?"":'<button class="task__switch-state-button">Выполнить</button>'}
                <button class="task__edit-button">
                    Изменить
                </button>
                <button class="task__delete-button">
                    Удалить
                </button>
            </div>
        </div>
        
        <div class="task__empty-item"></div>
        <h3 class="task__name">${n.name}</h3>
        <p class="task__info">${n.info}</p>
        <div class="task-statuses">
            ${n.isImportant?'<span class="task-statuses__is-important">Очень важно</span>':""}
            ${n.isCompleted?'<span class="task-statuses__is-completed">Готово</span>':""}
        </div>
    `;const e=t.querySelector(".task__switch-state-button"),s=t.querySelector(".task__edit-button"),a=t.querySelector(".task__delete-button");return e?.addEventListener("click",async o=>{o.stopPropagation(),await F({id:n.id})}),s?.addEventListener("click",o=>{o.stopPropagation(),v(n)}),a?.addEventListener("click",async o=>{o.stopPropagation(),await M({id:n.id})}),t.addEventListener("click",async o=>{o.stopPropagation(),await x({id:n.id})}),t},$=n=>{const t=document.getElementById("task-list");t&&(t.innerHTML="",n.reverse().forEach(e=>{const s=B(e);t.appendChild(s)}))},c=document.getElementById("create-form");c&&c.addEventListener("submit",y);const m=document.getElementById("search-form");m&&m.addEventListener("submit",C);const f=document.getElementById("is-completed-checkbox");f&&f.addEventListener("change",S);const p=document.getElementById("is-important-checkbox");p&&p.addEventListener("change",A);window.addEventListener("DOMContentLoaded",async()=>{await d()});async function y(n){if(!c)return;const t=h(n,c),e=await i.createTask(t);await u(!!e)}let r={};const d=async n=>{const t=await i.getAllTasks(n);$(t)};async function C(n){if(!m)return;n.preventDefault();const e=new FormData(m).get("search");r&&(r.name_like=e?e.toString():""),await d(r)}async function A(n){const e=n.target.checked;if(r)if(e)r.isImportant=e;else{const{isImportant:s,...a}=r;r=a}await d(r)}async function S(n){const e=n.target.checked;if(r)if(e)r.isCompleted=e;else{const{isCompleted:s,...a}=r;r=a}await d(r)}async function u(n){n?(await d(),alert("Успешно!"),c?.reset()):alert("Произошла ошибка")}async function x(n){const t=await i.getTaskById(n);alert(t?`
        Название: ${t.name} 
        Описание: ${t.info}
        --------------------------------------

        ${t.isImportant?"Очень важно |":""} ${t.isCompleted?"Выполнено!":"Не выполнено"} 
            `:"Не получилось загрузить задачу")}async function F(n){const t=await i.updateTaskById(n,{isCompleted:!0});await u(!!t)}const P=async(n,t,e)=>{const s=h(n,t),a=await i.updateTaskById({id:e.id},{...s,isCompleted:e.isCompleted});await u(!!a)};async function M(n){const t=await i.deleteTaskById(n);await u(!!t)}
