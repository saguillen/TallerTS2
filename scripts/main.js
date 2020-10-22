import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var btnfilterByName = document.getElementById("button-filterByName");
var btnfilterByRange = document.getElementById("button-filterByRange");
var inputSearchBox = document.getElementById("search-box");
var inputNumMin = document.getElementById("filter-min");
var inputNumMax = document.getElementById("filter-max");
var totalCreditElm = document.getElementById("total-credits");
var studentTbody = document.getElementById('student');
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnfilterByRange.onclick = function () { return applyFilterByRange(); };
renderCoursesInTable(dataCourses);
renderStudentInfoInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInfoInTable(student) {
    console.log('Desplegando info');
    student.forEach(function (s) {
        var scodigo = document.createElement("tr");
        scodigo.innerHTML = "<td> Codigo: </td>\n                           <td>" + s.codigo + "</td>";
        var scedula = document.createElement("tr");
        scedula.innerHTML = "<td> Cedula: </td>\n                           <td>" + s.cedula + "</td>";
        var sedad = document.createElement("tr");
        sedad.innerHTML = "<td> Edad: </td>\n                           <td>" + s.edad + "</td>";
        var sdireccion = document.createElement("tr");
        sdireccion.innerHTML = "<td> Direccion: </td>\n                           <td>" + s.direccion + "</td>";
        var stelefono = document.createElement("tr");
        stelefono.innerHTML = "<td> Telefono: </td>\n                           <td>" + s.telefono + "</td>";
        studentTbody.appendChild(scodigo);
        studentTbody.appendChild(scedula);
        studentTbody.appendChild(sedad);
        studentTbody.appendChild(sdireccion);
        studentTbody.appendChild(stelefono);
    });
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByRange() {
    var text = inputSearchBox.value;
    var min = parseInt(inputNumMin.value);
    var max = parseInt(inputNumMax.value);
    min = (min == 0) ? 0 : min;
    max = (max == 0) ? 0 : max;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByRange(min, max, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByRange(minVal, maxVal, courses) {
    return courses.filter(function (c) {
        return c.credits >= minVal && c.credits <= maxVal;
    });
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
