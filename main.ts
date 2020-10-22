
import { Course } from './course.js';

import { dataCourses } from './dataCourses.js';

import{Student} from './student.js';

import{dataStudent} from './dataStudent.js'

let coursesTbody: HTMLElement = document.getElementById('courses')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnfilterByRange: HTMLElement = document.getElementById("button-filterByRange")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputNumMin: HTMLInputElement = <HTMLInputElement> document.getElementById("filter-min")!;
const inputNumMax: HTMLInputElement = <HTMLInputElement> document.getElementById("filter-max")!;

const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;

let studentTbody: HTMLElement = document.getElementById('student')!;

btnfilterByName.onclick = () => applyFilterByName();

btnfilterByRange.onclick=() => applyFilterByRange();

renderCoursesInTable(dataCourses);

renderStudentInfoInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInfoInTable(student: Student[]): void{
  console.log('Desplegando info');
  student.forEach((s) => {

    
    let scodigo = document.createElement("tr");
    scodigo.innerHTML = `<td> Codigo: </td>
                           <td>${s.codigo}</td>`;
    let scedula = document.createElement("tr");
    scedula.innerHTML = `<td> Cedula: </td>
                           <td>${s.cedula}</td>`;
    let sedad = document.createElement("tr");
    sedad.innerHTML = `<td> Edad: </td>
                           <td>${s.edad}</td>`;
       let sdireccion = document.createElement("tr");
    sdireccion.innerHTML = `<td> Direccion: </td>
                           <td>${s.direccion}</td>`;
       let stelefono = document.createElement("tr");
    stelefono.innerHTML = `<td> Telefono: </td>
                           <td>${s.telefono}</td>`;
    studentTbody.appendChild(scodigo);
    studentTbody.appendChild(scedula);
    studentTbody.appendChild(sedad);
    studentTbody.appendChild(sdireccion);
    studentTbody.appendChild(stelefono);
  });


}



function applyFilterByName() { 
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByRange() { 
  let text = inputSearchBox.value;
  let min = parseInt(inputNumMin.value);
  let max = parseInt(inputNumMax.value);
  min=(min==0)? 0 : min;
  max=(max==0)? 0 : max;

  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByRange(min,max, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c => 
    c.name.match(nameKey));
}

function searchCourseByRange(minVal: number, maxVal: number,courses: Course[]) {

  return courses.filter( c => 
    c.credits>=minVal && c.credits<=maxVal);
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
     
    }
  }
}