const prompt = require('prompt-sync')({sigint: true});
const chalk = require('chalk');

const gradeReportObject = {
    course: '', 
    studentName: '',
    numberOfSubjects: 0,
    subjects: [],
};
let completeReport = false;
while(!completeReport){
    console.clear();
    console.log('Hello there!, Welcome to your trusted grade generator! \nJust answer some few questions to get started.') // greetings
    
    // get student name
    const getstudentName=()=>{
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const studentName = prompt('Q: How should we call you? ');
        if(!studentName){
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log(`You surely should have a name! What is it. Do nto be shy.`);
            getstudentName()
        }else if(studentName?.length > 10){
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log(`You really are pulling the strings, let\s try something shorter`);
            getstudentName()
        }else{
            gradeReportObject.studentName = studentName;
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log(`Hey there, ${studentName}!`)
            return
        }
    }
    getstudentName()
    // get student course
    const getstudentCourse=()=>{
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const studentCourse = prompt('Q: Which course are you taking? ');
        
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        if(!studentCourse){
            console.log(`Hmm, arent you enrolled in a course. Dont worry, we'll shoot for the stars`);
            studentCourse='Software Engineering'
            return
        }else if(studentCourse?.length > 10){
            console.log(`Okay, Ivy league Kidogo right???`);
        }else{
            console.log(`Really Nice course!`)
        }
        gradeReportObject.course = studentCourse;
        return
    }
    getstudentCourse()
    // get number of subjects
    const getNumberOfSubjects=()=>{
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        const numberOfSubjects = prompt('Q: Now, How many subjects are you taking?');
        
        if(numberOfSubjects > 6){
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log(`Unaka pitia sio, ${numberOfSubjects} subjects!! Take heart bro.`);
        }
        if(numberOfSubjects == 0){
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            console.log(`Ukona Jokes haufanyi any subjects. Try again`);
            getNumberOfSubjects()
        }
        gradeReportObject.numberOfSubjects = numberOfSubjects;
        return
    }
    getNumberOfSubjects();
    
    // console.log(`You are taking ${numberOfSubjects} subjects.`);
    for(let i=0; i < gradeReportObject.numberOfSubjects; i++){
        console.log(`+--------------------------------------------------------------------------------------------------------+`);
        let subject = prompt('Q: Which subject would like to add  (e.g Math)?');
        gradeReportObject.subjects.push({
            name:   subject, // string
            marks:  0, // number
            grade:  '' // string
        })
        const getMark=()=>{
            console.log(`+--------------------------------------------------------------------------------------------------------+`);
            subjectMark = prompt(`Q: Which mark did you get in ${subject} (e.g 50)?`);
            if(subjectMark < 0 || subjectMark > 100 ){
                console.log(`Mark should be between 0 and 100`);
                getMark()
            }else if(isNaN(subjectMark)){
                console.log(`Mark should be a number`);
                getMark()
            }else{
                console.log(`${gradeReportObject.subjects[i].name} added to your report`);
                gradeReportObject.subjects[i].mark = subjectMark
                gradeReportObject.subjects[i].grade = StudentGradeGenerator(subjectMark)
                return
            }
        }
        getMark()
    }
    GenereateReportCard(gradeReportObject)
    break;
}

function StudentGradeGenerator(marks){
    let grade;
    if (marks > 79) {
        grade = "A";
    } else if (marks >= 60) {
        grade = "B";
    } else if (marks >= 50) {
        grade = "C";
    } else if (marks >= 40) {
        grade = "D";
    } else {
        grade = "E";
    }
    return grade;
};

function GenereateReportCard(gradeReport){
    const day = new Date().getDate(); // Day of the month (1-31)
    const month = new Date().toLocaleString('default', { month: 'long' }); // Full month name
    let totalMarks = 0;
    console.log('\n\n\n\n\n')
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    console.log(`|\tREPORT CARD\t|\t\t\t\t\t\tDate:   ${day}-${month}\t\t\t |`);
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    console.log(`|\tName:\t\t|\t${gradeReport?.studentName}`);
    console.log(`|\tCourse:\t\t|\t${gradeReport.course}`);
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    console.log(`|\tSUBJECT\t\t|\t\t\t\t\t\t|MARK\t\t|GRADE\t\t |`);
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    gradeReport?.subjects?.forEach(subject => {
        console.log(`|\t${subject?.name}\t\t|\t\t\t\t\t\t${subject?.mark}\t\t${subject?.grade}\t\t`);
        totalMarks += parseInt(subject?.mark);
    });
    const averageMarks = totalMarks / gradeReport?.numberOfSubjects;
    let finalGrade = StudentGradeGenerator(averageMarks);
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    console.log(`|\tTotal\t\t|\t\t\t\t\t\t${totalMarks}\t\t${finalGrade}\t\t `);
    console.log(`+--------------------------------------------------------------------------------------------------------+`);
    console.log('\n\n\n\n\n')
    // Just some ASCII for fun 
    if(finalGrade === 'A'){
        console.log( ",---,     ,---,  ")
        console.log(",`--.' |  ,`--.' | " )
        console.log(",----..                                                                   ___                          |   :  :  |   :  :  ")
console.log("/   /   \                                                                ,--.'|_                        '   '  ;  '   '  ;  ")
console.log("|   :     :    ,---.         ,---,                __  ,-.                 |  | :,'                       |   |  |  |   |  | ")
console.log(".   |  ;. /   '   ,'\    ,-+-. /  |   ,----._,. ,' ,'/ /|                 :  : ' :    .--.--.            '   :  ;  '   :  ;  ")
console.log(".   ; /--`   /   /   |  ,--.'|'   |  /   /  ' / '  | |' |    ,--.--.    .;__,'  /    /  /    '           |   |  '  |   |  '  ")
console.log(";   | ;     .   ; ,. : |   |  ,'' | |   :     | |  |   ,'   /       \   |  |   |    |  :  /`./           '   :  |  '   :  |  ")
console.log("|   : |     '   | |: : |   | /  | | |   | .\  . '  :  /    .--.  .-. |  :__,'| :    |  :  ;_             ;   |  ;  ;   |  ;  ")
console.log(".   | '___  '   | .; : |   | |  | | .   ; ';  | |  | '      \__\/: . .    '  : |__   \  \    `.          `---'. |  `---'. |  ")
console.log("'   ; : .'| |   :    | |   | |  |/  '   .   . | ;  : |      ,' .--.; |    |  | '.'|   `----.   \          `--..`;   `--..`;  ")
console.log("'   | '/  :  \   \  /  |   | |--'    `---`-'| | |  , ;     /  /  ,.  |    ;  :    ;  /  /`--'  /         .--,_     .--,_     ")
console.log("|   :    /    `----'   |   |/        .'__/\_: |  ---'     ;  :   .'   \   |  ,   /  '--'.     /          |    |`.  |    |`.  ")
console.log("\   \ .'              '---'         |   :    :           |  ,     .-./    ---`-'     `--'---'           `-- -`, ; `-- -`, ; ")
console.log("`---`                               \   \  /             `--`---'                                        '---`'    '---`'  ")
console.log("`--`-'                                                                                ")
console.log("")
    }
};